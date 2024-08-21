
const { adduser, getusers,getuser,putuser,deleteuser } = require('./queries');
const{validateToken}=require("../middleware/validatetokenHandler.js")


// @desc Get all contacts
// @router GET /api/contacts
// @access private
const getContacts = async (req, res) => {
  const user_id=req.user.id;
  try {
    const contacts = await getusers(user_id);
    if (contacts.length === 0) {
      return res.status(404).json({ message: 'No contacts found' });
    }
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Error getting contacts: ' + err.message });
  }
};

// @desc Create new contact
// @router POST /api/contacts
// @access private
const createContacts = async (req, res) => {
  const { name, email, phone } = req.body;
  const user_id=req.user.id;
  console.log(user_id);
  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'All fields are mandatory' });
  }

  try {
    const result = await adduser(name, email, phone,user_id);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Error adding contact: ' + err.message });
  }
};

// @desc Get a contact by ID
// @router GET /api/contacts/:id
// @access private
const getContact = async (req, res) => {
    const { id } = req.params;
    
    try {
      const contacts = await getuser(id);
      
      // Check if contacts are found
      if (contacts.length === 0) {
        return res.status(404).json({ message: 'No contact found' });
      }
      
      // Return the found contact
      res.status(200).json(contacts);
    } catch (err) {
      // Handle errors
      res.status(500).json({ error: 'Error getting contact: ' + err.message });
    }
  };

// @desc Update a contact by ID
// @router PUT /api/contacts/:id
// @access private
const putContacts = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const user_id=req.user.id;
  
    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'All fields are mandatory' });
    }
  
    try {
      const result = await putuser(id, name, email, phone,user_id);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: 'Error updating contact: ' + err.message });
    }
  };
  
  // @desc Delete a contact by ID
  // @router DELETE /api/contacts/:id
  // @access private
  const deleteContacts = async (req, res) => {
    const { id } = req.params;
    const user_id=req.user.id;
  
    try {
      const result = await deleteuser(id,user_id);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: 'Error deleting contact: ' + err.message });
    }
  };
module.exports = { getContacts, createContacts, getContact, putContacts, deleteContacts };
