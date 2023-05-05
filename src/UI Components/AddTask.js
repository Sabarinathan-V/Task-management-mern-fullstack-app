import { TextField, Button, Box } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postTaskToServer } from "../Slices/taskSlice";

const AddTask = () => {
  const dispatch = useDispatch();

  // LOCAL STATES

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // ADD TASK TO SERVER

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if(title !== '' && description !== ''){
    dispatch(postTaskToServer({ title, description }))};
    setTitle("");
    setDescription("");
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px auto",
          }}
        >
          <TextField
            label="Task Title"
            margin="normal"
            align="center"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            sx={{ minWidth: "360px", maxWidth: "480px" }}
          />

          <TextField
            label="Task Description"
            margin="normal"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            sx={{ minWidth: "360px", maxWidth: "480px" }}
          />

          <Button
            type="submit"
            color="primary"
            variant="contained"
            sx={{ margin: "20px" }}
          >
            Add Task
          </Button>
        </Box>
      </form>
    </>
  );
};

export default AddTask;
