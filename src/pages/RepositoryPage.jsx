import React, { useState } from 'react';
import { FolderGit2, FileText, Search, Download, HardDrive } from 'lucide-react';
import { useWorkspace } from '../context/WorkspaceContext';

export function RepositoryPage() {
  const { documents } = useWorkspace();
  const [search, setSearch] = useState('');

  const filtered = documents.filter(
    (d) =>
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-header)', fontSize: '1.4rem', color: '#fff', marginBottom: 4 }}>
            📂 Mission Document & Telemetry Repository
          </h1>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Access station operation logs, emergency protocols, and payload blueprints.
          </p>
        </div>

        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '6px 12px', width: 260 }}>
          <Search size={14} color="var(--text-muted)" style={{ marginRight: 8 }} />
          <input
            type="text"
            placeholder="Search documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ background: 'none', border: 'none', color: '#fff', outline: 'none', fontSize: '0.8rem', width: '100%' }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
        {filtered.map((doc) => (
          <div
            key={doc.id}
            style={{
              background: 'rgba(15,15,20,0.75)',
              border: '1px solid rgba(255,191,0,0.15)',
              borderRadius: 14,
              padding: 20,
              backdropFilter: 'blur(15px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,191,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={20} color="var(--liquid-gold)" />
                </div>
                <div>
                  <span style={{ fontSize: '0.68rem', color: 'var(--liquid-gold)', textTransform: 'uppercase' }}>{doc.category}</span>
                  <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '0.92rem', color: '#fff' }}>{doc.title}</h3>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <div>Author: {doc.author} ({doc.size})</div>
              <button
                onClick={() => alert(`Downloading payload document: ${doc.title}`)}
                style={{ background: 'none', border: 'none', color: 'var(--liquid-gold)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
              >
                <Download size={14} /> Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
