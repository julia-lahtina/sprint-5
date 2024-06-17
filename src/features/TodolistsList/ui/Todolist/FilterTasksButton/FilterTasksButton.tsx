import { Button } from "@mui/material";
import { useActions } from "common/hooks";
import { FilterValuesType, TodolistDomainType, todolistsActions } from "features/TodolistsList/model/todolists.reducer";
import React from "react";

type Props = {
  todolist: TodolistDomainType;
};

export const FilterTasksButton = ({ todolist }: Props) => {
  const { filter, id } = todolist;
  const { changeTodolistFilter } = useActions(todolistsActions);

  const filterTasksHandler = (filter: FilterValuesType) => {
    changeTodolistFilter({ filter, id });
  };

  return (
    <>
      <Button
        variant={filter === "all" ? "outlined" : "text"}
        onClick={() => filterTasksHandler("all")}
        color={"inherit"}
      >
        All
      </Button>
      <Button
        variant={filter === "active" ? "outlined" : "text"}
        onClick={() => filterTasksHandler("active")}
        color={"primary"}
      >
        Active
      </Button>
      <Button
        variant={filter === "completed" ? "outlined" : "text"}
        onClick={() => filterTasksHandler("completed")}
        color={"secondary"}
      >
        Completed
      </Button>
    </>
  );
};
