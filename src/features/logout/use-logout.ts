import { useMutation } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { isAuthFailedAtom } from "@/entities/auth/atoms/is-auth-failed-atom";
import { api } from "@/shared/lib/api";

export function useLogout() {
    const setAuthFailed = useSetAtom(isAuthFailedAtom);
    return useMutation({
        mutationFn: () => api.post("auth/logout").json(),
        onSuccess: () => setAuthFailed(true),
    });
}
