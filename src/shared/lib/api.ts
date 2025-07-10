import ky from "ky";
import { accessTokenAtom } from "@/entities/auth/atoms/tokenAtom";
import { getDefaultStore } from "jotai";
import { isAuthFailedAtom } from "@/entities/auth/atoms/isAuthFailedAtom";

const store = getDefaultStore();

export const api = ky.create({
    prefixUrl: "/api",
    credentials: "include", // чтобы отправлять refresh cookie
    hooks: {
        beforeRequest: [
            (request) => {
                const token = store.get(accessTokenAtom);
                if (token) {
                    request.headers.set("Authorization", `Bearer ${token}`);
                }
            },
        ],
        afterResponse: [
            async (request, _options, response) => {
                if (response.status === 401) {
                    try {
                        const refreshed = await ky
                            .post("/api/auth/refresh", {
                                credentials: "include", // для cookie
                            })
                            .json<{ accessToken: string }>();

                        if (refreshed.accessToken) {
                            store.set(accessTokenAtom, refreshed.accessToken);
                            request.headers.set(
                                "Authorization",
                                `Bearer ${refreshed.accessToken}`,
                            );
                            return ky(request);
                        }
                    } catch {
                        store.set(accessTokenAtom, null);
                        store.set(isAuthFailedAtom, true);
                        return response;
                    }
                }
            },
        ],
    },
});
