const { Contacts } = require("../models/contactsShcema");

const listContacts = async (id, page, limit, favorite) => {
  const skiped = page * limit - limit;
  const skip = skiped < 0 ? 0 : skiped;

  const contacts = Contacts.find({ owner: id }, "", {
    skip,
    limit: +limit,
  }).populate("owner", "_id email subscription");

  if (favorite !== null) {
    contacts.setQuery({ owner: id, favorite });
  }

  return contacts;
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
