const charSets = {
    "alphabetic": "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "alphabetic.lowercase": "abcdefghijklmnopqrstuvwxyz",
    "alphabetic.uppercase": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "numeric": "0123456789",
    "alphanumeric":
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    "alphanumeric.lowercase": "abcdefghijklmnopqrstuvwxyz0123456789",
    "alphanumeric.uppercase": "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
};

export function generateRandomString(
    length: number,
    type: keyof typeof charSets,
): string {
    const chars = charSets[type];

    let result = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        result += chars[randomIndex];
    }

    return result;
}
