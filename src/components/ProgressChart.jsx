
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

import { Paper, Typography, Box } from "@mui/material";

function ProgressChart({ activities }) {
  const data = [
    {
      name: "Completed",
      value: activities.filter(
        (item) => item.status === "Completed"
      ).length
    },
    {
      name: "In Progress",
      value: activities.filter(
        (item) => item.status === "In Progress"
      ).length
    },
    {
      name: "Not Started",
      value: activities.filter(
        (item) => item.status === "Not Started"
      ).length
    }
  ];

  const COLORS = ["#4CAF50", "#FF9800", "#9E9E9E"];

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Learning Progress
      </Typography>

      <Box sx={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}

export default ProgressChart;
