import React, { useEffect } from "react";
import { TodolistDomainType } from "features/TodolistsList/model/todolists.reducer";
import { tasksThunks } from "features/TodolistsList/model/tasks.reducer";
import { useActions } from "common/hooks";
import { AddItemForm } from "common/components";
import { FilterTasksButton } from "./FilterTasksButton/FilterTasksButton";
import { Tasks } from "./tasks/Tasks";
import { TodolistTitle } from "./todolistTitle/TodolistTitle";

type Props = {
  todolist: TodolistDomainType;
};

export const Todolist = function ({ todolist }: Props) {
  const { fetchTasks, addTask } = useActions(tasksThunks);

  useEffect(() => {
    fetchTasks(todolist.id);
  }, []);

  const addTaskCb = (title: string) => {
    return addTask({ title, todolistId: todolist.id });
  };

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskCb} disabled={todolist.entityStatus === "loading"} />

      <Tasks todolist={todolist} />

      <div style={{ paddingTop: "10px" }}>
        <FilterTasksButton todolist={todolist} />
      </div>
    </div>
  );
};
