import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/DeleteTwoTone'
import React from "react";

const DeleteCommonAction = ({ onClick }) => {
  return (
    <IconButton aria-label="delete" size="inherit" onClick={() => onClick()}>
      <DeleteIcon fontSize="small" color="error" />
    </IconButton>
  );
};

export default DeleteCommonAction;
