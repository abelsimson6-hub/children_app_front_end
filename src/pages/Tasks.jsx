
import { useState, useEffect } from "react";

import {
  getTasks,
  getStudents,
  getSubmissions,
  addTask,
  updateTask,
  deleteTask,
  deleteSubmission,
  getTaskSubmissions,
  
} from "../services/taskservice";

import TaskForm from "../components/TaskForm";

import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import SendIcon from "@mui/icons-material/Send";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [students, setStudents] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState(null);

  // Fetch all data
  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const taskData = await getTasks();
      const studentData = await getStudents();
      const submissionData = await getSubmissions();

      setTasks(taskData);
      setStudents(studentData);
      setSubmissions(submissionData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load task data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Open form for creating a task
  const handleOpenCreate = () => {
    setEditData(null);
    setOpenForm(true);
  };

  // Open form for editing a task
  const handleEdit = (task) => {
    setEditData(task);
    setOpenForm(true);
  };

  // Close form
  const handleClose = () => {
    setOpenForm(false);
    setEditData(null);
  };

  // Create or update task
  const handleSubmit = async (formData) => {
    try {
      if (editData) {
        await updateTask(editData.id, formData);
      } else {
        await addTask({
          ...formData,
          createdAt: new Date().toISOString().split("T")[0],
        });
      }

      handleClose();
      await fetchData();
    } catch (error) {
      console.error("Error saving task:", error);
      setError("Failed to save task. Please try again.");
    }
  };

  // Delete task
  const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Delete this task and all its student submissions?"
  );

  if (!confirmDelete) return;

  try {
    const relatedSubmissions = await getTaskSubmissions(id);

    await Promise.all(
      relatedSubmissions.map((submission) =>
        deleteSubmission(submission.id)
      )
    );

    await deleteTask(id);
    await fetchData();
  } catch (error) {
    console.error("Error deleting task:", error);
    setError("Failed to delete task. Please try again.");
  }
};

  // Statistics
  const totalTasks = tasks.length;

  const assignedTasks = tasks.filter(
    (task) => task.status === "Assigned"
  ).length;

  const reviewedTasks = submissions.filter(
    (submission) => submission.status === "Reviewed"
  ).length;

  const pendingSubmissions = tasks.reduce((total, task) => {
    if (task.status !== "Assigned") return total;

    const assignedIds = task.assignedStudents || [];

    const submittedIds = new Set(
      submissions
        .filter(
          (submission) =>
            submission.taskId === task.id &&
            assignedIds.includes(submission.studentId)
        )
        .map((submission) => submission.studentId)
    );

    return (
      total +
      assignedIds.filter((id) => !submittedIds.has(id)).length
    );
  }, 0);

  const stats = [
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: <AssignmentIcon />,
      color: "#1976d2",
    },
    {
      title: "Assigned Tasks",
      value: assignedTasks,
      icon: <SendIcon />,
      color: "#7b1fa2",
    },
    {
      title: "Pending Submissions",
      value: pendingSubmissions,
      icon: <PendingActionsIcon />,
      color: "#ed6c02",
    },
    {
      title: "Reviewed Submissions",
      value: reviewedTasks,
      icon: <CheckCircleIcon />,
      color: "#2e7d32",
    },
  ];

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 3, mb: 4 }}>
      {/* Page Header */}
      <Box
        mb={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Task Management
          </Typography>

          <Typography color="text.secondary" mt={1}>
            Create, assign and manage student tasks.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenCreate}
        >
          Create Task
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Card
              elevation={2}
              sx={{ borderRadius: 3, height: "100%" }}
            >
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography
                      color="text.secondary"
                      variant="body2"
                    >
                      {stat.title}
                    </Typography>

                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      mt={1}
                    >
                      {stat.value}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      backgroundColor: `${stat.color}18`,
                      color: stat.color,
                      p: 1.5,
                      borderRadius: 2,
                      display: "flex",
                    }}
                  >
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Task Table */}
      <Typography variant="h5" fontWeight="bold" mb={2}>
        All Tasks
      </Typography>

      <TableContainer
        component={Paper}
        elevation={2}
        sx={{ borderRadius: 3 }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell><strong>Task Title</strong></TableCell>
              <TableCell><strong>Subject</strong></TableCell>
              <TableCell><strong>Assigned Students</strong></TableCell>
              <TableCell><strong>Due Date</strong></TableCell>
              <TableCell><strong>Priority</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TableRow key={task.id} hover>
                  <TableCell>
                    <Typography fontWeight="medium">
                      {task.title}
                    </Typography>
                  </TableCell>

                  <TableCell>{task.subject}</TableCell>

                  <TableCell>
                    {task.assignedStudents?.length || 0} Students
                  </TableCell>

                  <TableCell>{task.dueDate}</TableCell>

                  <TableCell>
                    <Chip
                      label={task.priority}
                      color={
                        task.priority === "High"
                          ? "error"
                          : task.priority === "Medium"
                          ? "warning"
                          : "success"
                      }
                      size="small"
                    />
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={task.status}
                      color={
                        task.status === "Assigned"
                          ? "primary"
                          : task.status === "Closed"
                          ? "default"
                          : "warning"
                      }
                      size="small"
                    />
                  </TableCell>

                  <TableCell align="center">
                    <Tooltip title="Edit Task">
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(task)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete Task">
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(task.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No tasks found. Create your first task!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create / Edit Task Dialog */}
      <TaskForm
        open={openForm}
        onClose={handleClose}
        onSubmit={handleSubmit}
        students={students}
        editData={editData}
      />
    </Container>
  );
};

export default Tasks;
