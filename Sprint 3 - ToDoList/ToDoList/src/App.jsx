import { useState } from "react";
import { Header } from "./components/Header";
import { Tasks } from "./components/Tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  function addTask(taskTitle) {
    const newTask = {
      id: Date.now(),
      title: taskTitle,
      isCompleted: false
    };
    setTasks([...tasks, newTask]);
  }

  function deleteTaskById(taskId) {
    const newTasks = tasks.filter(task => task.id !== taskId);
    setTasks(newTasks);
  }

  function toggleTaskCompletedById(taskId) {
    const newTasks = tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted
        };
      }
      return task;
    });
    setTasks(newTasks);
  }

  function handleClearCompleted(completedTasks) {
    const newTasks = tasks.filter(task => !completedTasks.includes(task));
    setTasks(newTasks);
  }

  return (
    <>
      <Header handleAddTask={addTask} />
      <Tasks
        tasks={tasks}
        onDelete={deleteTaskById}
        onComplete={toggleTaskCompletedById}
        onClearCompleted={handleClearCompleted}
        filter={filter}
      />
    </>
  );
}

export default App;
