import { config } from "src/config/auth";
import * as yup from "yup";

export default yup.object({
    email: yup.string().email("Invalid Email").required("Email field is required"),
    password: yup.string().matches(config.passwordRegex, {
        message: "Password must follow above mentioned rules",  // we will show rules in the login page only
        excludeEmptyString: true
    }).required("Password field is required")
})