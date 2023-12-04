#include <iostream>
#include <vector>
using namespace std;

bool isExistShip(int a, int b, vector<vector<int>> &myShip)
{
    bool isValid = false;
    for (int i = 0; i < myShip.size(); ++i)
    {
        if (myShip[i][0] == a && myShip[i][1] == b)
        {
            isValid = true;
            break;
        }
    }
    return isValid;
}

bool isValidCell(int i, int j, vector<vector<int>> &field, vector<vector<int>> &myShip, bool isSubmarines = false)
{
    bool isValid = false;
    int rowLimit = field.size();
    int colLimit = field[0].size();

    for (int x = max(0, i - 1); x <= min(i + 1, rowLimit - 1); ++x)
    {
        for (int y = max(0, j - 1); y <= min(j + 1, colLimit - 1); ++y)
        {
            if ((x != i || y != j) && field[x][y] == 1)
            {
                isValid = isExistShip(x, y, myShip) && !isSubmarines && (x == i || y == j);
                if (!isValid)
                {
                    return false;
                }
            }
        }
    }
    return true;
}

bool isValidSizeMap(vector<vector<int>> &field)
{
    int numRows = field.size();
    if (numRows != 10)
    {
        cout << "The number of rows in the map must be equal to 10" << endl;
        return false;
    }

    for (size_t i = 0; i < numRows; i++)
    {
        int numCols = field[i].size();
        if (numCols != 10)
        {
            cout << "The number of col in the map must be equal to 10" << endl;
            return false;
        }
    }
    cout << "Map Size is valid" << endl;
    return true;
}

bool checkValidAmountShip(int battleships, int cruisers, int destroyers, int submarines)
{
    // battleShips
    if (battleships < 1)
    {
        cout << "Suggested: add a BatterShips" << endl;
    }
    else if (battleships > 1)
    {
        cout << "Suggested: add remove a BatterShips" << endl;
    }

    // cruisers
    if (cruisers < 2)
    {
        cout << "Suggested: add " << 2 - cruisers << " Cruisers" << endl;
    }
    else if (cruisers > 2)
    {
        cout << "Suggested: remove " << cruisers - 2 << " Cruisers" << endl;
    }

    // destroyers
    if (destroyers < 3)
    {
        cout << "Suggested: add " << 3 - destroyers << " Destroyers" << endl;
    }
    else if (destroyers > 3)
    {
        cout << "Suggested: remove " << destroyers - 3 << " Destroyers" << endl;
    }

    // submarines
    if (submarines < 4)
    {
        cout << "Suggested: add " << 4 - submarines << " Submarines" << endl;
    }
    else if (submarines > 4)
    {
        cout << "Suggested: remove " << submarines - 4 << " Submarines" << endl;
    }

    return (battleships == 1 && cruisers == 2 && destroyers == 3 && submarines == 4);
}

