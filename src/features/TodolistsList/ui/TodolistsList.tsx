import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { todolistsThunks } from "features/TodolistsList/model/todolists.reducer";
import { Grid, Paper } from "@mui/material";
import { AddItemForm } from "common/components";
import { Navigate } from "react-router-dom";
import { useActions } from "common/hooks";
import { selectIsLoggedIn } from "features/auth/model/auth.selectors";
import { selectTasks } from "features/TodolistsList/model/tasks.selectors";
import { selectTodolists } from "features/TodolistsList/model/todolists.selectors";
import { Todolist } from "./Todolist/Todolist";

export const TodolistsList = () => {
  const todolists = useSelector(selectTodolists);
  const tasks = useSelector(selectTasks);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { fetchTodolists, addTodolist } = useActions(todolistsThunks);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    fetchTodolists();
  }, []);

  const addTodolistCb = (title: string) => {
    return addTodolist(title);
  };

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodolistCb} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: "10px" }}>
                <Todolist todolist={tl} />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
