import { isAuthFailedAtom } from "@/entities/auth/atoms/isAuthFailedAtom";
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
