(function (f) {
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define([], f);
  } else {
    var g;
    if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }
    g.snap = f();
  }
})(function () {
  var define, module, exports;
  return function () {
    function r(e, n, t) {
      function o(i, f) {
        if (!n[i]) {
          if (!e[i]) {
            var c = "function" == typeof require && require;
            if (!f && c) return c(i, !0);
            if (u) return u(i, !0);
            var a = new Error("Cannot find module '" + i + "'");
            throw a.code = "MODULE_NOT_FOUND", a;
          }
          var p = n[i] = {
            exports: {}
          };
          e[i][0].call(p.exports, function (r) {
            var n = e[i][1][r];
            return o(n || r);
          }, p, p.exports, r, e, n, t);
        }
        return n[i].exports;
      }
      for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
      return o;
    }
    return r;
  }()({
    1: [function (require, module, exports) {
      module.exports = {
        "CHAINSIGHT_API_KEY1": "vAcF8ljut0AX3Z9bmPhcXvRafg0nqNSgyxT3azS",
        "CHAINSIGHT_API_KEY2": "kM41kcWDKOgahHUP04uBoHCMtkO3XbH6C0I6ioc",
        "CHAINSIGHT_API_KEY3": "ebqCn1ofEaMQYYMuIK5LSZjARPq0P4WWtj3sXph",
        "CHAINSIGHT_API_KET4": "5xM4OD06rLaXecmnaqiVqBAD9tgZvFqceGI",
        "ALCHEMY_API_KEY": "OhDb1c_7jWaCEDxuvZpewr6cPhm6m7Jd",
        "ETHERSCAN_API_KEY": "3VQSRKYDW2U84YF1FEVRIFYH3RDC4B6WMG"
      };
    }, {}],
    2: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.onTransaction = exports.onRpcRequest = void 0;
      var _callChainSight = require("./util/callChainSight");
      var _callDB = require("./util/callDB");
      var _callAlchemy = require("./util/callAlchemy");
      const notifyToWallet = async () => {
        console.log("open notify");
        await wallet.request({
          method: "snap_confirm",
          params: [{
            prompt: "Hello, User!",
            description: "Validator를 설치해 주셔서 감사합니다.",
            textAreaContent: "Validator는 Snap을 기반으로 한, 컨트랙트 피싱 방지 서비스입니다. \nVersion test1.4"
          }]
        });
      };
      const onRpcRequest = ({
        origin,
        request
      }) => {
        switch (request.method) {
          case "install_check":
            ``;
            return notifyToWallet().then();
          default:
            throw new Error("SNAP ERROR: CANNOT_FOUND_METHOD");
        }
      };
      exports.onRpcRequest = onRpcRequest;
      const onTransaction = async ({
        transaction,
        chainId
      }) => {
        const address = transaction.to;
        if (chainId !== "eip155:1" && chainId !== "eip155:137" && chainId !== "eip155:43114") {
          return {
            insights: {
              "Unsupported chain": "Sorry, Validator only supports Ethereum, Polygon, Avalanche mainnet. 😢"
            }
          };
        }
        const dbResult = await (0, _callDB.callDB)(address, chainId);
        const chainSightResult = await (0, _callChainSight.callChainSight)(address, chainId);
        const alchemyResult = await (0, _callAlchemy.callAlchemy)(address, chainId);
        return {
          insights: {
            "Safety Overview 😼": `${dbResult.insightString}`,
            "Other services 😼": {
              ChainSight: `${chainSightResult.insightString}`,
              Alchemy: `${alchemyResult.insightString}`
            }
          }
        };
      };
      exports.onTransaction = onTransaction;
    }, {
      "./util/callAlchemy": 3,
      "./util/callChainSight": 4,
      "./util/callDB": 5
    }],
    3: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.callAlchemy = void 0;
      const {
        ALCHEMY_API_KEY
      } = require("../../env/key.json");
      const callAlchemy = async (address, chainId) => {
        let insightString;
        try {
          if (chainId === "eip155:1") {
            const path = `https://eth-mainnet.g.alchemy.com/nft/v2/${ALCHEMY_API_KEY}/isSpamContract?`.concat(`contractAddress=${address}`);
            const response = await fetch(path);
            const result = await response.json();
            console.log(result);
            if (result === true) {
              insightString = "Scam ⛔️";
            } else {
              insightString = "Unreported 😐";
            }
          } else {
            insightString = "Not supported 😢";
          }
        } catch (error) {
          console.log(error);
          insightString = "Service error 😢";
        }
        return {
          insightString
        };
      };
      exports.callAlchemy = callAlchemy;
    }, {
      "../../env/key.json": 1
    }],
    4: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.callChainSight = void 0;
      const {
        CHAINSIGHT_API_KEY1,
        CHAINSIGHT_API_KEY2,
        CHAINSIGHT_API_KEY3
      } = require("../../env/key.json");
      const chainIdMap = {
        "eip155:1": "2",
        "eip155:137": "7",
        "eip155:43114": "10"
      };
      const callChainSight = async (address, chainID) => {
        let insightString;
        try {
          const path = "https://validator-project.herokuapp.com/https://api.chainsight.com/api/check?keyword=".concat(address);
          const response = await fetch(path, {
            headers: {
              "x-api-key": CHAINSIGHT_API_KEY1
            }
          });
          const result = await response.json();
          console.log(result);
          let isData = false;
          let creditScore;
          for (let i = 0; i < result.data.length; i++) {
            const chainSightChainID = chainIdMap[chainID];
            if (result.data[i].chain.id.toString() === chainSightChainID) {
              creditScore = result.data[i].antiFraud.credit.toString();
              isData = true;
              break;
            }
          }
          if (isData === false) {
            insightString = "No data 🙁";
          } else if (creditScore === "1") {
            insightString = "Safe ✅";
          } else if (creditScore === "2") {
            insightString = "Cautious 🚧";
          } else if (creditScore === "3") {
            insightString = "Danger ❌";
          } else {
            insightString = "Service error 😢";
          }
        } catch (error) {
          console.log(error);
          insightString = "Service error 😢";
        }
        return {
          insightString
        };
      };
      exports.callChainSight = callChainSight;
    }, {
      "../../env/key.json": 1
    }],
    5: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.callDB = void 0;
      const callDB = async (address, chainID) => {
        let insightString;
        try {
          const path = "https://validator-project.herokuapp.com/http://131.186.18.130:3000/showAll?two=".concat(`{"chain_id":"${chainID}","address":"${address}"}`);
          const response = await fetch(path);
          const dbData = await response.json();
          const reportAll = dbData.result.data;
          console.log(reportAll);
          let totalReportCnt = 0;
          let mostReportedCase = {
            num: 0,
            reportedCase: "-"
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
          insightString
        };
      };
      exports.callDB = callDB;
    }, {}]
  }, {}, [2])(2);
});