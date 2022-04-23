import { useState } from "react";
import { TaskType } from "./components/Task";
import TaskList from "./components/TaskList";
import { useTasksMutators, useTasksState, useTaskId } from "./stores/taskStore";

// ------------------ Modules ------------------ //
const toggleTaskPin = (id: number, tasks: TaskType[]) => {
  const task = tasks.find((task) => task.id === id);
  if (!task) return null;
  return { ...task, state: task.state === "TASK_PINNED" ? "TASK_INBOX" : "TASK_PINNED" };
};

const toggleTaskArchive = (id: number, tasks: TaskType[]) => {
  const task = tasks.find((task) => task.id === id);
  if (!task) return null;
  return { ...task, state: task.state === "TASK_ARCHIVED" ? "TASK_INBOX" : "TASK_ARCHIVED" };
};

const getIndex = (id: number, tasks: TaskType[]) => {
  return tasks.findIndex((task) => task.id === id);
};

// ------------------ Component ------------------ //
const App = () => {
  const taskId = useTaskId();
  const [title, setTitle] = useState<string>("");
  const [tasks, setTasks] = [useTasksState(), useTasksMutators().setTasks];

  const addTask = () => {
    setTasks([{ id: taskId.getNext(), title, updatedAt: "", state: "TASK_INBOX" }, ...tasks]);
  };

  const updateTask = (id: number, task: TaskType, tasks: TaskType[]) => {
    const index = getIndex(id, tasks);
    setTasks([...tasks.slice(0, index), task, ...tasks.slice(index + 1, tasks.length)]);
  };

  const onPinTask = (id: number) => {
    const toggled = toggleTaskPin(id, tasks);
    if (!toggled) return;
    updateTask(id, toggled, tasks);
  };
  const onArchiveTask = (id: number) => {
    const toggled = toggleTaskArchive(id, tasks);
    if (!toggled) return;
    updateTask(id, toggled, tasks);
  };

  return (
    <div className="App">
      <div>
        <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
        <button onClick={addTask}>Add</button>
      </div>
      <TaskList loading={false} {...{ onPinTask, onArchiveTask }}></TaskList>
    </div>
  );
};

export default App;
