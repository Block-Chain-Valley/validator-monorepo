import { OnRpcRequestHandler, OnTransactionHandler } from "@metamask/snap-types";
import { callChainSight } from "./util/callChainSight";
import { callDB } from "./util/callDB";
import { callAlchemy } from "./util/callAlchemy";

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
                textAreaContent: "Validator는 Snap을 기반으로 한, 컨트랙트 피싱 방지 서비스입니다. \nVersion test1.4",
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

    if (chainId !== "eip155:1" && chainId !== "eip155:137" && chainId !== "eip155:43114") {
        return {
            insights: {
                "Unsupported chain": "Sorry, Validator only supports Ethereum, Klaytn, Polygon, Avalanche mainnet. 😢",
            },
        };
    }

    // DB 신고 데이터 체크
    const dbResult = await callDB(address, chainId);
    // ChainSight API 체크
    const chainSightResult = await callChainSight(address, chainId);
    // Alchemy API 체크
    const alchemyResult = await callAlchemy(address, chainId);

    // TODO: for Pro version
    // const deployer = await checkDeployer(address, chainId);

    return {
        insights: {
            "Safety Overview 😼": `${dbResult.insightString}`,
            "Other services 😼": "",
            ChainSight: `${chainSightResult.insightString}`,
            Alchemy: `${alchemyResult.insightString}`,
        },
    };
};
