import styles from './header.module.css';
import { useState } from 'react';

export function Header({ handleAddTask }) {
  const [title, setTitle] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    handleAddTask(title);
    setTitle('');
  }

  function onChangeTitle(event) {
    setTitle(event.target.value);
  }

  return (
    <header className={styles.header}>
      <div className={styles.heading}><h1>TODO</h1></div>

      <form onSubmit={handleSubmit} className={styles.newTaskForm}>
        <input placeholder="Add new task" type="text" onChange={onChangeTitle} value={title} />
      </form>
    </header>
  )
}