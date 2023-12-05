System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, _dec, _class, _class2, _crd, ccclass, property, SocketHandler;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "308691N3IZGpZM5v0TdB6s6", "SocketHandler", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

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
            console.log('Connected to server'); // Gửi tin nhắn tới server khi kết nối thành công (nếu cần)

            this.websocket.send('Hello server game');
          };

          this.websocket.onmessage = event => {
            console.log('Received message:', event.data); // Xử lý dữ liệu từ server khi nhận được tin nhắn
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
//# sourceMappingURL=af5258d41d1a51abd419c23a3cedcb7cadc281a6.js.map