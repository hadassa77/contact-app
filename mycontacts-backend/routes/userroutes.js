const express=require('express');

const router=express.Router();
const {getUsers,getloginUsers,getcurrentUsers}=require("../controllers/usercontroller.js")
const {validateToken}=require("../middleware/validatetokenHandler.js")

router.route('/register').post (getUsers);
router.route('/login').post(getloginUsers);
router.route('/current').get(validateToken, getcurrentUsers);
module.exports= router;