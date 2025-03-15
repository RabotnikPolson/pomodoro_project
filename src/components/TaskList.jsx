import React, { useEffect } from 'react';

const TaskList = ({
                      tasks,
                      newTask,
                      setNewTask,
                      filter,
                      setFilter,
                      editingTaskId,
                      setEditingTaskId,
                      setTasks,
                  }) => {
    const handleAddTask = () => {
        if (!newTask.title.trim()) {
            alert('Title cannot be empty');
            return;
        }
        setTasks([...tasks, {
            ...newTask,
            id: Date.now(),
            timer: { isRunning: false, mode: 'Work', timeLeft: 25 * 60 }
        }]);
        setNewTask({ title: '', description: '', status: 'In Progress', deadline: '' });
    };

    const handleUpdateTask = () => {
        setTasks(tasks.map(task => task.id === editingTaskId ? { ...newTask, id: editingTaskId } : task));
        setEditingTaskId(null);
        setNewTask({ title: '', description: '', status: 'In Progress', deadline: '' });
    };

    const handleDeleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const toggleTaskStatus = (id) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, status: task.status === 'In Progress' ? 'Completed' : 'In Progress' } : task));
    };

    const filteredTasks = tasks.filter(task => filter === 'All' || task.status === filter);

    useEffect(() => {
        const interval = setInterval(() => {
            setTasks(prevTasks => prevTasks.map(task => {
                if (task.timer.isRunning) {
                    if (task.timer.timeLeft === 0) {
                        const nextMode = task.timer.mode === 'Work' ? 'Break' : 'Work';
                        const nextTimeLeft = nextMode === 'Work' ? 25 * 60 : 5 * 60;
                        return { ...task, timer: { ...task.timer, mode: nextMode, timeLeft: nextTimeLeft } };
                    }
                    return { ...task, timer: { ...task.timer, timeLeft: task.timer.timeLeft - 1 } };
                }
                return task;
            }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="task-list">
            <div className="task-form">
                <input value={newTask.title} onChange={e => setNewTask({ ...newTask, title: e.target.value })} placeholder="Title" />
                <input value={newTask.description} onChange={e => setNewTask({ ...newTask, description: e.target.value })} placeholder="Description" />
                <input type="datetime-local" value={newTask.deadline} onChange={e => setNewTask({ ...newTask, deadline: e.target.value })} />
                {editingTaskId ? (
                    <button onClick={handleUpdateTask}>Update Task</button>
                ) : (
                    <button onClick={handleAddTask}>Add Task</button>
                )}
            </div>
            <div className="filters">
                <button onClick={() => setFilter('All')}>All</button>
                <button onClick={() => setFilter('In Progress')}>In Progress</button>
                <button onClick={() => setFilter('Completed')}>Completed</button>
            </div>
            <ul>
                {filteredTasks.map(task => (
                    <li key={task.id} className="task-item">
                        <h2>{task.title}</h2>
                        <p>{task.description}</p>
                        <p>Status: {task.status}</p>
                        <p>Deadline: {task.deadline}</p>
                        <p>Timer: {Math.floor(task.timer.timeLeft / 60)}:{task.timer.timeLeft % 60 < 10 ? '0' : ''}{task.timer.timeLeft % 60}</p>
                        <p>Mode: {task.timer.mode}</p>
                        <button onClick={() => setEditingTaskId(task.id)}>Edit</button>
                        <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                        <button onClick={() => toggleTaskStatus(task.id)}>Toggle Status</button>
                        <button onClick={() => {
                            setTasks(tasks.map(t => t.id === task.id ? {
                                ...task,
                                timer: { ...task.timer, isRunning: !task.timer.isRunning }
                            } : t));
                        }}>
                            {task.timer.isRunning ? 'Stop Pomodoro' : 'Start Pomodoro'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;