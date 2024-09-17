import * as Yup from "yup";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const studentSchema = Yup.object().shape({
  full_name: Yup.string().required("El nombre completo es requerido"),
  address: Yup.string().required("La dirección es requerida"),
  email: Yup.string()
    .required("El email es requerido")
    .email("Formato de mail invalido"),
  phone: Yup.string().matches(phoneRegExp, "Se requiere un número de telefono válido").required("El número de teléfono es requerido"),
});

export const subjectSchema = Yup.object().shape({
  career_name: Yup.string().required("El nombre completo es requerido"),
  subject: Yup.object().shape({
    id: Yup.number().required("Se requiere seleccionar una materia."),
  }),
  times_taken: Yup.number().min(1, "La cantidad de veces cursada es requerida"),
  enrollment_year: Yup.number().min(1990,  "El año de inscripción es requerido")
});
