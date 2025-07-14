import { isAuthFailedAtom } from "@/entities/auth/atoms/is-auth-failed-atom";
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { useAtomValue } from "jotai";

export const Route = createFileRoute("/_auth")({
    component: RouteComponent,
});

function RouteComponent() {
    const isAuthFailed = useAtomValue(isAuthFailedAtom);

    if (isAuthFailed) {
        return (
            <Navigate
                to="/auth/$type"
                params={{ type: "signin" }}
                search={{ redirect: location.pathname }}
            />
        );
    }

    return <Outlet />;
}
