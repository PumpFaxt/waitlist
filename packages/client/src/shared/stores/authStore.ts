import { create } from "zustand";
import { User } from "@/shared/types/db";
import { usePrivy } from "@privy-io/react-auth";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../utils/api";
import { DAY } from "../config/constants";
import { useEffect } from "react";

type AuthUser = User;

interface IAuthState {
    user: AuthUser | null;
    referrer: string | null;
    actions: {
        setUser: (user: AuthUser) => void;
        clearUser: () => void;
        setReferrer: (code: string) => void;
    };
}

const useAuthStore = create<IAuthState>()((set) => ({
    user: null,
    referrer: null,
    actions: {
        setUser: (user) => set(() => ({ user })),
        clearUser: () => set(() => ({ user: null })),
        setReferrer: (code: string) => set(() => ({ referrer: code })),
    },
}));

export const useUser = () => useAuthStore((state) => state.user);

export const useReferrer = () => useAuthStore((state) => state.referrer);

export const useAuthActions = () => useAuthStore((state) => state.actions);

export const useSyncUserWithPrivy = () => {
    const { user: privyUser, getAccessToken } = usePrivy();
    const authActions = useAuthActions();
    const referrer = useReferrer();

    if (!privyUser) authActions.clearUser();

    const accessToken = useQuery({
        queryKey: ["accessToken", privyUser?.id],
        queryFn: () => getAccessToken(),
    });

    const { data: user } = useQuery({
        queryKey: ["user", accessToken.data],
        queryFn: () => {
            if (!apiClient.doesPrivyAccessTokenExist()) return null;
            return apiClient.post("/user", {}, { params: { ref: referrer } });
        },
        staleTime: 1 * DAY,
        enabled: !!(accessToken.data) && apiClient.doesPrivyAccessTokenExist(),
    });

    useEffect(() => apiClient.setPrivyAccessToken(accessToken.data || null), [
        accessToken.data,
    ]);

    useEffect(() => user?.data && authActions.setUser(user.data), [
        user,
    ]);
};
