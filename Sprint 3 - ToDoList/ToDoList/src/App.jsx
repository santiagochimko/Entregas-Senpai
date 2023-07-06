import { useState } from "react";
import { Header } from "./components/Header";
import { Tasks } from "./components/Tasks";

function App() {
  const [tasks, setTasks] = useState([/*{id:1, title:'Comprar agua', isCompleted:false}*/]);
  const [filter, setFilter] = useState('all');

  const [isDayMode, setIsDayMode] = useState(true);

  function toggleMode() {
    setIsDayMode(!isDayMode);
  }

  function addTask(taskTitle) {
    const newTask = {
      id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
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
      <Header 
      handleAddTask={addTask} 
      isDayMode={isDayMode} 
      toggleMode={toggleMode}
      />
      
      <Tasks
        tasks={tasks}
        onDelete={deleteTaskById}
        onComplete={toggleTaskCompletedById}
        onClearCompleted={handleClearCompleted}
        filter={filter}
        isDayMode={isDayMode}
        toggleMode={toggleMode} 
      />
    </>
  );
}

export default App;
