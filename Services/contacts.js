const { Contacts } = require("../models/contactsShcema");

const listContacts = async (id) => {
  return Contacts.find({ owner: id }).populate(
    "owner",
    "_id email subscription"
  );
};

const getContactById = async (contactId) => {
  return Contacts.findById(contactId);
};

const removeContact = async (contactId) => {
  return Contacts.findByIdAndRemove(contactId);
};

const addContact = async (body) => {
  return Contacts.create(body);
};

const updateContact = async (contactId, body) => {
  return Contacts.findByIdAndUpdate(contactId, body, { new: true });
};

const updateStatusContact = async (contactId, body) => {
  const favorite = body.favorite;
  return Contacts.findByIdAndUpdate(contactId, { favorite }, { new: true });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
