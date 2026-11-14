
import { useState, useEffect } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Autocomplete,
  Stack,
} from "@mui/material";

const initialFormData = {
  title: "",
  description: "",
  subject: "",
  assignedStudents: [],
  dueDate: "",
  priority: "Medium",
  totalMarks: "",
  status: "Assigned",
};

const TaskForm = ({
  open,
  onClose,
  onSubmit,
  students,
  editData,
}) => {
  const [formData, setFormData] = useState(initialFormData);

  // Load existing task data when editing
  useEffect(() => {
    if (open && editData) {
      setFormData({
        ...initialFormData,
        ...editData,
        assignedStudents: editData.assignedStudents || [],
      });
    } else if (open) {
      setFormData(initialFormData);
    }
  }, [open, editData]);

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle multiple student selection
  const handleStudentChange = (event, selectedStudents) => {
    setFormData((prev) => ({
      ...prev,
      assignedStudents: selectedStudents.map(
        (student) => student.id
      ),
    }));
  };

  // Submit form
  const handleSubmit = () => {
    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.subject ||
      formData.assignedStudents.length === 0 ||
      !formData.dueDate ||
      !formData.totalMarks ||
      Number(formData.totalMarks) <= 0
    ) {
      alert("Please fill in all fields correctly.");
      return;
    }

    onSubmit({
      ...formData,
      totalMarks: Number(formData.totalMarks),
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {editData ? "Edit Task" : "Create New Task"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Task Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            required
          />

          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
            required
          />

          <TextField
            select
            label="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            fullWidth
            required
          >
            <MenuItem value="Mathematics">Mathematics</MenuItem>
            <MenuItem value="Science">Science</MenuItem>
            <MenuItem value="English">English</MenuItem>
            <MenuItem value="Language">Language</MenuItem>
            <MenuItem value="General Knowledge">
              General Knowledge
            </MenuItem>
          </TextField>

          <Autocomplete
            multiple
            options={students}
            getOptionLabel={(student) =>
              `${student.name} (${student.class})`
            }
            value={students.filter((student) =>
              formData.assignedStudents.includes(student.id)
            )}
            onChange={handleStudentChange}
            isOptionEqualToValue={(option, value) =>
              option.id === value.id
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Assign Students"
                placeholder="Select students"
                required
              />
            )}
          />

          <TextField
            label="Due Date"
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
            fullWidth
            required
            slotProps={{
              inputLabel: { shrink: true },
            }}
          />

          <TextField
            select
            label="Priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </TextField>

          <TextField
            label="Total Marks"
            name="totalMarks"
            type="number"
            value={formData.totalMarks}
            onChange={handleChange}
            fullWidth
            required
            inputProps={{ min: 1 }}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>

        <Button variant="contained" onClick={handleSubmit}>
          {editData ? "Update Task" : "Create Task"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskForm;
