
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Button,
  Chip
} from "@mui/material";

function ActivityTable({
  activities,
  handleEdit,
  handleDelete
}) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Child</TableCell>
            <TableCell>Activity</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Progress</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {activities.map((activity) => (
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
                />
              </TableCell>

              <TableCell>
                {activity.progress}%
              </TableCell>

              <TableCell>
                <Button
                  size="small"
                  onClick={() => handleEdit(activity)}
                >
                  Edit
                </Button>

                <Button
                  size="small"
                  color="error"
                  onClick={() => handleDelete(activity.id)}
                >
                  Delete
                </Button>
              </TableCell>

            </TableRow>
          ))}

          {activities.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} align="center">
                No activities found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ActivityTable;

