System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, GameController, DataLogin, _dec, _class, _class2, _crd, ccclass, property, METHOD, SocketHandler;

  function _reportPossibleCrUseOfGameController(extras) {
    _reporterNs.report("GameController", "./GameController", _context.meta, extras);
  }

  _export("DataLogin", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
    }, function (_unresolved_2) {
      GameController = _unresolved_2.GameController;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "308691N3IZGpZM5v0TdB6s6", "SocketHandler", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("DataLogin", DataLogin = class DataLogin {
        constructor() {
          this.errorCode = void 0;
          this.reason = void 0;
          this.token = void 0;
        }

      });

      _export("METHOD", METHOD = /*#__PURE__*/function (METHOD) {
        METHOD["LOGIN"] = "LOGIN";
        METHOD["ENTER_GAME"] = "ENTER_GAME";
        return METHOD;
      }({}));

      ;

      _export("SocketHandler", SocketHandler = (_dec = ccclass('SocketHandler'), _dec(_class = (_class2 = class SocketHandler {
        constructor() {
          this.websocket = void 0;
        }

        static getInstance() {
          if (!this.instance) {
            this.instance = new SocketHandler();
          }

          return this.instance;
        }

        connectToServer() {
          this.websocket = new WebSocket('ws://localhost:9002');

          this.websocket.onopen = () => {
            console.log('Connected to server');
          };

          this.websocket.onmessage = event => {
            console.log('Received message:', event.data);

            if (event.data) {
              var receivedData = JSON.parse(event.data);
              console.log('method', receivedData.method);

              switch (receivedData.method) {
                case METHOD.LOGIN:
                  (_crd && GameController === void 0 ? (_reportPossibleCrUseOfGameController({
                    error: Error()
                  }), GameController) : GameController).getInstance().resultLogin(receivedData);
                  break;

                default:
                  (_crd && GameController === void 0 ? (_reportPossibleCrUseOfGameController({
                    error: Error()
                  }), GameController) : GameController).getInstance().showError(receivedData.errorCode, receivedData.reason);
                  break;
              }
            }
          };

          this.websocket.onclose = () => {
            console.log('Disconnected from server'); // Xử lý khi mất kết nối
          };

          this.websocket.onerror = error => {
            console.error('Error:', error); // Xử lý khi có lỗi xảy ra
          };
        } // Gửi tin nhắn đến server


        sendMessage(message) {
          if (this.websocket.readyState === WebSocket.OPEN) {
            this.websocket.send(message);
          } else {
            console.error('WebSocket is not open');
          }
        } // Đóng kết nối WebSocket


        closeConnection() {
          if (this.websocket.readyState === WebSocket.OPEN || this.websocket.readyState === WebSocket.CONNECTING) {
            this.websocket.close();
          }
        }

        onDestroy() {
          this.closeConnection();
        }

      }, _class2.instance = null, _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=f62e24a9c691f6035df9dea8b60b5f3e69dcf326.js.map