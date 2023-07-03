const express = require("express");
const router = express.Router();
const { getContacts,
    createContact,
    updateContact,
    deleteContact,
    getContact } = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

const app = express();

router.use(validateToken);
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);



module.exports = router;