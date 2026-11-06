
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Grid
} from "@mui/material";

import { useEffect, useState } from "react";

const initialForm = {
  childName: "",
  title: "",
  category: "",
  difficulty: "Easy",
  scheduledDate: "",
  duration: 30,
  status: "Not Started",
  progress: 0,
  notes: ""
};

function ActivityForm({
  open,
  handleClose,
  handleSubmit,
  editData,
  initialDate,
}) {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    } else {
       setFormData({
      childName: "",
      title: "",
      category: "",
      difficulty: "",
      scheduledDate: initialDate || "",
      duration: "",
      status: "Not Started",
      progress: 0,
      notes: "",
    });
    }
  }, [editData, open,initialDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <form onSubmit={submitForm}>
        <DialogTitle>
          {editData ? "Edit Activity" : "Add Activity"}
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>

            <Grid item xs={12}>
              <TextField
                label="Child Name"
                name="childName"
                value={formData.childName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Activity Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                fullWidth
                required
              >
                {["Language", "Maths", "Science", "Art", "Other"]
                  .map((category) => (
                    <MenuItem
                      key={category}
                      value={category}
                    >
                      {category}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                fullWidth
              >
                {["Easy", "Medium", "Hard"].map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                label="Scheduled Date"
                name="scheduledDate"
                value={formData.scheduledDate}
                onChange={handleChange}
                fullWidth
                required
                slotProps={{
                  inputLabel: { shrink: true }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                type="number"
                label="Duration (minutes)"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                fullWidth
                required
                inputProps={{ min: 1 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                fullWidth
              >
                {["Not Started", "In Progress", "Completed"]
                  .map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                type="number"
                label="Progress (%)"
                name="progress"
                value={formData.progress}
                onChange={handleChange}
                fullWidth
                inputProps={{ min: 0, max: 100 }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
              />
            </Grid>

          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose}>
            Cancel
          </Button>

          <Button type="submit" variant="contained">
            {editData ? "Update" : "Add Activity"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ActivityForm;
