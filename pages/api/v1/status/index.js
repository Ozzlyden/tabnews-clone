import database from 'infra/database.js';

async function status(request, response){
  const updatedAt = new Date().toISOString(); // Pega da data atual no formato ISO 8601

// VARIAVEIS DE CONSULTA DO BD
  const databaseVersionResult = await database.query("SHOW server_version;");   // var de consulta ao BD do Postgres
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;   // Resposta que a gente queria da consulta

  const databaseMaxConnectionResult = await database.query("SHOW max_connections;");
  const databaseMaxConnectionValue = databaseMaxConnectionResult.rows[0].max_connections;

  // COMO EVITAR ATAQUE SQL INJECTION
  const databaseName = process.env.POSTGREST_DB;
  const databaseOpenedConnectionResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName]
  });

  const databaseOpenedConnectionValue = databaseOpenedConnectionResult.rows[0].count;

  console.log(databaseOpenedConnectionValue);

  response.status(200).json({
    updated_at: updatedAt,
    dependencies:{
      database:{
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionValue),
        opened_connections: databaseOpenedConnectionValue
      }
    }
  }); // Tbm envia resposta para API usando charset=utf-8
}

export default status;
