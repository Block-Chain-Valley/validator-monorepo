import { walletLog } from "./walletLog";
const { CHAINSIGHT_API_KEY2 } = require("../../env/key.json");

interface RT {
    isData: boolean;
    creditScore: string;
}

export const callChainSight = async (address: string, chainID: string): Promise<RT> => {
    /* chainSight API 호출 */
    const path = "https://validator-project.herokuapp.com/https://api.chainsight.com/api/check?keyword=".concat(
        address,
    );
    const response = await fetch(path, {
        headers: {
            "x-api-key": CHAINSIGHT_API_KEY2,
        },
    });

    const data = await response.json();

    let isData = false;
    let creditScore: string;

    for (let i = 0; i < data.length; i++) {
        // TODO: metamask에서 넘겨주는 chainID와 chainSight chainID간 format 필요
        // 일치하는 체인일 경우
        if (data[i].chain.id == chainID) {
            creditScore = data[i].antiFraud.credit;
            isData = true;
            break;
        }
    }

    return {
        isData,
        creditScore,
    };
};

// ETH: 2, POLYGON: 7, AVALANCHE: 10

/*
{
    data: [
        {
            address: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
            antiFraud: {
                credit: 1,
            },
            chain: {
                addressFormat: "LOWER",
                id: "2",
                name: "Ethereum",
            },
            domain: null,
            ip: null,
            labels: [
                {
                    category: {
                        id: "Token",
                        projectId: null,
                        riskLevel: 1,
                    },
                    categoryId: "Token",
                    id: "token-contract",
                },
                {
                    category: {
                        id: "Atomic Swap",
                        projectId: null,
                        riskLevel: 1,
                    },
                    categoryId: "Atomic Swap",
                    id: "uniswap",
                },
            ],
            type: "ACCOUNT",
            url: null,
        },
        {
            address: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
            antiFraud: {
                credit: 1,
            },
            chain: {
                addressFormat: "LOWER",
                id: "3",
                name: "BNB Smart Chain",
            },
            domain: null,
            ip: null,
            labels: [],
            type: "ACCOUNT",
            url: null,
        },
        {
            address: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
            antiFraud: {
                credit: 1,
            },
            chain: {
                addressFormat: "LOWER",
                id: "7",
                name: "Polygon",
            },
            domain: null,
            ip: null,
            labels: [],
            type: "ACCOUNT",
            url: null,
        },
        {
            address: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
            antiFraud: {
                credit: 2,
            },
            chain: {
                addressFormat: "LOWER",
                id: "8",
                name: "Avalanche C-Chain",
            },
            domain: null,
            ip: null,
            labels: [],
            type: "ACCOUNT",
            url: null,
        },
        {
            address: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
            antiFraud: {
                credit: 1,
            },
            chain: {
                addressFormat: "LOWER",
                id: "10",
                name: "Heco",
            },
            domain: null,
            ip: null,
            labels: [],
            type: "ACCOUNT",
            url: null,
        },
    ];
}
*/
