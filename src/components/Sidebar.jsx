import React from 'react'
import { NavLink } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import AssignmentIcon from '@mui/icons-material/Assignment';
import VideocamIcon from '@mui/icons-material/Videocam';

function Sidebar() {
  return (
     <div className="sidebar">

      <h2>Kids Growth</h2>

      <NavLink to="/">
        <DashboardIcon />
        Dashboard
      </NavLink>

      <NavLink to="/activities">
        <SchoolIcon />
        Activities
      </NavLink>

      <NavLink to="/calender">
        <CalendarMonthIcon />
        Calendar
      </NavLink>

      <NavLink to="/reports">
        <AssessmentIcon />
        Reports
      </NavLink>

      <NavLink to="/task">
        <AssignmentIcon />
        Tasks
      </NavLink>

      <NavLink to="/video">
        <VideocamIcon />
        video class
      </NavLink>

      {/* <NavLink to="/settings">
        <SettingsIcon />
        Settings
      </NavLink> */}

    </div>
  )
}

export default Sidebar
