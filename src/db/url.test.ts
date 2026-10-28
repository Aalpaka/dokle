import { describe, expect, it } from "vitest";
import { databaseUrl } from "./url";

describe("databaseUrl", () => {
  it("lokalna baza ostaje bez TLS-a", () => {
    expect(databaseUrl("postgres://postgres:postgres@localhost:5432/dokle")).toBe("postgres://postgres:postgres@localhost:5432/dokle");
    expect(databaseUrl("postgres://u:p@127.0.0.1/dokle")).toBe("postgres://u:p@127.0.0.1/dokle");
  });

  it("Supabase dobiva sslmode=require", () => {
    expect(databaseUrl("postgresql://postgres.abc:tajna@aws-0-eu-west-1.pooler.supabase.com:6543/postgres")).toBe(
      "postgresql://postgres.abc:tajna@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?sslmode=require",
    );
    expect(databaseUrl("postgres://u:p@db.abc.supabase.co:5432/postgres?application_name=dokle")).toBe(
      "postgres://u:p@db.abc.supabase.co:5432/postgres?application_name=dokle&sslmode=require",
    );
  });

  it("sslmode upisan u adresu ima prednost", () => {
    expect(databaseUrl("postgres://u:p@db.abc.supabase.co/postgres?sslmode=disable")).toBe("postgres://u:p@db.abc.supabase.co/postgres?sslmode=disable");
    expect(databaseUrl("postgres://u:p@db.abc.supabase.co/postgres?sslmode=verify-full")).toBe("postgres://u:p@db.abc.supabase.co/postgres?sslmode=verify-full");
  });

  it("lozinka s posebnim znakovima ostaje netaknuta", () => {
    expect(databaseUrl("postgres://u:a%40b%23c@db.abc.supabase.co/postgres")).toBe("postgres://u:a%40b%23c@db.abc.supabase.co/postgres?sslmode=require");
  });
});
