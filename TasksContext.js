import React, { createContext, useState, useContext } from 'react';

const TasksContext = createContext();

export const useTasks = () => useContext(TasksContext);

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Fazer avaliação do moodle', dueDate: '02/08/2024', completed: false },
    { id: 2, name: 'Limpar a casa do cachorro', dueDate: '10/08/2024', completed: false },
  ]);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleTaskToggle = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const handleTaskDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <TasksContext.Provider value={{ tasks, handleAddTask, handleTaskToggle, handleTaskDelete }}>
      {children}
    </TasksContext.Provider>
  );
};
