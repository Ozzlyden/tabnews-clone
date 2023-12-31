import {Client} from 'pg';
import { port } from 'pg/lib/defaults';
async function query(queryObject){

  // VAR DO BD
  const client = new Client({
    host:  process.env.POSTGRES_HOST,
    port:  process.env.POSTGRES_PORT,
    user:  process.env.POSTGRES_USER,
    database:  process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });


  // CONEXAO COM BD
  await client.connect();

  try{
    const result = await client.query(queryObject);
    return result;
  }catch(error){
    console.error(error);
  }finally{
    await client.end
  }
}

export default {
  query: query
};
