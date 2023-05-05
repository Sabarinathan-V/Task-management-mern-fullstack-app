import React from "react";
import Navbar from "./UI Components/Navbar";
import AddTask from "./UI Components/AddTask";
import Container from "@mui/material/Container";
import Tables from "./UI Components/Table";
import { Provider } from "react-redux";
import store from "./Store/store";

const ReduxApp = () => {
  return (
    <>
      <Provider store={store}>
        <Container>
          <Navbar />
          <AddTask />
          <Tables />
        </Container>
      </Provider>
    </>
  );
};

export default ReduxApp;
