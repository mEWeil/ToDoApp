import { useState, useEffect } from 'react';
import axios from 'axios';
import { ITask } from '../interfaces/ITask';
import Task from './Task';

export async function fetchTasks(): Promise<ITask[]> {
  const taskListResp = await axios.get('list_tasks');
  return taskListResp.data.tasks;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const taskHandler = async () => {
      const taskList = await fetchTasks();
      setTasks(taskList);
    };
    taskHandler();
  }, []);

  return (
    <div>
      <div>
        <h1>Pending</h1>
        <ul>
          {tasks.map((task) =>
            task.isCompleted === false ? (
              <Task key={task.id} task={task} />
            ) : null
          )}
        </ul>
      </div>
      <div>
        <h1>Completed</h1>
        <ul>
          {tasks.map((task) =>
            task.isCompleted === true ? (
              <Task key={task.id} task={task} />
            ) : null
          )}
        </ul>
      </div>
    </div>
  );
}
