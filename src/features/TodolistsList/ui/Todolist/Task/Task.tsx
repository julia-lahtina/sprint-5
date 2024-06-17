import React, { ChangeEvent, useCallback } from "react";
import { Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { EditableSpan } from "common/components";
import { TaskStatuses } from "common/enums";
import { TaskType } from "features/TodolistsList/api/tasksApi.types";
import { useActions } from "common/hooks";
import { tasksThunks } from "features/TodolistsList/model/tasks.reducer";

type TaskPropsType = {
  task: TaskType;
  todolistId: string;
};

export const Task = React.memo((props: TaskPropsType) => {
  const { removeTask, updateTask } = useActions(tasksThunks);

  const removeTaskHandler = () => {
    removeTask({ taskId: props.task.id, todolistId: props.todolistId });
  };

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
    updateTask({ taskId: props.task.id, domainModel: { status }, todolistId: props.todolistId });
  };

  const onTitleChangeHandler = (newValue: string) => {
    updateTask({ taskId: props.task.id, domainModel: { title: newValue }, todolistId: props.todolistId });
  };

  return (
    <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>
      <Checkbox
        checked={props.task.status === TaskStatuses.Completed}
        color="primary"
        onChange={changeTaskStatusHandler}
      />

      <EditableSpan value={props.task.title} onChange={onTitleChangeHandler} />
      <IconButton onClick={removeTaskHandler}>
        <Delete />
      </IconButton>
    </div>
  );
});
