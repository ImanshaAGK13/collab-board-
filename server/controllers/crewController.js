let inMemoryCrew = [
  { id: 'nova', name: 'Commander Nova', email: 'nova@collabboard.space', role: 'Captain', title: 'Mission Commander', color: '#ffbf00', status: 'online', initials: 'CN' },
  { id: 'orion', name: 'Dr. Orion Vance', email: 'orion@collabboard.space', role: 'Co-Captain', title: 'Flight Systems Lead', color: '#ff9f00', status: 'online', initials: 'OV' },
  { id: 'lyra', name: 'Engineer Lyra Sterling', email: 'lyra@collabboard.space', role: 'Crew', title: 'Payload Specialist', color: '#00d2ff', status: 'online', initials: 'LS' }
];

export async function getCrew(req, res) {
  return res.status(200).json({ success: true, crew: inMemoryCrew });
}

export async function addCrew(req, res) {
  try {
    const { name, email, role, title, color } = req.body;
    const initials = name ? name.split(' ').map((n) => n[0]).join('').substring(0, 2) : 'CM';
    const newMember = {
      id: name ? name.toLowerCase().replace(/[^a-z0-9]/g, '') : `crew_${Date.now()}`,
      name: name || 'Crew Member',
      email: email || 'crew@collabboard.space',
      role: role || 'Crew',
      title: title || 'Payload Specialist',
      color: color || '#00d2ff',
      status: 'online',
      initials
    };

    inMemoryCrew.push(newMember);
    return res.status(201).json({ success: true, member: newMember });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}
