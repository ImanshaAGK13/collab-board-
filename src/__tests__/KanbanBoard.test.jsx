import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { KanbanBoard } from '../components/kanban/KanbanBoard';

const mockTasks = [
  {
    id: 'TASK-101',
    title: 'Backlog Item Task',
    status: 'backlog',
    priority: 'medium',
    assignee: 'nova',
    tags: []
  },
  {
    id: 'TASK-102',
    title: 'Completed Mission Task',
    status: 'done',
    priority: 'high',
    assignee: 'nova',
    tags: []
  }
];

vi.mock('../context/WorkspaceContext', () => ({
  useWorkspace: () => ({
    tasks: mockTasks,
    crewMembers: [{ id: 'nova', name: 'Commander Nova', initials: 'CN' }]
  })
}));

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    currentUser: { id: 'nova', name: 'Commander Nova' }
  })
}));

describe('3. KanbanBoard Component Integration Test', () => {
  it('renders all Kanban columns and task items under respective columns', () => {
    render(<KanbanBoard />);

    // Check Column Headers
    expect(screen.getByText('Backlog')).toBeInTheDocument();
    expect(screen.getByText('To Do')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Review')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();

    // Check Task Items
    expect(screen.getByText('Backlog Item Task')).toBeInTheDocument();
    expect(screen.getByText('Completed Mission Task')).toBeInTheDocument();
  });
});
