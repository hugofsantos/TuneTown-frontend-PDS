import { describe, expect, it } from "vitest";
import { buildApiUrl } from "./apiUrl";

describe("buildApiUrl", () => {
  it("appends /api when missing", () => {
    (import.meta as unknown as { env: Record<string, string> }).env = {
      VITE_API_URL: "http://localhost:8080",
    };
    expect(buildApiUrl("/auth")).toBe("http://localhost:8080/api/auth");
  });

  it("does not double-append /api", () => {
    (import.meta as unknown as { env: Record<string, string> }).env = {
      VITE_API_URL: "http://localhost:8080/api",
    };
    expect(buildApiUrl("/auth")).toBe("http://localhost:8080/api/auth");
  });

  it("handles trailing slashes", () => {
    (import.meta as unknown as { env: Record<string, string> }).env = {
      VITE_API_URL: "http://localhost:8080/",
    };
    expect(buildApiUrl("tuneet")).toBe("http://localhost:8080/api/tuneet");
  });

  it("avoids double slash when path is empty", () => {
    (import.meta as unknown as { env: Record<string, string> }).env = {
      VITE_API_URL: "http://localhost:8080/",
    };
    expect(buildApiUrl("")).toBe("http://localhost:8080/api");
  });
});
