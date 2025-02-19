const Database = require('../database');

class Users {
  constructor() {
    this.db = Database;
    this.tableName = "users";
    this.createTable();
  }
  createTable(){
    const query = `id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT, password TEXT`;
    return this.db.createTable("users",query);
  }
  async createUser(user) {
    console.log("user:----------------------------->",user);
    return this.db.insert(this.tableName,user);
  }
  
  async getUser(filter) {
    const query = `SELECT * FROM ${this.tableName} WHERE ${Object.keys(filter)[0]} = ?`;
    const params = [Object.values(filter)[0]];
    
    return await this.db.asyncQuery(query, params);
  }

  async getUserByEmail(email) {
    const query = `SELECT * FROM users WHERE email = ?`;
    const params = [email];
    return this.db.asyncQuery(query, params);
  }

  async getUserById(id) {
    const query = `SELECT * FROM users WHERE id = ?`;
    const params = [id];
    return this.db.asyncQuery(query, params);
  }

  async updateUser(user) {
    const { id, username, email, password } = user;
    const query = `UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?`;
    const params = [username, email, password, id];
    return this.db.asyncQuery(query, params);
  }

  async deleteUser(id) {
    const query = `DELETE FROM users WHERE id = ?`;
    const params = [id];
    return this.db.asyncQuery(query, params);
  }
  
  
}   

module.exports = Users;
