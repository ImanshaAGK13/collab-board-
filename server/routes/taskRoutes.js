import { Task } from '../models/Task.js';

let inMemoryTasks = [
    {
        taskId: 'TASK-101',
        title: 'Docking System Calibration',
        description: 'Calibrate optical alignment sensors for automated airlock docking sequence.',
        status: 'in_progress',
        priority: 'high',
        assignee: 'nova',
        progress: 65,
        dueDate: '2026-08-30',
        timeEstimate: 6,
        tags: ['Hardware', 'Calibration'],
        comments: [{ author: 'Commander Nova', text: 'Sensors reset to default zero offset.', timestamp: new Date() }]
    },
    {
        taskId: 'TASK-102',
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
        taskId: 'TASK-103',
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
    }
];

export async function getTasks(req, res) {
    try {
        const tasks = await Task.find({ isArchived: false }).sort({ createdAt: -1 });
        if (tasks && tasks.length > 0) {
            return res.status(200).json({ success: true, tasks });
        }
    } catch { }
    return res.status(200).json({ success: true, tasks: inMemoryTasks });
}

export async function createTask(req, res) {
    try {
        const taskData = req.body;
        const newTask = {
            taskId: `TASK-${Math.floor(100 + Math.random() * 900)}`,
            title: taskData.title || 'Untitled Directive',
            description: taskData.description || '',
            status: taskData.status || 'todo',
            priority: taskData.priority || 'medium',
            assignee: taskData.assignee || 'nova',
            progress: Number(taskData.progress) || 0,
            dueDate: taskData.dueDate || new Date().toISOString().split('T')[0],
            timeEstimate: Number(taskData.timeEstimate) || 4,
            tags: Array.isArray(taskData.tags) ? taskData.tags : [taskData.tags || 'Directive'],
            comments: []
        };

        try {
            const dbTask = await Task.create(newTask);
            return res.status(201).json({ success: true, task: dbTask });
        } catch {
            inMemoryTasks.unshift(newTask);
            return res.status(201).json({ success: true, task: newTask });
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

export async function updateTask(req, res) {
    try {
        const { id } = req.params;
        const updates = req.body;

        try {
            const updated = await Task.findOneAndUpdate({ taskId: id }, updates, { new: true });
            if (updated) return res.status(200).json({ success: true, task: updated });
        } catch { }

        inMemoryTasks = inMemoryTasks.map((t) => (t.taskId === id ? { ...t, ...updates } : t));
        const found = inMemoryTasks.find((t) => t.taskId === id);
        return res.status(200).json({ success: true, task: found });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

export async function deleteTask(req, res) {
    try {
        const { id } = req.params;
        try {
            await Task.findOneAndDelete({ taskId: id });
        } catch { }
        inMemoryTasks = inMemoryTasks.filter((t) => t.taskId !== id);
        return res.status(200).json({ success: true, message: `Task ${id} deleted.` });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

export async function archiveTask(req, res) {
    try {
        const { id } = req.params;
        try {
            await Task.findOneAndUpdate({ taskId: id }, { isArchived: true, status: 'archived', archivedAt: new Date().toISOString().split('T')[0] });
        } catch { }
        inMemoryTasks = inMemoryTasks.filter((t) => t.taskId !== id);
        return res.status(200).json({ success: true, message: `Task ${id} archived.` });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}