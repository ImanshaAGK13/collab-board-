import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const WorkspaceContext = createContext(null);

const INITIAL_TASKS = [
  {
    id: 'TASK-101',
    title: 'Docking System Calibration',
    description: 'Calibrate optical alignment sensors for automated airlock docking sequence.',
    status: 'in_progress',
    priority: 'high',
    assignee: 'nova',
    progress: 65,
    dueDate: '2026-08-30',
    timeEstimate: 6,
    tags: ['Hardware', 'Calibration'],
    comments: [
      { id: 'c1', author: 'Commander Nova', text: 'Sensors reset to default zero offset.', timestamp: new Date().toISOString() }
    ]
  },
  {
    id: 'TASK-102',
    title: 'Solar Panel Maintenance & Recalibration',
    description: 'Perform routine check on array servos and clean debris from outer panel grid.',
    status: 'todo',
    priority: 'medium',
    assignee: 'orion',
    progress: 20,
    dueDate: '2026-09-02',
    timeEstimate: 4,
    tags: ['Maintenance', 'Power'],
    comments: []
  },
  {
    id: 'TASK-103',
    title: 'Oxygen Scrubber Filter Replacement',
    description: 'Replace primary lithium hydroxide canisters in Module B environment loop.',
    status: 'done',
    priority: 'critical',
    assignee: 'lyra',
    progress: 100,
    dueDate: '2026-08-24',
    timeEstimate: 3,
    tags: ['Life Support', 'Critical'],
    comments: []
  },
  {
    id: 'TASK-104',
    title: 'Quantum Relay Firmware Patch 4.2',
    description: 'Deploy hotfix for interstellar data downlink dropouts during orbital eclipse.',
    status: 'review',
    priority: 'high',
    assignee: 'nova',
    progress: 90,
    dueDate: '2026-08-28',
    timeEstimate: 8,
    tags: ['Software', 'Network'],
    comments: []
  },
  {
    id: 'TASK-105',
    title: 'Sub-space Receiver Diagnostic',
    description: 'Initial frequency sweep of outer antenna ring for atmospheric telemetry noise.',
    status: 'backlog',
    priority: 'low',
    assignee: 'orion',
    progress: 0,
    dueDate: '2026-09-10',
    timeEstimate: 12,
    tags: ['Research'],
    comments: []
  }
];

const INITIAL_CREW = [
  { id: 'nova', name: 'Commander Nova', email: 'nova@collabboard.space', role: 'Captain', title: 'Mission Commander', color: '#ffbf00', status: 'online', initials: 'CN', avatar: 'avatar1' },
  { id: 'orion', name: 'Dr. Orion Vance', email: 'orion@collabboard.space', role: 'Co-Captain', title: 'Flight Systems Lead', color: '#ff9f00', status: 'online', initials: 'OV', avatar: 'avatar3' },
  { id: 'lyra', name: 'Engineer Lyra Sterling', email: 'lyra@collabboard.space', role: 'Crew', title: 'Payload Specialist', color: '#00d2ff', status: 'online', initials: 'LS', avatar: 'avatar5' }
];

const INITIAL_DOCUMENTS = [
  { id: 'DOC-1', title: 'Airlock Safety Protocol Manual v2.4', category: 'Safety & Ops', size: '2.4 MB', updatedAt: '2026-08-20' },
  { id: 'DOC-2', title: 'Orbital Telemetry & Signal Frequency Map', category: 'Technical', size: '5.1 MB', updatedAt: '2026-08-22' },
  { id: 'DOC-3', title: 'Station Evacuation & Contingency Blueprint', category: 'Emergency', size: '1.8 MB', updatedAt: '2026-08-18' }
];

const INITIAL_EVENTS = [
  { id: 'EV-1', title: 'Weekly Flight Systems Sync', date: '2026-08-28', time: '14:00 UTC', type: 'meeting' },
  { id: 'EV-2', title: 'EVA Spacewalk Maintenance Check', date: '2026-09-01', time: '09:30 UTC', type: 'spacewalk' },
  { id: 'EV-3', title: 'Resupply Capsule Docking Directive', date: '2026-09-05', time: '18:00 UTC', type: 'docking' }
];

const INITIAL_WORKSPACES = [
  { id: 'ORBIT-9X7K2', name: 'Alpha Orbital Station', code: 'AOS-1' },
  { id: 'LUNAR-3V4M', name: 'Artemis Lunar Base', code: 'ALB-2' }
];

