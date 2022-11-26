interface RT {
    insightString;
}
interface Case {
    num: number;
    reportedCase: string;
}

export const callDB = async (address: string, chainID: string): Promise<RT> => {
    // Metamask snap UI에 출력되는 값
    let insightString;

    try {
        /* DB 신고 데이터 호출 */
        const path = "https://validator-project.herokuapp.com/http://131.186.18.130:3000/showAll?two=".concat(
            `{"chain_id":"${chainID}","address":"${address}"}`,
        );

        const response = await fetch(path);

        const dbData = await response.json();
        const reportAll = dbData.result.data;
        console.log(reportAll);

        let totalReportCnt = 0;
        let mostReportedCase: Case = {
            num: 0,
            reportedCase: "-",
        };

        for (let i = 0; i < reportAll.length; i++) {
            const reportNum = reportAll[i].REPORT_CNT;
            if (reportNum > mostReportedCase.num) {
                mostReportedCase.num = reportNum;
                mostReportedCase.reportedCase = reportAll[i].REASON;
            }

            totalReportCnt += reportNum;
        }

        insightString = `Total report: ${totalReportCnt}, Mostly reported: ${mostReportedCase.reportedCase}`;
    } catch (error) {
        console.log(error);
        insightString = "Service error 😢";
    }

    return {
        insightString,
    };
};
