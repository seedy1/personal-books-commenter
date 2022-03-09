import { getConnection } from "typeorm";
import { TestInitConnection } from "../lib/databaseConfig";


before(async function() {
  console.log("setting up db - BEFORE");
  await TestInitConnection();
  await clearDB("TRUNCATE")
});



async function clearDB(kind: string){

  // await (await connect(DB_CONNECTION)).Collection.drop();
  const models = getConnection().entityMetadatas;
  const conn = getConnection();

//   for(const model in models){
  for(const model of models){

    if(kind == "TRUNCATE"){
            // await conn.query(`SET FOREIGN_KEY_CHECKS = 0; TRUNCATE ${model.tableName}; SET FOREIGN_KEY_CHECKS = 1;`);
            await conn.query("SET FOREIGN_KEY_CHECKS = 0;");
            await conn.query(`TRUNCATE ${model.tableName};`);
            await conn.query("SET FOREIGN_KEY_CHECKS = 1;");
        }else if(kind == "DELETE"){
            // await conn.query(`SET FOREIGN_KEY_CHECKS=0; DELETE TABLE ${model.tableName}; SET FOREIGN_KEY_CHECKS=1;`);
            await conn.query("SET FOREIGN_KEY_CHECKS = 0;");
            await conn.query(`DELETE ${model.tableName};`);
            await conn.query("SET FOREIGN_KEY_CHECKS = 1;");
        }
  }

  console.log('DB cleared...');

}

