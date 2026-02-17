import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { type Signup, SignupSchema } from "../utils/schema";
import { HelperText } from "@/shared/ui/helper-text";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/shared/lib/api";
import { HTTPError } from "ky";

type Props = {
    onSuccess: () => void;
};

export const SignupForm: React.FC<Props> = (props) => {
    const { onSuccess } = props;
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<Signup>({
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
    const { mutate, isPending } = useMutation({
        mutationFn: (data: Signup) => {
            return api
                .post<{ accessToken: string }>("auth/register", {
                    json: data,
                })
                .json();
        },
        onSuccess,
        onError: async (error) => {
            if (error instanceof HTTPError && error.response.status === 409) {
                setError("email", { message: "Email is already taken" });
            } else {
                setError("root", { message: "Something went wrong. Please try again." });
            }
        },
    });

    return (
        <form
            className="grid gap-4"
            onSubmit={handleSubmit((data) => {
                mutate(data);
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
            <Button type="submit" className="mt-2" disabled={isPending}>
                Sign Up
            </Button>
            <HelperText title={errors.root?.message} error />
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
