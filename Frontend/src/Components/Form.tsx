import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import axios from "axios";
import { Form, redirect } from "react-router-dom";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  company: string;
  jobTitle: string;
}

const ContactForm: React.FC = () => {
  //chekc if the form is for editing or adding
  const isEdit = window.location.pathname.includes("/contact");

  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    company: "",
    jobTitle: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.post("https://localhost:4000/contacts", formData);
    redirect("/");
  };

  return (
    <Box
      sx={{
        borderRadius: 5,
        padding: 3,
        color: "white",
        background: "linear-gradient(to bottom right, #FDFCFB, #E2D1C3)",
      }}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          variant="outlined"
          margin="normal"
          fullWidth
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Phone Number"
          variant="outlined"
          margin="normal"
          fullWidth
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <TextField
          label="Company"
          variant="outlined"
          margin="normal"
          fullWidth
          name="company"
          value={formData.company}
          onChange={handleChange}
        />
        <TextField
          label="Job Title"
          variant="outlined"
          margin="normal"
          fullWidth
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default ContactForm;
