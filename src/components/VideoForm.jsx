
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
    Box,
} from "@mui/material";

const initialForm = {
    title: "",
    subject: "",
    topic: "",
    videoUrl: "",
    description: "",
    scheduledDate: "",
    duration: "",
    assignedStudents: [],
};

function VideoForm({ open, onClose, onSubmit, students, editData }) {
    const [formData, setFormData] = useState(initialForm);

    useEffect(() => {
        if (open && editData) {
            setFormData({
                ...editData,
                assignedStudents: editData.assignedStudents || [],
            });
        } else if (open) {
            setFormData(initialForm);
        }
    }, [open, editData]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        onSubmit({
            ...formData,
            duration: Number(formData.duration),
        });

        setFormData(initialForm);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                {editData ? "Edit Video Class" : "Add Video Class"}
            </DialogTitle>
            <DialogContent>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
                    <TextField
                        label="Video Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        select
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        fullWidth
                    >
                        <MenuItem value="Science">Science</MenuItem>
                        <MenuItem value="Mathematics">Mathematics</MenuItem>
                        <MenuItem value="Language">Language</MenuItem>
                        <MenuItem value="English">English</MenuItem>
                    </TextField>

                    <TextField
                        label="Topic"
                        name="topic"
                        value={formData.topic}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        label="YouTube Video URL"
                        name="videoUrl"
                        value={formData.videoUrl}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        multiline
                        rows={3}
                        fullWidth
                    />

                    <TextField
                        label="Scheduled Date"
                        name="scheduledDate"
                        type="date"
                        value={formData.scheduledDate}
                        onChange={handleChange}
                        fullWidth
                        slotProps={{ inputLabel: { shrink: true } }}
                    />

                    <TextField
                        label="Duration (minutes)"
                        name="duration"
                        type="number"
                        value={formData.duration}
                        onChange={handleChange}
                        fullWidth
                    />

                    <Autocomplete
                        multiple
                        options={students}
                        getOptionLabel={(option) => option.childName || ""}
                        value={students.filter((student) =>
                            formData.assignedStudents.includes(student.id)
                        )}
                        onChange={(event, selectedStudents) => {
                            setFormData((prev) => ({
                                ...prev,
                                assignedStudents: selectedStudents.map(
                                    (student) => student.id
                                ),
                            }));
                        }}
                        isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Assign Students"
                                placeholder="Select students"
                            />
                        )}
                    />
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>

                <Button variant="contained" onClick={handleSubmit}>
                    {editData ? "Update Video" : "Save Video"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default VideoForm;
