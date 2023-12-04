#include "LoginWindow.h"
#include <iostream>
#include <future>
#include <queue>
std::queue<std::string> messageQueue;
std::mutex queueMutex;

void closeCallback(Fl_Widget *widget, void *data)
{
    exit(0); 
}

void LoginWindow::setLoginSuccessCallback(LoginSuccessCallback callback)
{
    onLoginSuccess = callback; 
}

void LoginWindow::setPlayGameSuccessCallback(PlaySuccessCallback callback)
{
    onPlayGameSuccess = callback; 
}

void updateTimeoutCallback(Fl_Widget *widget, void *data)
{
    std::cout << "updateTimeoutCallback" << std::endl;
    LoginWindow *loginWindow = static_cast<LoginWindow *>(data);
    loginWindow->messageBox->copy_label("msg.c_str()");
    loginWindow->messageBox->redraw();
}

void oneArgumentTimeoutCallback(void *data)
{
    std::cout << "oneArgumentTimeoutCallback" << std::endl;
    updateTimeoutCallback(nullptr, data);
}

void LoginWindow::showNotify(const std::string &content)
{
    std::cout << "showNotify = " << content << std::endl;
    playButton->hide();
    messageBox->copy_label(content.c_str());
    messageBox->redraw();
}

void LoginWindow::showPlayGame()
{
    std::cout << "showPlayGame " << std::endl;
    usernameInput->hide();
    passwordInput->hide();
    loginButton->hide();

    playButton->show();
}

void addMessageToQueue(const std::string &msg)
{
    std::lock_guard<std::mutex> lock(queueMutex);
    messageQueue.push(msg);
}

void LoginWindow::processMessagesFromQueue()
{
    std::lock_guard<std::mutex> lock(queueMutex);
    while (!messageQueue.empty())
    {
        std::string msg = messageQueue.front();
        messageQueue.pop();
        showNotify(msg);
    }
}

LoginWindow::LoginWindow()
{
    window = new Fl_Window(400, 300, "Login");

    usernameInput = new Fl_Input(100, 20, 180, 30, "Username:");
    passwordInput = new Fl_Input(100, 60, 180, 30, "Password:");
    passwordInput->type(FL_SECRET_INPUT); 

    loginButton = new Fl_Button(100, 100, 180, 30, "Login");
    loginButton->callback(loginButtonCallback, this);

    playButton = new Fl_Button(100, 100, 180, 30, "Play");
    playButton->callback(playButtonCallback, this);
    playButton->hide();

    messageBox = new Fl_Box(120, 140, 180, 30, "Thông báo:");
    messageBox->labelsize(14);                          
    messageBox->align(FL_ALIGN_LEFT | FL_ALIGN_INSIDE); 
    messageBox->labelfont(FL_BOLD);                     

    window->callback(closeCallback);
    window->end();
}

void LoginWindow::show()
{
    std::cout << "LoginWindow::show" << std::endl;
    window->show();
    Fl::run();
    // while (window->shown())
    // {
    //     Fl::check();
    //    
    //     // std::this_thread::sleep_for(std::chrono::milliseconds(100));
    // }
}

void LoginWindow::showAsync()
{
    std::future<void> future = std::async(std::launch::async, [&]()
                                          {
         std::cout << "LoginWindow::showAsync" << std::endl;
        window->show();
        Fl::run(); });
}

void LoginWindow::loginButtonCallback(Fl_Widget *widget, void *data)
{
    LoginWindow *loginWindow = static_cast<LoginWindow *>(data);
    const char *username = loginWindow->usernameInput->value();
    const char *password = loginWindow->passwordInput->value();

    if (loginWindow->onLoginSuccess)
    {
        loginWindow->onLoginSuccess(username, password); 
    }
}

void LoginWindow::playButtonCallback(Fl_Widget *widget, void *data)
{
    LoginWindow *loginWindow = static_cast<LoginWindow *>(data);
    if (loginWindow->onPlayGameSuccess)
    {
        loginWindow->onPlayGameSuccess(); 
    }
}

