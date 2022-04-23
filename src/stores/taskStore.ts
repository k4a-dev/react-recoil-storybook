import React from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

import { TaskType } from "../components/Task";

const tasksRecoilState = atom<TaskType[]>({ key: "tasksState", default: [] as TaskType[] });

export const useTasksState = () => {
  return useRecoilValue(tasksRecoilState);
};
export const useTasksMutators = () => {
  const setState = useSetRecoilState(tasksRecoilState);

  const setTasks = React.useCallback((tasks: TaskType[]) => setState(tasks), [setState]);

  return { setTasks };
};

const taskIdState = atom<number>({ key: "taskIdState", default: 0 });

export const useTaskIdState = () => {
  return useRecoilValue(taskIdState);
};

export const useTaskId = () => {
  const id = useTaskIdState();
  const setState = useSetRecoilState(taskIdState);
  const getNext = React.useCallback(() => {
    const nextId = id + 1;
    setState(nextId);
    return nextId;
  }, [id, setState]);

  return { getNext };
};
