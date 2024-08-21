const{registeruser,loginuser}=require('../queries2');
const{validateToken}=require("../middleware/validatetokenHandler.js")
// @desc Get all users
// @router GET /api/users/register
// @access public
const getUsers = async (req, res) => {
    const { username, email, password} = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are mandatory' });
  }

  try {
    const result = await registeruser(username, email, password);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Error adding user: ' + err.message });
  }
};
  
// @desc Get all login users
// @router GET /api/users/login
// @access public
const getloginUsers = async (req, res) => {
  const{username,password}=req.body;
    if(!username){
      throw new Error('username is mandatory!');
    }
    try{
      const result= await loginuser(username,password);
      res.status(201).json(result);
    }
    catch(err){
      res.status(500).json({error:'error loging'+err.message});
    }
};

// @desc Get all users
// @router GET /api/users/current
// @access private
const getcurrentUsers = async (req, res) => {
    res.json(req.user);
};
module.exports={getUsers,
    getloginUsers,getcurrentUsers}