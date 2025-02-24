const { app, BrowserWindow,ipcMain } = require('electron');
const path = require('path');
const logger = require('./logger.js');
const {checkForUpdates} = require('./updater');
const dotenv = require('dotenv');

dotenv.config();

 ipcMain.on('check-for-updates', () => {
    checkForUpdates();
}); 
 





  
  const DatabaseIpcMain = require('./ipcs/database/ipcmain');
  ipcMain.handle('database', DatabaseIpcMain);


const {generateCSV} = require('./helpers/index');
  
ipcMain.handle('download-csv', async (event) => {
  const csvData = await generateCSV(); // Implementa esta función para generar tu CSV
  const downloadsPath = app.getPath('downloads');
  const filePath = path.join(downloadsPath, 'datos.csv');

  fs.writeFileSync(filePath, csvData);
  return filePath; // Devuelve la ruta del archivo
});


  let mainWindow;

  const baseUrl = "http://localhost:3000";

  function createWindow() {
    mainWindow = new BrowserWindow({
      width: 1024,
      height: 768,
      webPreferences: {
        preload: path.join(__dirname, 'preload/index.js'), // Cargar el archivo de preload
        nodeIntegration: true,
        contextIsolation: true, // Esto debería ser true en producción
        webSecurity: true, // Activar en producción por seguridad
        nodeIntegrationInWorker: true,
        enableRemoteModule: true // Deprecado en versiones nuevas de Electron
      }
    });

    // Determina qué cargar basado en el ambiente
    if (!app.isPackaged) {
      // Ambiente de desarrollo - Carga desde webpack dev server
      mainWindow.loadURL('http://localhost:3000');
      // Abre las herramientas de desarrollo
      mainWindow.webContents.openDevTools();
      logger.info('Cargando desde servidor de desarrollo');
    } else {
      // Ambiente de producción - Carga el archivo compilado
      mainWindow.loadFile(path.join(__dirname, '../../dist/index.html'));
      logger.info('Cargando desde archivo local');
    }
  
    // Test de base de datos
  

    // Emitido cuando la ventana es cerrada
    mainWindow.on('closed', () => {
      mainWindow = null;
    });
  }
  app.whenReady().then(createWindow).then(checkForUpdates);
  
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });