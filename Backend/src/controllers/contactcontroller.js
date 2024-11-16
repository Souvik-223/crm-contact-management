import mongoose from "mongoose";
import { contactValidation } from "../middleware/validation.js";

// getting the model
import ContactModel from "../models/ContactModel.js";

//gets all the contacts
export const getContacts = async (req, res) => {
  try {
    const Contacts = await ContactModel.find();
    res.status(200).json(Contacts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//creates a contact
export const createContact = async (req, res) => {
  try {
    await contactValidation.validateAsync(req.body);
    const { firstName, lastName, email, phonenumber, company, jobtitle } =
      req.body;

    const Contact = new ContactModel({
      firstName,
      lastName,
      email,
      phonenumber,
      company,
      jobtitle,
    });
    await Contact.save();
    res.status(201).json(Contact);
  } catch (error) {
    if (error.isJoi === true) {
      return res.status(422).send(error.details);
    }
    res.status(500).json({ message: "Invalid data", error: error });
  }
};

// Changes a contact
export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    await contactValidation.validateAsync(req.body);
    const { firstName, lastName, email, phonenumber, company, jobtitle } =
      req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No post with id: ${id}`);
    }

    const updatedcontact = {
      firstName,
      lastName,
      email,
      phonenumber,
      company,
      jobtitle,
      _id: id,
    };

    await ContactModel.findByIdAndUpdate(id, updatedcontact);
    res.status(200).json(updatedcontact);
  } catch (error) {
    if (error.isJoi === true) {
      return res.status(422).send(error.details);
    }
    res.status(500).json({ message: error.message });
  }
};

// Deletes a post
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);
    await ContactModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Contact deleted successfully." });
  } catch (error) {
    if (error.isJoi === true) {
      return res.status(422).send(error.details);
    }
    res.status(500).json({ message: error.message });
  }
};
