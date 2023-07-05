import { useState } from "react";
import { Task } from "../Task";
import styles from "./tasks.module.css";

export function Tasks({ tasks, onDelete, onComplete, onClearCompleted }) {
  const [currentFilter, setFilter] = useState("all");

  const remainingTasks = tasks.filter((task) => !task.isCompleted).length;

  const handleClearCompleted = () => {
    const completedTasks = tasks.filter((task) => task.isCompleted);
    onClearCompleted(completedTasks);
  };

  const filteredTasks =
    currentFilter === "all"
      ? tasks
      : currentFilter === "active"
      ? tasks.filter((task) => !task.isCompleted)
      : tasks.filter((task) => task.isCompleted);

  return (
    <section className={styles.tasks}>
      <div className={styles.list}>
        {filteredTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onDelete={onDelete}
            onComplete={onComplete}
          />
        ))}
      </div>

      <footer className={styles.footer}>
        <div>
          <span>{remainingTasks}</span>
          <p>{remainingTasks === 1 ? "item" : "items"} left</p>
        </div>

        <div>
          <button
            className={`${styles.fillterButton} ${
              currentFilter === "all" ? styles.active : ""
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={`${styles.fillterButton} ${
              currentFilter === "active" ? styles.active : ""
            }`}
            onClick={() => setFilter("active")}
          >
            Active
          </button>

          <button
            className={`${styles.fillterButton} ${
              currentFilter === "completed" ? styles.active : ""
            }`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>

        <button className={styles.clearButton} onClick={handleClearCompleted}>
          Clear completed
        </button>
      </footer>
    </section>
  );
}
