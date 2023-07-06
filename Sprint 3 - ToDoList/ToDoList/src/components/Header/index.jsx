import styles from "./header.module.css";
import { useState } from "react";
import dayModeIcon from "../../assets/icon-sun.svg";
import nightModeIcon from "../../assets/icon-moon.svg";

export function Header({ handleAddTask}) {
  const [title, setTitle] = useState("");
  const [isDayMode, setIsDayMode] = useState(true);

  function toggleMode() {
    setIsDayMode(!isDayMode);
  }

  function handleSubmit(event) {
    event.preventDefault();

    handleAddTask(title);
    setTitle("");
  }

  function onChangeTitle(event) {
    setTitle(event.target.value);
  }

  return (
    <header className={`${isDayMode ? styles.headerDayMode : styles.header}`}>
      <div className={styles.heading}>
        <h1>TODO</h1>
        <button className={styles.buttonMode} onClick={toggleMode}>
          <img src={isDayMode ? dayModeIcon : nightModeIcon} alt="Mode" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className={`${isDayMode ? styles.newTaskFormDayMode : styles.newTaskForm}`}>
        <input
          placeholder="Add new task"
          type="text"
          onChange={onChangeTitle}
          value={title}
        />
      </form>
    </header>
  );
}
