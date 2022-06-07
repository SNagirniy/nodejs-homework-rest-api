const express = require("express");

const router = express.Router();

const { validateRequest } = require("../../Middlewares/validateRequest");

const {
  creationSchema,
  updateSchema,
  updateFavouriteSchema,
} = require("./validationSchema");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../Controlers/apiControlers");

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post(
  "/",
  validateRequest(creationSchema, "missing required name field"),
  addContact
);

router.delete("/:contactId", removeContact);

router.put(
  "/:contactId",
  validateRequest(updateSchema, "missing fields"),
  updateContact
);

router.patch(
  "/:contactId/favorite",
  validateRequest(updateFavouriteSchema, "missing field favorite"),
  updateStatusContact
);

module.exports = router;
