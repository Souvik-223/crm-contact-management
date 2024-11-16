import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import ContactForm from "./Components/Form";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addcontact" element={<ContactForm />} />
        <Route path="/contact/:id" element={<ContactForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
