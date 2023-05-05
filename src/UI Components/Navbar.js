import React from "react";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { tasksList, error, isLoading } = useSelector((state) => state.tasks);

  return (
    <>
      {isLoading && (
        <Typography
          component="p"
          variant="h4"
          align="center"
          sx={{ color: "green", margin: "1em" }}
        >
          Loading...
        </Typography>
      )}

      <Typography
        variant="h3"
        component="h1"
        align="center"
        color="primary"
        sx={{ padding: "10px", marginTop: '10px' }}
      >
        Task Management
      </Typography>

      <Typography
        component="p"
        variant="h6"
        align="center"
        sx={{ padding: "10px" }}
      >
        {`Currently ${tasksList.length} task(s) are pending`}
      </Typography>

      {error !== "" && (
        <Typography
          sx={{ color: "red", padding: "10px" }}
          component="p"
          variant="h6"
          align="center"
        >
          {error}
        </Typography>
      )}
    </>
  );
};

export default Navbar;
