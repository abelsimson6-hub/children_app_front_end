
import {
  TextField,
  MenuItem,
  Button,
  Box
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

function ActivityFilters({
  search,
  setSearch,
  category,
  setCategory,
  status,
  setStatus,
  handleClear
}) {
  return (
    <Box
      display="flex"
      gap={2}
      flexWrap="wrap"
      mb={3}
    >

      <TextField
        placeholder="Search activities..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size="small"
        sx={{ minWidth: 220 }}
        slotProps={{
          input: {
            startAdornment: <SearchIcon sx={{ mr: 1 }} />
          }
        }}
      />

      <TextField
        select
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        size="small"
        sx={{ minWidth: 150 }}
      >
        <MenuItem value="All">All Categories</MenuItem>
        <MenuItem value="Language">Language</MenuItem>
        <MenuItem value="Maths">Maths</MenuItem>
        <MenuItem value="Science">Science</MenuItem>
        <MenuItem value="Art">Art</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </TextField>

      <TextField
        select
        label="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        size="small"
        sx={{ minWidth: 150 }}
      >
        <MenuItem value="All">All Status</MenuItem>
        <MenuItem value="Not Started">Not Started</MenuItem>
        <MenuItem value="In Progress">In Progress</MenuItem>
        <MenuItem value="Completed">Completed</MenuItem>
      </TextField>

      <Button
        variant="outlined"
        onClick={handleClear}
      >
        Clear Filters
      </Button>

    </Box>
  );
}

export default ActivityFilters;
