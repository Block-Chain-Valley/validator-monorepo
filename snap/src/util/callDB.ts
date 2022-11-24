interface RT {
    reportNum: string;
    reportType: string;
}

export const callDB = async (address: string, chainID: string): Promise<RT> => {
    /* DB 신고 데이터 호출 */
    const path = "test";
    const response = await fetch(path);
    const result = await response.json();

    // result 처리해서 reportNum, reportType에 대입
    const reportNum = "test";
    const reportType = "Address used in hacking";

    return {
        reportNum,
        reportType,
    };
};
