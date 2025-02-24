const logger = require("../../../logger");
const db = require("../database")

class Models {
    constructor(tableName) {
        this.tableName = tableName
        this.db = db
    }


    insert( data) {  
    

        console.log("data:----------------------------->",data);
        try {
          const query = `INSERT INTO ${this.tableName} (${Object.keys(data).join(',')}) VALUES (${Object.values(data).map(value => '?').join(',')})`;
          const params = Object.values(data);
    
          console.log("query:----------------------------->",query);
          const result =this.db.runQuery(query,params)
          logger.info(`Datos insertados en la tabla ${this.tableName}`);
    
           const lastId =  this.db.query(`SELECT id FROM ${this.tableName} ORDER BY id DESC`)
          return {
           id:lastId[0].id,
            ...data
          }
        } catch (error) {
          logger.error(`Error al insertar datos en la tabla ${this.tableName}:`, error);
          throw error;
        }
    }

    getById(id){    
        return this.db.query(`SELECT * FROM ${this.tableName} WHERE id = ?`,[id])
    }
    getOne(filter){
       // console.log("filter:----------------------------->",filter)
        const query=`SELECT ${filter.select ? filter.select : '*'}
             FROM ${this.tableName}
              ${filter.joins ? filter.joins : ''}
            ${filter.where ? `WHERE ${filter.where}` : ''}`
      //  console.log("query:----------------------------->",query)
        return this.db.query(query,filter.params)
    }

    getAll(filter){

       console.log("filter:----------------------------->",filter)
        const query=`SELECT ${filter.select ? filter.select : '*'} FROM ${this.tableName} ${filter.joins ? filter.joins : ''} 
            ${filter.where ? `WHERE ${filter.where}` : ''} 
            ${filter.orderBy ? `ORDER BY ${filter.orderBy} ` : ''} 

            ${filter.limit ? `LIMIT ${filter.limit}` : ''}
            ${filter.offset ? `OFFSET ${filter.offset} ` : ''}
            `
      //  console.log("query:----------------------------->",query)
       
        const result = this.db.query(query,filter.params)
       // console.log("result:----------------------------->",result)
        return result
    }
    update(data){
        return this.db.query(`UPDATE ${this.tableName} SET
             ${Object.keys(data).map(key => `${key} = '${data[key]}'`).join(',')}
        WHERE id = '${data.id}'`,[],{type:"run"})
    }
    
    delete(id){
        return this.db.query(`DELETE FROM ${this.tableName} WHERE id = ?`,[id],{type:"run"})
    }

    deleteQuery(data){
        const query = `DELETE FROM ${this.tableName} WHERE ${data.where ? data.where : `id=${data.id}`}`
        console.log("query:----------------------------->",query)
        return this.db.query(query,[],{type:"run"})

    }
   
    createTable(schema){
        return this.db.createTable(this.tableName,schema)
    }
    getLastId(){
        return this.db.query(`SELECT MAX(id) FROM ${this.tableName}`)
    }
    getTotal(){ 
        return this.db.query(`SELECT COUNT(*) as total FROM ${this.tableName}`)
    }

    getLastId(){
        return this.db.query(`SELECT MAX(id) as id FROM ${this.tableName}`)
    }
}

module.exports = Models;  