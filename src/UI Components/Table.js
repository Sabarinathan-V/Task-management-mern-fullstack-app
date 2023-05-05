import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Modal,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import {
  getTasksFromServer,
  removeTaskFromList,
  removeTaskInServer,
  setSelectedTask,
  updateTaskInServer,
} from "../Slices/taskSlice";

const Tables = () => {
  // LOCAL STATES

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [_id, set_Id] = useState(0);

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  // READ DATA FROM SERVER

  const { tasksList, selectedTask } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getTasksFromServer());
  }, [dispatch]);

  // SELECT TASK TO UPDATE

  const selectTaskToUpdate = (task) => {
    dispatch(setSelectedTask(task));
    setOpen(true);
  };

  useEffect(() => {
    if (Object.keys(selectedTask).length !== 0) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
      set_Id(selectedTask._id);
    }
  }, [selectedTask]);

  // UPDATE SELECTED TASK

  const updateTask = () => {
    dispatch(updateTaskInServer({ title, description, _id }));
    setTitle("");
    setDescription("");
    setOpen(false);
  };

  // DELETE TASK

  const deleteTask = (task) => {
    dispatch(removeTaskInServer(task))
      .unwrap()
      .then(() => {
        dispatch(removeTaskFromList(task));
      });
  };

  return (
    <>
      <Table sx={{ marginBottom: '2em', backgroundColor: '#ecf0f3' }}>
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>Task Title</TableCell>
            <TableCell>Task Description</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {tasksList &&
            tasksList.map((task, index) => {
              return (
                <TableRow key={task._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>

                  <TableCell>
                    <IconButton
                      label="Edit"
                      aria-label="Edit"
                      size="large"
                      color="primary"
                      onClick={() => selectTaskToUpdate(task)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>

                  <TableCell>
                    <IconButton
                      label="Delete"
                      aria-label="Delete"
                      size="large"
                      color="error"
                      onClick={() => deleteTask(task)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            backgroundColor: "white",
            margin: "25vh auto",
            padding: "1em",
            maxWidth: "480px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" component="h2">
            Update Task
          </Typography>

          <TextField
            label="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            fullWidth
          ></TextField>

          <TextField
            label="Task Description"
            margin="normal"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></TextField>

          <Button
            type="submit"
            variant="contained"
            sx={{ margin: "10px", backgroundColor: "secondary" }}
            onClick={updateTask}
          >
            Update
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Tables;
