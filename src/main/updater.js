const {autoUpdater} = require('electron-updater');

function checkForUpdates() {
    // Solo ejecutar el actualizador si la app está empaquetada
    if (!app.isPackaged) {
      logger.info('Saltando verificación de actualizaciones en modo desarrollo');
      return;
    }
  
    try {
      autoUpdater.logger = logger;
      autoUpdater.checkForUpdatesAndNotify();
  
      autoUpdater.on('update-available', (info) => {
        logger.info('Actualización disponible:', info);
      });
  
      autoUpdater.on('update-downloaded', (info) => {
        logger.info('Actualización descargada:', info);
      });
  
      autoUpdater.on('error', (err) => {
        logger.error('Error en actualización:', err);
      });
    } catch (error) {
      logger.error('Error al inicializar el actualizador:', error);
    }
  }