import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { rows } from "./data";
import { useTheme } from "@mui/material";
import { Box, Typography, TextField, Button } from "@mui/material";
import {
  AdminPanelSettingsOutlined,
  LockOpenOutlined,
} from "@mui/icons-material";

const Team = () => {
  const theme = useTheme();

  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Integrate with backend API
    console.log("Contact form submitted:", formData);
    setSubmitted(true);
    // Optionally reset form
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 33,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Name",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "access",
      headerName: "Access",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row: { access } }) => {
        const bgColor =
          access === "Admin"
            ? theme.palette.primary.dark
            : "#3da58a";

        return (
          <Box
            sx={{
              p: "5px",
              width: "99px",
              borderRadius: "3px",
              textAlign: "center",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              backgroundColor: bgColor,
            }}
          >
            {access === "Admin" && (
              <AdminPanelSettingsOutlined sx={{ color: "#fff" }} fontSize="small" />
            )}
            {access === "User" && (
              <LockOpenOutlined sx={{ color: "#fff" }} fontSize="small" />
            )}
            <Typography sx={{ fontSize: "13px", color: "#fff" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box sx={{ p: 2 }}>
      {/* Data Grid Section */}
      <Box sx={{ height: 600, mx: "auto", mb: 4 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
        />
      </Box>

      {/* Contact Form Section */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 600,
          mx: "auto",
          p: 3,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h6" align="center">
          Contact Us
        </Typography>

        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <TextField
          label="Subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />

        <TextField
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          multiline
          rows={4}
          required
        />

        <Button variant="contained" type="submit">
          Send Message
        </Button>

        {submitted && (
          <Typography color="success.main" align="center">
            Thank you! Your message has been sent.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Team;