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
        "CHAINSIGHT_API_KET4": "5xM4OD06rLaXecmnaqiVqBAD9tgZvFqceGI"
      };
    }, {}],
    2: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.onTransaction = exports.onRpcRequest = void 0;
      var _callChainSight = require("./util/callChainSight");
      const notifyToWallet = async () => {
        console.log("open notify");
        await wallet.request({
          method: "snap_confirm",
          params: [{
            prompt: "Hello, User!",
            description: "Validator를 설치해 주셔서 감사합니다.",
            textAreaContent: "Validator는 Snap을 기반으로 한, 컨트랙트 피싱 방지 서비스입니다. \nVersion 11"
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
        console.log("transaction.to: ", address);
        const result = await (0, _callChainSight.callChainSight)(address, chainId);
        if (result.isData === false) {
          return {
            insights: {
              "Credit check": "Unsupported chain :("
            }
          };
        } else if (result.isData === true && result.creditScore === "1") {
          return {
            insights: {
              "Credit check": "Safe ✅"
            }
          };
        } else if (result.creditScore === "2") {
          return {
            insights: {
              "Credit check": "Cautious 🚧"
            }
          };
        } else if (result.creditScore === "3") {
          return {
            insights: {
              "Credit check": "Danger ❌"
            }
          };
        }
      };
      exports.onTransaction = onTransaction;
      "data: ", {
        data: [{
          address: "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
          antiFraud: {
            credit: 3
          },
          chain: {
            addressFormat: "LOWER",
            id: "2",
            name: "Ethereum"
          },
          domain: null,
          ip: null,
          labels: [{
            category: {
              id: "DEX",
              projectId: null,
              riskLevel: 1
            },
            categoryId: "DEX",
            id: "DEX"
          }, {
            category: {
              id: "Hack",
              projectId: null,
              riskLevel: 5
            },
            categoryId: "Hack",
            id: "phish-hack"
          }],
          type: "ACCOUNT",
          url: null
        }, {
          address: "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
          antiFraud: {
            credit: 1
          },
          chain: {
            addressFormat: "LOWER",
            id: "3",
            name: "BNB Smart Chain"
          },
          domain: null,
          ip: null,
          labels: [],
          type: "ACCOUNT",
          url: null
        }, {
          address: "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
          antiFraud: {
            credit: 1
          },
          chain: {
            addressFormat: "LOWER",
            id: "7",
            name: "Polygon"
          },
          domain: null,
          ip: null,
          labels: [],
          type: "ACCOUNT",
          url: null
        }, {
          address: "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
          antiFraud: {
            credit: 2
          },
          chain: {
            addressFormat: "LOWER",
            id: "8",
            name: "Avalanche C-Chain"
          },
          domain: null,
          ip: null,
          labels: [],
          type: "ACCOUNT",
          url: null
        }, {
          address: "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
          antiFraud: {
            credit: 2
          },
          chain: {
            addressFormat: "LOWER",
            id: "10",
            name: "Heco"
          },
          domain: null,
          ip: null,
          labels: [],
          type: "ACCOUNT",
          url: null
        }]
      };
    }, {
      "./util/callChainSight": 3
    }],
    3: [function (require, module, exports) {
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
        const path = "https://validator-project.herokuapp.com/https://api.chainsight.com/api/check?keyword=".concat(address);
        console.log("path: ", path);
        const response = await fetch(path, {
          headers: {
            "x-api-key": CHAINSIGHT_API_KEY3
          }
        });
        const result = await response.json();
        console.log("data: ", result.data);
        let isData = false;
        let creditScore;
        for (let i = 0; i < result.data.length; i++) {
          console.log("Entered");
          console.log("CHAINID: ", chainID);
          const chainSightChainID = chainIdMap[chainID];
          console.log("expected chainSightChainID: ", result.data[i].chain.id.toString());
          console.log("chainSightChainID: ", chainSightChainID);
          if (result.data[i].chain.id.toString() === chainSightChainID) {
            creditScore = result.data[i].antiFraud.credit.toString();
            isData = true;
            break;
          }
        }
        if (isData === false) creditScore = "999";
        return {
          isData,
          creditScore
        };
      };
      exports.callChainSight = callChainSight;
    }, {
      "../../env/key.json": 1
    }]
  }, {}, [2])(2);
});