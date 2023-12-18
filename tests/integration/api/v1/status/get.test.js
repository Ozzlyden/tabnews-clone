test("GET to /api/v1/status should return 200", async() => {

  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();   // Conversao para json
  expect(responseBody.updated_at).toBeDefined();  // Verificacao da existencia da updated_at

  const parseUpdatedAt = new Date(responseBody.updated_at).toISOString(); // Verificando o conteudo
  expect(responseBody.updated_at).toEqual(parseUpdatedAt);

  expect(responseBody.dependencies.database.version).toEqual("16.0");
});
