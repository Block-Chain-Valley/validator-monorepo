import { OnRpcRequestHandler, OnTransactionHandler } from "@metamask/snap-types";
import { walletLog } from "./util/walletLog";
import { callChainSight } from "./util/callChainSight";

const notifyToWallet = async () => {
    await wallet.request({
        method: "snap_confirm",
        params: [
            {
                prompt: "Hello, User!",
                description: "Validator를 설치해 주셔서 감사합니다.",
                textAreaContent: "Validator는 Snap을 기반으로 한, 컨트랙트 피싱 방지 서비스입니다. \nVersion 4",
            },
        ],
    });
};

export const onRpcRequest: OnRpcRequestHandler = ({ origin, request }) => {
    switch (request.method) {
        case "install_check":
            return notifyToWallet().then();
        default:
            throw new Error("SNAP ERROR: CANNOT_FOUND_METHOD");
    }
};

export const onTransaction: OnTransactionHandler = async ({ transaction, chainId }) => {
    // TODO: URL 처리 로직 작성
    const address = transaction.to as string;
    // await callChainSight(address, chainId);
    return { insights: { "target address": address, "chain Id": chainId } };
};
