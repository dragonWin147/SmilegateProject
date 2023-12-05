import { _decorator, Component, EditBox, Label, log, Node, tween, UIOpacity } from 'cc';
import { DataLogin, DataPlayGame, SocketHandler } from './SocketHandler';
import { LobbyText } from './LobbyText';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property(EditBox)
    edbUserName!: EditBox;

    @property(EditBox)
    edbPass!: EditBox;

    @property(Label)
    lbNotify!: Label;

    @property(Label)
    lbName!: Label;

    @property(Node)
    loginNode!: Node;

    @property(Node)
    gameNode!: Node;

    private _token: string = "";
    private static instance: GameController = null;

    public static getInstance() {
        return this.instance;
    }

    onLoad() {
        SocketHandler.getInstance().connectToServer();
        GameController.instance = this;
    }

    showNotify(content: string) {
        this.lbNotify.string = content;
    }

    onLogin() {
        let name = this.edbUserName.string;
        let pass = this.edbPass.string;

        if (name == "") {
            this.showNotify(LobbyText.NAME_LOGIN_EMPTY);
            return;
        }

        if (pass == "") {
            this.showNotify(LobbyText.PASS_LOGIN_EMPTY);
            return;
        }

        this.showNotify("");

        const message = {
            method: "LOGIN",
            data: {
                user: name,
                pass: pass
            }
        };

        SocketHandler.getInstance().sendMessage(JSON.stringify(message))
    }




    showError(errorCode: number, reason: string) {
        log("showError", errorCode);
        this.showNotify(reason);
    }

    onPlayGame() {
        const message = {
            method: "PLAY",
            data: {
                token: this._token
            }
        };

        SocketHandler.getInstance().sendMessage(JSON.stringify(message))
    }


    // Message

    resultLogin(dataLogin: DataLogin) {
        log("resultLogin", dataLogin);
        if (dataLogin.errorCode == 0) {
            this._token = dataLogin.token;
            this.loginNode.active = false;
            this.gameNode.active = true;
        } else {
            this.showNotify(dataLogin.reason);
        }
    }

    resultPlayGame(dataPlay: DataPlayGame) {
        log("resultPlayGame", dataPlay);
        if (dataPlay.errorCode == 0) {
            this.lbName.string = dataPlay.username + " is Playing...";
            this.flashEffect(this.lbName.node);
        } else {
            this.showNotify(dataPlay.reason);
        }
    }

    public flashEffect(node: Node, functionSound: Function = null, duration = 0.5) {
        let opacity = node.getComponent(UIOpacity);
        if (!opacity) {
          opacity = node.addComponent(UIOpacity);
        }
        let t = tween(opacity).to(duration, { opacity: 0 }).to(duration, { opacity: 255 });
        tween(opacity)
          .repeat(40, t)
          .call(() => {
            functionSound && functionSound();
          })
          .start();
      }

}

