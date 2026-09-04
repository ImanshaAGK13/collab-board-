let inMemoryEvents = [
  { id: 'EV-1', title: 'Weekly Flight Systems Sync', date: '2026-08-28', time: '14:00 UTC', type: 'meeting' },
  { id: 'EV-2', title: 'EVA Spacewalk Maintenance Check', date: '2026-09-01', time: '09:30 UTC', type: 'spacewalk' },
  { id: 'EV-3', title: 'Resupply Capsule Docking Directive', date: '2026-09-05', time: '18:00 UTC', type: 'docking' }
];

export async function getEvents(req, res) {
  return res.status(200).json({ success: true, events: inMemoryEvents });
}

export async function addEvent(req, res) {
  try {
    const { title, date, time, type } = req.body;
    const newEv = {
      id: `EV-${Date.now()}`,
      title: title || 'New Scheduled Event',
      date: date || new Date().toISOString().split('T')[0],
      time: time || '14:00 UTC',
      type: type || 'meeting'
    };

    inMemoryEvents.push(newEv);
    return res.status(201).json({ success: true, event: newEv });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}
