System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, _dec, _class, _crd, ccclass, property, GameController;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "6ef43M4cRNJnaIUTpKIJ3la", "GameController", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GameController", GameController = (_dec = ccclass('GameController'), _dec(_class = class GameController extends Component {
        constructor() {
          super(...arguments);
          this.websocket = void 0;
        }

        onLoad() {
          this.connectToServer();
        }

        connectToServer() {
          this.websocket = new WebSocket('ws://localhost:9002');

          this.websocket.onopen = () => {
            console.log('Connected to server'); // Gửi tin nhắn tới server khi kết nối thành công (nếu cần)

            this.websocket.send('Hello server!');
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
        } // Một số phương thức khác nếu cần
        // ...


        onDestroy() {
          this.closeConnection();
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=e79a5f22a92b156511229ac32c89db286158fd9f.js.map