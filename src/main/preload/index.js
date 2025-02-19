
const { contextBridge, ipcRenderer } = require('electron');
const database = require('../ipcs/database');



contextBridge.exposeInMainWorld('electron', {
  checkForUpdates: () => ipcRenderer.invoke('check-for-updates'),
  
});



/* 
    Expose the database to the preload set invoke methods for database
*/

contextBridge.exposeInMainWorld('database', {
    models: {
        ...database
    }
  });