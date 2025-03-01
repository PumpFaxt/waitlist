export type User = {
    id: number;
    privyId: string;
    twitter: string;
    name: string;
    avatarImageUrl?: string;
    telegram?: string;
    referralCode: number;
    points: number;
    referredBy?: number;
};
