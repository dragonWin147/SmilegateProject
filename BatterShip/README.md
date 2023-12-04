## Giới thiệu

- Tôi có viết một giải thuật để verify 1 map bao gồm các thuyền chiến để xem nó có thỏa điều kiện luật chơi không
- Cộng với đó tôi có 1 giải thuật để suggest người chơi sắp xếp đúng vị trí, lưu ý cái này chỉ là suggest nhỏ hỗ trợ 1 phần nào đó thôi chứ nó chưa đuượ tối ưu

> vector<vector<int>> testField = {
        {0, 1, 1, 1, 1, 0, 0, 0, 0, 0},
        {0, 0, 0, 0, 0, 0, 0, 0, 0, 1},
        {0, 1, 1, 1, 0, 1, 1, 1, 0, 1},
        {0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
        {0, 1, 1, 0, 0, 0, 1, 1, 0, 0},
        {0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
        {0, 0, 0, 0, 0, 0, 1, 0, 0, 0},
        {0, 0, 0, 1, 0, 0, 0, 0, 0, 0},
        {0, 0, 0, 0, 0, 1, 0, 0, 0, 0},
        {0, 1, 0, 0, 0, 0, 0, 0, 0, 0}};

Bạn có thể thay đổi các điểm số 0 và 1 ở đây.
 - 1 đại diện cho vị trí đó có tàu
 - 0 là vị trí đó đang trốn

## Cài đặt
**Môi truờng**
 - Mac OS
 - Visual studio code
 - Tham khảo : https://code.visualstudio.com/docs/languages/cpp
    

**Biên dich**
 - Tôi không sử dụng make file nên vui lòng chạy file `main.cpp` 

