
import { _decorator, Component, Node } from 'cc';
import { GameController } from './GameController';
const { ccclass, property } = _decorator;

export class DataLogin {
    errorCode: number;
    reason: string;
    token: string;
}

export class DataPlayGame {
    errorCode: number;
    reason: string;
    username: string;
}


export enum METHOD {
    LOGIN = "LOGIN",
    ENTER_GAME = "PLAY",
};

@ccclass('SocketHandler')
export class SocketHandler {
    private static instance: SocketHandler = null;

    public static getInstance() {
        if (!this.instance) {
            this.instance = new SocketHandler();
        }
        return this.instance;
    }

    private websocket: WebSocket;


    connectToServer() {
        this.websocket = new WebSocket('ws://localhost:9002');

        this.websocket.onopen = () => {
            console.log('Connected to server');
        };

        this.websocket.onmessage = (event) => {
            console.log('Received message:', event.data);
            if (event.data) {
                const receivedData = JSON.parse(event.data);
                console.log('method', receivedData.method);
                switch (receivedData.method) {
                    case METHOD.LOGIN:
                        GameController.getInstance().resultLogin(receivedData);
                        break;

                    case METHOD.ENTER_GAME:
                        GameController.getInstance().resultPlayGame(receivedData);
                        break;
                    default:
                        GameController.getInstance().showError(receivedData.errorCode, receivedData.reason);
                        break;
                }
            }
        };

        this.websocket.onclose = () => {
            console.log('Disconnected from server');
            // Xử lý khi mất kết nối
        };

        this.websocket.onerror = (error) => {
            console.error('Error:', error);
            // Xử lý khi có lỗi xảy ra
        };
    }

    // Gửi tin nhắn đến server
    sendMessage(message: string) {
        if (this.websocket.readyState === WebSocket.OPEN) {
            this.websocket.send(message);
        } else {
            console.error('WebSocket is not open');
        }
    }

    // Đóng kết nối WebSocket
    closeConnection() {
        if (this.websocket.readyState === WebSocket.OPEN || this.websocket.readyState === WebSocket.CONNECTING) {
            this.websocket.close();
        }
    }


    onDestroy() {
        this.closeConnection();
    }
}

