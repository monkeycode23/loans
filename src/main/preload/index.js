
const { contextBridge, ipcRenderer } = require('electron');
const database = require('../ipcs/database');


/* 
    Expose the database to the preload set invoke methods for database
*/

contextBridge.exposeInMainWorld('database', {
    models: {
        ...database
    }
  });

  contextBridge.exposeInMainWorld('electron', {
    exportDatabaseToCSV: (dbname) => ipcRenderer.send('export-csv', dbname),
  });

  contextBridge.exposeInMainWorld('updater', {
    checkForUpdates: () => ipcRenderer.send('check-for-updates'),
    onUpdateAvailable: (callback) => ipcRenderer.on('update-available', callback),
    onUpdateDownloaded: (callback) => ipcRenderer.on('update-downloaded', callback),
    onDownloadProgress: (callback) => ipcRenderer.on('download-progress', callback),
    onUpdateError: (callback) => ipcRenderer.on('update-error', callback), // Agregado para manejar errores
    downloadUpdate: () => ipcRenderer.send('download-update'),
    quitAndInstall: () => ipcRenderer.send('quit-and-install'),
});