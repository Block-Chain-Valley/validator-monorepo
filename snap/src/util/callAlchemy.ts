const { ALCHEMY_API_KEY } = require("../../env/key.json");

interface RT {
    insightString;
}

export const callAlchemy = async (address: string, chainId: string) => {
    // Metamask snap UI에 출력되는 값
    let insightString;

    try {
        if (chainId === "eip155:1") {
            const path = `https://eth-mainnet.g.alchemy.com/nft/v2/${ALCHEMY_API_KEY}/isSpamContract?`.concat(
                `contractAddress=${address}`,
            );

            const response = await fetch(path);
            const result = await response.json();
            console.log(result);

            if (result === true) {
                insightString = "Scam address ⛔️";
            } else {
                insightString = "Unreported address 😐";
            }
        } else {
            insightString = "Sorry, Alchemy only supports Ethereum Mainnet. 😢";
        }
    } catch (error) {
        console.log(error);
        insightString = "Sorry, there is an error 😢";
    }

    return {
        insightString,
    };
};
