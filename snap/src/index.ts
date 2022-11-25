import { OnRpcRequestHandler, OnTransactionHandler } from "@metamask/snap-types";
import { callChainSight } from "./util/callChainSight";
import { callDB } from "./util/callDB";

type InsightsType = {
    [key: string]: {
        string: string;
    };
};

const notifyToWallet = async () => {
    console.log("open notify");
    await wallet.request({
        method: "snap_confirm",
        params: [
            {
                prompt: "Hello, User!",
                description: "Validator를 설치해 주셔서 감사합니다.",
                textAreaContent: "Validator는 Snap을 기반으로 한, 컨트랙트 피싱 방지 서비스입니다. \nVersion 11",
            },
        ],
    });
};

export const onRpcRequest: OnRpcRequestHandler = ({ origin, request }) => {
    switch (request.method) {
        case "install_check":
            ``;
            return notifyToWallet().then();
        default:
            throw new Error("SNAP ERROR: CANNOT_FOUND_METHOD");
    }
};

export const onTransaction: OnTransactionHandler = async ({ transaction, chainId }) => {
    // TODO: URL 처리 로직 작성
    const address = transaction.to as string;

    if (chainId === "eip155:1" || chainId === "eip155:137" || chainId === "eip155:43114") {
        return {
            insights: {
                "Unsupported chain": "Sorry, Validator only supports Ethereum, Polygon, Avalanche mainnet. 😢",
            },
        };
    }

    const chainSightResult = await callChainSight(address, chainId);
    const dbResult = await callDB(address, chainId);

    if (chainSightResult.isData === true && chainSightResult.creditScore === "1") {
        return {
            insights: {
                "Number of report": `${dbResult.reportNum} report`,
                "Number of safe": `${dbResult.safeNum} safe`,
                "Credit check": "Safe ✅",
            },
        };
    } else if (chainSightResult.isData === true && chainSightResult.creditScore === "2") {
        return {
            insights: {
                "Number of report": `${dbResult.reportNum} report`,
                "Number of safe": `${dbResult.safeNum} safe`,
                "Credit check": "Cautious 🚧",
            },
        };
    } else if (chainSightResult.isData === true && chainSightResult.creditScore === "3") {
        return {
            insights: {
                "Number of report": `${dbResult.reportNum} report`,
                "Number of safe": `${dbResult.safeNum} safe`,
                "Credit check": "Danger ❌",
            },
        };
    } else {
        return {
            insights: {
                "Number of report": `${dbResult.reportNum} report`,
                "Number of safe": `${dbResult.safeNum} safe`,
                "Credit check": "Sorry, the data is not available.",
            },
        };
    }
};

// "data: ",
//     {
//         data: [
//             {
//                 address: "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
//                 antiFraud: {
//                     credit: 3,
//                 },
//                 chain: {
//                     addressFormat: "LOWER",
//                     id: "2",
//                     name: "Ethereum",
//                 },
//                 domain: null,
//                 ip: null,
//                 labels: [
//                     {
//                         category: {
//                             id: "DEX",
//                             projectId: null,
//                             riskLevel: 1,
//                         },
//                         categoryId: "DEX",
//                         id: "DEX",
//                     },
//                     {
//                         category: {
//                             id: "Hack",
//                             projectId: null,
//                             riskLevel: 5,
//                         },
//                         categoryId: "Hack",
//                         id: "phish-hack",
//                     },
//                 ],
//                 type: "ACCOUNT",
//                 url: null,
//             },
//             {
//                 address: "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
//                 antiFraud: {
//                     credit: 1,
//                 },
//                 chain: {
//                     addressFormat: "LOWER",
//                     id: "3",
//                     name: "BNB Smart Chain",
//                 },
//                 domain: null,
//                 ip: null,
//                 labels: [],
//                 type: "ACCOUNT",
//                 url: null,
//             },
//             {
//                 address: "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
//                 antiFraud: {
//                     credit: 1,
//                 },
//                 chain: {
//                     addressFormat: "LOWER",
//                     id: "7",
//                     name: "Polygon",
//                 },
//                 domain: null,
//                 ip: null,
//                 labels: [],
//                 type: "ACCOUNT",
//                 url: null,
//             },
//             {
//                 address: "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
//                 antiFraud: {
//                     credit: 2,
//                 },
//                 chain: {
//                     addressFormat: "LOWER",
//                     id: "8",
//                     name: "Avalanche C-Chain",
//                 },
//                 domain: null,
//                 ip: null,
//                 labels: [],
//                 type: "ACCOUNT",
//                 url: null,
//             },
//             {
//                 address: "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
//                 antiFraud: {
//                     credit: 2,
//                 },
//                 chain: {
//                     addressFormat: "LOWER",
//                     id: "10",
//                     name: "Heco",
//                 },
//                 domain: null,
//                 ip: null,
//                 labels: [],
//                 type: "ACCOUNT",
//                 url: null,
//             },
//         ],
//     };
