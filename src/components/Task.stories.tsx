// ------------------ Import NPM Modules ------------------ //
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

// ------------------ Import Modules ------------------ //
import Task, { TaskType } from "./Task";

// ------------------ Types ------------------ //

export default {
  component: Task,
} as ComponentMeta<typeof Task>;

const defaultTask: TaskType = {
  id: 1,
  title: "Test Task",
  state: "TASK_INBOX",
  updatedAt: new Date(2018, 0, 1, 9, 0).toTimeString(),
};

export const Default: ComponentStoryObj<typeof Task> = { args: { task: defaultTask } };

export const Pinned: ComponentStoryObj<typeof Task> = {
  args: { task: { ...defaultTask, state: "TASK_PINNED" } },
};

export const Archived: ComponentStoryObj<typeof Task> = {
  args: { task: { ...defaultTask, state: "TASK_ARCHIVED" } },
};
