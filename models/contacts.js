const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const contact = allContacts.find((item) => item.id === String(contactId));
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const itemIndex = allContacts.findIndex(
    (item) => item.id === String(contactId)
  );

  if (itemIndex !== -1) {
    const deletedContact = allContacts[itemIndex];
    allContacts.splice(itemIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
    return deletedContact;
  }
  return null;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const newContact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };

  const allContacts = await listContacts();
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const itemIndex = allContacts.findIndex(
    (item) => item.id === String(contactId)
  );
  if (itemIndex === -1) {
    return null;
  }
  allContacts[itemIndex] = { ...allContacts[itemIndex], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return allContacts[itemIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
