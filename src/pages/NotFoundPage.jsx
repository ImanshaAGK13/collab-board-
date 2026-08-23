import React from 'react';
import { Link } from 'react-router-dom';
import { AlertOctagon, Rocket } from 'lucide-react';
import { StarfieldBg } from '../components/layout/StarfieldBg';

export function NotFoundPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 20,
        position: 'relative'
      }}
    >
      <StarfieldBg />

      <div
        style={{
          background: 'rgba(15,15,20,0.85)',
          border: '1px solid rgba(255,69,96,0.3)',
          borderRadius: 20,
          padding: '40px 50px',
          maxWidth: 500,
          backdropFilter: 'blur(20px)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
        }}
      >
        <AlertOctagon size={64} color="#ff4560" style={{ marginBottom: 16 }} />
        <h1 style={{ fontFamily: 'var(--font-header)', fontSize: '3rem', color: '#ff4560', marginBottom: 8 }}>
          404
        </h1>
        <h2 style={{ fontFamily: 'var(--font-header)', fontSize: '1.2rem', color: '#fff', marginBottom: 12 }}>
          ORBITAL SIGNAL LOST IN DEEP SPACE
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 24, lineHeight: 1.5 }}>
          The requested mission sector coordinate does not exist or has been decompressed.
        </p>

        <Link
          to="/dashboard"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'linear-gradient(135deg, #ffbf00, #ff9f00)',
            color: '#050508',
            fontWeight: 700,
            fontFamily: 'var(--font-header)',
            padding: '10px 20px',
            borderRadius: 8,
            textDecoration: 'none',
            fontSize: '0.85rem'
          }}
        >
          <Rocket size={16} /> Return to Mission Control
        </Link>
      </div>
    </div>
  );
}
