import React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
// import ContactForm from "../Components/ContactForm";
import ContactList from "./ContactList";

export default function Home() {
  return (
    <div>
      <div className="header">
        <Button variant="outlined" href="/addcontact">
          Add new Conatct
        </Button>
        {/* <Button variant="contained">Show all Contacts</Button> */}
      </div>
      <div>
        <ContactList />
      </div>
    </div>
  );
}
