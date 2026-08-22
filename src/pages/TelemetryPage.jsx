import React from 'react';
import { Activity, ShieldCheck, Cpu, Database, Signal, Zap } from 'lucide-react';
import { useWorkspace } from '../context/WorkspaceContext';

export function TelemetryPage() {
  const { tasks, crewMembers } = useWorkspace();

  const total = tasks.length || 1;
  const criticalCount = tasks.filter((t) => t.priority === 'critical').length;
  const highCount = tasks.filter((t) => t.priority === 'high').length;
  const mediumCount = tasks.filter((t) => t.priority === 'medium').length;
  const lowCount = tasks.filter((t) => t.priority === 'low').length;

  const doneCount = tasks.filter((t) => t.status === 'done').length;
  const progressPercent = Math.round((doneCount / total) * 100);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-header)', fontSize: '1.4rem', color: '#fff', marginBottom: 4 }}>
          📡 Telemetry & Station Analytics
        </h1>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Real-time metrics, system health, and payload directives breakdown.
        </p>
      </div>

      {/* Top Health Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ background: 'rgba(15,15,20,0.7)', border: '1px solid rgba(255,191,0,0.2)', padding: 18, borderRadius: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--liquid-gold)', marginBottom: 8 }}>
            <Cpu size={20} />
            <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-header)' }}>Core Processors</span>
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>99.98%</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Nominal Frequency</div>
        </div>

        <div style={{ background: 'rgba(15,15,20,0.7)', border: '1px solid rgba(0,210,255,0.2)', padding: 18, borderRadius: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#00d2ff', marginBottom: 8 }}>
            <Signal size={20} />
            <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-header)' }}>Satellite Bandwidth</span>
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>14.2 ms</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Ultra Low Latency</div>
        </div>

        <div style={{ background: 'rgba(15,15,20,0.7)', border: '1px solid rgba(0,230,118,0.2)', padding: 18, borderRadius: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#00e676', marginBottom: 8 }}>
            <ShieldCheck size={20} />
            <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-header)' }}>Shield Deflection</span>
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>100%</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Maximum Defense Matrix</div>
        </div>
      </div>

      {/* Main Charts / Breakdown Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Priority Breakdown */}
        <div style={{ background: 'rgba(15,15,20,0.75)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 20 }}>
          <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '0.95rem', color: '#fff', marginBottom: 16 }}>
            Priority Level Telemetry Distribution
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#fff', marginBottom: 4 }}>
                <span>🚨 Critical Priority ({criticalCount})</span>
                <span>{Math.round((criticalCount / total) * 100)}%</span>
              </div>
              <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3 }}>
                <div style={{ height: '100%', width: `${(criticalCount / total) * 100}%`, background: '#ff4560', borderRadius: 3 }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#fff', marginBottom: 4 }}>
                <span>⚠️ High Priority ({highCount})</span>
                <span>{Math.round((highCount / total) * 100)}%</span>
              </div>
              <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3 }}>
                <div style={{ height: '100%', width: `${(highCount / total) * 100}%`, background: '#ff9f00', borderRadius: 3 }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#fff', marginBottom: 4 }}>
                <span>⚡ Medium Priority ({mediumCount})</span>
                <span>{Math.round((mediumCount / total) * 100)}%</span>
              </div>
              <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3 }}>
                <div style={{ height: '100%', width: `${(mediumCount / total) * 100}%`, background: '#ffbf00', borderRadius: 3 }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#fff', marginBottom: 4 }}>
                <span>🌱 Low Priority ({lowCount})</span>
                <span>{Math.round((lowCount / total) * 100)}%</span>
              </div>
              <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3 }}>
                <div style={{ height: '100%', width: `${(lowCount / total) * 100}%`, background: '#00d2ff', borderRadius: 3 }} />
              </div>
            </div>
          </div>
        </div>

        {/* System Activity Log Stream */}
        <div style={{ background: 'rgba(15,15,20,0.75)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 20 }}>
          <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '0.95rem', color: '#fff', marginBottom: 16 }}>
            Live Diagnostic Log Stream
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.78rem', fontFamily: 'monospace' }}>
            <div style={{ color: '#00e676', background: 'rgba(0,230,118,0.08)', padding: '8px 10px', borderRadius: 6 }}>
              [SYNC OK] Orbit Channel live sync broadcast active.
            </div>
            <div style={{ color: '#00d2ff', background: 'rgba(0,210,255,0.08)', padding: '8px 10px', borderRadius: 6 }}>
              [TELEMETRY] Sensor array calibrated to 0.001 arcsec.
            </div>
            <div style={{ color: 'var(--liquid-gold)', background: 'rgba(255,191,0,0.08)', padding: '8px 10px', borderRadius: 6 }}>
              [DATA] LocalStorage database seeded with 4 crew officers.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
