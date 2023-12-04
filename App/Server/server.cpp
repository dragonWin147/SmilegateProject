#include <websocketpp/config/asio_no_tls.hpp>
#include <websocketpp/server.hpp>
#include <iostream>
#include "rapidjson/document.h"
#include "rapidjson/writer.h"
#include "rapidjson/stringbuffer.h"
#include <random>
using namespace std;

typedef websocketpp::server<websocketpp::config::asio> server;

map<string, string> dbUserGame;
map<string, string> dbTokenGame;

/*
   Khởi tạo database user
*/
void initUser()
{
    dbUserGame["dev111"] = "123123";
    dbUserGame["dev112"] = "123123";
    dbUserGame["dev113"] = "123123";
    dbUserGame["dev114"] = "123123";
    dbUserGame["dev115"] = "123123";
}

/*
   Gen Token
*/
string genToken()
{
    int length = 256;
    const string charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    random_device rd;
    mt19937 gen(rd());
    uniform_int_distribution<int> dist(0, charset.length() - 1);

    string token;
    for (int i = 0; i < length; ++i)
    {
        token += charset[dist(gen)];
    }

    return token;
}

string getErrorReason(int errCode)
{
    if (errCode == 1)
    {
        return "Input data is incorrect!";
    }

    if (errCode == 2)
    {
        return "Username is incorrect!";
    }

    if (errCode == 3)
    {
        return "Incorrect password!";
    }

    if (errCode == 4)
    {
        return "Incorrect token!";
    }

    return "";
}
/*
    Xử lý message được từ client
*/
void on_message(websocketpp::connection_hdl hdl, server::message_ptr msg, server *s)
{
    std::cout << "Received: " << msg->get_payload() << std::endl;
    rapidjson::Document jsonObject;

    jsonObject.Parse(msg->get_payload().c_str());

    rapidjson::StringBuffer buffer;
    rapidjson::Writer<rapidjson::StringBuffer> writer(buffer);

    int errorCode = 0;
    string reason = "";
    string token = "";
    writer.StartObject();

    if (!jsonObject.HasParseError())
    {
        if (jsonObject.HasMember("method") && jsonObject.HasMember("data") && jsonObject["method"].IsString() && jsonObject["data"].IsObject())
        {
            std::string method = jsonObject["method"].GetString();
            const rapidjson::Value &dataJson = jsonObject["data"];

            // Phương thức Login
            if (method == "LOGIN")
            {
                writer.String("method");
                writer.String("LOGIN");
                if (dataJson.HasMember("user") && dataJson.HasMember("pass") && dataJson["user"].IsString() && dataJson["pass"].IsString())
                {
                    string user = dataJson["user"].GetString();
                    string pass = dataJson["pass"].GetString();
                    if (dbUserGame.find(user) != dbUserGame.end())
                    {
                        if (pass == dbUserGame[user])
                        {
                            errorCode = 0;
                            token = genToken();

                            writer.String("token");
                            writer.String(token.c_str());

                            dbTokenGame[token] = user;
                        }
                        else
                        {
                            errorCode = 3;
                        }
                    }
                    else
                    {
                        errorCode = 2;
                    }
                }
                else
                {
                    errorCode = 1;
                }
            }

            // Phương thức play
            else if (method == "PLAY")
            {
                writer.String("method");
                writer.String("PLAY");
                if (dataJson.HasMember("token") && dataJson["token"].IsString())
                {
                    string token = dataJson["token"].GetString();
                    if (token != "")
                    {
                        if (dbTokenGame.find(token) != dbTokenGame.end())
                        {
                            errorCode = 0;
                            writer.String("username");
                            writer.String(dbTokenGame[token].c_str());
                        }
                        else
                        {
                            errorCode = 4;
                        }
                    }
                    else
                    {
                        errorCode = 1;
                    }
                }
                else
                {
                    errorCode = 1;
                }
            }
            else
            {
                errorCode = 1;
            }
        }
        else
        {
            errorCode = 1;
        }
    }
    else
    {
        errorCode = 1;
    }

    // Trả về mã lỗi và nội dung lỗi tương ứng
    if (errorCode > 0)
    {
        reason = getErrorReason(errorCode);
    }

    writer.String("errorCode");
    writer.Int(errorCode);
    writer.String("reason");
    writer.String(reason.c_str());
    writer.EndObject();

    s->send(hdl, buffer.GetString(), websocketpp::frame::opcode::text);
}

int main()
{
    initUser();
    server websocket_server;
    try
    {
        websocket_server.set_open_handler([](websocketpp::connection_hdl hdl)
                                          { std::cout << "Connected!" << std::endl; });

        websocket_server.set_message_handler(std::bind(&on_message,
                                                       std::placeholders::_1,
                                                       std::placeholders::_2,
                                                       &websocket_server));

        websocket_server.init_asio();
        websocket_server.listen(9002);

        websocket_server.start_accept();

        websocket_server.run();
    }
    catch (websocketpp::exception const &e)
    {
        std::cout << "Exception: " << e.what() << std::endl;
    }
    catch (...)
    {
        std::cout << "Unknown exception" << std::endl;
    }
    return 0;
}
