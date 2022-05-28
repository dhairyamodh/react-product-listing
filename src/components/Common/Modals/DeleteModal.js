import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import React, { useImperativeHandle } from "react";
import CloseIcon from "@mui/icons-material/CloseOutlined";

const DeleteModal = ({ open, onClose, title, onSubmit }) => {


  const handleSubmit = () => {
    onClose();
    onSubmit();
  };


  return (
    <Dialog
      onClose={onClose}
      fullWidth={true}
      maxWidth={'sm'}
      open={open}
    >
      <DialogTitle style={{ padding: '5px 15px' }}>
        <Box style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <Typography>{title}</Typography>
          <IconButton onClick={onClose} size="large">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        Are you sure want to delete
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={onClose} color="secondary" >
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary" onClick={handleSubmit} >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default DeleteModal;
