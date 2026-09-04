import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Rocket,
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  Sparkles,
  Compass,
  CheckSquare,
  Square,
  KeyRound,
  ArrowLeft,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { StarfieldBg } from '../components/layout/StarfieldBg';

export function AuthPage() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [activeForm, setActiveForm] = useState('signin'); // 'signin' | 'signup' | 'forgot'
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Forgot Password state
  const [forgotEmail, setForgotEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const [generatedToken, setGeneratedToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, register, requestPasswordReset } = useAuth();
  const navigate = useNavigate();

  // Login Form state
  const [loginEmail, setLoginEmail] = useState('nova@collabboard.space');
  const [loginPassword, setLoginPassword] = useState('passcode123');

  // Register Form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [passError, setPassError] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login(loginEmail, 'Captain');
    navigate('/dashboard');
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (regPassword && regConfirmPassword && regPassword !== regConfirmPassword) {
      setPassError('Passwords do not match!');
      return;
    }
    setPassError('');
    register(regName, regEmail, 'Crew');
    navigate('/dashboard');
  };

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');

    if (!validateEmail(forgotEmail)) {
      setEmailError('Please enter a valid email address (e.g. user@domain.com)');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await requestPasswordReset(forgotEmail);
      setGeneratedToken(res.token);
      setForgotSent(true);
    } catch (err) {
      setEmailError(err.message || 'Failed to send reset link.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openForgotView = (e) => {
    e.preventDefault();
    setForgotEmail(loginEmail);
    setEmailError('');
    setForgotSent(false);
    setActiveForm('forgot');
  };

  const returnToSignIn = () => {
    setActiveForm('signin');
    setIsRightPanelActive(false);
  };

  const goToSignUp = () => {
    setActiveForm('signup');
    setIsRightPanelActive(true);
  };

  return (
    <div className="auth-sliding-wrapper">
      <StarfieldBg />

      {/* Embedded CSS for Code Candy Sliding Panel Animation */}
      <style>{`
        .auth-sliding-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          position: relative;
          overflow: hidden;
        }

        .auth-card-container {
          background: rgba(12, 12, 18, 0.88);
          border: 1px solid rgba(255, 191, 0, 0.3);
          border-radius: 24px;
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.9), 0 0 50px rgba(255, 191, 0, 0.15);
          backdrop-filter: blur(25px);
          position: relative;
          overflow: hidden;
          width: 900px;
          max-width: 100%;
          min-height: 550px;
          transition: all 0.6s ease-in-out;
        }

        .form-container {
          position: absolute;
          top: 0;
          height: 100%;
          transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          padding: 40px 44px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .sign-in-container {
          left: 0;
          width: 50%;
          z-index: 2;
          opacity: 1;
        }

        .sign-up-container {
          left: 0;
          width: 50%;
          opacity: 0;
          z-index: 1;
        }

        .auth-card-container.right-panel-active .sign-in-container {
          transform: translateX(100%);
          opacity: 0;
          pointer-events: none;
        }

        .auth-card-container.right-panel-active .sign-up-container {
          transform: translateX(100%);
          opacity: 1;
          z-index: 5;
          pointer-events: all;
          animation: show 0.6s;
        }

        @keyframes show {
          0%, 49.99% {
            opacity: 0;
            z-index: 1;
          }
          50%, 100% {
            opacity: 1;
            z-index: 5;
          }
        }

        .overlay-container {
          position: absolute;
          top: 0;
          left: 50%;
          width: 50%;
          height: 100%;
          overflow: hidden;
          transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          z-index: 100;
        }

        .auth-card-container.right-panel-active .overlay-container {
          transform: translateX(-100%);
        }

        .overlay {
          background: linear-gradient(135deg, rgba(255, 191, 0, 0.95), rgba(255, 120, 0, 0.95));
          background-repeat: no-repeat;
          background-size: cover;
          background-position: 0 0;
          color: #ffffff;
          position: relative;
          left: -100%;
          height: 100%;
          width: 200%;
          transform: translateX(0);
          transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.5);
        }

        .auth-card-container.right-panel-active .overlay {
          transform: translateX(50%);
        }

        .overlay-panel {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 0 44px;
          text-align: center;
          top: 0;
          height: 100%;
          width: 50%;
          transform: translateX(0);
          transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .overlay-left {
          transform: translateX(-20%);
        }

        .auth-card-container.right-panel-active .overlay-left {
          transform: translateX(0);
        }

        .overlay-right {
          right: 0;
          transform: translateX(0);
        }

        .auth-card-container.right-panel-active .overlay-right {
          transform: translateX(20%);
        }

        .ghost-btn {
          border-radius: 30px;
          border: 2px solid #ffffff;
          background-color: transparent;
          color: #ffffff;
          font-size: 0.82rem;
          font-weight: 800;
          font-family: var(--font-header, 'Orbitron', sans-serif);
          padding: 12px 32px;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: all 0.3s ease;
          cursor: pointer;
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.25);
          margin-top: 16px;
        }

        .ghost-btn:hover {
          background-color: #ffffff;
          color: #050508;
          box-shadow: 0 0 30px rgba(255, 255, 255, 0.8);
          transform: translateY(-2px);
        }

        .auth-input-group {
          position: relative;
          margin-bottom: 16px;
        }

        .auth-input-group input {
          width: 100%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 10px;
          padding: 12px 40px 12px 42px;
          color: #fff;
          font-size: 0.85rem;
          outline: none;
          transition: all 0.3s ease;
        }

        .auth-input-group input:focus {
          border-color: #ffbf00;
          background: rgba(255, 191, 0, 0.06);
          box-shadow: 0 0 15px rgba(255, 191, 0, 0.25);
        }

        .auth-input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #8e8e9c;
          pointer-events: none;
          transition: color 0.3s ease;
        }

        .auth-input-group input:focus ~ .auth-input-icon {
          color: #ffbf00;
        }

        .auth-password-toggle {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #8e8e9c;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          transition: color 0.2s ease;
        }

        .auth-password-toggle:hover {
          color: #fff;
        }

        @media (max-width: 768px) {
          .auth-card-container {
            min-height: auto;
            display: flex;
            flex-direction: column;
          }
          .form-container {
            position: relative;
            width: 100% !important;
            height: auto;
            padding: 28px 24px;
          }
          .overlay-container {
            display: none;
          }
          .sign-in-container, .sign-up-container {
            transform: none !important;
            opacity: 1 !important;
            position: relative;
          }
        }
      `}</style>

      {/* Main Double Panel Sliding Container */}
      <div className={`auth-card-container ${isRightPanelActive ? 'right-panel-active' : ''}`}>
        
        {/* ==================== 1. SIGN IN & FORGOT PASSWORD PANEL ==================== */}
        <div className="form-container sign-in-container">
          {activeForm === 'forgot' ? (
            /* FORGOT PASSWORD INLINE FORM VIEW */
            <div>
              {!forgotSent ? (
                <form onSubmit={handleForgotSubmit}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 10,
                        background: 'rgba(255,191,0,0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(255,191,0,0.3)'
                      }}
                    >
                      <KeyRound size={20} color="#ffbf00" />
                    </div>
                    <div>
                      <h2 style={{ fontFamily: 'var(--font-header)', fontSize: '1.3rem', color: '#fff' }}>
                        Reset Password
                      </h2>
                      <span style={{ fontSize: '0.72rem', color: '#8e8e9c' }}>
                        Password Recovery Request
                      </span>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.8rem', color: '#8e8e9c', marginBottom: 20, lineHeight: 1.5 }}>
                    Enter your email address below to receive password reset link via API.
                  </p>

                  <div className="auth-input-group">
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => {
                        setForgotEmail(e.target.value);
                        setEmailError('');
                      }}
                      placeholder="Email Address"
                    />
                    <Mail className="auth-input-icon" size={16} />
                  </div>

                  {emailError && (
                    <div style={{ color: '#ff4560', fontSize: '0.75rem', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <AlertCircle size={14} /> {emailError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #ffbf00, #ff9f00)',
                      border: 'none',
                      color: '#050508',
                      fontWeight: 800,
                      fontFamily: 'var(--font-header)',
                      padding: '12px',
                      borderRadius: 10,
                      fontSize: '0.85rem',
                      cursor: isSubmitting ? 'wait' : 'pointer',
                      boxShadow: '0 0 20px rgba(255,191,0,0.4)',
                      marginBottom: 16,
                      transition: 'all 0.3s ease',
                      opacity: isSubmitting ? 0.7 : 1
                    }}
                  >
                    {isSubmitting ? 'SENDING API REQUEST...' : 'SEND RESET LINK 📧'}
                  </button>

                  <div style={{ textAlign: 'center' }}>
                    <button
                      type="button"
                      onClick={returnToSignIn}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#8e8e9c',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6
                      }}
                    >
                      <ArrowLeft size={14} /> Back to Sign In
                    </button>
                  </div>
                </form>
              ) : (
                /* SUCCESS SCREEN: "Email එක check කරන්න" */
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: '50%',
                      background: 'rgba(0,230,118,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px auto',
                      border: '1px solid rgba(0,230,118,0.3)'
                    }}
                  >
                    <CheckCircle2 size={28} color="#00e676" />
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '1.3rem', color: '#fff', marginBottom: 8 }}>
                    Check Your Email! 📧
                  </h3>

                  <p style={{ fontSize: '0.82rem', color: '#8e8e9c', lineHeight: 1.6, marginBottom: 20 }}>
                    A password reset link has been sent to <strong style={{ color: '#ffbf00' }}>{forgotEmail}</strong>. Please check your inbox.
                  </p>

                  {/* Demo Shortcut Button to simulate clicking email reset link */}
                  <div style={{ background: 'rgba(255,191,0,0.08)', border: '1px dashed rgba(255,191,0,0.3)', padding: 12, borderRadius: 10, marginBottom: 16 }}>
                    <div style={{ fontSize: '0.72rem', color: '#ffbf00', fontFamily: 'var(--font-header)', marginBottom: 6 }}>
                      🔗 EMAIL RESET LINK DEMO SIMULATION:
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate(`/reset-password?token=${generatedToken}`)}
                      style={{
                        background: 'rgba(255,191,0,0.15)',
                        border: '1px solid rgba(255,191,0,0.4)',
                        color: '#fff',
                        fontSize: '0.78rem',
                        fontFamily: 'var(--font-header)',
                        fontWeight: 700,
                        padding: '8px 14px',
                        borderRadius: 8,
                        cursor: 'pointer',
                        width: '100%'
                      }}
                    >
                      🚀 Open Reset Password Page (Page 2)
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={returnToSignIn}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#8e8e9c',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6
                    }}
                  >
                    <ArrowLeft size={14} /> Back to Sign In
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* STANDARD SIGN IN FORM */
            <form onSubmit={handleLoginSubmit}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: 'rgba(255,191,0,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255,191,0,0.3)'
                  }}
                >
                  <Rocket size={20} color="#ffbf00" />
                </div>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-header)', fontSize: '1.3rem', color: '#fff' }}>
                    Sign In
                  </h2>
                  <span style={{ fontSize: '0.72rem', color: '#8e8e9c' }}>
                    Welcome back to CollabBoard
                  </span>
                </div>
              </div>

              <p style={{ fontSize: '0.8rem', color: '#8e8e9c', marginBottom: 22 }}>
                Enter your account credentials to log in.
              </p>

              {/* Email Input */}
              <div className="auth-input-group">
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="Email Address"
                />
                <Mail className="auth-input-icon" size={16} />
              </div>

              {/* Password Input with Eye Toggle */}
              <div className="auth-input-group">
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Password"
                />
                <Lock className="auth-input-icon" size={16} />
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  title={showLoginPassword ? 'Hide Password' : 'Show Password'}
                >
                  {showLoginPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Remember Me & Forgot Password Row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.75rem',
                  color: '#8e8e9c',
                  marginBottom: 24
                }}
              >
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                  onClick={() => setRememberMe(!rememberMe)}
                >
                  {rememberMe ? <CheckSquare size={14} color="#ffbf00" /> : <Square size={14} />}
                  Remember me
                </label>

                <button
                  type="button"
                  onClick={openForgotView}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ffbf00',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-body)'
                  }}
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #ffbf00, #ff9f00)',
                  border: 'none',
                  color: '#050508',
                  fontWeight: 800,
                  fontFamily: 'var(--font-header)',
                  padding: '12px',
                  borderRadius: 10,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  boxShadow: '0 0 20px rgba(255,191,0,0.4)',
                  transition: 'all 0.3s ease'
                }}
              >
                SIGN IN 🚀
              </button>
            </form>
          )}
        </div>

        {/* ==================== 2. SIGN UP (REGISTER) FORM ==================== */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleRegisterSubmit}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: 'rgba(255,191,0,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(255,191,0,0.3)'
                }}
              >
                <Sparkles size={20} color="#ffbf00" />
              </div>
              <div>
                <h2 style={{ fontFamily: 'var(--font-header)', fontSize: '1.3rem', color: '#fff' }}>
                  Create Account
                </h2>
                <span style={{ fontSize: '0.72rem', color: '#8e8e9c' }}>
                  Sign up for CollabBoard
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.8rem', color: '#8e8e9c', marginBottom: 18 }}>
              Fill in your information to register.
            </p>

            {/* Name Input */}
            <div className="auth-input-group">
              <input
                type="text"
                required
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder="Full Name"
              />
              <User className="auth-input-icon" size={16} />
            </div>

            {/* Email Input */}
            <div className="auth-input-group">
              <input
                type="email"
                required
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="Email Address"
              />
              <Mail className="auth-input-icon" size={16} />
            </div>

            {/* Password Input */}
            <div className="auth-input-group">
              <input
                type={showRegPassword ? 'text' : 'password'}
                required
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="Password"
              />
              <Lock className="auth-input-icon" size={16} />
              <button
                type="button"
                className="auth-password-toggle"
                onClick={() => setShowRegPassword(!showRegPassword)}
              >
                {showRegPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Confirm Password Input */}
            <div className="auth-input-group">
              <input
                type={showRegConfirmPassword ? 'text' : 'password'}
                required
                value={regConfirmPassword}
                onChange={(e) => setRegConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
              />
              <Lock className="auth-input-icon" size={16} />
              <button
                type="button"
                className="auth-password-toggle"
                onClick={() => setShowRegConfirmPassword(!showRegConfirmPassword)}
              >
                {showRegConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {passError && (
              <div style={{ color: '#ff4560', fontSize: '0.75rem', marginBottom: 10 }}>
                {passError}
              </div>
            )}

            <button
              type="submit"
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #ffbf00, #ff9f00)',
                border: 'none',
                color: '#050508',
                fontWeight: 800,
                fontFamily: 'var(--font-header)',
                padding: '12px',
                borderRadius: 10,
                fontSize: '0.85rem',
                cursor: 'pointer',
                boxShadow: '0 0 20px rgba(255,191,0,0.4)',
                marginTop: 6,
                transition: 'all 0.3s ease'
              }}
            >
              CREATE ACCOUNT ✨
            </button>
          </form>
        </div>

        {/* ==================== 3. SLIDING OVERLAY CONTAINER ==================== */}
        <div className="overlay-container">
          <div className="overlay">
            
            {/* OVERLAY LEFT: Visible when Sign Up (Register) Panel is Active */}
            <div className="overlay-panel overlay-left">
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 0 20px rgba(255,255,255,0.3)'
                }}
              >
                <Rocket size={28} color="#ffffff" />
              </div>
              <h1 style={{ fontFamily: 'var(--font-header)', fontSize: '1.6rem', fontWeight: 800, marginBottom: 10 }}>
                Welcome Back!
              </h1>
              <p style={{ fontSize: '0.85rem', lineHeight: '1.5', opacity: 0.9, marginBottom: 10 }}>
                Already have an account? Sign in with your email and password to access your dashboard.
              </p>
              <button
                type="button"
                className="ghost-btn"
                onClick={returnToSignIn}
              >
                🔑 SIGN IN
              </button>
            </div>

            {/* OVERLAY RIGHT: Visible when Sign In (Login) Panel is Active */}
            <div className="overlay-panel overlay-right">
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 0 20px rgba(255,255,255,0.3)'
                }}
              >
                <Compass size={28} color="#ffffff" />
              </div>
              <h1 style={{ fontFamily: 'var(--font-header)', fontSize: '1.6rem', fontWeight: 800, marginBottom: 10 }}>
                Hello, Friend!
              </h1>
              <p style={{ fontSize: '0.85rem', lineHeight: '1.5', opacity: 0.9, marginBottom: 10 }}>
                Enter your personal details and start your journey with CollabBoard team workspace.
              </p>
              <button
                type="button"
                className="ghost-btn"
                onClick={goToSignUp}
              >
                ✨ SIGN UP
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
