import { create } from "zustand";
import { usePrivy } from "@privy-io/react-auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../utils/api";
import { DAY } from "../config/constants";
import { useEffect } from "react";
import { User } from "../types/db";

interface IAuthState {
    user: User | null;
    referrer: string | null;
    actions: {
        setUser: (user: User) => void;
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

    const { data: user, refetch: refetchUser } = useQuery({
        queryKey: ["user", accessToken.data],
        queryFn: () => {
            if (!apiClient.doesPrivyAccessTokenExist()) return null;
            return apiClient.post("/user", {}, { params: { ref: referrer } });
        },
        staleTime: 1 * DAY,
        enabled: !!(accessToken.data) && apiClient.doesPrivyAccessTokenExist(),
    });

    const updateTelegram = useMutation({
        mutationKey: ["updateTelegram", privyUser?.telegram],
        mutationFn: () => {
            return apiClient.patch("/user/update-telegram");
        },
        onSuccess: () => {
            refetchUser();
        },
    });

    useEffect(() => {
        if (
            privyUser?.telegram?.username &&
            (user?.data.telegram !== privyUser.telegram.username)
        ) {
            updateTelegram.mutate();
        }
    }, [user?.data, privyUser?.telegram]);

    useEffect(() => apiClient.setPrivyAccessToken(accessToken.data || null), [
        accessToken.data,
    ]);

    useEffect(() => user?.data && authActions.setUser(user.data), [
        user,
    ]);
};
