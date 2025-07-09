import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { SignupSchema } from "../utils/schema";
import { HelperText } from "@/shared/ui/helper-text";

export const SignupForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            nickname: "",
            password: "",
            repeatPassword: "",
        },
        resolver: zodResolver(SignupSchema),
        mode: "onChange",
        reValidateMode: "onChange",
    });

    return (
        <form
            className="grid gap-2"
            onSubmit={handleSubmit((data) => {
                console.log(data);
            })}
        >
            <div className="grid gap-1">
                <label htmlFor="email">Email</label>
                <Input id="email" type="email" {...register("email")} />
                <HelperText title={errors.email?.message} error />
            </div>
            <div className="grid gap-1">
                <label htmlFor="nickname">Nickname</label>
                <Input id="nickname" type="text" {...register("nickname")} />
                <HelperText title={errors.nickname?.message} error />
            </div>
            <div className="grid gap-1">
                <label htmlFor="password">Password</label>
                <Input
                    id="password"
                    type="password"
                    {...register("password")}
                />
                <HelperText title={errors.password?.message} error />
            </div>
            <div className="grid gap-1">
                <label htmlFor="repeatPassword">Repeat Password</label>
                <Input
                    id="repeatPassword"
                    type="password"
                    {...register("repeatPassword")}
                />
                <HelperText title={errors.repeatPassword?.message} error />
            </div>
            <Button type="submit" className="mt-2">
                Sign Up
            </Button>
            <div className="text-center text-sm">
                Have an account?{" "}
                <Link
                    to="/auth/$type"
                    params={{ type: "signin" }}
                    className="underline underline-offset-4"
                >
                    Sign in
                </Link>
            </div>
        </form>
    );
};
