import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/EditTwoTone'

const EditCommonAction = ({ onClick }) => {
  return (
    <IconButton aria-label="delete" size="inherit" onClick={() => onClick()}>
      <EditIcon fontSize="small" color="secondary" />
    </IconButton>
  );
};

export default EditCommonAction;
