import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup.string().required("El nombre es obligatorio").min(3, "Debe tener al menos 3 caracteres"),
  email: yup.string().required("El email es obligatorio").email("Formato no válido"),
  password: yup.string().required("La contraseña es obligatoria").min(6, "Mínimo 6 caracteres"),
});
