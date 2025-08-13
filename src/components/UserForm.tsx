import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "rsuite";
import { UserSchema, type UserSchemaType } from "../schemas/UserSchema";
import { DefaultValues } from "../schemas/UserSchema";

const styleContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  width: "300px",
  margin: "0 auto",
};
const errorText = {
  color: "red",
  fontSize: "12px",
};

export const UserForm = () => {
  const methods = useForm<UserSchemaType>({
    resolver: zodResolver(UserSchema),
    defaultValues: DefaultValues,
  });
  const onSubmit = (data: UserSchemaType) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Formulario enviado:", data);
        resolve(true);
      }, 1000);
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div style={styleContainer as React.CSSProperties}>
          <label htmlFor="name">Nombre</label>
          <input type="text" id="name" {...methods.register("name")} />
          {methods.formState.errors.name && (
            <span style={errorText}>
              {methods.formState.errors.name.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="email">Correo electronico</label>
          <input type="text" id="email" {...methods.register("email")} />
          {methods.formState.errors.email && (
            <span>{methods.formState.errors.email.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="password">Contrasenia</label>
          <input type="text" id="password" {...methods.register("password")} />
          {methods.formState.errors.password && (
            <span>{methods.formState.errors.password.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirmar tu contrasenia</label>
          <input
            type="text"
            id="confirmPassword"
            {...methods.register("confirmPassword")}
          />
          {methods.formState.errors.confirmPassword && (
            <span>{methods.formState.errors.confirmPassword.message}</span>
          )}
        </div>
        <Button>input</Button>
      </form>
    </FormProvider>
  );
};
