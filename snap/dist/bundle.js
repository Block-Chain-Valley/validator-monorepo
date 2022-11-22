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
        "CHAINSIGHT_API_KEY": "vAcF8ljut0AX3Z9bmPhcXvRafg0nqNSgyxT3azS"
      };
    }, {}],
    2: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.callChainSight = void 0;
      var _walletLog = require("../util/walletLog");
      const {
        CHAINSIGHT_API_KEY
      } = require("../../env/key.json");
      const callChainSight = async targetAddress => {
        const path = "https://api.chainsight.com/api/check?keyword=".concat(targetAddress);
        (0, _walletLog.walletLog)("point1: ".concat(CHAINSIGHT_API_KEY));
        const response = await fetch(path, {
          headers: {
            "x-api-key": CHAINSIGHT_API_KEY
          }
        });
        (0, _walletLog.walletLog)("point2");
        const data = await response.json();
        console.log(data);
        (0, _walletLog.walletLog)("point3");
      };
      exports.callChainSight = callChainSight;
    }, {
      "../../env/key.json": 1,
      "../util/walletLog": 4
    }],
    3: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.onTransaction = exports.onRpcRequest = void 0;
      var _callChainSight = require("./api/callChainSight");
      const notifyToWallet = async () => {
        await wallet.request({
          method: "snap_confirm",
          params: [{
            prompt: "Hello, User!",
            description: "Validator를 설치해 주셔서 감사합니다.",
            textAreaContent: "Validator는 Snap을 기반으로 한, 컨트랙트 피싱 방지 서비스입니다. \nVersion 4"
          }]
        });
      };
      const onRpcRequest = ({
        origin,
        request
      }) => {
        switch (request.method) {
          case "install_check":
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
        const targetAddress = transaction.to;
        await (0, _callChainSight.callChainSight)(targetAddress);
        return {
          insights: {
            "target address": targetAddress
          }
        };
      };
      exports.onTransaction = onTransaction;
    }, {
      "./api/callChainSight": 2
    }],
    4: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.walletLog = void 0;
      const walletLog = async data => {
        await wallet.request({
          method: "snap_notify",
          params: [{
            type: "inApp",
            message: data
          }]
        });
      };
      exports.walletLog = walletLog;
    }, {}]
  }, {}, [3])(3);
});