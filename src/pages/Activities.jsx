
import { useEffect, useMemo, useState } from "react";

import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import {
  getActivities,
  addActivity,
  updateActivity,
  deleteActivity
} from "../services/activityServices";

import ActivityForm from "../components/ActivityForm";
import ActivityTable from "../components/ActivityTable";
import ActivityFilters from "../components/ActivityFilters";
import Pagination from "../components/Pagination";

function Activities() {
  const [activities, setActivities] = useState([]);

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //search & filters
  const [search,setSearch]=useState("")
  const [category,setCategory]=useState("All")
  const [status,setStatus]=useState("All")

  //pagination
  const [page,setPage]=useState(0)
  const [rowsPerPage,setRowsPerPage]=useState(5)

  // Fetch activities
  const fetchActivities = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getActivities();
      setActivities(data);
    } catch (error) {
      setError("Failed to fetch activities");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

   // Filter activities
  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        activity.title.toLowerCase().includes(searchValue) ||
        activity.childName.toLowerCase().includes(searchValue);

      const matchesCategory =
        category === "All" ||
        activity.category === category;

      const matchesStatus =
        status === "All" ||
        activity.status === status;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [activities, search, category, status]);

   // Pagination
  const paginatedActivities = useMemo(() => {
    const startIndex = page * rowsPerPage;

    return filteredActivities.slice(
      startIndex,
      startIndex + rowsPerPage
    );
  }, [filteredActivities, page, rowsPerPage]);

    // Clear filters
  const handleClear = () => {
    setSearch("");
    setCategory("All");
    setStatus("All");
    setPage(0);
  };

  // Open Add Dialog
  const handleAdd = () => {
    setEditData(null);
    setOpen(true);
  };

  // Open Edit Dialog
  const handleEdit = (activity) => {
    setEditData(activity);
    setOpen(true);
  };

  // Add or Update
  const handleSubmit = async (formData) => {
    try {
      setError("");

      if (editData) {
        await updateActivity(editData.id, formData);
      } else {
        await addActivity(formData);
      }

      setOpen(false);
      setEditData(null);

      await fetchActivities();
    } catch (error) {
      setError("Failed to save activity");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this activity?"
    );

    if (!confirmDelete) return;

    try {
      setError("");

      await deleteActivity(id);
      await fetchActivities();
    } catch (error) {
      setError("Failed to delete activity");
    }
  };

  return (
     <Box className="page-container" sx={{}}>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">
          Learning Activities
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
        >
          Add Activity
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <ActivityFilters
        search={search}
        setSearch={(value) => {
          setSearch(value);
          setPage(0);
        }}
        category={category}
        setCategory={(value) => {
          setCategory(value);
          setPage(0);
        }}
        status={status}
        setStatus={(value) => {
          setStatus(value);
          setPage(0);
        }}
        handleClear={handleClear}
      />

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <ActivityTable
            activities={paginatedActivities}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />

          {/* <Pagination
            count={filteredActivities.length}
            page={page}
            rowsPerPage={rowsPerPage}
            setPage={setPage}
            setRowsPerPage={setRowsPerPage}
          /> */}
        </>
      )}

      <ActivityForm
        open={open}
        handleClose={() => setOpen(false)}
        handleSubmit={handleSubmit}
        editData={editData}
      />

    </Box>
  );
}

export default Activities;

