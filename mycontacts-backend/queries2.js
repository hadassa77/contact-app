require('dotenv').config(); 
const db=require('./db');
const jwt=require('jsonwebtoken');
// Add at the top of your files

const your_secret_key =process.env.YOUR_SECRET_KEY;


async function registeruser(username, email, password) {
  const checkQuery = 'SELECT COUNT(*) AS count FROM users WHERE username = ?';
  const insertQuery = 'INSERT INTO users(username, email, password) VALUES(?, ?, ?)';
    try {
      const [rows] = await db.query(checkQuery, [username]);
      console.log(rows[0].count);
      if (rows[0].count > 0) {
          throw new Error('Username already exists');
      }
      const result = await db.query(insertQuery, [username, email, password]);
      return { id: result.insertId, message: 'User registered successfully' };
  } catch (err) {
      throw new Error('Error registering user: ' + err.message);
  }
}


async function loginuser(username, password) {
    const query = 'SELECT id,email, password FROM users WHERE username = ?';
    
    try {
        const [rows] = await db.query(query, [username]);
        if (rows.length === 0) {
            throw new Error('Invalid username or password');
        }

        const user = rows[0];
        
        if (password !== user.password) {
            throw new Error('Invalid username or password');
        }

        const token = jwt.sign({user:{ id: user.id, username: username,email:user.email,password:user.password }}, your_secret_key, { expiresIn: '1h' });

        return { token, message: 'Login successful' };
    } catch (err) {
        throw new Error('Error during login: ' + err.message);
    }
}


module.exports={registeruser,loginuser}