import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  tasksList: [],
  selectedTask: {},
  isLoading: false,
  error: "",
};

// IMPORT BACKEND API URL

const BASE_URL = 'https://rest-api-using-express.onrender.com/api/tasks';

// GET DATA FROM SERVER

export const getTasksFromServer = createAsyncThunk(
  "tasks/getTasksFromServer",
  async (_, { rejectWithValue }) => {
    const response = await fetch(BASE_URL);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      return rejectWithValue({ error: "No Task Found" });
    }
  }
);

// POST TASK TO SERVER

export const postTaskToServer = createAsyncThunk(
  "tasks/postTaskToServer",
  async (task, { rejectWithValue }) => {
    const options = {
      method: "POST",
      body: JSON.stringify(task),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    };

    const response = await fetch(BASE_URL, options);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      return rejectWithValue({ error: "Can not Add Task" });
    }
  }
);

// PATCH OR UPDATE DATA IN SERVER

export const updateTaskInServer = createAsyncThunk(
  "tasks/updateTaskInServer",
  async (task, {rejectWithValue}) => {
    const options = {
      method: "PATCH",
      body: JSON.stringify(task),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    };
    const response = await fetch(BASE_URL + "/" + task._id, options);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      return rejectWithValue({ error: "Task Not Updated" });
    }
  }
);

// DELETE DATA IN SERVER

export const removeTaskInServer = createAsyncThunk(
  "tasks/removeTaskInServer",
  async (task, {rejectWithValue}) => {
    const options = {
      method: "DELETE",
      body: JSON.stringify(task),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    };
    const response = await fetch(BASE_URL + "/" + task._id, options);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      return rejectWithValue({ error: "Task can't remove" });
    }
  }
);

const taskSlice = createSlice({
  name: "tasksSlice",
  initialState,
  reducers: {
    removeTaskFromList: (state, action) => {
      state.tasksList = state.tasksList.filter(
        (task) => task._id !== action.payload._id
      );
    },

    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
    },
  },

  // TO HANDLE ASYNC OPERATION'S LIFE CYCLES

  extraReducers: (builder) => {
    builder
      .addCase(getTasksFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasksFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.tasksList = action.payload;
      })
      .addCase(getTasksFromServer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
        state.tasksList = [];
      })
      .addCase(postTaskToServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postTaskToServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.tasksList.push(action.payload);
      })
      .addCase(postTaskToServer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
      })
      .addCase(updateTaskInServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTaskInServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.tasksList = state.tasksList.map((task) =>
          task._id === action.payload._id ? action.payload : task
        );
      })
      .addCase(updateTaskInServer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
      })
      .addCase(removeTaskInServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeTaskInServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
      })
      .addCase(removeTaskInServer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
      });
  },
});

export const { removeTaskFromList, setSelectedTask } = taskSlice.actions;

export default taskSlice.reducer;
