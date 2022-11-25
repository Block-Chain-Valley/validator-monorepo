export const walletLog = async (data: string) => {
    await wallet.request({
        method: "snap_notify",
        params: [
            {
                type: "inApp",
                message: data,
            },
        ],
    });
};
