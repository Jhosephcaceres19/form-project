import React from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input } from "rsuite";
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

  const { control, handleSubmit, formState } = methods;

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
      <Form onSubmit={handleSubmit(onSubmit)} fluid>
        <div style={styleContainer as React.CSSProperties}>
          {/* Nombre */}
          <Form.Group>
            <Form.ControlLabel>Nombre</Form.ControlLabel>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  onChange={(value) => field.onChange(value)}
                  value={field.value}
                  placeholder="Escribe tu nombre"
                />
              )}
            />
            {formState.errors.name && (
              <span style={errorText}>{formState.errors.name.message}</span>
            )}
          </Form.Group>

          {/* Email */}
          <Form.Group>
            <Form.ControlLabel>Correo electrónico</Form.ControlLabel>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  onChange={(value) => field.onChange(value)}
                  value={field.value}
                  placeholder="ejemplo@correo.com"
                />
              )}
            />
            {formState.errors.email && (
              <span style={errorText}>{formState.errors.email.message}</span>
            )}
          </Form.Group>

          {/* Contraseña */}
          <Form.Group>
            <Form.ControlLabel>Contraseña</Form.ControlLabel>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="password"
                  onChange={(value) => field.onChange(value)}
                  value={field.value}
                  placeholder="******"
                />
              )}
            />
            {formState.errors.password && (
              <span style={errorText}>{formState.errors.password.message}</span>
            )}
          </Form.Group>

          {/* Confirmar Contraseña */}
          <Form.Group>
            <Form.ControlLabel>Confirmar contraseña</Form.ControlLabel>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="password"
                  onChange={(value) => field.onChange(value)}
                  value={field.value}
                  placeholder="******"
                />
              )}
            />
            {formState.errors.confirmPassword && (
              <span style={errorText}>
                {formState.errors.confirmPassword.message}
              </span>
            )}
          </Form.Group>

          {/* Botón */}
          <Button appearance="primary" type="submit">
            Enviar
          </Button>
        </div>
      </Form>
    </FormProvider>
  );
};
