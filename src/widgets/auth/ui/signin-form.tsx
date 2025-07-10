import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Signin, SigninSchema } from "../utils/schema";
import { HelperText } from "@/shared/ui/helper-text";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/shared/lib/api";

type Props = {
    onSuccess: (props: { accessToken: string }) => void;
};

export const SigninForm: React.FC<Props> = (props) => {
    const { onSuccess } = props;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Signin>({
        defaultValues: { email: "john@mail.ru", password: "password" },
        resolver: zodResolver(SigninSchema),
        mode: "onChange",
        reValidateMode: "onChange",
    });
    const { mutate, isPending } = useMutation({
        mutationFn: (data: Signin) => {
            return api
                .post<{ accessToken: string }>("auth/login", {
                    json: data,
                })
                .json();
        },
        onSuccess,
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
            <Button type="submit" className="mt-2" disabled={isPending}>
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
