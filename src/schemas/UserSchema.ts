import { z } from "zod";

export const UserSchema = z
  .object({
    name: z.string().min(1, "El nombre es requerido"),
    email: z.email("Email no es valido").min(1, "Email es requerido"),
    password: z.string().min(6, "Debe tener almenos 6 caracteres"),
    confirmPassword: z.string().min(6, "Debe tener almenos 6 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["Confirmado password"],
    message: "Las contrasenas son correctas",
  });

export type UserSchemaType = z.infer<typeof UserSchema>;

export const DefaultValues: UserSchemaType = {
  name: " ",
  email: " ",
  password: " ",
  confirmPassword: " ",
};
