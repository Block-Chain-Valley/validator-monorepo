import { OnTransactionHandler } from "@metamask/snap-types";

export const onTransaction: OnTransactionHandler = async ({ transaction, chainId }) => {
  // Transaction 정보를 출력
  console.log(transaction);
  const data = transaction.to;
  return { insights: { "contract address": data } };
};
