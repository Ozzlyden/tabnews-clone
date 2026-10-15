import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("POST /api/v1/status", () => {
  describe("Anonymouse user", () => {
    test("Retrieving current system status", async () => {
      // VARIVAEIS DE TESTE
      const response = await fetch("http://localhost:3000/api/v1/status", {
        method: "POST",
      });
      // TESTES ESPERADOS
      expect(response.status).toBe(405);

      const responseBody = await response.json();
      expect(responseBody).toEqual({
        name: "Method Not Allowed",
        message: "Método não permitido para este endpoint.",
        action:
          "Verifique se o método HTTP enviado é válido para esse endpoint",
        statusCode: 405,
      });
    });
  });
});
