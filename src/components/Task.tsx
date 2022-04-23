import React from "react";

type TaskType = { id: number; title: string; state: any; updatedAt: string };

type EventProps = { onArchiveTask: (id: number) => void; onPinTask: (id: number) => void };
type Props = {
  task: TaskType;
} & EventProps;

const Task: React.FC<Props> = (props) => {
  return (
    <div className={`list-item ${props.task.state}`}>
      <label className="checkbox">
        <input
          type="checkbox"
          defaultChecked={props.task.state === "TASK_ARCHIVED"}
          disabled={true}
          name="checked"
        />
        <span className="checkbox-custom" onClick={() => props.onArchiveTask(props.task.id)} />
      </label>
      {props.task.id}
      <div className="title">
        <input type="text" value={props.task.title} readOnly={true} placeholder="Input title" />
      </div>

      <div className="actions" onClick={(event) => event.stopPropagation()}>
        {props.task.state !== "TASK_ARCHIVED" && (
          <span className="pin" onClick={() => props.onPinTask(props.task.id)}>
            <span className={`icon-star`} />
          </span>
        )}
      </div>
    </div>
  );
};

export default Task;
export type { TaskType, EventProps };
