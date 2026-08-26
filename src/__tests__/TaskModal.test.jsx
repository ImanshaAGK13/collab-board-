import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TaskModal } from '../components/kanban/TaskModal';

const mockAddTask = vi.fn();

vi.mock('../context/WorkspaceContext', () => ({
  useWorkspace: () => ({
    addTask: mockAddTask,
    updateTask: vi.fn(),
    deleteTask: vi.fn(),
    archiveTask: vi.fn(),
    addComment: vi.fn(),
    crewMembers: [
      { id: 'nova', name: 'Commander Nova' }
    ]
  })
}));

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    currentUser: { id: 'nova', name: 'Commander Nova' }
  })
}));

describe('2. TaskModal Component Integration Test', () => {
  it('submits new task form and triggers addTask callback', () => {
    render(<TaskModal task={null} onClose={() => {}} />);

    const titleInput = screen.getByPlaceholderText(/Shield Emitter Calibration/i);
    fireEvent.change(titleInput, { target: { value: 'New Test Task Directive' } });

    const submitBtn = screen.getByText(/🚀 Launch Task/i);
    fireEvent.click(submitBtn);

    expect(mockAddTask).toHaveBeenCalledTimes(1);
  });
});
