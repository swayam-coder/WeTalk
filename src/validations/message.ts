import * as yup from "yup";

export const emailValidate = yup.object({
    email: yup.string().email("Invalid Email").required("Email field is required")
})