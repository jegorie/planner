import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { QrCode } from "lucide-react";
import { AnimatePresence, MotionConfig } from "motion/react";
import {
    createFileRoute,
    Link,
    redirect,
    useParams,
    useRouterState,
} from "@tanstack/react-router";
import { motion } from "motion/react";
import useMeasure from "react-use-measure";
import { cn } from "@/shared/lib/utils";
import { Input } from "@/shared/ui/input";

// Inline SVG for Google logo
const GoogleLogo: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        alt="google"
        className={className}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M21.35 11.1h-9.18v2.82h5.33c-.23 1.19-.93 2.18-1.98 2.85v2.37h3.2c1.87-1.72 2.94-4.26 2.94-7.37 0-.64-.06-1.26-.16-1.87z"
            fill="#4285F4"
        />
        <path
            d="M12.17 22c2.7 0 4.96-.9 6.62-2.44l-3.2-2.37c-.89.6-2.03.95-3.42.95-2.63 0-4.86-1.77-5.66-4.15h-3.33v2.61C4.95 19.68 8.36 22 12.17 22z"
            fill="#34A853"
        />
        <path
            d="M6.51 13.99a6.11 6.11 0 01-.33-1.99c0-.69.12-1.36.33-1.99v-2.61H3.18A9.97 9.97 0 002 12c0 1.64.4 3.19 1.18 4.6l3.33-2.61z"
            fill="#FBBC05"
        />
        <path
            d="M12.17 5.37c1.47 0 2.8.5 3.85 1.47l2.88-2.88C16.9 2.36 14.64 1.5 12.17 1.5 8.36 1.5 4.95 3.82 3.18 7.03l3.33 2.61c.8-2.38 3.03-4.15 5.66-4.15z"
            fill="#EA4335"
        />
    </svg>
);

const DURATION = 0.5;
// Main Auth Card Component
export const AuthCard: React.FC = () => {
    const { type } = useParams({ from: "/_withoutSidebar/auth/$type" });
    const [ref, { height }] = useMeasure();

    return (
        <div className="flex flex-col gap-6 min-h-svh w-full items-center justify-center p-4">
            <Card className="pb-0 max-w-[400px] w-full">
                <CardHeader>
                    <CardTitle>
                        {type === "signin" ? "Welcome Back!" : "Create Account"}
                    </CardTitle>
                </CardHeader>
                <CardContent className="px-0">
                    <div className="px-6 mb-4 grid gap-4">
                        <Button variant="secondary">
                            <GoogleLogo className="mr-2" />
                            With Google
                        </Button>
                        <Button variant="secondary">
                            <QrCode className="mr-2" />
                            With QR Code
                        </Button>
                    </div>
                    <MotionConfig transition={{ duration: DURATION }}>
                        <motion.div
                            animate={{
                                height: height || "auto",
                                transition: { delay: DURATION / 2 },
                            }}
                            className="overflow-hidden relative"
                        >
                            <AnimatePresence initial={false}>
                                <motion.div
                                    key={type}
                                    initial={{
                                        opacity: 0,
                                        filter: "blur(4px)",
                                    }}
                                    animate={{
                                        opacity: 1,
                                        filter: "blur(0px)",
                                        transition: {
                                            duration: DURATION / 2,
                                            delay: DURATION / 2,
                                        },
                                    }}
                                    exit={{
                                        opacity: 0,
                                        filter: "blur(4px)",
                                        transition: { duration: DURATION / 2 },
                                    }}
                                >
                                    <div
                                        ref={ref}
                                        className={cn("px-6 pb-6", {
                                            "absolute left-0 right-0": height,
                                            relative: !height,
                                        })}
                                    >
                                        {type === "signin" ? (
                                            <SignInForm />
                                        ) : (
                                            <SignUpForm />
                                        )}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    </MotionConfig>
                </CardContent>
            </Card>
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our{" "}
                <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>.
            </div>
        </div>
    );
};

function SignInForm() {
    return (
        <form className="grid gap-4">
            <div className="grid gap-1">
                <label htmlFor="email">Email</label>
                <Input id="email" type="email" />
            </div>
            <div className="grid gap-1">
                <div className="flex justify-between">
                    <label htmlFor="password">Password</label>
                    <a href="#" className="text-sm">
                        Forgot your password?
                    </a>
                </div>
                <Input id="password" type="password" />
            </div>
            <Button type="submit">Sign in</Button>
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
}

function SignUpForm() {
    return (
        <form className="grid gap-4">
            <div className="grid gap-1">
                <label htmlFor="email">Email</label>
                <Input id="email" type="email" />
            </div>
            <div className="grid gap-1">
                <label htmlFor="nickname">Nickname</label>
                <Input id="nickname" type="text" />
            </div>
            <div className="grid gap-1">
                <label htmlFor="password">Password</label>
                <Input id="password" type="password" />
            </div>
            <div className="grid gap-1">
                <label htmlFor="repeat-password">Repeat Password</label>
                <Input id="repeat-password" type="password" />
            </div>
            <Button type="submit">Sign Up</Button>
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
}

export const Route = createFileRoute("/_withoutSidebar/auth/$type")({
    parseParams: ({ type }) => {
        if (type !== "signin" && type !== "signup") {
            throw redirect({ to: "/auth/$type", params: { type: "signin" } });
        }
        return { type: type as "signin" | "signup" };
    },
    component: AuthCard,
});
