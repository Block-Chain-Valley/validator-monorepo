import { OnRpcRequestHandler, OnTransactionHandler } from "@metamask/snap-types";
import { callChainSight } from "./util/callChainSight";

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
    console.log("transaction.to: ", address);
    const result = await callChainSight(address, chainId);

    if (result.isData === false) {
        return { insights: { "Credit check": "Unsupported chain :(" } };
    } else if (result.isData === true && result.creditScore === "1") {
        return { insights: { "Credit check": "Safe ✅" } };
    } else if (result.creditScore === "2") {
        return { insights: { "Credit check": "Cautious 🚧" } };
    } else if (result.creditScore === "3") {
        return { insights: { "Credit check": "Danger ❌" } };
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
