import { Document } from '../models/Document.js';

let inMemoryDocuments = [
  { id: 'DOC-1', title: 'Airlock Safety Protocol Manual v2.4', category: 'Safety & Ops', size: '2.4 MB', updatedAt: '2026-08-20' },
  { id: 'DOC-2', title: 'Orbital Telemetry & Signal Frequency Map', category: 'Technical', size: '5.1 MB', updatedAt: '2026-08-22' },
  { id: 'DOC-3', title: 'Station Evacuation & Contingency Blueprint', category: 'Emergency', size: '1.8 MB', updatedAt: '2026-08-18' }
];

export async function getDocuments(req, res) {
  try {
    const docs = await Document.find();
    if (docs && docs.length > 0) return res.status(200).json({ success: true, documents: docs });
  } catch {}
  return res.status(200).json({ success: true, documents: inMemoryDocuments });
}
