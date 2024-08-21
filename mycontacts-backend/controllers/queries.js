const db=require('../db');

async function adduser(name,email,phone,user_id){
    const query='insert into Contacts(name,email,phone,user_id)values(?,?,?,?)';
    console.log(user_id)
    try{
    const [result]= await db.query(query,[name,email,phone,user_id])
     return { id: result.insertId, message: 'User added successfully' };
} catch (err) {
  throw new Error('Error inserting data: ' + err.message);
}
}

async function getusers(user_id){
    const query='select * from Contacts where user_id=?';
    try{
        const [result]=await db.query(query,[user_id]);
        return{result}; 
    }
    catch(err){
        throw new Error('error getting contacts'+err.message);
    }
}

async function getuser(id) {
    const query = 'SELECT * FROM Contacts WHERE id = ?';
    try {
      const [rows] = await db.query(query, [id]);
      return rows; // Adjust the key if needed
    } catch (err) {
      throw new Error('Error querying database: ' + err.message);
    }
  }
  async function putuser(id, name, email, phone,user_id) {
    const query = 'UPDATE Contacts SET name = ?, email = ?, phone = ? WHERE id = ? and user_id=?';
    try {
      const [result] = await db.query(query, [name, email, phone, id,user_id]);
      if (result.affectedRows === 0) {
        throw new Error('No contact found to update');
      }
      return { message: 'User updated successfully' };
    } catch (err) {
      throw new Error('Error updating data: ' + err.message);
    }
  }
  
  // Function to delete a user by ID
  async function deleteuser(id,user_id) {
    const query = 'DELETE FROM Contacts WHERE id = ? and user_id=?';
    try {
      const [result] = await db.query(query, [id,user_id]);
      if (result.affectedRows === 0) {
        throw new Error('No contact found to delete');
      }
      return { message: 'User deleted successfully' };
    } catch (err) {
      throw new Error('Error deleting data: ' + err.message);
    }
  }
module.exports={adduser,getusers,getuser,putuser,deleteuser}