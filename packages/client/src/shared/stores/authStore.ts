import { create } from "zustand";
import { User } from "@/shared/types/db";
import { usePrivy } from "@privy-io/react-auth";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../utils/api";
import { DAY } from "../config/constants";
import { useEffect } from "react";

interface IAuthState {
    user: User | null;
    actions: {
        setUser: (user: User) => void;
        clearUser: () => void;
    };
}

const useAuthStore = create<IAuthState>()((set) => ({
    user: null,
    actions: {
        setUser: (user) => set(() => ({ user })),
        clearUser: () => set(() => ({ user: null })),
    },
}));

export const useUser = () => useAuthStore((state) => state.user);

export const useAuthActions = () => useAuthStore((state) => state.actions);

export const useSyncUserWithPrivy = () => {
    const { user: privyUser, getAccessToken } = usePrivy();
    const authActions = useAuthActions();

    if (!privyUser) authActions.clearUser();

    const accessToken = useQuery({
        queryKey: ["accessToken"],
        queryFn: () => getAccessToken(),
    });

    const { data: user } = useQuery({
        queryKey: ["user", accessToken.data],
        queryFn: () => {
            if (!apiClient.doesPrivyAccessTokenExist()) return null;
            return apiClient.post("/user", { method: "POST" });
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
