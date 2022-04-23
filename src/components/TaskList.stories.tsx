// ------------------ Import NPM Modules ------------------ //
import React, { ComponentProps } from "react";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { CSFType } from "../types/storybook";
import { RecoilRoot } from "recoil";

// ------------------ Import Modules ------------------ //
import TaskList from "./TaskList";
import { TaskType } from "./Task";
import { useTasksMutators } from "../stores/taskStore";

// ------------------ Recoil Mock------------------ //

type Props = ComponentProps<typeof TaskList> & { tasks: TaskType[] };
const MockedComponent: React.FC<Props> = (props) => {
  const setTasks = useTasksMutators().setTasks;

  setTasks(props.tasks);

  return <TaskList {...props} />;
};

// ------------------ Define Types ------------------ //
type StoryType = CSFType<typeof MockedComponent>;

// ------------------ Define Args ------------------ //
const defaultTasks: TaskType[] = [
  { id: 1, title: "Task 1", state: "TASK_INBOX", updatedAt: "" },
  { id: 2, title: "Task 2", state: "TASK_INBOX", updatedAt: "" },
  { id: 3, title: "Task 3", state: "TASK_INBOX", updatedAt: "" },
  { id: 4, title: "Task 4", state: "TASK_INBOX", updatedAt: "" },
  { id: 5, title: "Task 5", state: "TASK_INBOX", updatedAt: "" },
  { id: 6, title: "Task 6", state: "TASK_INBOX", updatedAt: "" },
];

const onPinTask = () => {};
const onArchiveTask = () => {};

// ------------------ Export(Default) Meta ------------------ //
const meta: ComponentMeta<typeof MockedComponent> = {
  component: MockedComponent,
  decorators: [(story) => <RecoilRoot>{story()}</RecoilRoot>],
};
export default meta;

// ------------------ Export Stories ------------------ //

export const Default: StoryType = {
  args: { tasks: defaultTasks, loading: false, onPinTask, onArchiveTask },
};

export const WithPinnedTasks: StoryType = {
  args: {
    ...Default.args,
    tasks: [
      ...defaultTasks.slice(0, 5),
      { id: 6, title: "Task 6 (pinned)", state: "TASK_PINNED", updatedAt: "" },
    ],
  },
};

export const Loading: StoryType = {
  args: {
    ...Default.args,
    loading: true,
    tasks: [],
  },
};

export const Empty: StoryType = {
  args: {
    ...Default.args,
    loading: false,
    tasks: [],
  },
};
