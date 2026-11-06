
import { useEffect, useMemo, useState } from "react";

import {
  Box,
  Typography,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";

import { getActivities } from "../services/activityServices";
import exportPDF from "../utils/exportPDF";

const Reports = () => {
  const [activities, setActivities] = useState([]);
  const [selectedChild, setSelectedChild] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch activities
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getActivities();
        setActivities(data);
      } catch (err) {
        setError("Unable to load report data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get unique child names
  const children = [
    ...new Set(
      activities
        .map((activity) => activity.childName)
        .filter(Boolean)
    ),
  ];

  // Filter activities
  const filteredActivities = useMemo(() => {
    if (selectedChild === "All") {
      return activities;
    }

    return activities.filter(
      (activity) => activity.childName === selectedChild
    );
  }, [activities, selectedChild]);

  // Calculate statistics
  const totalActivities = filteredActivities.length;

  const completedActivities = filteredActivities.filter(
    (activity) => activity.status === "Completed"
  ).length;

  const inProgressActivities = filteredActivities.filter(
    (activity) => activity.status === "In Progress"
  ).length;

  const averageProgress =
    totalActivities > 0
      ? Math.round(
          filteredActivities.reduce(
            (total, activity) =>
              total + Number(activity.progress || 0),
            0
          ) / totalActivities
        )
      : 0;

  // Download PDF
  const handleDownload = () => {
    const reportName =
      selectedChild === "All" ? "All_Children" : selectedChild;

    exportPDF(reportName, filteredActivities);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Page Heading */}
      <Typography variant="h4" fontWeight="bold" mb={1}>
        Progress Reports
      </Typography>

      <Typography color="text.secondary" mb={3}>
        View children's learning performance and download reports.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Filter and Download */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
          flexWrap="wrap"
        >
          <FormControl sx={{ minWidth: 220 }}>
            <InputLabel>Select Child</InputLabel>

            <Select
              value={selectedChild}
              label="Select Child"
              onChange={(e) => setSelectedChild(e.target.value)}
            >
              <MenuItem value="All">All Children</MenuItem>

              {children.map((child) => (
                <MenuItem key={child} value={child}>
                  {child}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleDownload}
            disabled={filteredActivities.length === 0}
          >
            Download PDF Report
          </Button>
        </Box>
      </Paper>

      {/* Statistics */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">
                Total Activities
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {totalActivities}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">
                Completed
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="success.main">
                {completedActivities}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">
                In Progress
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="primary.main">
                {inProgressActivities}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">
                Average Progress
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {averageProgress}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Activity Report Table */}
      <Paper sx={{ p: 2, borderRadius: 3 }}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Activity Details
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Child</strong></TableCell>
                <TableCell><strong>Activity</strong></TableCell>
                <TableCell><strong>Category</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Progress</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredActivities.length > 0 ? (
                filteredActivities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>{activity.childName}</TableCell>
                    <TableCell>{activity.title}</TableCell>
                    <TableCell>{activity.category}</TableCell>
                    <TableCell>{activity.scheduledDate}</TableCell>

                    <TableCell>
                      <Chip
                        label={activity.status}
                        size="small"
                        color={
                          activity.status === "Completed"
                            ? "success"
                            : activity.status === "In Progress"
                            ? "primary"
                            : "warning"
                        }
                      />
                    </TableCell>

                    <TableCell>
                      {activity.progress || 0}%
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No activities found for this selection.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Reports;
