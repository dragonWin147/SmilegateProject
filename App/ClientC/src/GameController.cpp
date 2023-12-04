
#ifndef GAME_CONTROLLER1_H
#define GAME_CONTROLLER1_H

#include <iostream>
#include <websocketpp/config/asio_client.hpp>
#include <websocketpp/client.hpp>
#include <rapidjson/document.h>
#include <rapidjson/stringbuffer.h>
#include <rapidjson/writer.h>
#include <functional>
#include "LoginWindow.h"

using namespace rapidjson;
using namespace std;

typedef websocketpp::client<websocketpp::config::asio_client> client;

LoginWindow loginWindow;
client *clientSocket;
websocketpp::connection_hdl hdl;
string _token = "";

void showNotify(string msg)
{
    loginWindow.showNotify(msg);
}

void updateUI(string reason)
{
    std::cout << "updateUI" << std::endl;
    Fl::lock();
    loginWindow.showNotify(reason);
    Fl::awake();
    Fl::unlock();
}

void updateUIPlay()
{
    std::cout << "updateUIPlay" << std::endl;
    Fl::lock();
    loginWindow.showPlayGame();
    Fl::awake();
    Fl::unlock();
}


void sendMessage(client &clientC, websocketpp::connection_hdl hdl, StringBuffer &buffer)
{
    std::cout << buffer.GetString() << std::endl;

    websocketpp::lib::error_code errorCode;

    clientC.send(hdl, buffer.GetString(), websocketpp::frame::opcode::text, errorCode);

    if (errorCode)
    {
        std::cout << "Send failed: " << errorCode.message() << std::endl;
    }
}

void sendLogin(client &clientC, websocketpp::connection_hdl hdl, string username, string password)
{
    // std::string username = "dev111", password = "123123";

    Document d;
    d.SetObject();

    Value data(kObjectType);
    Value user(username.c_str(), d.GetAllocator());
    Value pass(password.c_str(), d.GetAllocator());

    data.AddMember("user", user, d.GetAllocator());
    data.AddMember("pass", pass, d.GetAllocator());

    d.AddMember("method", "LOGIN", d.GetAllocator());
    d.AddMember("data", data, d.GetAllocator());

    StringBuffer dataLogin;
    Writer<StringBuffer> writer(dataLogin);
    d.Accept(writer);

    sendMessage(clientC, hdl, dataLogin);
}

void sendToken(client &clientC, websocketpp::connection_hdl hdl, string token)
{
    // std::string username = "dev111", password = "123123";

    Document d;
    d.SetObject();

    Value data(kObjectType);

    Value _token(token.c_str(), d.GetAllocator());

    data.AddMember("token", _token, d.GetAllocator());

    d.AddMember("method", "PLAY", d.GetAllocator());
    d.AddMember("data", data, d.GetAllocator());

    StringBuffer dataLogin;
    Writer<StringBuffer> writer(dataLogin);
    d.Accept(writer);

    sendMessage(clientC, hdl, dataLogin);
}

void handleLogin(const std::string &username, const std::string &password)
{
    // Xử lý thông tin đăng nhập từ UI
    std::cout << "handleLogin Username: " << username << "\n";
    std::cout << "handleLogin Password: " << password << "\n";
    // Thực hiện xử lý trong game controller ở đây
    sendLogin(*clientSocket, hdl, username, password);
}

void handlePlay()
{
    std::cout << "handlePlay " << _token << "\n";
    sendToken(*clientSocket, hdl, _token);
}

void onOpen(client *clientC, websocketpp::connection_hdl _hdl)
{
    std::cout << "Connection opened = " << std::endl;
    clientSocket = clientC;
    hdl = _hdl;
}

void onMessage(websocketpp::connection_hdl hdl, client::message_ptr msg)
{

    std::cout << "Received: " << msg->get_payload() << std::endl;
    rapidjson::Document jsonObject;

    jsonObject.Parse(msg->get_payload().c_str());

    if (!jsonObject.HasParseError())
    {
        int errCode = jsonObject["errorCode"].GetInt();
        string reason = jsonObject["reason"].GetString();
        string method = jsonObject["method"].GetString();

        if (errCode == 0)
        {
            if (method == "LOGIN")
            {
                string token = jsonObject["token"].GetString();
                _token = token;
                updateUI("");
                updateUIPlay();

                // sendToken(*clientSocket, hdl, token);
            }
            else if (method == "PLAY")
            {
                string username = jsonObject["username"].GetString();
                updateUI(username + " is playing");
            }
        }
        else
        {
            updateUI(reason);
        }
    }
}

int main()
{

    client c;
    c.init_asio();
    std::thread websocketThread([&c]()
                                {
        // Thiết lập kết nối WebSocket
    websocketpp::lib::error_code ec;

    std::string uri = "ws://localhost:9002"; // Đổi thành địa chỉ của server WebSocket của bạn

        client::connection_ptr con = c.get_connection(uri, ec);
        if (ec) {
            std::cout << "Could not create connection: " << ec.message() << std::endl;
            return;
        }

        // Thiết lập các handler
        // con->set_message_handler([](websocketpp::connection_hdl hdl, client::message_ptr msg)
        //                          { std::cout << "Received: " << msg->get_payload() << std::endl; });
         con->set_message_handler(std::bind(&onMessage, std::placeholders::_1, std::placeholders::_2));
        con->set_open_handler(std::bind(&onOpen, &c, std::placeholders::_1));
        con->set_fail_handler([](websocketpp::connection_hdl hdl)
                              { std::cout << "Connection set_fail_handler" << std::endl; });
        con->set_close_handler([](websocketpp::connection_hdl hdl)
                               { std::cout << "Connection set_close_handler" << std::endl; });

        // Kết nối với server
        c.connect(con);

        // Chạy luồng WebSocket
        c.run(); });

    // Fl::add_timeout(0.1, updateUI);
    // Khởi tạo giao diện người dùng
    // LoginWindow loginWindow;
    updateUI("");
    loginWindow.setLoginSuccessCallback(handleLogin);
    loginWindow.setPlayGameSuccessCallback(handlePlay);
    loginWindow.show();

    updateUI("init");
    // Fl::add_timeout(0.1, updateUI);
    // loginWindow.showAsync();

    // Chờ luồng WebSocket kết thúc
    websocketThread.join();

    return 0;
}

#endif