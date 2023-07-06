import React from "react";
import styles from './task.module.css';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { TiTrash } from 'react-icons/ti';

export function Task({ task, onDelete, onComplete/*, isDayMode, toggleMode*/ }) {  
  

  return (
    <div className={styles.task}>
      <button className={styles.checkContainer} onClick={() => onComplete(task.id)}>
        {task.isCompleted ? <BsFillCheckCircleFill /> : <div />}
      </button>

      <p className={task.isCompleted ? styles.textCompleted : ""}>
        {task.title}
      </p>

      <button className={styles.deleteButton} onClick={() => onDelete(task.id)}>
  <TiTrash size={20} />
</button>
    </div>
  )
}