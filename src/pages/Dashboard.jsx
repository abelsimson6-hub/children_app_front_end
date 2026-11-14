
import { useEffect, useState } from "react";

import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip
} from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import { getActivities } from "../services/activityServices";

import StatCard from "../components/Statcard";
import ProgressChart from "../components/ProgressChart";
import UpcomingSessions from "../components/UpcomingSessions";

function Dashboard() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchActivities = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getActivities();
      setActivities(data);
    } catch (error) {
      setError("Unable to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const totalActivities = activities.length;

  console.log("activities:", activities, "type:", typeof activities, "isArray:", Array.isArray(activities));
  const completedActivities = activities.filter(
    (item) => item.status === "Completed"
  ).length;

  const inProgressActivities = activities.filter(
    (item) => item.status === "In Progress"
  ).length;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingCount = activities.filter((item) => {
    const sessionDate = new Date(
      `${item.scheduledDate}T00:00:00`
    );

    return (
      sessionDate >= today &&
      item.status !== "Completed"
    );
  }).length;

  const recentActivities = [...activities]
    .sort(
      (a, b) =>
        new Date(b.scheduledDate) -
        new Date(a.scheduledDate)
    )
    .slice(0, 5);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        mt={5}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="page-container">
      {/* 
      <Typography variant="h4" fontWeight="bold" mb={1}>
        Dashboard
      </Typography> */}

      <Typography variant="h4" textcolor="#ffc107" mb={3}>
        Welcome to Kids Growth Learning App
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Statistics Cards */}

      <Grid container spacing={10} mb={4}
        direction="row"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          p:5
        }}>

        <Grid item xs={12} sm={6} md={3}sx={{
            // justifyContent: "center",
            // alignItems: "center",
            width:"30%",
            // height:""
          }}>
          <StatCard
            title="Total Activities"
            value={totalActivities}
            icon={<SchoolIcon />}
            color="#6C63FF"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3} sx={{
          width:"30%"
        }}>
          <StatCard
            title="Completed"
            value={completedActivities}
            icon={<CheckCircleIcon />}
            color="#4CAF50"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3} sx={{
          width:"30%"
        }}>
          <StatCard
            title="In Progress"
            value={inProgressActivities}
            icon={<PendingActionsIcon />}
            color="#FF9800"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3} sx={{
          width:"30%"
        }}>
          <StatCard
            title="Upcoming Sessions"
            value={upcomingCount}
            icon={<CalendarMonthIcon />}
            color="#2196F3"
          />
        </Grid>

      </Grid>

      {/* Progress Chart and Upcoming Sessions */}

      <Grid container spacing={5} mb={4}
        direction="row"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          p:5
        }}>

        <Grid item xs={12} md={6}

          sx={{
            // justifyContent: "center",
            // alignItems: "center",
            width:"40%",
            // height:""
          }}>
          <ProgressChart activities={activities} />
        </Grid>

        <Grid item xs={12} md={6} sx={{
          width:"40%",
          height:""
        }}>
          <UpcomingSessions activities={activities} />
        </Grid>

      </Grid>

      {/* Recent Activities */}

      <Paper sx={{ p: 3, borderRadius: 3 }}>

        <Typography
          variant="h6"
          fontWeight="bold"
          mb={2}
        >
          Recent Activities
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Child</TableCell>
              <TableCell>Activity</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {recentActivities.map((activity) => (
              <TableRow key={activity.id}>

                <TableCell>
                  {activity.childName}
                </TableCell>

                <TableCell>
                  {activity.title}
                </TableCell>

                <TableCell>
                  {activity.category}
                </TableCell>

                <TableCell>
                  {activity.scheduledDate}
                </TableCell>

                <TableCell>
                  <Chip
                    label={activity.status}
                    color={
                      activity.status === "Completed"
                        ? "success"
                        : activity.status === "In Progress"
                          ? "warning"
                          : "default"
                    }
                    size="small"
                  />
                </TableCell>

              </TableRow>
            ))}

            {recentActivities.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No activities available
                </TableCell>
              </TableRow>
            )}

          </TableBody>
        </Table>

      </Paper>

    </Box>
  );
}

export default Dashboard;
