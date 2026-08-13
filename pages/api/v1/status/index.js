import database from "infra/database.js";

async function status(request, response) {
  // VARIAVEIS DE CONSULTA DO BD
  const updatedAt = new Date().toISOString(); // Pega da data atual no formato ISO 8601

  const databaseVersionResult = await database.query("SHOW server_version;"); // var de consulta ao BD do Postgres
  const databaseVersionValue = databaseVersionResult.rows[0].server_version; // Resposta que a gente queria da consulta

  const databaseMaxConnectionResult = await database.query(
    "SHOW max_connections;",
  ); // Mostra no número maximo de conexões do BD
  const databaseMaxConnectionValue =
    databaseMaxConnectionResult.rows[0].max_connections; // Por padrão geralmente são 100

  // EX DE COMO EVITAR ATAQUE SQL INJECTION
  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnectionResult = await database.query({
    // Para evitar, basta separar o texto dos valores que vc que injetar na Query
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  const databaseOpenedConnectionValue =
    databaseOpenedConnectionResult.rows[0].count;

  // Respostas da requisições HTTP com status OK (200)
  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionValue),
        opened_connections: databaseOpenedConnectionValue,
      },
    },
  }); // Tbm envia resposta para API usando charset=utf-8
}

export default status;