export function WorkspaceProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('collabboard_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [archivedTasks, setArchivedTasks] = useState(() => {
    const saved = localStorage.getItem('collabboard_archived');
    return saved ? JSON.parse(saved) : [
      { id: 'TASK-098', title: 'Initial Station Pressurization Test', description: 'Pressurized airlock section A and verified seal integrity.', status: 'archived', priority: 'high', archivedAt: '2026-08-15' }
    ];
  });

  const [crewMembers, setCrewMembers] = useState(() => {
    const saved = localStorage.getItem('collabboard_crew');
    return saved ? JSON.parse(saved) : INITIAL_CREW;
  });

  const [documents] = useState(INITIAL_DOCUMENTS);

  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('collabboard_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [workspaces, setWorkspaces] = useState(INITIAL_WORKSPACES);
  const [activeWorkspace, setActiveWorkspace] = useState(INITIAL_WORKSPACES[0]);

  const { showToast } = useToast();

  useEffect(() => {
    localStorage.setItem('collabboard_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('collabboard_archived', JSON.stringify(archivedTasks));
  }, [archivedTasks]);

  useEffect(() => {
    localStorage.setItem('collabboard_crew', JSON.stringify(crewMembers));
  }, [crewMembers]);

  useEffect(() => {
    localStorage.setItem('collabboard_events', JSON.stringify(events));
  }, [events]);

  const addTask = (taskData) => {
    const newTask = {
      id: `TASK-${Math.floor(100 + Math.random() * 900)}`,
      title: taskData.title || 'Untitled Task',
      description: taskData.description || '',
      status: taskData.status || 'todo',
      priority: taskData.priority || 'medium',
      assignee: taskData.assignee || 'nova',
      progress: Number(taskData.progress) || 0,
      dueDate: taskData.dueDate || new Date().toISOString().split('T')[0],
      timeEstimate: Number(taskData.timeEstimate) || 4,
      tags: typeof taskData.tags === 'string' ? taskData.tags.split(',').map((t) => t.trim()).filter(Boolean) : taskData.tags || [],
      comments: []
    };
    setTasks((prev) => [newTask, ...prev]);
    showToast(`Task "${newTask.title}" launched successfully!`, 'success');
  };

  const updateTask = (taskId, updatedFields) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const tags = typeof updatedFields.tags === 'string'
            ? updatedFields.tags.split(',').map((item) => item.trim()).filter(Boolean)
            : updatedFields.tags || t.tags;
          return { ...t, ...updatedFields, tags };
        }
        return t;
      })
    );
    showToast(`Task ${taskId} updated.`, 'info');
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    showToast(`Task ${taskId} deleted.`, 'error');
  };

  const archiveTask = (taskId) => {
    const taskToArchive = tasks.find((t) => t.id === taskId);
    if (taskToArchive) {
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
      setArchivedTasks((prev) => [
        { ...taskToArchive, archivedAt: new Date().toISOString().split('T')[0] },
        ...prev
      ]);
      showToast(`Task ${taskId} archived.`, 'info');
    }
  };

  const moveTaskColumn = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  const addComment = (taskId, text, author = 'Astronaut') => {
    if (!text.trim()) return;
    const commentObj = {
      id: `c_${Date.now()}`,
      author,
      text,
      timestamp: new Date().toISOString()
    };
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          return { ...t, comments: [...(t.comments || []), commentObj] };
        }
        return t;
      })
    );
    showToast('Log comment appended.', 'success');
  };

  const addCrewMember = (memberData) => {
    const newMember = {
      id: memberData.name.toLowerCase().replace(/[^a-z0-9]/g, '') || `crew_${Date.now()}`,
      name: memberData.name,
      email: memberData.email,
      role: memberData.role || 'Crew',
      title: memberData.title || 'Payload Specialist',
      color: memberData.color || '#00d2ff',
      avatar: 'avatar2'
    };
    setCrewMembers((prev) => [...prev, newMember]);
    showToast(`Crew member ${newMember.name} added to roster!`, 'success');
  };

  const addEvent = (eventData) => {
    const newEv = {
      id: `EV-${Date.now()}`,
      title: eventData.title,
      date: eventData.date,
      time: eventData.time || '12:00 UTC',
      type: eventData.type || 'meeting'
    };
    setEvents((prev) => [...prev, newEv]);
    showToast(`Directive event "${newEv.title}" scheduled!`, 'success');
  };

  const switchWorkspace = (workspaceId) => {
    const found = workspaces.find((w) => w.id === workspaceId);
    if (found) {
      setActiveWorkspace(found);
      showToast(`Switched workspace to ${found.name}`, 'info');
    }
  };

  const createWorkspace = (name) => {
    const newWs = {
      id: `WS-${Date.now()}`,
      name,
      code: name.substring(0, 3).toUpperCase() + '-1'
    };
    setWorkspaces((prev) => [...prev, newWs]);
    setActiveWorkspace(newWs);
    showToast(`New Orbital Station "${name}" initialized!`, 'success');
  };

  return (
    <WorkspaceContext.Provider
      value={{
        tasks,
        archivedTasks,
        crewMembers,
        documents,
        events,
        workspaces,
        activeWorkspace,
        addTask,
        updateTask,
        deleteTask,
        archiveTask,
        moveTaskColumn,
        addComment,
        addCrewMember,
        addEvent,
        switchWorkspace,
        createWorkspace
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within WorkspaceProvider');
  }
  return context;
}
