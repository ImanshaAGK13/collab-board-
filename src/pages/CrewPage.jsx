import React, { useState } from 'react';
import { Users, UserPlus, Shield, Mail, Radio, X } from 'lucide-react';
import { useWorkspace } from '../context/WorkspaceContext';

export function CrewPage() {
  const { crewMembers, addCrewMember } = useWorkspace();
  const [filterRole, setFilterRole] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Crew',
    title: 'Payload Specialist',
    color: '#00d2ff'
  });

  const handleAddMember = (e) => {
    e.preventDefault();
    addCrewMember(formData);
    setFormData({ name: '', email: '', role: 'Crew', title: 'Payload Specialist', color: '#00d2ff' });
    setIsModalOpen(false);
  };

  const filteredMembers = crewMembers.filter((m) => filterRole === 'all' || m.role === filterRole);

  return (
    <div>
      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-header)', fontSize: '1.4rem', color: '#fff', marginBottom: 4 }}>
            👨‍🚀 Crew Roster & Operational Ranks
          </h1>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Manage station personnel, rank privileges, and orbital flight roles.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          {/* Role filter */}
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            style={{
              background: 'rgba(0,0,0,0.4)',
              border: '1px solid rgba(255,191,0,0.25)',
              borderRadius: 8,
              color: '#fff',
              padding: '8px 12px',
              fontSize: '0.8rem',
              outline: 'none'
            }}
          >
            <option value="all">All Personnel Ranks</option>
            <option value="Captain">Captains 👑</option>
            <option value="Co-Captain">Co-Captains 🚀</option>
            <option value="Crew">Crew Members 👨‍🚀</option>
          </select>

          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              background: 'linear-gradient(135deg, #ffbf00, #ff9f00)',
              border: 'none',
              color: '#050508',
              fontWeight: 700,
              fontFamily: 'var(--font-header)',
              padding: '8px 16px',
              borderRadius: 8,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 0 15px rgba(255, 191, 0, 0.4)'
            }}
          >
            <UserPlus size={16} /> Commission Astronaut
          </button>
        </div>
      </div>

      {/* Roster Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            style={{
              background: 'rgba(15, 15, 20, 0.75)',
              border: '1px solid rgba(255, 191, 0, 0.15)',
              borderRadius: 14,
              padding: 20,
              backdropFilter: 'blur(15px)',
              position: 'relative',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}
          >
            {/* Status dot */}
            <div
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: '0.7rem',
                color: (member.status || 'online') === 'online' ? '#00e676' : 'var(--liquid-gold)'
              }}
            >
              <Radio size={12} />
              <span>{(member.status || 'online').toUpperCase()}</span>
            </div>

            {/* Avatar & Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  background: member.color || '#ffbf00',
                  color: '#000',
                  fontWeight: 800,
                  fontSize: '1.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 0 15px ${member.color || '#ffbf00'}55`
                }}
              >
                {member.initials || member.name.split(' ').map((n) => n[0]).join('').substring(0, 2)}
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '0.98rem', color: '#fff' }}>
                  {member.name}
                </h3>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{member.title}</div>
              </div>
            </div>

            {/* Details */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.78rem', color: '#ccc' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Shield size={14} color="var(--liquid-gold)" />
                <span>Rank: <strong>{member.role}</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Mail size={14} color="var(--text-muted)" />
                <span style={{ color: 'var(--text-muted)' }}>{member.email}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal to Commission New Member */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(5,5,8,0.85)',
            backdropFilter: 'blur(15px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 450,
              background: 'rgba(15, 15, 20, 0.95)',
              border: '1px solid rgba(255, 191, 0, 0.3)',
              borderRadius: 14,
              padding: 24,
              position: 'relative'
            }}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                background: 'none',
                border: 'none',
                color: '#aaa',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>

            <h2 style={{ fontFamily: 'var(--font-header)', fontSize: '1.1rem', color: '#fff', marginBottom: 16 }}>
              Commission New Astronaut
            </h2>

            <form onSubmit={handleAddMember}>
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
                  Full Name / Callsign
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Elena Vance"
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 6,
                    padding: '8px 10px',
                    color: '#fff',
                    outline: 'none',
                    fontSize: '0.82rem'
                  }}
                />
              </div>

              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
                  Astronaut Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="elena@collabboard.space"
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 6,
                    padding: '8px 10px',
                    color: '#fff',
                    outline: 'none',
                    fontSize: '0.82rem'
                  }}
                />
              </div>

              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
                  Operational Rank
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  style={{
                    width: '100%',
                    background: '#121216',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 6,
                    padding: '8px 10px',
                    color: '#fff',
                    outline: 'none',
                    fontSize: '0.82rem'
                  }}
                >
                  <option value="Captain">Captain 👑</option>
                  <option value="Co-Captain">Co-Captain 🚀</option>
                  <option value="Crew">Crew Member 👨‍🚀</option>
                </select>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
                  Officer Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Life Support Tech"
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 6,
                    padding: '8px 10px',
                    color: '#fff',
                    outline: 'none',
                    fontSize: '0.82rem'
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
                  padding: '10px',
                  borderRadius: 6,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Add Personnel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
