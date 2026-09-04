import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

describe("GET /api/v1/migrations", () => {
  describe("Anonymouse user", () => {
    test("Retrieving pending migrations", async () => {
      // VARIVAEIS DE TESTE
      const response = await fetch("http://localhost:3000/api/v1/migrations");
      const responseBody = await response.json();

      // TESTES ESPERADOS
      expect(response.status).toBe(200);

      expect(Array.isArray(responseBody)).toBe(true);
      expect(responseBody.length).toBeGreaterThan(0);
    });
  });
});
