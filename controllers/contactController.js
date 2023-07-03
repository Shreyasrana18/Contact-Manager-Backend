const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// Get all contacts
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
});


// Get a single contact
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

// Create a contact
const createContact = asyncHandler(async (req, res) => {
    console.log("Request body: ", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        return res.status(400);
        throw new Error("Please fill all the fields");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id,
    });
    res.status(201).json(contact);
});
// Update a new contact
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User not authorized");
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id,
        req.body, { new: true });
    res.status(200).json(updatedContact);
});

// Delete a contact
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User not authorized");
    }
    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json(contact);
});

module.exports = { getContacts, updateContact, getContact, createContact, deleteContact };