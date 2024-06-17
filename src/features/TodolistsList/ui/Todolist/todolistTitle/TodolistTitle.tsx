import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { EditableSpan } from "common/components";
import { useActions } from "common/hooks";
import { TodolistDomainType, todolistsThunks } from "features/TodolistsList/model/todolists.reducer";
import React from "react";

type Props = {
  todolist: TodolistDomainType;
};

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, entityStatus } = todolist;
  const { removeTodolist, changeTodolistTitle } = useActions(todolistsThunks);

  const removeTodolistCb = () => {
    removeTodolist(id);
  };

  const changeTodolistTitleCb = (title: string) => {
    changeTodolistTitle({ id, title });
  };

  return (
    <h3>
      <EditableSpan value={title} onChange={changeTodolistTitleCb} />
      <IconButton onClick={removeTodolistCb} disabled={entityStatus === "loading"}>
        <Delete />
      </IconButton>
    </h3>
  );
};
