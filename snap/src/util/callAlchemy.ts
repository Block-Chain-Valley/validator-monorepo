// Github: https://github.com/alchemyplatform/alchemy-sdk-js
import { Network, Alchemy } from "alchemy-sdk";
const { ALCHEMY_API_KEY } = require("../../env/key.json");

interface RT {
    insightString;
}

export const callAlchemy = async (address: string, chainId: string) => {
    // Metamask snap UI에 출력되는 값
    let insightString;

    if (chainId === "eip155:1") {
        // Optional Config object, but defaults to demo api-key and eth-mainnet.
        const settings = {
            apiKey: ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
            network: Network.ETH_MAINNET, // Replace with your network.
        };

        const alchemy = new Alchemy(settings);
        const result = await alchemy.nft.isSpamContract(chainId);
        console.log(result);

        if (result === true) {
            insightString = "Scam address ⛔️";
        } else {
            insightString = "Unreported address 😐";
        }
    } else {
        insightString = "Sorry, Alchemy only supports Ethereum Mainnet. 😢";
    }

    return {
        insightString,
    };
};
