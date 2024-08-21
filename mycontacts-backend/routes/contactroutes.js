const express=require("express");
const{validateToken}=require("../middleware/validatetokenHandler.js")

const router=express.Router();
const {getContacts,
    createContacts,
    getContact,
    putContacts,
    deleteContacts
}=require("../controllers/contactcontroller.js")
router.use(validateToken);
router.route('/').get(getContacts);

router.route('/').post(createContacts);
router.route('/:id').get(getContact);
router.route('/:id').put(putContacts);
router.route('/:id').delete(deleteContacts);

module.exports =router;
