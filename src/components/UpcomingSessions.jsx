
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip
} from "@mui/material";

function UpcomingSessions({ activities }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = activities
    .filter((activity) => {
      const sessionDate = new Date(
        `${activity.scheduledDate}T00:00:00`
      );

      return (
        sessionDate >= today &&
        activity.status !== "Completed"
      );
    })
    .sort(
      (a, b) =>
        new Date(a.scheduledDate) -
        new Date(b.scheduledDate)
    )
    .slice(0, 5);

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Upcoming Sessions
      </Typography>

      {upcoming.length === 0 ? (
        <Typography color="text.secondary">
          No upcoming sessions
        </Typography>
      ) : (
        <List>
          {upcoming.map((activity) => (
            <ListItem
              key={activity.id}
              divider
              secondaryAction={
                <Chip
                  label={activity.status}
                  size="small"
                  color="primary"
                />
              }
            >
              <ListItemText
                primary={activity.title}
                secondary={`${activity.childName} • ${activity.scheduledDate} • ${activity.duration} min`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
}

export default UpcomingSessions;
