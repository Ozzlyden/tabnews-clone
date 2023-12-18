import database from 'infra/database.js';

async function status(request, response){
  const updatedAt = new Date().toISOString(); // Pega da data atual no formato ISO 8601

// VARIAVEIS DE CONSULTA DO BD
  const databaseVersionResult = await database.query("SHOW server_version;");   // var de consulta ao BD do Postgres
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;   // Resposta que a gente queria da consulta

  response.status(200).json({
    updated_at: updatedAt,
    dependencies:{
      database:{
        version: databaseVersionValue
      }
    }
  }); // Tbm envia resposta para API usando charset=utf-8
}

export default status;
