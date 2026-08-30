import { Crew } from '../models/Crew.js';

let inMemoryCrew = [
  { id: 'nova', name: 'Commander Nova', email: 'nova@collabboard.space', role: 'Captain', title: 'Mission Commander', color: '#ffbf00', status: 'online', initials: 'CN' },
  { id: 'orion', name: 'Dr. Orion Vance', email: 'orion@collabboard.space', role: 'Co-Captain', title: 'Flight Systems Lead', color: '#ff9f00', status: 'online', initials: 'OV' },
  { id: 'lyra', name: 'Engineer Lyra Sterling', email: 'lyra@collabboard.space', role: 'Crew', title: 'Payload Specialist', color: '#00d2ff', status: 'online', initials: 'LS' }
];

export async function getCrew(req, res) {
  try {
    const crew = await Crew.find();
    if (crew && crew.length > 0) return res.status(200).json({ success: true, crew });
  } catch {}
  return res.status(200).json({ success: true, crew: inMemoryCrew });
}

export async function addCrew(req, res) {
  try {
    const { name, email, role, title, color } = req.body;
    const initials = name ? name.split(' ').map((n) => n[0]).join('').substring(0, 2) : 'CM';
    const newMember = {
      crewId: name.toLowerCase().replace(/[^a-z0-9]/g, '') || `crew_${Date.now()}`,
      name,
      email,
      role: role || 'Crew',
      title: title || 'Payload Specialist',
      color: color || '#00d2ff',
      status: 'online',
      initials
    };

    try {
      const created = await Crew.create(newMember);
      return res.status(201).json({ success: true, member: created });
    } catch {
      inMemoryCrew.push({ id: newMember.crewId, ...newMember });
      return res.status(201).json({ success: true, member: newMember });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}
