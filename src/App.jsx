import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import AuthForm from './components/AuthForm';
import './index.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'In Progress', deadline: '' });
  const [filter, setFilter] = useState('All');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');

  // Сохранение задач в localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Восстановление задач из localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  // Аутентификация
  const handleLogin = (username, password) => {
    if (username === 'user' && password === 'password') {
      setUser({ username });
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  // Переключение темы
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
      <div className={`app ${theme}`}>
        {!user ? (
            <AuthForm onLogin={handleLogin} />
        ) : (
            <div className="container">
              <header>
                <h1>To-Do List with Pomodoro</h1>
                <button onClick={toggleTheme}>Toggle Theme</button>
                <button onClick={handleLogout}>Logout</button>
              </header>
              <TaskList
                  tasks={tasks}
                  newTask={newTask}
                  setNewTask={setNewTask}
                  filter={filter}
                  setFilter={setFilter}
                  editingTaskId={editingTaskId}
                  setEditingTaskId={setEditingTaskId}
                  setTasks={setTasks}
              />
            </div>
        )}
      </div>
  );
}

export default App;