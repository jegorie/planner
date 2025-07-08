import * as z from "zod/v4";

export const SigninSchema = z
    .object({
        email: z.email().min(1, "Email is required"),
        password: z.string().min(1, "Password is required"),
    })
    .required();

export const SignupSchema = SigninSchema.extend({
    nickname: z.string().min(1, "Nickname is required"),
    repeatPassword: z.string().min(1, "Repeat password is required"),
}).refine(
    (data) =>
        data.password &&
        data.repeatPassword &&
        data.password === data.repeatPassword,
    {
        path: ["repeatPassword"],
        error: "Password do not match",
    },
);
