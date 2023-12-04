
#ifndef LOGIN_WINDOW_H
#define LOGIN_WINDOW_H
#include <functional>
#include <string>
#include <FL/Fl.H>
#include <FL/Fl_Window.H>
#include <FL/Fl_Input.H>
#include <FL/Fl_Button.H>
#include <FL/Fl_Output.H>
#include <FL/Fl_Box.H>

class LoginWindow
{
public:
    LoginWindow();
    void show();
    void showAsync();
    static void loginButtonCallback(Fl_Widget *widget, void *data);
    static void playButtonCallback(Fl_Widget *widget, void *data);

    typedef std::function<void(const std::string &, const std::string &)> LoginSuccessCallback;
    typedef std::function<void()> PlaySuccessCallback;

    void setLoginSuccessCallback(LoginSuccessCallback callback);
    void setPlayGameSuccessCallback(PlaySuccessCallback callback);

    void showNotify(const std::string &);
    void showPlayGame();
    void processMessagesFromQueue();

    Fl_Window *window;
    Fl_Input *usernameInput;
    Fl_Input *passwordInput;
    Fl_Button *loginButton;
    Fl_Button *playButton;
    Fl_Output *messageOutput;
    Fl_Box *messageBox;

    LoginSuccessCallback onLoginSuccess;
    PlaySuccessCallback onPlayGameSuccess;
};

#endif
