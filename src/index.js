import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import ReduxApp from "./Redux"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ReduxApp />
  </React.StrictMode>
);
