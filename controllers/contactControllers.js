const asyncHandler = require('express-async-handler');
const Contact=require("../models/contactModel")

//@desc get all contacts
//@route GET /api/contacts
//@access private
const getContacts=asyncHandler(async(req, res) => {
    const contacts = await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts)
})


//@desc craete contacts
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async(req, res) => {
    console.log('the req body is', req.body)
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        return res.status(400).json({
            message: "All fields are mandatory"
        })
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    })
    res.status(201).json(contact)
})

//@desc get contact
//@route GET /api/contact/:id
//@access private
const getContact=asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found")
    }
    res.status(200).json(contact)
})

//@desc update contact
//@route  PUT /api/contact/:id
//@access private
const updateContact=asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found")
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permisiion to update other users  contact")
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true},
    )
       
    res.status(200).json(updatedContact)
})

//@desc delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact=asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found")
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permisiion to delete other users  contact")
    }
    await contact.deleteOne({_id:req.paramas.id});
    res.status(200).json(contact)
})

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};