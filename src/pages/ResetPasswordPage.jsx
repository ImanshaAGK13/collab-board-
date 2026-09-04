import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  KeyRound,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { StarfieldBg } from '../components/layout/StarfieldBg';

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { resetPasswordWithToken } = useAuth();
  const navigate = useNavigate();

  // Password strength checks
  const hasMinLength = newPassword.length >= 8;
  const hasLetter = /[A-Za-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const isMatch = newPassword.length > 0 && newPassword === confirmPassword;

  const calculateStrength = () => {
    let score = 0;
    if (hasMinLength) score++;
    if (hasLetter) score++;
    if (hasNumber) score++;
    if (/[^A-Za-z0-9]/.test(newPassword)) score++;
    return score;
  };

  const strengthScore = calculateStrength();
  const strengthLabel =
    strengthScore === 0 ? '' : strengthScore <= 2 ? 'Weak' : strengthScore === 3 ? 'Moderate' : 'Strong 🔒';
  const strengthColor =
    strengthScore <= 2 ? '#ff4560' : strengthScore === 3 ? '#ffbf00' : '#00e676';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!token) {
      setErrorMessage('Invalid or expired password reset link token.');
      return;
    }

    if (!hasMinLength || !hasLetter || !hasNumber) {
      setErrorMessage('Password must be at least 8 characters long and contain both letters and numbers.');
      return;
    }

    if (!isMatch) {
      setErrorMessage('New password and confirm password do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      await resetPasswordWithToken(token, newPassword);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2500);
    } catch (err) {
      setErrorMessage(err.message || 'Failed to update password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        position: 'relative'
      }}
    >
      <StarfieldBg />

      <div
        style={{
          width: 460,
          maxWidth: '100%',
          background: 'rgba(12, 12, 18, 0.88)',
          border: '1px solid rgba(255, 191, 0, 0.3)',
          borderRadius: 24,
          padding: '36px 32px',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.9), 0 0 50px rgba(255, 191, 0, 0.15)',
          backdropFilter: 'blur(25px)',
          position: 'relative'
        }}
      >
        {!token ? (
          /* Missing or Invalid Token View */
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: '50%',
                background: 'rgba(255, 69, 96, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                border: '1px solid rgba(255, 69, 96, 0.3)'
              }}
            >
              <AlertCircle size={28} color="#ff4560" />
            </div>

            <h2 style={{ fontFamily: 'var(--font-header)', fontSize: '1.3rem', color: '#fff', marginBottom: 8 }}>
              Invalid Reset Link
            </h2>

            <p style={{ fontSize: '0.82rem', color: '#8e8e9c', lineHeight: 1.5, marginBottom: 24 }}>
              The password reset token is missing or expired. Please request a new password reset link.
            </p>

            <Link
              to="/login"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                width: '100%',
                background: 'linear-gradient(135deg, #ffbf00, #ff9f00)',
                border: 'none',
                color: '#050508',
                fontWeight: 800,
                fontFamily: 'var(--font-header)',
                padding: '12px',
                borderRadius: 10,
                fontSize: '0.85rem',
                textDecoration: 'none',
                boxShadow: '0 0 20px rgba(255,191,0,0.3)'
              }}
            >
              <ArrowLeft size={16} /> Back to Sign In
            </Link>
          </div>
        ) : isSuccess ? (
          /* Password Reset Success Screen */
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: 'rgba(0, 230, 118, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                border: '1px solid rgba(0, 230, 118, 0.3)'
              }}
            >
              <CheckCircle2 size={30} color="#00e676" />
            </div>

            <h2 style={{ fontFamily: 'var(--font-header)', fontSize: '1.4rem', color: '#fff', marginBottom: 8 }}>
              Password Updated! 🎉
            </h2>

            <p style={{ fontSize: '0.85rem', color: '#8e8e9c', lineHeight: 1.5, marginBottom: 24 }}>
              Your account password has been updated via backend API. Redirecting you to the login page...
            </p>

            <Link
              to="/login"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                width: '100%',
                background: 'linear-gradient(135deg, #ffbf00, #ff9f00)',
                border: 'none',
                color: '#050508',
                fontWeight: 800,
                fontFamily: 'var(--font-header)',
                padding: '12px',
                borderRadius: 10,
                fontSize: '0.85rem',
                textDecoration: 'none',
                boxShadow: '0 0 20px rgba(255,191,0,0.3)'
              }}
            >
              <ArrowLeft size={16} /> Go to Login Page
            </Link>
          </div>
        ) : (
          /* Reset Password Form (Page 2) */
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: 'rgba(255,191,0,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(255,191,0,0.3)'
                }}
              >
                <KeyRound size={22} color="#ffbf00" />
              </div>
              <div>
                <h2 style={{ fontFamily: 'var(--font-header)', fontSize: '1.3rem', color: '#fff' }}>
                  Reset Password
                </h2>
                <span style={{ fontSize: '0.72rem', color: '#8e8e9c' }}>
                  Set your new account passcode
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.8rem', color: '#8e8e9c', marginBottom: 20 }}>
              Token verified from URL search query. Enter a new strong password below.
            </p>

            {/* New Password Input */}
            <div className="auth-input-group" style={{ position: 'relative', marginBottom: 14 }}>
              <input
                type={showNewPassword ? 'text' : 'password'}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 10,
                  padding: '12px 40px 12px 42px',
                  color: '#fff',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
              <Lock
                size={16}
                style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#8e8e9c' }}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                style={{
                  position: 'absolute',
                  right: 14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#8e8e9c',
                  cursor: 'pointer'
                }}
              >
                {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {newPassword && (
              <div style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#8e8e9c', marginBottom: 4 }}>
                  <span>Password Strength</span>
                  <span style={{ color: strengthColor, fontWeight: 700 }}>{strengthLabel}</span>
                </div>
                <div style={{ width: '100%', height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${(strengthScore / 4) * 100}%`,
                      height: '100%',
                      background: strengthColor,
                      transition: 'all 0.3s ease'
                    }}
                  />
                </div>
              </div>
            )}

            {/* Confirm Password Input */}
            <div className="auth-input-group" style={{ position: 'relative', marginBottom: 16 }}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm New Password"
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 10,
                  padding: '12px 40px 12px 42px',
                  color: '#fff',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
              <Lock
                size={16}
                style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#8e8e9c' }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: 'absolute',
                  right: 14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#8e8e9c',
                  cursor: 'pointer'
                }}
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Password Validation Checklist */}
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 10, marginBottom: 18 }}>
              <div style={{ fontSize: '0.72rem', color: '#8e8e9c', marginBottom: 6 }}>Password Requirements:</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, fontSize: '0.72rem' }}>
                <span style={{ color: hasMinLength ? '#00e676' : '#8e8e9c' }}>
                  {hasMinLength ? '✓' : '•'} At least 8 chars
                </span>
                <span style={{ color: hasLetter ? '#00e676' : '#8e8e9c' }}>
                  {hasLetter ? '✓' : '•'} Contains letters
                </span>
                <span style={{ color: hasNumber ? '#00e676' : '#8e8e9c' }}>
                  {hasNumber ? '✓' : '•'} Contains numbers
                </span>
                <span style={{ color: isMatch ? '#00e676' : '#8e8e9c' }}>
                  {isMatch ? '✓' : '•'} Passwords match
                </span>
              </div>
            </div>

            {errorMessage && (
              <div style={{ color: '#ff4560', fontSize: '0.75rem', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                <AlertCircle size={14} /> {errorMessage}
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
              {isSubmitting ? 'UPDATING PASSWORD VIA API...' : 'UPDATE PASSWORD 🔑'}
            </button>

            <div style={{ textAlign: 'center' }}>
              <Link
                to="/login"
                style={{
                  color: '#8e8e9c',
                  fontSize: '0.8rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                <ArrowLeft size={14} /> Cancel & Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
