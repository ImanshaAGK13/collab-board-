import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, Shield, Lock, Mail, User, Key, Globe, PlusCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { StarfieldBg } from '../components/layout/StarfieldBg';

export function AuthPage() {
  const [isRegisterActive, setIsRegisterActive] = useState(false);
  const { login, register, quickDemoLogin } = useAuth();
  const navigate = useNavigate();

  // Login Form state
  const [loginEmail, setLoginEmail] = useState('nova@collabboard.space');
  const [loginRole, setLoginRole] = useState('Captain');

  // Register Form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regRole, setRegRole] = useState('Crew');
  const [regOrbitAction, setRegOrbitAction] = useState('default');
  const [regOrbitCode, setRegOrbitCode] = useState('');
  const [regOrbitName, setRegOrbitName] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login(loginEmail, loginRole);
    navigate('/dashboard');
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    register(regName, regEmail, regRole, {
      orbitAction: regOrbitAction,
      orbitCode: regOrbitCode,
      orbitName: regOrbitName
    });
    navigate('/dashboard');
  };

  const handleQuickDemo = (name, email, role) => {
    quickDemoLogin(name, email, role);
    navigate('/dashboard');
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
        className="auth-sliding-container"
        style={{
          width: '100%',
          maxWidth: 900,
          minHeight: 520,
          background: 'rgba(12, 12, 16, 0.85)',
          border: '1px solid rgba(255, 191, 0, 0.25)',
          borderRadius: 20,
          boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
          backdropFilter: 'blur(25px)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* LEFT PANEL: LOGIN FORM */}
        <div style={{ padding: '40px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <Rocket size={24} color="var(--liquid-gold)" />
              <h2 style={{ fontFamily: 'var(--font-header)', fontSize: '1.3rem', color: '#fff' }}>
                Mission Control Login
              </h2>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Enter your astronaut ID and decryption passcode.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit}>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
                Astronaut Email / ID
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="e.g. nova@collabboard.space"
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 8,
                  padding: '9px 12px',
                  color: '#fff',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
                Operational Rank
              </label>
              <select
                value={loginRole}
                onChange={(e) => setLoginRole(e.target.value)}
                style={{
                  width: '100%',
                  background: '#121216',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 8,
                  padding: '9px 12px',
                  color: '#fff',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              >
                <option value="Captain">Team Leader (Captain) 👑</option>
                <option value="Co-Captain">Co-Captain / Flight Lead 🚀</option>
                <option value="Crew">Team Member (Crew) 👨‍🚀</option>
              </select>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
                Decryption Passcode
              </label>
              <input
                type="password"
                defaultValue="passcode123"
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 8,
                  padding: '9px 12px',
                  color: '#fff',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #ffbf00, #ff9f00)',
                border: 'none',
                color: '#050508',
                fontWeight: 700,
                fontFamily: 'var(--font-header)',
                padding: '11px',
                borderRadius: 8,
                fontSize: '0.85rem',
                cursor: 'pointer',
                boxShadow: '0 0 15px rgba(255,191,0,0.4)',
                marginBottom: 20
              }}
            >
              🚀 Launch Mission Control
            </button>
          </form>

          {/* Quick Demo Astronaut Shortcuts */}
          <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 14 }}>
            <div style={{ fontSize: '0.68rem', color: 'var(--liquid-gold)', fontFamily: 'var(--font-header)', marginBottom: 8 }}>
              QUICK DEMO ASTRONAUT LOGIN
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
              <button
                type="button"
                onClick={() => handleQuickDemo('Nova Mitchell', 'nova@collabboard.space', 'Captain')}
                style={{
                  background: 'rgba(255,191,0,0.12)',
                  border: '1px solid rgba(255,191,0,0.3)',
                  color: '#fff',
                  borderRadius: 6,
                  padding: '5px 10px',
                  fontSize: '0.75rem',
                  cursor: 'pointer'
                }}
              >
                Nova 👑
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('Orion Vance', 'orion@collabboard.space', 'Co-Captain')}
                style={{
                  background: 'rgba(255,159,0,0.12)',
                  border: '1px solid rgba(255,159,0,0.3)',
                  color: '#fff',
                  borderRadius: 6,
                  padding: '5px 10px',
                  fontSize: '0.75rem',
                  cursor: 'pointer'
                }}
              >
                Orion 🚀
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('Lyra Mercer', 'lyra@collabboard.space', 'Crew')}
                style={{
                  background: 'rgba(0,210,255,0.12)',
                  border: '1px solid rgba(0,210,255,0.3)',
                  color: '#fff',
                  borderRadius: 6,
                  padding: '5px 10px',
                  fontSize: '0.75rem',
                  cursor: 'pointer'
                }}
              >
                Lyra 👨‍🚀
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: REGISTER FORM */}
        <div style={{ padding: '40px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'rgba(0,0,0,0.3)' }}>
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ fontFamily: 'var(--font-header)', fontSize: '1.3rem', color: '#fff', marginBottom: 4 }}>
              Register Station Link
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Initialize a new crew account for space missions.
            </p>
          </div>

          <form onSubmit={handleRegisterSubmit}>
            <div style={{ marginBottom: 10 }}>
              <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: 2 }}>
                Full Name / Callsign
              </label>
              <input
                type="text"
                required
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder="e.g. Cassian Drake"
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 6,
                  padding: '7px 10px',
                  color: '#fff',
                  fontSize: '0.8rem',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ marginBottom: 10 }}>
              <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: 2 }}>
                Astronaut Email / ID
              </label>
              <input
                type="email"
                required
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="e.g. cassian@collabboard.space"
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 6,
                  padding: '7px 10px',
                  color: '#fff',
                  fontSize: '0.8rem',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ marginBottom: 10 }}>
              <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: 2 }}>
                Operational Rank
              </label>
              <select
                value={regRole}
                onChange={(e) => setRegRole(e.target.value)}
                style={{
                  width: '100%',
                  background: '#121216',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 6,
                  padding: '7px 10px',
                  color: '#fff',
                  fontSize: '0.8rem',
                  outline: 'none'
                }}
              >
                <option value="Captain">Team Leader (Captain) 👑</option>
                <option value="Co-Captain">Co-Captain / Flight Lead 🚀</option>
                <option value="Crew">Team Member (Crew) 👨‍🚀</option>
              </select>
            </div>

            {/* Orbit Code Workspace Setup Box */}
            <div style={{ background: 'rgba(255,191,0,0.06)', border: '1px solid rgba(255,191,0,0.25)', padding: 10, borderRadius: 8, marginBottom: 14 }}>
              <label style={{ fontSize: '0.7rem', color: 'var(--liquid-gold)', fontFamily: 'var(--font-header)' }}>
                Workspace Setup
              </label>
              <select
                value={regOrbitAction}
                onChange={(e) => setRegOrbitAction(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(0,0,0,0.4)',
                  border: '1px solid rgba(255,191,0,0.3)',
                  borderRadius: 6,
                  color: '#fff',
                  padding: '6px',
                  fontSize: '0.78rem',
                  outline: 'none',
                  marginTop: 4
                }}
              >
                <option value="default">🌐 Alpha Station (Default)</option>
                <option value="join">🛰️ Join via Orbit Code</option>
                <option value="create">🚀 Create New Workspace</option>
              </select>

              {regOrbitAction === 'join' && (
                <input
                  type="text"
                  value={regOrbitCode}
                  onChange={(e) => setRegOrbitCode(e.target.value)}
                  placeholder="Enter Orbit Code (ORBIT-9X7K2)"
                  style={{
                    width: '100%',
                    marginTop: 6,
                    padding: 6,
                    fontSize: '0.78rem',
                    background: 'rgba(0,0,0,0.5)',
                    border: '1px solid var(--liquid-gold)',
                    color: 'var(--liquid-gold)',
                    borderRadius: 6
                  }}
                />
              )}

              {regOrbitAction === 'create' && (
                <input
                  type="text"
                  value={regOrbitName}
                  onChange={(e) => setRegOrbitName(e.target.value)}
                  placeholder="Enter Mission Name (e.g. Lunar Base)"
                  style={{
                    width: '100%',
                    marginTop: 6,
                    padding: 6,
                    fontSize: '0.78rem',
                    background: 'rgba(0,0,0,0.5)',
                    border: '1px solid var(--cyan)',
                    color: '#fff',
                    borderRadius: 6
                  }}
                />
              )}
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #00d2ff, #00e5ff)',
                border: 'none',
                color: '#050508',
                fontWeight: 700,
                fontFamily: 'var(--font-header)',
                padding: '9px',
                borderRadius: 6,
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}
            >
              ✨ Initialize Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
