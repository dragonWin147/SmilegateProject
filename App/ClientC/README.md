## Giới thiệu

- Tôi có viết một client bằng c++ sử dụng visual studio code
- Chương trình sẽ kết nối với server local thông qua đia chỉ `ws://localhost:9002`
- Bởi vì tôi dùng mac os và chưa thực sự thông thạo phân export file cài đặt cho win, nên bạn vui lòng chạy tự source code giúp.

## Cài đặt
**Môi truờng**
 - Mac OS
 - Visual studio code
 - FLTK : 
 
 **Setup**
 1. Cài đặt visual studio code và extension c++ Theo hướng dẫn từ link : https://code.visualstudio.com/docs/languages/cpp
 2. Cài đăt Homebrew
    1. Mở terminal và run `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
    2. Kiểm tra cài đặt : `brew -v`
 3. Cài đặt `websocketpp` : 
    > `brew install websocketpp`
 4. Cài đặt `boost` : 
    > `brew install boost`
 5. Cài đặt `rapidjson` : 
    > `brew install rapidjson`
 6. Cài đặt `FLTK` : 
    > `brew install fltk`
 7. Cài đặt `openssl` : 
    > `brew install openssl`
 8. Tôi không sử dụng make file nên vui lòng chạy file `GameController.cpp` . Chọn Run C/C++. 
 ![Alt text](<Screenshot 2023-12-05 at 22.52.34.png>)
**Lưu ý cần run Server trước rồi mới run app client này thì mới kết nối được**

**Biên dich**
 