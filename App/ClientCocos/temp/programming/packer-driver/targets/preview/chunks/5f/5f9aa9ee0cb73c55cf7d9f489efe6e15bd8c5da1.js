System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, EditBox, Label, log, Node, tween, UIOpacity, SocketHandler, LobbyText, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _class3, _crd, ccclass, property, GameController;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfDataLogin(extras) {
    _reporterNs.report("DataLogin", "./SocketHandler", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDataPlayGame(extras) {
    _reporterNs.report("DataPlayGame", "./SocketHandler", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSocketHandler(extras) {
    _reporterNs.report("SocketHandler", "./SocketHandler", _context.meta, extras);
  }

  function _reportPossibleCrUseOfLobbyText(extras) {
    _reporterNs.report("LobbyText", "./LobbyText", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      EditBox = _cc.EditBox;
      Label = _cc.Label;
      log = _cc.log;
      Node = _cc.Node;
      tween = _cc.tween;
      UIOpacity = _cc.UIOpacity;
    }, function (_unresolved_2) {
      SocketHandler = _unresolved_2.SocketHandler;
    }, function (_unresolved_3) {
      LobbyText = _unresolved_3.LobbyText;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "6ef43M4cRNJnaIUTpKIJ3la", "GameController", undefined);

      __checkObsolete__(['_decorator', 'Component', 'EditBox', 'Label', 'log', 'Node', 'tween', 'UIOpacity']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GameController", GameController = (_dec = ccclass('GameController'), _dec2 = property(EditBox), _dec3 = property(EditBox), _dec4 = property(Label), _dec5 = property(Label), _dec6 = property(Node), _dec7 = property(Node), _dec(_class = (_class2 = (_class3 = class GameController extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "edbUserName", _descriptor, this);

          _initializerDefineProperty(this, "edbPass", _descriptor2, this);

          _initializerDefineProperty(this, "lbNotify", _descriptor3, this);

          _initializerDefineProperty(this, "lbName", _descriptor4, this);

          _initializerDefineProperty(this, "loginNode", _descriptor5, this);

          _initializerDefineProperty(this, "gameNode", _descriptor6, this);

          this._token = "";
        }

        static getInstance() {
          return this.instance;
        }

        onLoad() {
          (_crd && SocketHandler === void 0 ? (_reportPossibleCrUseOfSocketHandler({
            error: Error()
          }), SocketHandler) : SocketHandler).getInstance().connectToServer();
          GameController.instance = this;
        }

        showNotify(content) {
          this.lbNotify.string = content;
        }

        onLogin() {
          var name = this.edbUserName.string;
          var pass = this.edbPass.string;

          if (name == "") {
            this.showNotify((_crd && LobbyText === void 0 ? (_reportPossibleCrUseOfLobbyText({
              error: Error()
            }), LobbyText) : LobbyText).NAME_LOGIN_EMPTY);
            return;
          }

          if (pass == "") {
            this.showNotify((_crd && LobbyText === void 0 ? (_reportPossibleCrUseOfLobbyText({
              error: Error()
            }), LobbyText) : LobbyText).PASS_LOGIN_EMPTY);
            return;
          }

          this.showNotify("");
          var message = {
            method: "LOGIN",
            data: {
              user: name,
              pass: pass
            }
          };
          (_crd && SocketHandler === void 0 ? (_reportPossibleCrUseOfSocketHandler({
            error: Error()
          }), SocketHandler) : SocketHandler).getInstance().sendMessage(JSON.stringify(message));
        }

        showError(errorCode, reason) {
          log("showError", errorCode);
          this.showNotify(reason);
        }

        onPlayGame() {
          var message = {
            method: "PLAY",
            data: {
              token: this._token
            }
          };
          (_crd && SocketHandler === void 0 ? (_reportPossibleCrUseOfSocketHandler({
            error: Error()
          }), SocketHandler) : SocketHandler).getInstance().sendMessage(JSON.stringify(message));
        } // Message


        resultLogin(dataLogin) {
          log("resultLogin", dataLogin);

          if (dataLogin.errorCode == 0) {
            this._token = dataLogin.token;
            this.loginNode.active = false;
            this.gameNode.active = true;
          } else {
            this.showNotify(dataLogin.reason);
          }
        }

        resultPlayGame(dataPlay) {
          log("resultPlayGame", dataPlay);

          if (dataPlay.errorCode == 0) {
            this.lbName.string = dataPlay.username + " is Playing...";
            this.flashEffect(this.lbName.node);
          } else {
            this.showNotify(dataPlay.reason);
          }
        }

        flashEffect(node, functionSound, duration) {
          if (functionSound === void 0) {
            functionSound = null;
          }

          if (duration === void 0) {
            duration = 0.5;
          }

          var opacity = node.getComponent(UIOpacity);

          if (!opacity) {
            opacity = node.addComponent(UIOpacity);
          }

          var t = tween(opacity).to(duration, {
            opacity: 0
          }).to(duration, {
            opacity: 255
          });
          tween(opacity).repeat(40, t).call(() => {
            functionSound && functionSound();
          }).start();
        }

      }, _class3.instance = null, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "edbUserName", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "edbPass", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "lbNotify", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "lbName", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "loginNode", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "gameNode", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=5f9aa9ee0cb73c55cf7d9f489efe6e15bd8c5da1.js.map