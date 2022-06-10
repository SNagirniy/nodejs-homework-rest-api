const contacts = require("../Services/contacts");

const listContacts = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const allContacts = await contacts.listContacts(_id);
    res.json(allContacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const ContactById = await contacts.getContactById(contactId);

    if (!ContactById) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.json(ContactById);
    }
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const newContact = await contacts.addContact({ ...req.body, owner: _id });
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await contacts.removeContact(contactId);
    if (deletedContact) {
      res.status(201).json({ message: "contact deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await contacts.updateContact(contactId, req.body);
    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedStatus = await contacts.updateStatusContact(
      contactId,
      req.body
    );
    if (updatedStatus) {
      res.status(200).json(updatedStatus);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
