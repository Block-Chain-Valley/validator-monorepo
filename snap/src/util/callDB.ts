interface RT {
    reportCount: string;
    safeCount: string;
}

export const callDB = async (address: string, chainID: string): Promise<RT> => {
    /* DB 신고 데이터 호출 */
    const path = "test";
    // const response = await fetch(path);
    // const result = await response.json();

    // result 처리해서 reportCount, safeCount 대입
    const reportCount = "5";
    const safeCount = "1";

    return {
        reportCount,
        safeCount,
    };
};
