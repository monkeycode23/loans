const Users = require('../../storage/database/Models/Users');

const DatabaseIpcMain =(event, data) => {
    const method = data.method;
    const params = data.params;
    let result; 
    switch(data.model){
      case 'users':
        const users = new Users();
        console.log("method:----------------------------->",data.model,data.method,data.params);
        result = users[method](params);
        break;
      default:
        break;
    }
    return result
  }





module.exports = DatabaseIpcMain