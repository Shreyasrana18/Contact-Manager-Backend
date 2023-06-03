const asyncHandler = require("express-async-handler");


// Get all contacts
const getContacts = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "get all contacts" });
});


// Get a single contact
const getContact = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `get contact for ${req.params.id}` });
});

// Create a contact
const createContact = asyncHandler(async (req, res) => {
    console.log("Request body: ", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        return res.status(400);
        throw new Error("Please fill all the fields");
    }
    res.status(201).json({ message: "Create contacts" });
});
// Update a new contact
const updateContact = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `update contact for ${req.params.id}` });
});

// Delete a contact
const deleteContact = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete contact for this ${req.params.id}` });
});

module.exports = { getContacts, updateContact, getContact, createContact, deleteContact };