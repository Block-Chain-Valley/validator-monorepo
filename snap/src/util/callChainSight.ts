const { CHAINSIGHT_API_KEY1, CHAINSIGHT_API_KEY2, CHAINSIGHT_API_KEY3 } = require("../../env/key.json");

interface RT {
    isData: boolean;
    creditScore: string;
}

// ETH: 2, POLYGON: 7, AVALANCHE: 10
const chainIdMap: {
    [snapRequestChainID: string]: string;
} = {
    "eip155:1": "2",
    "eip155:137": "7",
    "eip155:43114": "10",
};

export const callChainSight = async (address: string, chainID: string): Promise<RT> => {
    /* chainSight API 호출 */
    const path = "https://validator-project.herokuapp.com/https://api.chainsight.com/api/check?keyword=".concat(
        address,
    );

    const response = await fetch(path, {
        headers: {
            "x-api-key": CHAINSIGHT_API_KEY3,
        },
    });
    const result = await response.json();

    let isData = false;
    let creditScore: string;

    for (let i = 0; i < result.data.length; i++) {
        // 일치하는 체인에 대한 chainSight 데이터가 존재할 경우
        const chainSightChainID = chainIdMap[chainID];
        if (result.data[i].chain.id.toString() === chainSightChainID) {
            creditScore = result.data[i].antiFraud.credit.toString();
            isData = true;
            break;
        }
    }

    if (isData === false) creditScore = "999";

    return {
        isData,
        creditScore,
    };
};
