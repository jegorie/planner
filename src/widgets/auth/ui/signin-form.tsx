import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SigninSchema } from "../utils/schema";
import { HelperText } from "@/shared/ui/helper-text";
import { useMutation } from "@tanstack/react-query";
import ky from "ky";
import { useEffect } from "react";

const api = ky.create({
    prefixUrl: "/api", // проксируется Vite
    timeout: 5000,
    hooks: {
        afterResponse: [
            (_request, _options, response) => {
                // Логируем, чтобы видеть результат
                console.log("▶  /api call:", response);
            },
        ],
    },
});

export const SignInForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: { email: "john@mail.ru", password: "password" },
        resolver: zodResolver(SigninSchema),
        mode: "onChange",
        reValidateMode: "onChange",
    });
    const { mutate, isPending, data } = useMutation({
        mutationFn: (data) => {
            return api.post("auth/login", { json: data });
        },
    });

    useEffect(() => {
        api.get("tasks");
    }, []);
    console.log({ isPending, data });

    return (
        <form
            className="grid gap-4"
            onSubmit={handleSubmit((data) => {
                mutate(data);
                console.log(data);
            })}
        >
            <div className="grid gap-1">
                <label htmlFor="email">Email</label>
                <Input id="email" type="email" {...register("email")} />
                <HelperText title={errors.email?.message} error />
            </div>
            <div className="grid gap-1">
                <div className="flex justify-between items-center">
                    <label htmlFor="password">Password</label>
                    <a href="#" className="text-sm text-primary/50">
                        Forgot your password?
                    </a>
                </div>
                <Input
                    id="password"
                    type="password"
                    {...register("password")}
                />
                <HelperText title={errors.password?.message} error />
            </div>
            <Button type="submit" className="mt-2">
                Sign in
            </Button>
            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                    to="/auth/$type"
                    params={{ type: "signup" }}
                    className="underline underline-offset-4"
                >
                    Sign up
                </Link>
            </div>
        </form>
    );
};
