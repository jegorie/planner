import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { QrCode } from "lucide-react";
import { createFileRoute, redirect, useParams } from "@tanstack/react-router";
import { SigninForm } from "@/widgets/auth/ui/signin-form";
import { SignupForm } from "@/widgets/auth/ui/signup-form";
import { FadeCard } from "@/shared/ui/animations/fade-card";
import { z } from "zod/v4";
import { useSetAtom } from "jotai";
import { accessTokenAtom } from "@/entities/auth/atoms/token-atom";
import { isAuthFailedAtom } from "@/entities/auth/atoms/is-auth-failed-atom";

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

export const AuthCard: React.FC = () => {
    const search = Route.useSearch();
    const { type } = useParams({ from: "/_nonAuth/auth/$type" });
    const navigate = Route.useNavigate();
    const setToken = useSetAtom(accessTokenAtom);
    const setIsAuthFailed = useSetAtom(isAuthFailedAtom);

    const goToMainPage = (props: { accessToken: string }) => {
        setToken(props.accessToken);
        setIsAuthFailed(false);
        navigate({ to: search.redirect || "/" });
    };

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
                        <Button variant="secondary" disabled>
                            <GoogleLogo className="mr-2" />
                            With Google
                        </Button>
                        <Button variant="secondary" disabled>
                            <QrCode className="mr-2" />
                            With QR Code
                        </Button>
                    </div>
                    <FadeCard triggerKey={type} className="px-6 pb-6">
                        {type === "signin" ? (
                            <SigninForm onSuccess={goToMainPage} />
                        ) : (
                            <SignupForm />
                        )}
                    </FadeCard>
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

export const Route = createFileRoute("/_nonAuth/auth/$type")({
    validateSearch: z.object({
        redirect: z.string().optional().catch(""),
    }),
    parseParams: ({ type }) => {
        if (type !== "signin" && type !== "signup") {
            throw redirect({ to: "/auth/$type", params: { type: "signin" } });
        }
        return { type: type as "signin" | "signup" };
    },
    component: AuthCard,
});
