import ky from "ky";
import { accessTokenAtom } from "@/entities/auth/atoms/tokenAtom";
import { useAtom } from "jotai";

export const useApi = () => {
    const [token, setToken] = useAtom(accessTokenAtom);

    const api = ky.create({
        prefixUrl: "/api",
        credentials: "include", // чтобы отправлять refresh cookie
        hooks: {
            beforeRequest: [
                (request) => {
                    if (token) {
                        request.headers.set("Authorization", `Bearer ${token}`);
                    }
                },
            ],
            afterResponse: [
                async (request, _options, response) => {
                    if (response.status === 401) {
                        try {
                            const refreshResponse = await ky
                                .post("api/auth/refresh", {
                                    credentials: "include",
                                })
                                .json<{ accessToken: string }>();

                            setToken(refreshResponse.accessToken);

                            request.headers.set(
                                "Authorization",
                                `Bearer ${refreshResponse.accessToken}`,
                            );

                            return ky(request);
                        } catch {
                            setToken(null);
                        }
                    }
                },
            ],
        },
    });

    return api;
};
