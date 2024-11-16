import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phonenumber: Number,
  company: String,
  jobtitle: String,
});

var ContactModel = mongoose.model("Contacts", contactSchema);

export default ContactModel;
