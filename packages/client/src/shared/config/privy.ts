import { PrivyClientConfig } from "@privy-io/react-auth";

const appId = "cm7gve1hh00n3z3e4ysxj10j3";
const config: PrivyClientConfig = {
    appearance: {
        theme: "dark",
        accentColor: "#f2f2f2",
        logo: "./branding.jpg",
    },
    loginMethods: ["twitter", "telegram"],
    // Create embedded wallets for users who don't have a wallet
    embeddedWallets: {
        createOnLogin: "users-without-wallets",
    },
};

export default { appId, config };