bool isValidMap(vector<vector<int>> &field)
{
    if (!isValidSizeMap(field))
    {
        return false;
    }
    cout << "Starting check...." << endl;
    int battleships = 0, cruisers = 0, destroyers = 0, submarines = 0;
    vector<vector<int>> vBattleships;
    vector<vector<int>> vCruisers;
    vector<vector<int>> vSubmarines;
    vector<vector<int>> vDestroyers;
    for (int i = 0; i < 10; ++i)
    {
        for (int j = 0; j < 10; ++j)
        {
            if (field[i][j] == 1)
            {
                bool valid = false;
                // Check Battleship
                if ((i < 7 && field[i + 1][j] == 1 && field[i + 2][j] == 1 && field[i + 3][j] == 1) ||
                    (j < 7 && field[i][j + 1] == 1 && field[i][j + 2] == 1 && field[i][j + 3] == 1))
                {
                    battleships++;
                    valid = true;
                    vBattleships.push_back({i, j});
                    if (i < 7 && field[i + 1][j] == 1 && field[i + 2][j] == 1 && field[i + 3][j] == 1)
                    {

                        vBattleships.push_back({i + 1, j});
                        vBattleships.push_back({i + 2, j});
                        vBattleships.push_back({i + 3, j});
                    }
                    else
                    {
                        vBattleships.push_back({i, j + 1});
                        vBattleships.push_back({i, j + 2});
                        vBattleships.push_back({i, j + 3});
                    }
                    j += 3; // Skip checking next 3 cells (battleship size - 1)
                }
                // Check Cruisers
                else if ((i < 8 && field[i + 1][j] == 1 && field[i + 2][j] == 1) ||
                         (j < 8 && field[i][j + 1] == 1 && field[i][j + 2] == 1))
                {
                    cruisers++;
                    valid = true;
                    vCruisers.push_back({i, j});
                    if (i < 8 && field[i + 1][j] == 1 && field[i + 2][j] == 1)
                    {
                        vCruisers.push_back({i + 1, j});
                        vCruisers.push_back({i + 2, j});
                    }
                    else
                    {
                        vCruisers.push_back({i, j + 1});
                        vCruisers.push_back({i, j + 2});
                    }
                    j += 2; // Skip checking next 2 cells (cruiser size - 1)
                }
                // Check Destroyers
                else if ((i < 9 && field[i + 1][j] == 1) ||
                         (j < 9 && field[i][j + 1] == 1))
                {
                    destroyers++;
                    valid = true;
                    vDestroyers.push_back({i, j});
                    if (i < 9 && field[i + 1][j] == 1)
                    {
                        vDestroyers.push_back({i + 1, j});
                    }
                    else
                    {
                        vDestroyers.push_back({i, j + 1});
                    }
                    j++; // Skip checking next cell (destroyer size - 1)
                }
                if (!valid)
                {
                    if ((i > 0 && field[i - 1][j] == 1) ||
                        (i < 9 && field[i + 1][j] == 1) ||
                        (j > 0 && field[i][j - 1] == 1) ||
                        (j < 9 && field[i][j + 1] == 1))
                    {
                        // Submarine is adjacent to another ship, mark as invalid
                    }
                    else
                    {
                        submarines++;
                        valid = true;
                        vSubmarines.push_back({i, j});
                    }
                }
            }
        }
    }

    bool isValidAmount = checkValidAmountShip(battleships, cruisers, destroyers, submarines);

    if (!isValidAmount)
    {
        return false;
    }

    bool isValid = true;
    for (int i = 0; i < vBattleships.size(); ++i)
    {
        int x = vBattleships[i][0];
        int y = vBattleships[i][1];

        isValid = isValidCell(x, y, field, vBattleships);
        if (!isValid)
        {
            cout << "Please check cell is isValidCell " << x << " " << y << endl;
            return false;
        }
    }

    for (int i = 0; i < vCruisers.size(); ++i)
    {
        int x = vCruisers[i][0];
        int y = vCruisers[i][1];

        isValid = isValidCell(x, y, field, vCruisers);
        if (!isValid)
        {
            cout << "Please check cell is isValidCell = " << x << " " << y << endl;
            return false;
        }
    }

    for (int i = 0; i < vDestroyers.size(); ++i)
    {
        int x = vDestroyers[i][0];
        int y = vDestroyers[i][1];
        isValid = isValidCell(x, y, field, vDestroyers);
        if (!isValid)
        {
            cout << "Please check cell is isValidCell = " << x << " " << y << endl;
            return false;
        }
    }

    for (int i = 0; i < vSubmarines.size(); ++i)
    {
        int x = vSubmarines[i][0];
        int y = vSubmarines[i][1];
        isValid = isValidCell(x, y, field, vSubmarines, true);
        if (!isValid)
        {
            cout << "Please check cell is isValidCell = " << x << " " << y << endl;
            return false;
        }
    }

    return isValid;
}

int main()
{

    vector<vector<int>> testField = {
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

    bool isValid = isValidMap(testField);
    cout << "Map valid = " << boolalpha << isValid << endl;

    return 0;
}
