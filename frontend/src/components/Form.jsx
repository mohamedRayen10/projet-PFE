import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Alert, Button, MenuItem, Snackbar, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

const roles = [
  { value: "Admin", label: "Admin" },
  { value: "User", label: "User" },
];

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const handleClick = () => setOpen(true);

  const onSubmit = async (formData) => {
    // Convert the selected role into the isAdmin boolean field
    formData.isAdmin = formData.role === "Admin";
    // Remove the role field as it's not in the model
    delete formData.role;

    console.log("Submitting form data:", formData);
    try {
      const res = await fetch(`/backend/user/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (!res.ok) {
        console.error("Error:", result.message);
      } else {
        console.log("User created successfully", result);
        handleClick();
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <Box sx={{ bgcolor: "background.default", color: "text.primary", p: 3 }}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          bgcolor: "background.paper",
          borderRadius: 2,
          p: 3,
          boxShadow: 2,
        }}
        noValidate
        autoComplete="off"
      >
        {/* Username field */}
        <Stack sx={{ gap: 2 }} direction="row">
          <TextField
            error={Boolean(errors.username)}
            helperText={
              errors.username
                ? "Username is required and must be at least 3 characters"
                : null
            }
            {...register("username", { required: true, minLength: 3 })}
            sx={{ flex: 1 }}
            label="Username"
            variant="filled"
            InputProps={{
              sx: { bgcolor: "background.paper", color: "text.primary" },
            }}
          />
        </Stack>

        {/* Email field */}
        <TextField
          error={Boolean(errors.email)}
          helperText={errors.email ? "Please provide a valid email address" : null}
          {...register("email", { required: true })}
          label="Email"
          variant="filled"
          InputProps={{
            sx: { bgcolor: "background.paper", color: "text.primary" },
          }}
        />

        {/* Tele field */}
        <TextField
          error={Boolean(errors.tele)}
          helperText={
            errors.tele ? "Please provide a valid phone number" : null
          }
          {...register("tele", { required: true })}
          label="Contact Number"
          variant="filled"
          InputProps={{
            sx: { bgcolor: "background.paper", color: "text.primary" },
          }}
        />

        {/* Password Field */}
        <TextField
          error={Boolean(errors.password)}
          helperText={
            errors.password
              ? "Password must be at least 6 characters"
              : null
          }
          {...register("password", { required: true, minLength: 6 })}
          label="Password"
          type="password"
          variant="filled"
          InputProps={{
            sx: { bgcolor: "background.paper", color: "text.primary" },
          }}
        />

        {/* Role Field: used for mapping to isAdmin */}
        <TextField
          variant="filled"
          id="select-role"
          select
          label="Role"
          defaultValue="User"
          {...register("role", { required: true })}
          InputProps={{
            sx: { bgcolor: "background.paper", color: "text.primary" },
          }}
        >
          {roles.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <Box sx={{ textAlign: "right" }}>
          <Button
            type="submit"
            sx={{
              textTransform: "capitalize",
              bgcolor: "primary.main",
              color: "white",
              "&:hover": {
                bgcolor: "primary.dark",
              },
            }}
            variant="contained"
          >
            Create New User
          </Button>

          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
              Account created successfully
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </Box>
  );
};

export default Form;
