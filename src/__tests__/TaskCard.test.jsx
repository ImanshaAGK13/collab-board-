import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TaskCard } from '../components/kanban/TaskCard';

// Mock WorkspaceContext and AuthContext
vi.mock('../context/WorkspaceContext', () => ({
  useWorkspace: () => ({
    crewMembers: [
      { id: 'nova', name: 'Commander Nova', initials: 'CN', color: '#ffbf00' }
    ]
  })
}));

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    currentUser: { id: 'nova', name: 'Commander Nova' }
  })
}));

describe('1. TaskCard Component Unit Test', () => {
  const mockTask = {
    id: 'TASK-101',
    title: 'Docking System Calibration',
    description: 'Calibrate optical alignment sensors for automated airlock docking sequence.',
    status: 'in_progress',
    priority: 'high',
    assignee: 'nova',
    progress: 65,
    dueDate: '2026-08-30',
    tags: ['Hardware', 'Calibration'],
    comments: []
  };

  it('renders task title, priority badge, and assigned personnel correctly', () => {
    render(<TaskCard task={mockTask} onClick={() => {}} />);

    // Assert Title
    expect(screen.getByText('Docking System Calibration')).toBeInTheDocument();

    // Assert Priority Badge
    expect(screen.getByText('HIGH')).toBeInTheDocument();

    // Assert Assignee Initials
    expect(screen.getByText('CN')).toBeInTheDocument();
  });
});
