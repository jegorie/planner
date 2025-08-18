import ky from "ky";
import { getDefaultStore } from "jotai";
import { isAuthFailedAtom } from "@/entities/auth/atoms/is-auth-failed-atom";

const store = getDefaultStore();

export const api = ky.create({
    prefixUrl: "/api",
    credentials: "include", // чтобы отправлять refresh cookie
    hooks: {
        afterResponse: [
            async (request, _options, response) => {
                if (response.status === 401) {
                    try {
                        await ky
                            .post("/api/auth/refresh", {
                                credentials: "include", // для cookie
                            })
                            .json<{ accessToken: string }>();

                        return ky(request);
                    } catch {
                        store.set(isAuthFailedAtom, true);
                        return response;
                    }
                }
            },
        ],
    },
});
