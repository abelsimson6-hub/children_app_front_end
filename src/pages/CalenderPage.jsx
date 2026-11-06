
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";

import dayGridPlugin from "@fullcalendar/react/daygrid";
import timeGridPlugin from "@fullcalendar/react/timegrid";
import interactionPlugin from "@fullcalendar/react/interaction";

import "../styles/calender.css";

import themePlugin from "@fullcalendar/react/themes/classic";

import "@fullcalendar/react/skeleton.css";
import "@fullcalendar/react/themes/classic/theme.css";
import "@fullcalendar/react/themes/classic/palette.css";

import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";

import ActivityForm from "../components/ActivityForm";
import {
  getActivities,
  addActivity,
  updateActivity,
} from "../services/activityServices";

const Calendar = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

  const fetchActivities = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getActivities();
      setActivities(data);
    } catch (err) {
      setError("Failed to load activities.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const calendarEvents = activities
    .filter((activity) => activity.scheduledDate)
    .map((activity) => ({
      id: String(activity.id),
      title: `${activity.title} - ${activity.childName}`,
      start: activity.scheduledDate,
      allDay: true,
      backgroundColor:
        activity.status === "Completed"
          ? "#2e7d32"
          : activity.status === "In Progress"
            ? "#1976d2"
            : "#ed6c02",
      borderColor: "transparent",
    }));

  const handleDateClick = (info) => {
    setSelectedActivity(null);
    setSelectedDate(info.dateStr);
    setFormOpen(true);
  };

  const handleEventClick = (info) => {
    const activity = activities.find(
      (item) => String(item.id) === info.event.id
    );

    if (activity) {
      setSelectedActivity(activity);
      setSelectedDate(activity.scheduledDate);
      setFormOpen(true);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedActivity) {
        await updateActivity(selectedActivity.id, formData);
      } else {
        await addActivity(formData);
      }

      setFormOpen(false);
      setSelectedActivity(null);
      setSelectedDate("");

      await fetchActivities();
    } catch (err) {
      setError("Failed to save activity.");
    }
  };

  const handleClose = () => {
    setFormOpen(false);
    setSelectedActivity(null);
    setSelectedDate("");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={1}>
        Learning Calendar
      </Typography>

      <Typography color="text.secondary" mb={3}>
        Schedule and manage children's learning sessions.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box display="flex" justifycontent="center" p={5}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper sx={{
          p: 3,
          borderRadius: 3,
          backgroundColor: "background.paper",
          boxShadow: 3,
          overflow: "hidden",
        }}>
          <FullCalendar
            plugins={[
              themePlugin,
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
            ]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            events={calendarEvents}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            height="auto"
            selectable={true}
            dayMaxEvents={3}
          />
        </Paper>
      )}

      <ActivityForm
        open={formOpen}
        onClose={handleClose}
        handleSubmit={handleSubmit}
        editData={selectedActivity}
        initialDate={selectedDate}
      />
    </Box>
  );
};

export default Calendar;
