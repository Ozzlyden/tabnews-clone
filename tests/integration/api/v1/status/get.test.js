import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("GET /api/v1/status", () => {
  describe("Anonymouse user", () => {
    test("Retrieving current system status", async () => {
      // VARIVAEIS DE TESTE
      const response = await fetch("http://localhost:3000/api/v1/status");
      const responseBody = await response.json(); // Conversao para json
      const parseUpdatedAt = new Date(responseBody.updated_at).toISOString(); // Verificando o conteudo

      // TESTES ESPERADOS
      expect(response.status).toBe(200);
      expect(responseBody.updated_at).toEqual(parseUpdatedAt);
      expect(responseBody.dependencies.database.version).toEqual("16.0");
      expect(responseBody.dependencies.database.max_connections).toEqual(100);
      expect(responseBody.dependencies.database.opened_connections).toEqual(1);
    });
  });
});
