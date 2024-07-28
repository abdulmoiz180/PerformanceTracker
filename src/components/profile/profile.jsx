import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Cards from "../card/Card.jsx";

const Add = () => {
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    jno: "",
    position: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  const handleClickOpen = () => {
    setFormData({ name: "", age: "", jno: "", position: "" });
    setEditIndex(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (formData.name && formData.age && formData.jno && formData.position) {
      if (editIndex !== null) {
        const updatedList = list.map((item, index) =>
          index === editIndex ? formData : item
        );
        setList(updatedList);
      } else {
        setList([...list, formData]);
      }

      await PostData(formData);

      setFormData({ name: "", age: "", jno: "", position: "" });
      setOpen(false);
    } else {
      alert("Fill all the fields first");
    }
  };

  const PostData = async (data) => {
    const response = await fetch(
      "https://performance-tracker-b19d8-default-rtdb.firebaseio.com/uaa.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to post data");
    }
  };

  const editValue = (index) => {
    setFormData(list[index]);
    setEditIndex(index);
    setOpen(true);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <button
          onClick={handleClickOpen}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Add
        </button>
        {list.map((item, index) => (
          <div className="bg-white shadow-md rounded p-4 w-96 m-2" key={index}>
            <Cards {...item} />
            <button
              onClick={() => editValue(index)}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-4 rounded"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
      <form method="post">
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            {editIndex !== null ? "Edit Player" : "Add Player"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {editIndex !== null
                ? "Please edit the details for the player."
                : "Please enter the details for the new player."}
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="age"
              name="age"
              label="Age"
              type="number"
              fullWidth
              variant="standard"
              value={formData.age}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="jno"
              name="jno"
              label="Jersey Number"
              type="text"
              fullWidth
              variant="standard"
              value={formData.jno}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="position"
              name="position"
              label="Position"
              type="text"
              fullWidth
              variant="standard"
              value={formData.position}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>
              {editIndex !== null ? "Save" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </>
  );
};

export default Add;
