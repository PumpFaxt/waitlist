import { useQuery, UseQueryResult } from "@tanstack/react-query";
import apiClient from "../utils/api";
import { DAY, MINUTE } from "../config/constants";
import { useUser } from "../stores/authStore";

type API = {
    getUserInfoByReferralCode: [[string | null], { name: string }];

    getReferrer: [[], { name: string }];

    getPoints: [[], { points: number }];

    getReferralsCount: [[], { count: number }];

    getLeaderboard: [
        [],
        { twitter: string; avatarImageUrl: string; points: number }[],
    ];
};

export default function useApi<F extends keyof API>(
    functionName: F,
    ...args: API[F][0]
): UseQueryResult<API[F][1]> {
    const user = useUser();

    switch (functionName) {
        case "getUserInfoByReferralCode":
            return useQuery({
                queryKey: ["userInfoByReferralCode", args[0]],
                staleTime: 1 * DAY,
                queryFn: async () => {
                    const resp = await apiClient.get<{ name: string }>(
                        `/referral/referrer/${args[0]}`,
                    );
                    return resp.data;
                },
                enabled: !!args[0],
            });

        case "getReferrer":
            return useQuery({
                queryKey: ["referrer", user?.referredBy],
                staleTime: 1 * DAY,
                queryFn: async () => {
                    const resp = await apiClient.get<{ name: string }>(
                        `/user/referrer`,
                    );
                    return resp.data;
                },
                enabled: !!user?.referredBy,
            });

        case "getPoints":
            return useQuery({
                queryKey: ["points", user?.id],
                staleTime: 10 * MINUTE,
                queryFn: async () => {
                    const resp = await apiClient.get<{ points: number }>(
                        `/user/points`,
                    );
                    return resp.data;
                },
                enabled: !!user?.id,
            });

        case "getReferralsCount":
            return useQuery({
                queryKey: ["referralsCount", user?.id],
                staleTime: 10 * MINUTE,
                queryFn: async () => {
                    const resp = await apiClient.get<{ count: number }>(
                        `/referral/my-count`,
                    );
                    return resp.data;
                },
                enabled: !!user?.id,
            });

        case "getLeaderboard":
            return useQuery({
                queryKey: ["leaderboard"],
                queryFn: async () => {
                    const resp = await apiClient.get<
                        { id: number; points: number }[]
                    >(
                        `/referral/leaderboard`,
                    );
                    return resp.data;
                },
                staleTime: 10 * MINUTE,
            });

        default:
            throw new Error("Invalid function name");
    }
}
