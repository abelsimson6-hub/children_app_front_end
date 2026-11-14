
import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

import {
  getVideos,
  getStudents,
  addVideo,
  updateVideo,
  deleteVideo,
} from "../services/videoservice";

import VideoForm from "../components/VideoForm";

function VideoClasses() {
  const [videos, setVideos] = useState([]);
  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState(null);

  const [deleteId, setDeleteId] = useState(null);

  // Fetch videos and students
  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [videoData, studentData] = await Promise.all([
        getVideos(),
        getStudents(),
      ]);

      setVideos(videoData);
      setStudents(studentData);
    } catch (error) {
      setError("Failed to load video classes. Check JSON Server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Add or update video
  const handleSaveVideo = async (videoData) => {
    try {
      setError("");

      if (editData) {
        await updateVideo(editData.id, videoData);
      } else {
        await addVideo(videoData);
      }

      setOpenForm(false);
      setEditData(null);

      await fetchData();
    } catch (error) {
      setError("Failed to save video.");
    }
  };

  // Open edit form
  const handleEdit = (video) => {
    setEditData(video);
    setOpenForm(true);
  };

  // Get assigned student names
  const getStudentNames = (assignedStudents = []) => {
    return assignedStudents
      .map((studentId) => {
        const student = students.find(
          (item) => String(item.id) === String(studentId)
        );

        return student?.childName;
      })
      .filter(Boolean);
  };

  // Delete video
  const handleDelete = async () => {
    try {
      setError("");

      await deleteVideo(deleteId);

      setDeleteId(null);

      await fetchData();
    } catch (error) {
      setError("Unable to delete video.");
    }
  };

  return (
    <Box sx={{ p: 3 }}>

      {/* Page Heading */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Video Classes
          </Typography>

          <Typography color="text.secondary">
            Manage learning videos and assign them to students.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setEditData(null);
            setOpenForm(true);
          }}
        >
          Add Video
        </Button>
      </Box>

      {/* Error Message */}
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {/* Loading */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Statistics */}
          <Grid container spacing={2} sx={{ mb: 3 }}>

            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <VideoLibraryIcon
                    color="primary"
                    fontSize="large"
                  />

                  <Typography variant="h4" fontWeight="bold">
                    {videos.length}
                  </Typography>

                  <Typography color="text.secondary">
                    Total Videos
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h4" fontWeight="bold">
                    {students.length}
                  </Typography>

                  <Typography color="text.secondary">
                    Student Records
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

          </Grid>

          {/* Video List Heading */}
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            All Video Classes
          </Typography>

          {/* Empty State */}
          {videos.length === 0 ? (
            <Card>
              <CardContent>
                <Typography color="text.secondary">
                  No video classes available. Click Add Video to create one.
                </Typography>
              </CardContent>
            </Card>
          ) : (

            /* Video Cards */
            <Grid container spacing={2}>
              {videos.map((video) => (

                <Grid item xs={12} sm={6} md={4} key={video.id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 3,
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>

                      <Typography variant="h6" fontWeight="bold">
                        {video.title}
                      </Typography>

                      <Chip
                        label={video.subject}
                        color="primary"
                        size="small"
                        sx={{ my: 1 }}
                      />

                      <Typography color="text.secondary" sx={{ mb: 1 }}>
                        Topic: {video.topic}
                      </Typography>

                      <Typography color="text.secondary" sx={{ mb: 1 }}>
                        Duration: {video.duration} minutes
                      </Typography>

                      <Typography color="text.secondary" sx={{ mb: 1 }}>
                        Scheduled Date: {video.scheduledDate}
                      </Typography>

                      {/* Assigned Students */}
                      <Typography fontWeight="medium" sx={{ mt: 2 }}>
                        Assigned Students:
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          flexWrap: "wrap",
                          mt: 1,
                        }}
                      >
                        {getStudentNames(video.assignedStudents).length > 0 ? (
                          getStudentNames(video.assignedStudents).map(
                            (name, index) => (
                              <Chip
                                key={`${name}-${index}`}
                                label={name}
                                size="small"
                                color="secondary"
                              />
                            )
                          )
                        ) : (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                          >
                            No students assigned
                          </Typography>
                        )}
                      </Box>

                      {/* Description */}
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 2 }}
                      >
                        {video.description}
                      </Typography>

                    </CardContent>

                    {/* Card Actions */}
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        flexWrap: "wrap",
                        p: 2,
                        pt: 0,
                      }}
                    >

                      <Button
                        size="small"
                        variant="contained"
                        startIcon={<PlayCircleIcon />}
                        onClick={() =>
                          window.open(
                            video.videoUrl,
                            "_blank",
                            "noopener,noreferrer"
                          )
                        }
                        disabled={!video.videoUrl}
                      >
                        Watch Video
                      </Button>

                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleEdit(video)}
                      >
                        Edit
                      </Button>

                      <Button
                        size="small"
                        color="error"
                        variant="outlined"
                        onClick={() => setDeleteId(video.id)}
                      >
                        Delete
                      </Button>

                    </Box>
                  </Card>
                </Grid>

              ))}
            </Grid>
          )}
        </>
      )}

      {/* Add / Edit Video Form */}
      <VideoForm
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setEditData(null);
        }}
        onSubmit={handleSaveVideo}
        students={students}
        editData={editData}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
      >
        <DialogTitle>
          Delete Video Class?
        </DialogTitle>

        <DialogContent>
          Are you sure you want to delete this video class?
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}

export default VideoClasses;
