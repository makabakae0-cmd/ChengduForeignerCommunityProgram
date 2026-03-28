import { defineContract } from "./define-contract";
import { LoginRequestSchema } from "../schemas/auth";
import { AuthSessionSchema } from "../schemas/entities";

export const authContracts = {
  login: defineContract({
    method: "POST",
    path: "/auth/login",
    request: LoginRequestSchema,
    response: AuthSessionSchema
  }),
  me: defineContract({
    method: "GET",
    path: "/auth/me",
    response: AuthSessionSchema
  })
};
