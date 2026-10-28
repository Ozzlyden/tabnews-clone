//import { version as uuidVersion } from "uuid";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("POST /api/v1/users", () => {
  describe("Anonymouse user", () => {
    test("With unique and valid data", async () => {
      const response = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "vitinho",
          email: "email@test.com.br",
          password: "123456",
        }),
      });

      expect(response.status).toBe(201);
    });

    test("With duplicated 'email'", async () => {
      const response1 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "vitinho1",
          email: "email2@test.com.br",
          password: "123456",
        }),
      });

      expect(response1.status).toBe(201);

      const response2 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "vitinho2",
          email: "Email2@test.com.br",
          password: "123456",
        }),
      });

      expect(response2.status).toBe(400);

      const response2Body = await response2.json();

      expect(response2Body).toEqual({
        name: "ValidationError",
        message: "O email informado já está sendo utilizado.",
        action: "Utilize outro email para realizar o cadastro.",
        statusCode: 400,
      });
    });
  });

  test("With duplicated 'username'", async () => {
    const response3 = await fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "usernametest",
        email: "user@test.com.br",
        password: "123456",
      }),
    });

    expect(response3.status).toBe(201);

    const response4 = await fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "Usernametest",
        email: "User312@test.com.br",
        password: "123456",
      }),
    });

    expect(response4.status).toBe(400);

    const respons4Body = await response4.json();

    expect(respons4Body).toEqual({
      name: "ValidationError",
      message: "O username informado já está sendo utilizado.",
      action: "Utilize outro username para realizar o cadastro.",
      statusCode: 400,
    });
  });
});
