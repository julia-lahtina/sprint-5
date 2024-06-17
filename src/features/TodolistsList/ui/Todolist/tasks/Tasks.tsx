import React from "react";
import { Task } from "./task/Task";
import { TaskStatuses } from "common/enums";
import { TodolistDomainType } from "features/TodolistsList/model/todolists.reducer";
import { useSelector } from "react-redux";
import { selectTasks } from "features/TodolistsList/model/tasks.selectors";

type Props = {
  todolist: TodolistDomainType;
};

export const Tasks = ({ todolist }: Props) => {
  const { filter, id } = todolist;
  const tasks = useSelector(selectTasks);

  let tasksForTodolist = tasks[todolist.id];

  if (filter === "active") {
    tasksForTodolist = tasksForTodolist.filter((t) => t.status === TaskStatuses.New);
  }
  if (filter === "completed") {
    tasksForTodolist = tasksForTodolist.filter((t) => t.status === TaskStatuses.Completed);
  }
  return (
    <>
      {tasksForTodolist.map((t) => (
        <Task key={t.id} task={t} todolistId={id} />
      ))}
    </>
  );
};
