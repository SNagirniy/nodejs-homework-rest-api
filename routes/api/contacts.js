const express = require("express");
const { creationSchema, updateSchema } = require("./validationSchema");
const createErrorr = require("./error");

const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const allContacts = await listContacts();
    res.json(allContacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const ContactById = await getContactById(contactId);
    if (!ContactById) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.json(ContactById);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { value, error } = creationSchema.validate(req.body);
    if (error) {
      throw createErrorr(400, error.message);
    }

    const newContact = await addContact(value);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await removeContact(contactId);
    if (deletedContact) {
      res.status(201).json({ message: "contact deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { value, error } = updateSchema.validate(req.body);
    if (error) {
      throw createErrorr(400, "missing fields");
    }
    const { contactId } = req.params;

    const updatedContact = await updateContact(contactId, value);
    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
