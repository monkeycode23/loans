const Database = require('better-sqlite3');
const path = require('path');
const app = require('electron').app;
const logger = require('../../logger');
const fs = require('fs');


class DatabaseManager {

  constructor() {
    this.db = null;
    this.dbName = "test.db" ;
 
    this.dbPath = process.env.NODE_ENV === "development"
    ? './'
    : path.join(process.resourcesPath, this.dbName);

    console.log("dbPath:----------------------------->",process.env.NODE_ENV);
    this.connect()
  }
 
  connect() {
    try {
      
      const fullPath = path.join(this.dbPath, this.dbName);

      logger.info("Intentando acceder a la base de datos en:", fullPath);

      // Verificar si el archivo existe
      if (!fs.existsSync(fullPath)) {
        logger.error("No se encuentra el archivo de base de datos en:", fullPath);
        throw new Error("Archivo de base de datos no encontrado");
      }
      this.db = new Database(fullPath);
      logger.info("Database connected");
    } catch (error) {
      logger.error("Error al conectar a la base de datos:", error);
      throw error;
    }
  }


  createTable(tableName, schema) {
    try {
      const query = `CREATE TABLE IF NOT EXISTS ${tableName} (${schema})`;
      this.db.exec(query);
      logger.info(`Tabla ${tableName} creada correctamente`);
    } catch (error) {
      logger.error("Error al crear la tabla:", error);
      throw error;
    }
  }

  insert(tableName, data) {  
    
    console.log("data:----------------------------->",data);
    try {
      const query = `INSERT INTO ${tableName} (${Object.keys(data).join(',')}) VALUES (${Object.values(data).map(value => '?').join(',')})`;
      const params = Object.values(data);

      console.log("query:----------------------------->",query);
      this.db.prepare(query).run(Object.values(data));
      logger.info(`Datos insertados en la tabla ${tableName}`);

      const id = this.db.prepare(query).lastInsertRowId;
      return {
        id,
        ...data
      }
    } catch (error) {
      logger.error("Error al insertar datos en la tabla:", error);
      throw error;
    }
  }

  asyncQuery(sql, params = []) {
    try {
      const stmt = this.db.prepare(sql);

      return new Promise((resolve, reject) => {
        stmt.all(params, (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        });
      });
    } catch (error) {
      logger.error("Error al ejecutar la consulta:", error);
      throw error;
    }
  }

  transaction(operations) {
    return new Promise((resolve, reject) => {
      this.db.transaction(operations, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  query(sql, params = []) {
    try {
      const stmt = this.db.prepare(sql);
      return stmt.all(params);
    } catch (error) {
      logger.error("Error al ejecutar la consulta:", error);
      throw error;
    }
  }

  close() {
    this.db.close();
    logger.info("Base de datos cerrada");
  }


}


const db = new DatabaseManager();
  module.exports =db
