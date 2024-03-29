// My solved cpeOneStar problems
var solved_cpeOneStar = [
    10041, 10055, 10035, 100, 10929,
    10101, 10420, 10008, 10222, 11332,
    10252, 490, 272, 12019, 10038,
    10056, 10170, 10268, 10783, 10812,
    11349, 11461, 11063, 10071, 10093,
    948, 10019, 10931, 11005, 10050,
    10193, 10190, 10235, 10922, 11417,
    10908, 10221, 10642, 10242, 10057,
    10062, 299, 10226, 10189, 10409,
    10415, 118, 11150, 11321
]

// My solved leetcode problems
var solved_leetcode = [
    1, 9, 20, 35, 53, 66, 122,
    300, 326, 367, 645, 704,
    709, 711, 832, 938, 943,
    946, 977, 1108, 1143, 1221,
    1295, 1313, 1323, 1365, 1389,
    1431, 1450, 1470, 1480, 1486,
    1512, 1603, 1614, 1662, 1672,
    1688, 1704, 1725, 1732, 1768,
    1773, 1796, 1812, 1920, 1929,
    141, 700, 217, 206, 234, 21,
    88, 350, 121, 566, 118, 2011,
    74, 387, 383, 242, 36, 203, 83
]

// My UVa accept codes
var UVa_ac = [
    `
    //100
    #include &ltbits/stdc++.h&gt
    using namespace std;
    int main()
    {
        int n1, n2;
        while(cin &gt&gt n1 &gt&gt n2){
            cout &lt&lt n1 &lt&lt " " &lt&lt n2 &lt&lt " ";
            int ans = 0;
            for(int i = min(n1, n2); i &lt= max(n1, n2); i++){
                int temp = i, counter = 1;
                while(temp &gt 1){
                    if(temp % 2 == 0){
                        temp /= 2;
                    }
                    else{
                        temp = temp * 3 + 1;
                    }
                    counter++;
                }
                if(ans &lt counter){
                    ans = counter;
                }
            }
            cout &lt&lt ans &lt&lt endl;
        }
        return 0;
    }
    `,
    `
    //118
    #include &ltbits/stdc++.h&gt
    using namespace std;
    int main()
    {
        int row, col;
        cin &gt&gt row &gt&gt col;
        int dead[row + 1][col + 1] = {0};
        int init_row, init_col;
        string facing, command;
        while(cin &gt&gt init_row &gt&gt init_col &gt&gt facing &gt&gt command){
            for(int i = 0; i &lt command.length(); i++){
                char one_command = command[i];
                int dead_loc = dead[init_row][init_col];
                if(init_row &lt 0 || init_col &lt 0 || init_row &gt row || init_col &gt col){
                    break;
                }
                if(one_command == 'R'){
                    if(facing == "E"){
                        facing = "S";
                    }
                    else if(facing == "S"){
                        facing = "W";
                    }
                    else if(facing == "W"){
                        facing = "N";
                    }
                    else if(facing =="N"){
                        facing = "E";
                    }
                }
                else if(one_command == 'L'){
                    if(facing == "E"){
                        facing = "N";
                    }
                    else if(facing == "S"){
                        facing = "E";
                    }
                    else if(facing == "W"){
                        facing = "S";
                    }
                    else if(facing =="N"){
                        facing = "W";
                    }
                }
                else if(one_command == 'F'){
                    if(facing == "E" && (dead_loc != 1 || init_row + 1 &lt= row)){
                        init_row += 1;
                    }
                    else if(facing == "S" && (dead_loc != 1 || init_col - 1 &gt 0)){
                        init_col -= 1;
                    }
                    else if(facing == "W" && (dead_loc != 1 || init_row - 1 &gt 0)){
                        init_row -= 1;
                    }
                    else if(facing =="N" && (dead_loc != 1 || init_col + 1 &lt= col)){
                        init_col += 1;
                    }
                }
            }
            if(init_row &lt 0){
                cout &lt&lt init_row + 1 &lt&lt " " &lt&lt init_col &lt&lt " " &lt&lt facing &lt&lt " LOST" &lt&lt endl;
                dead[init_row + 1][init_col] = 1;
            }
            else if(init_col &lt 0){
                cout &lt&lt init_row &lt&lt " " &lt&lt init_col + 1 &lt&lt " " &lt&lt facing &lt&lt " LOST" &lt&lt endl;
                dead[init_row][init_col + 1] = 1;
            }
            else if(init_row &gt row){
                cout &lt&lt init_row - 1 &lt&lt " " &lt&lt init_col &lt&lt " " &lt&lt facing &lt&lt " LOST" &lt&lt endl;
                dead[init_row - 1][init_col] = 1;
            }
            else if(init_col &gt col){
                cout &lt&lt init_row &lt&lt " " &lt&lt init_col - 1 &lt&lt " " &lt&lt facing &lt&lt " LOST" &lt&lt endl;
                dead[init_row][init_col - 1] = 1;
            }
            else{
                cout &lt&lt init_row &lt&lt " " &lt&lt init_col &lt&lt " " &lt&lt facing &lt&lt endl;
            }
        }
        return 0;
    }
    `,
    `
    //272
    #include &ltbits/stdc++.h&gt
    using namespace std;
    int main()
    {
        int counter = 0;
        string str;
        while(getline(cin, str)){
            for(int i = 0; i &lt str.length(); i++){
                if(str[i] == '"'){
                    (counter % 2) ? cout &lt&lt "''" : cout &lt&lt "\`\`";
                    counter++;
                }
                else{
                    cout &lt&lt str[i];
                }
            }
            cout &lt&lt endl;
        }
        return 0;
    }
    `,
    `
    //299
    #include &ltbits/stdc++.h&gt
    using namespace std;
    int main()
    {
        int cases;
        cin &gt&gt cases;
        while(cases--){
            int number;
            cin &gt&gt number;
            int arr[number];
            for(int i = 0; i &lt number; i++){
                cin &gt&gt arr[i];
            }
            int counter = 0;
            for(int i = 0; i &lt number; i++){
                for(int j = i + 1; j &lt number; j++){
                    if(arr[i] &gt arr[j]){
                        swap(arr[i], arr[j]);
                        counter++;
                    }
                }
            }
            cout &lt&lt "Optimal train swapping takes " &lt&lt counter &lt&lt " swaps." &lt&lt endl;
        }
        return 0;
    }
    `,
    `
    //490
    #include &ltbits/stdc++.h&gt
    using namespace std;
    int main()
    {
        char sentences[102][102] = {0};
        int rowLimit = 0, colLimit = 0;
        while(gets(sentences[rowLimit])){
            colLimit = max( colLimit, (int)strlen(sentences[rowLimit]) );
            ++rowLimit;
        }

        for(int i = 0 ; i &lt colLimit ; i++){
            for(int j = rowLimit - 1 ; j &gt= 0 ; j--){
                if(sentences[j][i] == 0){
                    cout &lt&lt " ";
                    continue;
                }
                cout &lt&lt sentences[j][i];
            }
            cout &lt&lt endl;
        }

        return 0;
    }
    `,
    `
    //948
    #include &ltbits/stdc++.h&gt
    using namespace std;
    int main()
    {
        int total;
        cin &gt&gt total;
        string str;
        int counter[2][26];
        for(int i = 0; i &lt 26; i++){
            counter[0][i] = i;
            counter[1][i] = 0;
        }
        for(int i = 0; i &lt= total; i++){
            getline(cin, str);
            for(int j = 0; j &lt str.length(); j++){
                if(toupper(str[j]) &lt= 'Z' && 'A' &lt= toupper(str[j])){
                    counter[1][toupper(str[j]) - 'A']++;
                }
            }
        }

        for(int i = 0; i &lt 26; i++){
            for(int j = 0; j &lt 26; j++){
                if(counter[1][i] &gt counter[1][j]){
                    swap(counter[0][i], counter[0][j]);
                    swap(counter[1][i], counter[1][j]);
                }
                if(counter[1][i] == counter[1][j]){
                    if(counter[0][i] &lt counter[0][j]){
                        swap(counter[0][i], counter[0][j]);
                        swap(counter[1][i], counter[1][j]);
                    }
                }
            }
        }

        for(int i = 0; i &lt 26; i++){
            if(counter[1][i] != 0){
                cout &lt&lt char(counter[0][i] + 'A') &lt&lt " " &lt&lt counter[1][i] &lt&lt endl;
            }
        }

        return 0;
    }
    `,
    `
    //10008
    #include &ltbits/stdc++.h&gt
    using namespace std;
    int main()
    {
        int total;
        cin &gt&gt total;
        string str;
        int counter[2][26];
        for(int i = 0; i &lt 26; i++){
            counter[0][i] = i;
            counter[1][i] = 0;
        }
        for(int i = 0; i &lt= total; i++){
            getline(cin, str);
            for(int j = 0; j &lt str.length(); j++){
                if(toupper(str[j]) &lt= 'Z' && 'A' &lt= toupper(str[j])){
                    counter[1][toupper(str[j]) - 'A']++;
                }
            }
        }

        for(int i = 0; i &lt 26; i++){
            for(int j = 0; j &lt 26; j++){
                if(counter[1][i] &gt counter[1][j]){
                    swap(counter[0][i], counter[0][j]);
                    swap(counter[1][i], counter[1][j]);
                }
                if(counter[1][i] == counter[1][j]){
                    if(counter[0][i] &lt counter[0][j]){
                        swap(counter[0][i], counter[0][j]);
                        swap(counter[1][i], counter[1][j]);
                    }
                }
            }
        }

        for(int i = 0; i &lt 26; i++){
            if(counter[1][i] != 0){
                cout &lt&lt char(counter[0][i] + 'A') &lt&lt " " &lt&lt counter[1][i] &lt&lt endl;
            }
        }

        return 0;
    }
    `,
    `
    //10019
    #include &ltbits/stdc++.h&gt
    using namespace std;
    int main()
    {
        int cases;
        cin &gt&gt cases;
        while(cases--){
            int num, count_binary = 0, count_hex = 0, num_temp;
            cin &gt&gt num;
            num_temp = num;
            while(num &gt 0){
                if(num % 2){
                    count_binary++;
                }
                num /= 2;
            }
            num = num_temp;
            while(num &gt 0){
                int temp = num % 10;
                while(temp &gt 0){
                    if(temp % 2){
                        count_hex++;
                    }
                    temp /= 2;
                }
                num /= 10;
            }
            cout &lt&lt count_binary &lt&lt " " &lt&lt count_hex &lt&lt endl;
        }
        return 0;
    }
    `,
    `
    //10035
    #include &ltbits/stdc++.h&gt
    using namespace std;
    int main()
    {
        string str1, str2;
        while(cin &gt&gt str1 &gt&gt str2 && (str1 != "0" || str2 != "0")){
            int counter = 0;
            int arr1[11] = {0}, arr2[11] = {0};
            if(str2.length() &gt str1.length()){
                swap(str1, str2);
            }
            for(int i = 0; i &lt str1.length(); i++){
                arr1[str1.length() - i - 1] = str1[i] - '0';
            }
            for(int i = 0; i &lt str2.length(); i++){
                arr2[str2.length() - i - 1] = str2[i] - '0';
            }
            for(int i = 0; i &lt 10; i++){
                arr1[i] += arr2[i];
                if(arr1[i] &gt= 10){
                    arr1[i + 1]++;
                    arr1[i] -= 10;
                    counter++;
                }
            }
            if(counter == 0){
                cout &lt&lt "No carry operation.";
            }
            else if(counter == 1){
                cout &lt&lt "1 carry operation.";
            }
            else{
                cout &lt&lt counter &lt&lt " carry operations.";
            }
            cout &lt&lt endl;
        }
        return 0;
    }
    `,
    `
    //10038
    #include &ltbits/stdc++.h&gt
    using namespace std;
    int main()
    {
        int total;
        while(cin &gt&gt total){
            int numbers[total];
            int check[total - 1] = {0};
            for(int i = 0; i &lt&lt total; i++){
                cin &gt&gt numbers[i];
            }
            for(int i = 0; i &lt total - 1; i++){
                check[ abs(numbers[i] - numbers[i + 1]) - 1 ]++;
            }
            bool Jolly = true;
            for(int i = 0; i &lt total - 1; i++){
                if(check[i] != 1){
                    Jolly = false;
                    break;
                }
            }
            if(Jolly){
                cout &lt&lt "Jolly" &lt&lt endl;
            }
            else{
                cout &lt&lt "Not jolly" &lt&lt endl;
            }
        }
        return 0;
    }
    `,
    `
    //10041
    #include &ltbits/stdc++.h&gt
    using namespace std;
    int main()
    {
        int n, arr[30000];
        cin &gt&gt n;
        for(int i = 0; i &lt n; i++){
            int r;
            cin &gt&gt r;
            for(int j = 0; j &lt r; j++){
                cin &gt&gt arr[j];
            }
            sort(arr, arr + r);
            int middle = (r / 2), total1 = 0, total2 = 0;
            if(r % 2 == 1){
                for(int j = 0; j &lt r; j++){
                    total1 += abs(arr[j] - arr[middle]);
                }
                cout &lt&lt total1 &lt&lt endl;
            }
            else{
                for(int j = 0; j &lt r; j++){
                    total1 += abs(arr[j] - arr[middle]);
                }
                middle--;
                for(int j = 0; j &lt r; j++){
                    total2 += abs(arr[j] - arr[middle]);
                }
                cout &lt&lt min(total1, total2) &lt&lt endl;
            }
        }
        return 0;
    }
    `,
    `
    //10050
    #include &ltbits/stdc++.h&gt
    using namespace std;
    int main()
    {
        int cases;
        cin &gt&gt cases;
        while(cases--){
            int days;
            cin &gt&gt days;
            int arr[days + 1] = {0};
            int count_h;
            cin &gt&gt count_h;
            for(int i = 0; i &lt count_h; i++){
                int temp, temp_h;
                cin &gt&gt temp_h;
                temp = temp_h;
                while(temp &lt= days){
                    arr[temp]++;
                    temp += temp_h;
                }
            }
            int ans = 0;
            for(int i = 1; i &lt= days; i++){
                if(arr[i] &gt 0 && i % 7 != 0 && i % 7 != 6){
                    ans++;
                }
            }
            cout &lt&lt ans &lt&lt endl;
        }
        return 0;
    }
    `,
    `
    //10055
    #include &ltbits/stdc++.h&gt
    using namespace std;
    int main()
    {
        long long a, b;
        while(cin &gt&gt a &gt&gt b){
            cout &lt&lt abs(a - b) &lt&lt endl;
        }
        return 0;
    }
    `,
    `
    //10056
    #include &ltbits/stdc++.h&gt
    using namespace std;
    int main()
    {
        int cases;
        cin &gt&gt cases;
        while(cases--){
            int n, x;
            double p, q;
            cin &gt&gt n &gt&gt p &gt&gt x;
            q = 1 - p;
            if(q == 1){
                cout &lt&lt "0.0000" &lt&lt endl;
            }
            else{
                cout &lt&lt fixed &lt&lt setprecision(4) &lt&lt pow(q, x - 1) * p / (1 - pow(q, n)) &lt&lt endl;
            }
        }
        return 0;
    }
    `,
    `
    //10057
    #include &ltbits/stdc++.h&gt
    using namespace std;
    int main()
    {
        int n;
        while(cin &gt&gt n){
            int arr[n];
            for (int i = 0; i &lt n; i++){
                cin &gt&gt arr[i];
            }
            sort(arr, arr + n);
            int mid1 = arr[(n - 1) / 2];
            int mid2 = arr[n / 2];
            int ans = 0;
            for (int i = 0; i &lt n; i++){
                if (arr[i] == mid1 || arr[i] == mid2){
                    ans++;
                }
            }
            cout &lt&lt mid1 &lt&lt " " &lt&lt ans &lt&lt " " &lt&lt mid2 - mid1 + 1 &lt&lt endl;
        }
        return 0;
    }
    `,
    `
    //10062
    #include &ltbits/stdc++.h&gt
    using namespace std;
    bool cmp(pair&ltint, int&gt a, pair&ltint, int&gt b){
        if (a.first != b.first) return a.first &lt b.first;
        else return a.second &gt b.second;
    }

    int main()
    {
        ios_base::sync_with_stdio(0);
        cin.tie(0);
        string str;
        int counter = 0;
        while(getline(cin, str)){
            if(counter == 0){
                counter++;
            }
            else{
                cout &lt&lt endl;
                counter++;
            }
            pair&ltint, int&gt a[256];
            for (int i = 0; i &lt 256; i++) {
                a[i] = {0, i};
            }
            for (int i = 0; i &lt str.size(); i++) {
                a[(int)str[i]].first++;
            }
            sort(a, a + 256, cmp);
            for (auto i: a){
                if (i.first &gt 0) cout &lt&lt i.second &lt&lt " " &lt&lt i.first &lt&lt endl;
            }
        }
        return 0;
    }
    `,
    `
    //10071
    #include &ltbits/stdc++.h&gt
    using namespace std;
    int main()
    {
        int v, t;
        while(cin &gt&gt v &gt&gt t){
            cout &lt&lt 2 * v * t &lt&lt endl;
        }
        return 0;
    }
    `,
    `
    //10093
    #include &ltbits/stdc++.h&gt
    using namespace std;
    int main()
    {
        string str;
        while(getline(cin, str)){
            int sum = 0, base = 1, temp;
            for(int i = 0; i &lt str.length(); i++){
                if(isdigit(str[i])){
                    temp = str[i] - '0';
                }
                else if(isupper(str[i])){
                    temp = str[i] - 'A' + 10;
                }
                else if(islower(str[i])){
                    temp = str[i] - 'a' + 36;
                }
                else{
                    continue;
                }
                if(temp &gt base){
                    base = temp;
                }
                sum += temp;
            }
            for(int i = base; i &lt 62; i++){
                if(sum % i == 0){
                    cout &lt&lt i + 1 &lt&lt endl;
                    break;
                }
                if(i == 61){
                    cout &lt&lt "such number is impossible!" &lt&lt endl;
                }
            }
        }
        return 0;
    }
    `,
    `
    //10101
    #include &ltbits/stdc++.h&gt
    using namespace std;
    void bangla(long long int number)
    {
        if(number &gt= 10000000){
            bangla(number / 10000000);
            cout &lt&lt " kuti ";
            number %= 10000000;
        }
        if(number &gt= 100000){
            bangla(number / 100000);
            cout &lt&lt " lakh ";
            number %= 100000;
        }
        if(number &gt= 1000){
            bangla(number / 1000);
            cout &lt&lt " hajar ";
            number %= 1000;
        }
        if(number &gt= 100){
            bangla(number / 100);
            cout &lt&lt " shata ";
            number %= 100;
        }
        if(0 &lt= number && number &lt 100){
            cout &lt&lt number;
        }
    }

    int main()
    {
        long long int number;
        int counter = 0;
        while(cin &gt&gt number){
            cout &lt&lt ++counter &lt&lt ". ";
            bangla(number);
            cout &lt&lt endl;
        }
        return 0;
    }
    `,
    `
    //10170
    #include &ltbits/stdc++.h&gt
    using namespace std;
    int main()
    {
        long long init, day;
        while(cin &gt&gt init &gt&gt day){
            while(day &gt 0){
                day -= init;
                init++;
            }
            cout &lt&lt init - 1 &lt&lt endl;
        }
        return 0;
    }
    `,
    `
    //10189
    #include &ltbits/stdc++.h&gt
    using namespace std;
    int main()
    {
        int row, col, counter = 1;
        bool flag = false;
        while(cin &gt&gt row &gt&gt col && row && col){
            char arr[row][col];
            for(int i = 0; i &lt row; i++){
                for(int j = 0; j &lt col; j++){
                    cin &gt&gt arr[i][j];
                    if(arr[i][j] == '.'){
                        arr[i][j] = '0';
                    }
                }
            }
            for(int i = 0; i &lt row; i++){
                for(int j = 0; j &lt col; j++){
                    if(arr[i][j] == '*'){
                        continue;
                    }
                    //left upper
                    if(i - 1 &gt= 0 && j - 1 &gt= 0 && arr[i - 1][j - 1] == '*'){
                        arr[i][j]++;
                    }
                    //upper
                    if(i - 1 &gt= 0 && arr[i - 1][j] == '*'){
                        arr[i][j]++;
                    }
                    //right upper
                    if(i - 1 &gt= 0 && j + 1 &lt col && arr[i - 1][j + 1] == '*'){
                        arr[i][j]++;
                    }
                    //left
                    if(j - 1 &gt= 0 && arr[i][j - 1] == '*'){
                        arr[i][j]++;
                    }
                    //right
                    if(j + 1 &lt col && arr[i][j + 1] == '*'){
                        arr[i][j]++;
                    }
                    //left lower
                    if(i + 1 &lt row && j - 1 &gt= 0 && arr[i + 1][j - 1] == '*'){
                        arr[i][j]++;
                    }
                    //lower
                    if(i + 1 &lt row && arr[i + 1][j] == '*'){
                        arr[i][j]++;
                    }
                    //right lower
                    if(i + 1 &lt row && j + 1 &lt col && arr[i + 1][j + 1] == '*'){
                        arr[i][j]++;
                    }
                }
            }
            if(!flag){
                flag = !flag;
            }
            else{
                cout &lt&lt endl;
            }
            cout &lt&lt "Field #" &lt&lt counter++ &lt&lt ":" &lt&lt endl;
            for(int i = 0; i &lt row; i++){
                for(int j = 0; j &lt col; j++){
                    if(arr[i][j] != '*'){
                        cout &lt&lt arr[i][j] - '0';
                    }
                    else{
                        cout &lt&lt arr[i][j];
                    }
                }
                cout &lt&lt endl;
            }
        }
        return 0;
    }
    `,
    `
    //10190
    #include &ltbits/stdc++.h&gt
    using namespace std;
    bool notBoring(long long num1, long long num2)
    {
        for(int i = 1; ; i++){
            if(num1 == pow(num2, i)){
                return true;
            }
            if(num1 &lt pow(num2, i)){
                return false;
            }
        }
    }

    int main()
    {
        long long num1, num2;
        while(cin &gt&gt num1 &gt&gt num2){
            if(num2 == 0 || num2 == 1 || !notBoring(num1, num2)){
                cout &lt&lt "Boring!" &lt&lt endl;
                continue;
            }
            else if(notBoring(num1, num2)){
                cout &lt&lt num1 &lt&lt " ";
                while(num1 != num2){
                    num1 /= num2;
                    cout &lt&lt num1 &lt&lt " ";
                }
                cout &lt&lt "1" &lt&lt endl;
                continue;
            }
        }
        return 0;
    }
    `,
    `
    //10193
    #include &ltbits/stdc++.h&gt
    using namespace std;
    long long b_to_d(string str)
    {
        long long x = 0;
        for(int i = 0; i &lt str.length(); i++){
            x *= 2;
            x += str[i] - '0';
        }
        return x;
    }

    long long GCD(long long num1, long long num2)
    {
        while( (num1 %= num2) && (num2 %= num1) );
        return num1 + num2;
    }

    int main()
    {
        int cases, c = 0;
        cin &gt&gt cases;
        while(c++ &lt cases){
            string str1, str2;
            cin &gt&gt str1 &gt&gt str2;
            long long num1 = b_to_d(str1), num2 = b_to_d(str2);
            if(GCD(num1, num2) == 1){
                cout &lt&lt "Pair #" &lt&lt c &lt&lt ": Love is not all you need!" &lt&lt endl;
            }
            else{
                cout &lt&lt "Pair #" &lt&lt c &lt&lt ": All you need is love!" &lt&lt endl;
            }
        }
        return 0;
    }
    `,
    `
    //10221
    #include &ltbits/stdc++.h&gt
    using namespace std;
    int main()
    {
        double r = 6440.0, s, a, chord, arc;
        string unit;
        while(cin &gt&gt s &gt&gt a &gt&gt unit){
            if(unit == "min"){
                a /= 60.0;
            }
            if(a &gt 180.0){
                a = 360.0 - a;
            }
            cout &lt&lt fixed &lt&lt setprecision(6) &lt&lt 2.0 * acos(0.0) * 2.0 * (r + s) * a / 360.0 &lt&lt " "
                              &lt&lt (r + s) * cos((90.0 - a / 2.0) / 180.0 * acos(0.0) * 2.0) * 2.0 &lt&lt endl;
        }
        return 0;
    }
    `,
    `
    //10222
    #include &ltbits/stdc++.h&gt
    using namespace std;
    int main()
    {
        string str = "\`1234567890-=qwertyuiop[]\\asdfghjkl;\'zxcvbnm,./";
        string inputString;
        getline(cin, inputString);
        for(int i = 0; i &lt inputString.length(); i++){
            inputString[i] = tolower(inputString[i]);
        }
        for(int i = 0; i &lt inputString.length(); i++){
            if(inputString[i] == ' '){
                cout &lt " ";
            }
            else{
                for(int j = 0; j &lt str.length(); j++){
                    if(str[j] == inputString[i]){
                        cout &lt str[j - 2];
                        break;
                    }
                }
            }
        }
        return 0;
    }
    `,
    `
    //10226
    #include &ltbits/stdc++.h&gt
    using namespace std;
    int main()
    {
        int n, total = 0;
        string name;
        map&ltstring, double&gt tree_data;
        cin &gt&gt n;
        cin.ignore();
        getline(cin, name);
        int counter = 0;
        while(n--){
            if(counter == 0){
                counter++;
            }
            else{
                cout &lt&lt endl;
            }
            while (getline(cin, name) && name != ""){
                    tree_data[name]++, total++;
            }
            for (auto it = tree_data.begin(); it != tree_data.end(); it++){
                cout &lt&lt it -&gt first &lt&lt " " &lt&lt fixed &lt&lt setprecision(4) &lt&lt it -&gt second / total * 100 &lt&lt endl;
            }
            tree_data.clear();
            total = 0;
        }
        return 0;
    }
    `,
    `
    //10235
    #include &ltbits/stdc++.h&gt
    using namespace std;
    bool notPrime[1000001];

    void makeTable()
    {
        notPrime[1] = true;
        for(int i = 2; i &lt 1000001; i++){
            if(!notPrime[i]){
                for(int j = i + i; j &lt 1000001; j += i){
                    notPrime[j] = true;
                }
            }
        }
    }

    int main()
    {
        makeTable();
        string str, temp;
        while(cin &gt&gt str){
            temp = str;
            cout &lt&lt str &lt&lt " ";
            if(!notPrime[stoi(str)]){
                reverse(str.begin(), str.end());
                if(temp == str){
                    cout &lt&lt "is prime." &lt&lt endl;
                    continue;
                }
                if(!notPrime[stoi(str)]){
                    cout &lt&lt "is emirp." &lt&lt endl;
                    continue;
                }
                else{
                    cout &lt&lt "is prime." &lt&lt endl;
                    continue;
                }
            }
            else{
                cout &lt&lt "is not prime." &lt&lt endl;
                continue;
            }
        }
        return 0;
    }
    `,
    `
    //10242
    #include &ltbits/stdc++.h&gt
    using namespace std;
    int main()
    {
        double x1, y1, x2, y2, x3, y3, x4, y4;
        while(cin &gt&gt x1 &gt&gt y1 &gt&gt x2 &gt&gt y2 &gt&gt x3 &gt&gt y3 &gt&gt x4 &gt&gt y4){
            if(x1 == x3 && y1 == y3){
                cout &lt&lt fixed &lt&lt setprecision(3) &lt&lt (x2 + x4) - x1 &lt&lt " "
                     &lt&lt fixed &lt&lt setprecision(3) &lt&lt (y2 + y4) - y1 &lt&lt endl;
            }
            else if(x1 == x4 && y1 == y4){
                cout &lt&lt fixed &lt&lt setprecision(3) &lt&lt (x2 + x3) - x1 &lt&lt " "
                     &lt&lt fixed &lt&lt setprecision(3) &lt&lt (y2 + y3) - y1 &lt&lt endl;
            }
            else if(x2 == x3 && y2 == y3){
                cout &lt&lt fixed &lt&lt setprecision(3) &lt&lt (x1 + x4) - x2 &lt&lt " "
                     &lt&lt fixed &lt&lt setprecision(3) &lt&lt (y1 + y4) - y2 &lt&lt endl;
            }
            else{
                cout &lt&lt fixed &lt&lt setprecision(3) &lt&lt (x1 + x3) - x2 &lt&lt " "
                     &lt&lt fixed &lt&lt setprecision(3) &lt&lt (y1 + y3) - y2 &lt&lt endl;
            }
        }
        return 0;
    }
    `,
    `
    //10252
    #include &ltbits/stdc++.h&gt
    using namespace std;
    int main()
    {
        string str1, str2;
        while(getline(cin, str1) && getline(cin, str2)){
            string output = "";
            for(int i = 0; i &lt str1.length(); i++){
                for(int j = 0; j &lt str2.length(); j++){
                    if(str1[i] == str2[j]){
                        output += str1[i];
                        str2[j] = ' ';
                        break;
                    }
                }
            }
            sort(output.begin(), output.end());
            cout &lt&lt output &lt&lt endl;
        }
        return 0;
    }
    `,
    `
    //10268
    #include &ltbits/stdc++.h&gt
    using namespace std;
    int a[1000000];

    void run(int length, int x)
    {
        long long ans = 0, exp = 1;
        for(int i = length - 1; i &gt= 0; i--){
            ans += a[i] * exp * (length - i);
            exp *= x;
        }
        cout &lt&lt ans &lt&lt endl;
    }
    int main()
    {
        int x, n;
        while(scanf("%d", &x) != EOF){
            for(n = 0; ; n++){
                cin &gt&gt a[n];
                if(getchar() == '\n'){
                    break;
                }
            }
            run(n,x);
        }
    }
    `,
    `
    //10409
    #include &ltbits/stdc++.h&gt
    using namespace std;
    void toEast(int* arr){
        int t = arr[0];
        arr[0] = arr[3];
        arr[3] = arr[1];
        arr[1] = arr[5];
        arr[5] = t;
    }

    void toWest(int* arr){
        int t = arr[0];
        arr[0] = arr[5];
        arr[5] = arr[1];
        arr[1] = arr[3];
        arr[3] = t;
    }

    void toNorth(int* arr){
        int t = arr[0];
        arr[0] = arr[4];
        arr[4] = arr[1];
        arr[1] = arr[2];
        arr[2] = t;
    }

    void toSouth(int* arr){
        int t = arr[0];
        arr[0] = arr[2];
        arr[2] = arr[1];
        arr[1] = arr[4];
        arr[4] = t;
    }

    int main(){
        int times;
        while(cin &gt&gt times && times){
            int faces[6] = {1, 6, 2, 3, 5, 4};
            while(times--){
                string str;
                cin &gt&gt str;
                if(str == "north"){
                    toNorth(faces);
                }
                if(str == "south"){
                    toSouth(faces);
                }
                if(str == "west"){
                    toWest(faces);
                }
                if(str == "east"){
                    toEast(faces);
                }

            }
            cout &lt&lt faces[0] &lt&lt endl;
        }
        return 0;
    }
    `,
    `
    //10415
    #include &ltbits/stdc++.h&gt
    using namespace std;

    int main()
    {
        map &ltchar, vector&ltint&gt &gt mp;
        mp['c'] = {0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1};
        mp['d'] = {0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0};
        mp['e'] = {0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0};
        mp['f'] = {0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0};
        mp['g'] = {0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0};
        mp['a'] = {0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0};
        mp['b'] = {0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0};
        mp['C'] = {0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0};
        mp['D'] = {0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0};
        mp['E'] = {0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0};
        mp['F'] = {0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0};
        mp['G'] = {0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0};
        mp['A'] = {0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0};
        mp['B'] = {0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0};
        int cases;
        string str;
        cin &gt&gt cases;
        getline(cin, str);
        while(cases--){
            getline(cin, str);
            int cnt[11] = {0};
            int a[11] = {0};
            for(int i = 0; i &lt str.size(); i++){
                for(int j = 1; j &lt= 10; j++){
                    if(mp[str[i]][j]){
                        if(a[j]){
                            continue;
                        }
                        else{
                            a[j] = 1;
                            cnt[j]++;
                        }
                    }
                    else{
                        a[j] = 0;
                    }
                }
            }
            for(int i = 1; i &lt= 10; i++){
                cout &lt&lt cnt[i];
                if(i != 10){
                    cout &lt&lt " ";
                }
            }
            cout &lt&lt endl;
        }
        return 0;
    }
    `,
    `
    //10420
    #include &ltbits/stdc++.h&gt
    using namespace std;
    int main()
    {
        int n;
        cin &gt&gt n;
        map&ltstring, int&gt ans;
        for(int i = 0; i &lt n; i++){
            string country, foo;
            cin &gt&gt country;
            getline(cin, foo);
            ans[country]++;
        }
        for(auto x : ans){
            cout &lt&lt x.first &lt&lt " " &lt&lt x.second &lt&lt endl;
        }
        return 0;
    }
    `,
    `
    //10642
    #include &ltbits/stdc++.h&gt
    using namespace std;
    int main()
    {
        int t = 0, T;
        cin &gt&gt T;
        while(t++ &lt T){
            int x1, y1, x2, y2;
            cin &gt&gt x1 &gt&gt y1 &gt&gt x2 &gt&gt y2;
            int ans = 0;
            ans += (x1 + y1 + x2 + y2 + 1) * (x2 + y2 - x1 - y1) / 2;
            ans += (x2 - x1);
            cout &lt&lt "Case " &lt&lt t &lt&lt ": " &lt&lt ans &lt&lt endl;
        }
        return 0;
    }
    `,
    `
    //10783
    #include &ltbits/stdc++.h&gt
    using namespace std;
    int main()
    {
        int cases;
        cin &gt&gt cases;
        for(int i = 0; i &lt cases; i++){
            int a, b, ans = 0;
            cin &gt&gt a &gt&gt b;
            for(int j = a; j &lt= b; j++){
                if(j % 2){
                    ans += j;
                }
            }
            cout &lt&lt "Case " &lt&lt i + 1 &lt&lt ": " &lt&lt ans &lt&lt endl;
        }
        return 0;
    }
    `,
    `
    //10812
    #include &ltbits/stdc++.h&gt
    using namespace std;
    int main()
    {
        int cases;
        cin &gt&gt cases;
        for(int i = 0; i &lt cases; i++){
            int x, y;
            cin &gt&gt x &gt&gt y;
            if((x + y) / 2 &lt 0 || (x - y) / 2 &lt 0 || (x + y) % 2 || (x - y) % 2){
                cout &lt&lt "impossible" &lt&lt endl;
            }
            else{
                cout &lt&lt (x + y) / 2 &lt&lt " " &lt&lt (x - y) / 2 &lt&lt endl;
            }
        }
        return 0;
    }
    `,
    `
    //10908
    #include &ltbits/stdc++.h&gt
    using namespace std;
    int main()
    {
        int cases;
        cin &gt&gt cases;
        while(cases--){
            int row, col, test_cases;
            cin &gt&gt row &gt&gt col &gt&gt test_cases;
            char arr[row][col];
            for(int i = 0; i &lt row; i++){
                for(int j = 0; j &lt col; j++){
                    cin &gt&gt arr[i][j];
                }
            }
            cout &lt&lt row &lt&lt " " &lt&lt col &lt&lt " " &lt&lt test_cases &lt&lt endl;
            for(int i = 0; i &lt test_cases; i++){
                int x, y;
                cin &gt&gt x &gt&gt y;
                int ans = 1;
                for(int j = 1; ; j++){
                    bool flag = false;
                    for(int r = x - j; r &lt= x + j; r++){
                        for(int c = y - j; c &lt= y + j; c++){
                            if(r &lt 0 || c &lt 0 || r &gt= row || c &gt= col || arr[r][c] != arr[x][y]){
                                flag = true;
                                break;
                            }
                        }
                    }
                    if(flag){
                        break;
                    }
                    else{
                        ans += 2;
                    }
                }
                cout &lt&lt ans &lt&lt endl;
            }
        }
        return 0;
    }
    `,
    `
    //10922
    #include &ltbits/stdc++.h&gt
    using namespace std;
    void run(string str, int counter)
    {
        int sum = 0;
        for(int i = 0; i &lt str.length(); i++){
            sum += str[i] - '0';
        }
    
        if(sum == 9){
            cout &lt&lt " is a multiple of 9 and has 9-degree " &lt&lt counter &lt&lt "." &lt&lt endl;
            return;
        }
        else if(sum &lt 9){
            cout &lt&lt " is not a multiple of 9." &lt&lt endl;
            return;
        }
        counter++;
        run(to_string(sum), counter);
    }
    
    int main()
    {
        string str;
        while(cin &gt&gt str && str != "0"){
            cout &lt&lt str;
            run(str, 1);
        }
        return 0;
    }    
    `,
    `
    //10929
    #include &ltbits/stdc++.h&gt
    using namespace std;
    int main()
    {
        string str;
        while(cin &gt&gt str && str != "0"){
           int odd = 0, even = 0;
           for(int i = 0; i &lt str.length(); i++){
               (i % 2 == 0) ? even += str[i] - '0' : odd += str[i] - '0';
           }
           (abs(odd - even) % 11 == 0) ? cout &lt&lt str &lt&lt  " is a multiple of 11." &lt&lt endl : 
                                         cout &lt&lt str &lt&lt " is not a multiple of 11." &lt&lt endl;
        }
        return 0;
    }
    `,
    `
    //10931
    #include &ltbits/stdc++.h&gt
    using namespace std;
    int main()
    {
        long long num;
        while(cin &gt&gt num && num){
            string str = "";
            int sum = 0;
            while(num &gt 0){
                if(num % 2){
                    str = "1" + str;
                    sum++;
                }
                else{
                    str = "0" + str;
                }
                num /= 2;
            }
            cout &lt&lt "The parity of " &lt&lt str &lt&lt " is " &lt&lt sum &lt&lt " (mod 2)." &lt&lt endl;
        }
        return 0;
    }
    `,
    `
    //11005
    #include &ltbits/stdc++.h&gt
    using namespace std;
    int price[36] = {0}, total_price[36] = {0};

    void run(int num)
    {
        int test, cheap = INT_MAX;
        for(int i = 2; i &lt= 36; i++){
            test = num;
            total_price[i - 2] = 0;
            for(int j = i; test &gt 0; test /= j){
                total_price[i - 2] += price[test % j];
            }
            if(cheap &gt total_price[i - 2]){
                cheap = total_price[i - 2];
            }
        }
        cout &lt&lt "Cheapest base(s) for number " &lt&lt num &lt&lt ": ";
        for(int i = 0; i &lt 35; i++){
            if(cheap == total_price[i]){
                cout &lt&lt i + 2 &lt&lt " ";
            }
        }
        cout &lt&lt endl;
    }

    int main()
    {
        int T, t = 0;
        cin &gt&gt T;
        while(t++ &lt T){
            for(int i = 0; i &lt 36; i++){
                cin &gt&gt price[i];
            }
            int numbers;
            cin &gt&gt numbers;
            for(int i = 0; i &lt numbers; i++){
                int num;
                cin &gt&gt num;
                if(i == 0){
                    cout &lt&lt "Case " &lt&lt t &lt&lt ":" &lt&lt endl;
                }
                run(num);
            }
            if(t &lt T){
                cout &lt&lt endl;
            }
        }
        return 0;
    }
    `,
    `
    //11063
    #include &ltbits/stdc++.h&gt
    using namespace std;
    int main()
    {
        int numbers, cases_count = 1;
        while(cin &gt&gt numbers){
            int arr[101] = {0};
            bool isB2 = true;
            for(int i = 1; i &lt= numbers; i++){
                cin &gt&gt arr[i];
                if(arr[i] &lt= arr[i - 1] || arr[i] &lt 1){
                    isB2 = false;
                }
            }
            bool counter[20001] = {false};
            if(isB2){
                for(int i = 1; i &lt= numbers; i++){
                    for(int j = i; j &lt= numbers; j++){
                        if(counter[ arr[i] + arr[j] ]){
                            isB2 = false;
                            break;
                        }
                        if(!counter[ arr[i] + arr[j] ]){
                            counter[ arr[i] + arr[j] ] = true;
                        }
                    }
                    if(!isB2){
                        break;
                    }
                }
            }
            if(isB2){
                cout &lt&lt "Case #" &lt&lt cases_count &lt&lt ": It is a B2-Sequence." &lt&lt endl &lt&lt endl;
            }
            else{
                cout &lt&lt "Case #" &lt&lt cases_count &lt&lt ": It is not a B2-Sequence." &lt&lt endl &lt&lt endl;
            }
            cases_count++;
        }
        return 0;
    }
    `,
    `
    //11150
    #include &ltbits/stdc++.h&gt
    using namespace std;
    int main()
    {
        int n;
        while(cin &gt&gt n){
            cout &lt&lt int(n * 1.5) &lt&lt endl;
        }
        return 0;
    }
    `,

    `
    //11321
    #include &ltbits/stdc++.h&gt
    using namespace std;
    int n, m;
    int isOdd(int num)
    {
        return abs(num % 2);
    }

    bool cmp(int a, int b)
    {
        if(a % m != b % m){
            return a%m &lt b%m;
        }
        if(isOdd(a) != isOdd(b)){
            return isOdd(a);
        }
        if(isOdd(a)){
            return a &gt b;
        }
        return a &lt b;
    }

    int main ()
    {
        int arr[10001];
        while(cin &gt&gt n &gt&gt m){
            for(int i = 0; i &lt n; i++){
                cin &gt&gt arr[i];
            }
            sort(arr, arr + n, cmp);
            cout &lt&lt n &lt&lt " " &lt&lt m &lt&lt endl;
            for(int i = 0; i &lt n; i++){
                cout &lt&lt arr[i] &lt&lt endl;
            }
            if(n == 0 && m == 0){
                break;
            }
        }
        return 0;
    }
    `,
    `
    //11332
    #include &ltbits/stdc++.h&gt
    using namespace std;
    void recursive(string str)
    {
        int total = 0;
        for(int i = 0; i &lt str.length(); i++){
            total += int(str[i] - '0');
        }
        if(to_string(total).length() == 1){
            cout &lt&lt to_string(total) &lt&lt endl;
        }
        else{
            recursive(to_string(total));
        }
    }

    int main()
    {
        string str;
        while(cin &gt&gt str && str != "0"){
            recursive(str);
        }
        return 0;
    }
    `,
    `
    //11349
    #include &ltbits/stdc++.h&gt
    using namespace std;
    int main()
    {
        int cases;
        cin &gt&gt cases;
        for(int a = 0; a &lt cases; a++){
            char foo, foo2;
            long long s;
            cin &gt&gt foo &gt&gt foo2 &gt&gt s;
            long long arr[s][s];
            for(int i = 0; i &lt s; i++){
                for(int j = 0; j &lt s; j++){
                    cin &gt&gt arr[i][j];
                }
            }
            bool isSym = true;
            for(int i = 0; i &lt s; i++){
                for(int j = 0; j &lt s; j++){
                    if(arr[i][j] &lt 0){
                        isSym = false;
                        break;
                    }
                    if(arr[i][j] != arr[s - i - 1][s - j - 1]){
                        isSym = false;
                        break;
                    }
                }
                if(!isSym){
                    break;
                }
            }
            if(isSym){
                cout &lt&lt "Test #" &lt&lt a + 1 &lt&lt ": Symmetric." &lt&lt endl;
            }
            else{
                cout &lt&lt "Test #" &lt&lt a + 1 &lt&lt ": Non-symmetric." &lt&lt endl;
            }
        }
        return 0;
    }
    `,
    `
    //11417
    #include &ltbits/stdc++.h&gt
    using namespace std;
    int GCD(int a, int b)
    {
        while((a %= b) && (b %= a));
        return a + b;
    }

    int main()
    {
        int n;
        while(cin &gt&gt n && n){
            int sum = 0;
            for(int i = 1; i &lt n; i++){
                for(int j = i + 1; j &lt= n; j++){
                    sum += GCD(i, j);
                }
            }
            cout &lt&lt sum &lt&lt endl;
        }
        return 0;
    }
    `,
    `
    //11461
    #include &ltbits/stdc++.h&gt
    using namespace std;
    int main()
    {
        int num1, num2;
        while(cin &gt&gt num1 &gt&gt num2 && num1 && num2){
            int counter = 0;
            for(int i = num1; i &lt= num2; i++){
                double temp = sqrt(i);
                int temp2 = temp;
                if(temp == temp2){
                    counter++;
                }
            }
            cout &lt&lt counter &lt&lt endl;
        }
        return 0;
    }
    `,
    `
    //12019
    #include &ltbits/stdc++.h&gt
    using namespace std;
    int calculate_day(int month, int day)
    {
        if(month == 1) return 0 + day;
        if(month == 2) return 31 + day;
        if(month == 3) return 59 + day;
        if(month == 4) return 90 + day;
        if(month == 5) return 120 + day;
        if(month == 6) return 151 + day;
        if(month == 7) return 181 + day;
        if(month == 8) return 212 + day;
        if(month == 9) return 243 + day;
        if(month == 10) return 273 + day;
        if(month == 11) return 304 + day;
        else return 334 + day;
    }

    void run(int month, int day)
    {
        int total = calculate_day(month, day);
        switch(total % 7){
            case 0:
                cout &lt&lt "Friday" &lt&lt endl;
                break;
            case 1:
                cout &lt&lt "Saturday" &lt&lt endl;
                break;
            case 2:
                cout &lt&lt "Sunday" &lt&lt endl;
                break;
            case 3:
                cout &lt&lt "Monday" &lt&lt endl;
                break;
            case 4:
                cout &lt&lt "Tuesday" &lt&lt endl;
                break;
            case 5:
                cout &lt&lt "Wednesday" &lt&lt endl;
                break;
            case 6:
                cout &lt&lt "Thursday" &lt&lt endl;
                break;
        }
    }

    int main()
    {
        int cases, month, day;
        cin &gt&gt cases;
        for(int i = 0; i &lt cases; i++){
            cin &gt&gt month &gt&gt day;
            run(month, day);
        }
        return 0;
    }
    `
]

// my LeetCode accept codes
var LeetCode_ac = [
    `
    // LeetCode 1
    class Solution {
        public:
            vector&ltint&gt twoSum(vector&ltint&gt& nums, int target) {
                vector&ltint&gt output;
                for(int i = 0; i &lt nums.size(); i++){
                    bool isFinished = false;
                    for(int j = i + 1; j &lt nums.size(); j++){
                        if(nums[i] + nums[j] == target){
                            output.push_back(i);
                            output.push_back(j);
                            isFinished = !isFinished;
                            break;
                        }
                    }
                    if(isFinished){
                        break;
                    }
                }
                return output;
            }
        };
    `,
    `
    // LeetCode 9
    class Solution {
        public:
            bool isPalindrome(int x) {
                if(x &lt 0){
                    return false;
                }
                string intToString = to_string(x), compare;
                for(int i = intToString.length() - 1; i &gt= 0; i--){
                    compare.push_back(intToString[i]);
                }
                if(intToString == compare){
                    return true;
                }
                return false;
            }
        };
    `,
    `
    // LeetCode 20
    class Solution {
        public:
            bool isValid(string s){
            stack&ltchar&gt stack;
    
            if(s.length() == 0){
                return true;
            }
            if(s.length() == 1){
                return false;
            }
    
            for(int i = 0 ; i &lt s.length(); i++){
                char c = s[i];
                cout &lt&lt c;
                if(c == '}' || c == ')' || c == ']'){
                    if(stack.size() == 0 ) return false;
                    if(c == '}' && stack.top() != '{') return false;
                    if(c == ')' && stack.top() != '(') return false;
                    if(c == ']' && stack.top() != '[') return false;
                    stack.pop();
                }
                else{
                    stack.push(c);
                }
            }
            if(stack.size() == 0){
                return true;
            }
            return false;
            }	
        };
    `,
    `
    // LeetCode 21
    /**
     * Definition for singly-linked list.
     * struct ListNode {
     *     int val;
     *     ListNode *next;
     *     ListNode() : val(0), next(nullptr) {}
     *     ListNode(int x) : val(x), next(nullptr) {}
     *     ListNode(int x, ListNode *next) : val(x), next(next) {}
     * };
     */
    class Solution {
        public:
            ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
                ListNode returnThis(INT_MIN);
                ListNode *tail = &returnThis;
                while (list1 && list2) {
                    if (list1 -&gt; val &lt; list2 -&gt; val) {
                        tail -&gt; next = list1;
                        list1 = list1 -&gt; next;
                    } else {
                        tail -&gt; next = list2;
                        list2 = list2 -&gt; next;
                    }
                    tail = tail -&gt; next;
                }
                tail -&gt; next = list1 ? list1 : list2;
                return returnThis.next;
            }
        };
    `,
    `
    // LeetCode 35
    class Solution {
        public:
            int searchInsert(vector&ltint&gt& nums, int target) {
                return (lower_bound(nums.begin(), nums.end(), target) - nums.begin());
            }
        };
    `,
    `
    // LeetCode 36
    class Solution {
        public:
            bool isValidSudoku(vector&lt;vector&lt;char&gt;&gt;& board) {
                int ROW[9][9] = {0}, COL[9][9] = {0}, BOX[9][9] = {0};
                for(int i = 0; i &lt; board.size(); i++) {
                    for(int j = 0; j &lt; board[i].size(); j++) {
                        if(board[i][j] != '.') {
                            int num = board[i][j] - '0' - 1, k = i / 3 * 3 + j / 3;
                            if(ROW[i][num] || COL[j][num] || BOX[k][num]) {
                                return false;
                            }
                            ROW[i][num] = COL[j][num] = BOX[k][num] = 1;
                        }   
                    }   
                }
                return true;
            }
        };
    `,
    `
    // LeetCode 53
    class Solution {
        public:
            int maxSubArray(vector&ltint&gt& nums) {
                int temp = 0, ans = nums[0];
                for(int i = 0; i &lt nums.size(); i++){
                    temp += nums[i];
                    temp = max(0, temp);
                    ans = max(ans, temp);
                }
                if(ans == 0){
                    sort(nums.begin(), nums.end());
                    return nums[ nums.size() - 1 ];
                }
                return ans;
            }
        };
    `,
    `
    // LeetCode 66
    class Solution {
        public:
            vector&ltint&gt plusOne(vector&ltint&gt& digits) {
                for (int i = digits.size() - 1; i &gt= 0; i--) {
                    if (digits[i] &lt 9) {
                        digits[i]++;
                        return digits;
                    }
                    digits[i] = 0;
                }
                vector&ltint&gt ans(digits.size() + 1, 0);
                ans[0] = 1;
                return ans;
            }
        };
    `,
    `
    // LeetCode 74
    class Solution {
        public:
            bool searchMatrix(vector&lt;vector&lt;int&gt;&gt;& matrix, int target) {
                int row = matrix.size(), col = matrix[0].size();
                int start = 0, end = row - 1;
                while(start &lt;= end) {
                    int mid = (start + end) / 2;
                    if(matrix[mid][0] == target) {
                        return true;
                    }
                    else if(matrix[mid][0] &lt; target) {
                        start = mid + 1;
                    }
                    else if(matrix[mid][0] &gt; target) {
                        end = mid - 1;
                    }
                }
                row = end;
                if(row &lt; 0) {
                    return false;
                }
                for(int i = 0; i &lt; col; i++) {
                    if(matrix[row][i] == target) {
                        return true;
                    }
                }
                return false;
            }
        };
    `,
    `
    // LeetCode 83
    /**
     * Definition for singly-linked list.
     * struct ListNode {
     *     int val;
     *     ListNode *next;
     *     ListNode() : val(0), next(nullptr) {}
     *     ListNode(int x) : val(x), next(nullptr) {}
     *     ListNode(int x, ListNode *next) : val(x), next(next) {}
     * };
     */
    class Solution {
        public:
            ListNode* deleteDuplicates(ListNode* head) {
                if(head == NULL || head -> next == NULL) {
                    return head;
                }
                ListNode *temp = head;
                ListNode *check = head -> next;
                while(true) {
                    if(temp -> val != check -> val) {
                        temp -> next = check;
                        temp = check;
                    }
                    check = check -> next;
                    if(check == NULL) {
                        temp -> next = NULL;
                        break;
                    }
                }
                return head;
            }
        };
    `,
    `
    // LeetCode 88
    class Solution {
        public:
            void merge(vector&lt;int&gt;& nums1, int m, vector&lt;int&gt;& nums2, int n) {
                vector&lt;int&gt; temp(n + m, 0);
                int i = 0, j = 0;
                while(i &lt; m && j &lt; n) {
                    if(nums1[i] &lt; nums2[j]) {
                        temp[i + j] = nums1[i];
                        i++;
                    }
                    else {
                        temp[i + j] = nums2[j];
                        j++;
                    }
                }
                while(i &lt; m) {
                    temp[i + j] = nums1[i];
                    i++;
                }
                while(j &lt; n) {
                    temp[i + j] = nums2[j];
                    j++;
                }
                for(int t = 0; t &lt; i + j; t++) {
                    nums1[t] = temp[t];
                }
            }
        };
    `,
    `
    // LeetCode 118
    class Solution {
        public:
            vector&lt;vector&lt;int&gt;&gt; generate(int numRows) {
                vector&lt;vector&lt;int&gt;&gt; result;
                vector&lt;int&gt; temp(1, 1);
                for(int i = 1; i &lt;= numRows; i++) {
                    result.push_back(temp);
                    temp.push_back(0);
                    for(int j = temp.size() - 1; j &gt;= 1; j--) {
                        temp[j] = temp[j] + temp[j - 1];
                    }
                }
                return result;
            }
        };
    `,
    `
    // LeetCode 121
    class Solution {
        public:
            int maxProfit(vector&lt;int&gt;& prices) {
                int smallest_value = 10001;
                int max_profit = 0;
                for(int i = 0; i &lt; prices.size(); i++) {
                    if(smallest_value &gt; prices[i]) {
                        smallest_value = prices[i];
                    }
                    else if(prices[i] - smallest_value &gt; max_profit) {
                        max_profit = prices[i] - smallest_value;
                    }
                }
                return max_profit;
            }
        };
    `,
    `
    // LeetCode 122
    class Solution {
        public:
            int maxProfit(vector&ltint&gt& prices) {
                int ans = 0;
                for(int i = 0; i &lt prices.size() - 1; i++){
                    if(prices[i + 1] &gt prices[i]){
                        ans += prices[i + 1] - prices[i];
                    }
                }
                return ans;
            }
        };
    `,
    `
    // LeetCode 141
    /**
     * Definition for singly-linked list.
     * struct ListNode {
     *     int val;
     *     ListNode *next;
     *     ListNode(int x) : val(x), next(NULL) {}
     * };
     */
    class Solution {
        public:
            bool hasCycle(ListNode *head) {
                if(head == NULL) {
                    return false;
                }
                ListNode *fast = head;
                ListNode *slow = head;
                while(fast -&gt; next != NULL && fast -&gt; next -&gt; next != NULL) {
                    fast = fast -&gt; next -&gt; next;
                    slow = slow -&gt; next;
                    if(fast == slow) {
                        return true;
                    }
                }
                return false;
            }
        };
    `,
    `
    // LeetCode 203
    /**
     * Definition for singly-linked list.
     * struct ListNode {
     *     int val;
     *     ListNode *next;
     *     ListNode() : val(0), next(nullptr) {}
     *     ListNode(int x) : val(x), next(nullptr) {}
     *     ListNode(int x, ListNode *next) : val(x), next(next) {}
     * };
     */
    class Solution {
        public:
            ListNode* removeElements(ListNode* head, int val) {
                if(!head) {
                    return NULL;
                }
                head -&gt; next = removeElements(head -&gt; next, val);
                return head -&gt; val == val ? head -&gt; next : head;
            }
        };
    `,
    `
    // LeetCode 206
    /**
     * Definition for singly-linked list.
     * struct ListNode {
     *     int val;
     *     ListNode *next;
     *     ListNode() : val(0), next(nullptr) {}
     *     ListNode(int x) : val(x), next(nullptr) {}
     *     ListNode(int x, ListNode *next) : val(x), next(next) {}
     * };
     */
    class Solution {
        public:
            ListNode* reverseList(ListNode* head) {
                ListNode *curr = head, *prev = NULL, *next = NULL;
                while(curr != NULL) {
                    next = curr -&gt; next;
                    curr -&gt; next = prev;
                    prev = curr;
                    curr = next;
                }
                head = prev;
                return head;
            }
        };
    `,
    `
    // LeetCode 217
    class Solution {
        public:
            bool containsDuplicate(vector&lt;int&gt;& nums) {
                sort(nums.begin(), nums.end());
                int temp = nums[0];
                for(int i = 1; i &lt; nums.size(); i++) {
                    if(temp == nums[i]) {
                        return true;
                    }
                    else {
                        temp = nums[i];
                        continue;
                    }
                }
                return false;
            }
        };
    `,
    `
    // LeetCode 234
    /**
     * Definition for singly-linked list.
     * struct ListNode {
     *     int val;
     *     ListNode *next;
     *     ListNode() : val(0), next(nullptr) {}
     *     ListNode(int x) : val(x), next(nullptr) {}
     *     ListNode(int x, ListNode *next) : val(x), next(next) {}
     * };
     */
    class Solution {
        public:
            ListNode* reverseList(ListNode* head) {
                ListNode *curr = head, *prev = NULL, *next = NULL;
                while(curr != NULL) {
                    next = curr -&gt; next;
                    curr -&gt; next = prev;
                    prev = curr;
                    curr = next;
                }
                head = prev;
                return head;
            }
        };
    `,
    `
    // LeetCode 242
    class Solution {
        public:
            bool isAnagram(string s, string t) {
                int arrS[26] = {0};
                int arrT[26] = {0};
                for(int i = 0; i &lt; s.length(); i++) {
                    arrS[ s[i] - 'a' ]++;
                }
                for(int i = 0; i &lt; t.length(); i++) {
                    arrT[ t[i] - 'a' ]++;
                }
                for(int i = 0; i &lt; 26; i++) {
                    if(arrS[i] != arrT[i]) {
                        return false;
                    }
                }
                return true;
            }
        };
    `,
    `
    // LeetCode 300
    class Solution {
        public:
            int lengthOfLIS(vector&ltint&gt& nums) {
                int n = nums.size();
                vector&ltint&gtLIS(n, 1);
                for (int i = 0; i &lt n; i++) {
                    for (int j = 0; j &lt i; j++) {
                        if (nums[i] &gt nums[j])
                            LIS[i] = max(LIS[i], 1 + LIS[j]);
                    }
                }
                int ans = 0;
                for (int i = 0; i &lt n; i++) {
                    ans = max(ans, LIS[i]);
                }
                return ans;
            }
        };
    `,
    `
    // LeetCode 326
    class Solution {
        public:
            bool isPowerOfThree(int n) {
                while(n % 3 == 0 && n &gt= 1){
                    n /= 3;
                }
                return (n == 1);
            }
        };
    `,
    `
    // LeetCode 350
    class Solution {
        public:
            vector&lt;int&gt; intersect(vector&lt;int&gt;& nums1, vector&lt;int&gt;& nums2) {
                sort(nums1.begin(), nums1.end());
                sort(nums2.begin(), nums2.end());
                vector&lt;int&gt; result;
                int i = 0, j = 0;
                while(i &lt; nums1.size() && j &lt; nums2.size()) {
                    if(nums1[i] == nums2[j]) {
                        result.push_back(nums1[i]);
                        i++;
                        j++;
                    }
                    else if(nums1[i] &lt; nums2[j]) {
                        i++;
                    }
                    else if(nums1[i] &gt; nums2[j]) {
                        j++;
                    }
                }
                return result;
            }
        };
    `,
    `
    // LeetCode 367
    class Solution {
        public:
            bool isPowerOfThree(int n) {
                while(n % 3 == 0 && n &gt= 1){
                    n /= 3;
                }
                return (n == 1);
            }
        };
    `,
    `
    // LeetCode 383
    class Solution {
        public:
            bool canConstruct(string ransomNote, string magazine) {
                int arr[26] = {0};
                for(int i = 0; i &lt; magazine.length(); i++) {
                    arr[ magazine[i] - 'a' ]++;
                }
                for(int i = 0;  i&lt; ransomNote.length(); i++) {
                    arr[ ransomNote[i] - 'a' ]--;
                    if(arr[ ransomNote[i] - 'a' ] == -1) {
                        return false;
                    }
                }
                return true;
            }
        };
    `,
    `
    // LeetCode 387
    class Solution {
        public:
            int firstUniqChar(string s) {
                int arr[26] = {0};
                for(int i = 0; i &lt; s.length(); i++) {
                    arr[ s[i] - 'a' ]++;
                }
                for(int i = 0; i &lt; s.length(); i++) {
                    if(arr[ s[i] - 'a' ] == 1) {
                        return i;
                    }
                }
                return -1;
            }
        };
    `,
    `
    // LeetCode 566
    class Solution {
        public:
            vector&lt;vector&lt;int&gt;&gt; matrixReshape(vector&lt;vector&lt;int&gt;&gt;& mat, int r, int c) {
                int row = mat.size();
                int col = mat[0].size();
                if((row * col != r * c) || (row == r && col == c)) {
                    return mat;
                }
                vector&lt;vector&lt;int&gt;&gt; result(r, vector&lt;int&gt;(c, 0));
                for(int i = 0; i &lt; row * col; i++) {
                    result[i / c][i % c] = mat[i / col][i % col];
                }
                return result;
            }
        };
    `,
    `
    // LeetCode 645
    class Solution {
        public:
            vector&ltint&gt findErrorNums(vector&ltint&gt& nums) {
                int r = nums.size() - 1, l = 0;
                while (l &lt r) {
                    if (nums[r] == r + 1){
                        r--;
                    }
                    else if (nums[l] == l + 1){
                        l++;
                    }
                    else if (nums[l] == nums[ nums[l] - 1 ]){
                        swap(nums[l], nums[r]);
                    }
                    else{
                        swap(nums[l], nums[ nums[l] - 1 ]);
                    }
                }
                return {nums[l], l + 1};
            }
        };
    `,
    `
    // LeetCode 700
    /**
     * Definition for a binary tree node.
     * struct TreeNode {
     *     int val;
     *     TreeNode *left;
     *     TreeNode *right;
     *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
     *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
     *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
     * };
     */
    class Solution {
        public:
            TreeNode* searchBST(TreeNode* root, int val) {
                if(root == NULL) {
                    return NULL;
                }
                if(root -&gt; val == val) {
                    return root;
                }
                else if(root -&gt; val &lt; val) {
                    return searchBST(root -&gt; right, val);
                }
                else if(root -&gt; val &gt; val) {
                    return searchBST(root -&gt; left, val);
                }
                return NULL;
            }
        };
    `,
    `
    // LeetCode 704
    class Solution {
        public:
            int search(vector&ltint&gt& nums, int target) {
                if(nums[lower_bound(nums.begin(), nums.end(), target) - nums.begin()] == target){
                    return (lower_bound(nums.begin(), nums.end(), target) - nums.begin());
                }
                return -1;
            }
        };
    `,
    `
    // LeetCode 709
    class Solution {
        public:
            string toLowerCase(string str) {
                for(int i = 0; i &lt str.length(); i++){
                    str[i] = tolower(str[i]);
                }
                return str;
            }
        };
    `,
    `
    // LeetCode 771
    class Solution {
        public:
            int numJewelsInStones(string jewels, string stones) {
                int ans = 0;
                for(int i = 0; i &lt jewels.length(); i++){
                    for(int j = 0; j &lt stones.size(); j++){
                        if(jewels[i] == stones[j]){
                            ans++;
                        }
                    }
                }
                return ans;
            }
        };
    `,
    `
    // LeetCode 832
    class Solution {
        public:
            vector&ltvector&ltint&gt&gt flipAndInvertImage(vector&ltvector&ltint&gt&gt& image) {
                vector&ltvector&ltint&gt&gt ans(image.size(), vector&ltint&gt(image.size(), 0));
                for(int i = 0; i &lt image.size(); i++){
                    for(int j = image[i].size() - 1; j &gt= 0; j--){
                        ans[i][image[i].size() - j - 1] = (!(image[i][j]));
                    }
                }
                return ans;
            }
        };
    `,
    `
    // LeetCode 938
    /**
     * Definition for a binary tree node.
     * struct TreeNode {
     *     int val;
     *     TreeNode *left;
     *     TreeNode *right;
     *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
     *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
     *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
     * };
     */
    class Solution {
    public:
        
        void run(TreeNode *root, int low, int high, int& ans){
            if( (low &lt= root -&gt val) && (root -&gt val &lt= high) ){
                ans += root -&gt val;
            }
            if(root -&gt left != NULL){
                run(root -&gt left, low, high, ans);     
            }
            if(root -&gt right != NULL){
                run(root -&gt right, low, high, ans);     
            }
        }
        
        int rangeSumBST(TreeNode* root, int low, int high) {
            int ans = 0;
            run(root, low, high, ans);
            return ans;
        }
    };
    `,
    `
    // LeetCode 943
    class Solution {
        vector&ltvector&ltint&gt&gt kmp;   // store prev for each string
        vector&ltvector&ltint&gt&gt edges; // store length of string j - string i

        /*
        res[i]: use binary integer i to represent a index set, every bit indicates the existence of each number, 
        map key is the leading number index, value is the minimum possible value
        */
        vector&ltstd::unordered_map&ltint, int&gt&gt res; 
        vector&ltint&gt aux = { 0b1, 0b10, 0b100, 0b1000, 0b10000, 0b100000, 0b1000000, 0b10000000, 0b100000000, 0b1000000000, 0b10000000000, 0b100000000000, 0b1000000000000 };
        vector&ltstd::unordered_map&ltint, int&gt&gt last; // last index correspond to current index to make the value smallest
        public:
            void findKMP(string& s, vector&ltint&gt& pre) {
                pre.push_back(-1);
                for (int i = 1; i &lt s.size(); i++) {
                    int j = pre[i - 1];
                    while (j != -1 && s[j + 1] != s[i]) {
                        j = pre[j];
                    }
                    if (s[j + 1] == s[i]) j++;
                    pre.push_back(j);
                }
            }

            int get_overlap(int is, string& s, string& d) {
                vector&ltint&gt& pre = kmp[is];
                int j = 0;
                for (int i = 0; i &lt d.size(); i++) {
                    if (s[j] != d[i]) {
                        j--;
                        while (j != -1 && s[j + 1] != d[i]) {
                            j = pre[j];
                        }
                        if (s[j + 1] == d[i]) j++;
                    }
                    j++;
                }
                return j;
            }

            void get_overlap(int i, string& s, int j, string& t) {
                int s2t = get_overlap(j, t, s);
                int t2s = get_overlap(i, s, t);
                edges[i][j] = t.size() - s2t;
                edges[j][i] = s.size() - t2s;
            }

            // for string s, find all min values for all leading position
            void calculate(string& s, int t) {
                int temp;
                for (int i = 0; i &lt s.size(); i++) {
                    if (s[i] == '1') {
                        int key = t - aux[s.size() - 1 - i];
                        int temp = key;
                        res[t][i] = INT_MAX;
                        for (auto& j : res[key]) {
                            temp = j.second + edges[j.first][i];
                            if (temp &lt res[t][i]) {
                                res[t][i] = temp;
                                last[t][i] = j.first;
                            }
                        }
                    }
                }
            }

            // n is current res ind, s is the tail char
            void get_final_result(string& realres, vector&ltstring&gt& A, int n, int s) {
                if (n == aux[A.size() - 1 - s]) {
                    realres.append(A[s]);
                }
                else {
                    get_final_result(realres, A, n - aux[A.size() - 1 - s], last[n][s]);
                    realres.append(A[s].substr(A[s].size() - edges[last[n][s]][s]));
                }
            }

            string shortestSuperstring(vector&ltstring&gt& A) {
                kmp.clear();
                edges.clear();
                res.assign(1 &lt&lt A.size(), std::unordered_map&ltint, int&gt());
                last.assign(1 &lt&lt A.size(), std::unordered_map&ltint, int&gt());
                for (string& s : A) {
                    res[aux[A.size() - 1 - kmp.size()]][kmp.size()] = s.size();
                    kmp.push_back(vector&ltint&gt());
                    findKMP(s, kmp.back());
                    edges.push_back(vector&ltint&gt(A.size(), 0));
                }


                for (int i = 0; i &lt A.size(); i++) {
                    for (int j = i + 1; j &lt A.size(); j++) {
                        get_overlap(i, A[i], j, A[j]);
                    }
                }

                for (int len = 2; len &lt= A.size(); len++) {
                    string s(A.size() - len, '0');
                    s.append(len, '1');
                    do {
                        int t = std::stoi(s, NULL, 2);
                        calculate(s, t);
                    } while (std::next_permutation(s.begin(), s.end()));
                }

                string realres;

                int minvalue = INT_MAX, ind = (1 &lt&lt A.size()) - 1, minind;

                for (auto& x : res[ind]) {
                    if (x.second &lt minvalue) {
                        minvalue = x.second;
                        minind = x.first;
                    }
                }

                get_final_result(realres, A, ind, minind);

                return realres;
            }
        };
    `,
    `
    // LeetCode 946
    class Solution
    {
    public:
        bool validateStackSequences(vector&ltint&gt& pushed, vector&ltint&gt& popped)
        {
            stack &ltint&gt temp;
            int indexPush = 0, indexPop = 0;
            while(indexPush &lt pushed.size() && indexPop &lt popped.size()){
                if(temp.size() &gt 0){
                    if(temp.top() == popped[indexPop]){
                        temp.pop();
                        indexPop++;
                    }
                    else{
                        temp.push(pushed[indexPush]);
                        indexPush++;
                    }
                }
                else{
                    temp.push(pushed[indexPush]);
                    indexPush++;
                }
            }
            if(indexPush == pushed.size() && indexPop != popped.size()){
                if(temp.size() == 0){
                    return false;
                }
                while(indexPop != popped.size()){
                    if(temp.top() == popped[indexPop]){
                        indexPop++;
                        temp.pop();
                    }
                    else{
                        return false;
                    }
                }
            }
            return true;
        }
    };
    `,
    `
    // LeetCode 977
    class Solution {
        public:
            vector&ltint&gt sortedSquares(vector&ltint&gt& nums) {
                for(int i = 0; i &lt nums.size(); i++){
                    nums[i] *= nums[i];
                }
                sort(nums.begin(), nums.end());
                return nums;
            }
        };
    `,
    `
    // LeetCode 1108
    class Solution {
        public:
            string defangIPaddr(string address) {
                string ans;
                for(int i = 0; i &lt address.length(); i++){
                    if(address[i] == '.'){
                        ans += "[.]";
                    }
                    else{
                        ans += address[i];
                    }
                }
                return ans;
            }
        };
    `,
    `
    // LeetCode 1143
    class Solution {
        public:
            int longestCommonSubsequence(string text1, string text2) {
                int x = text1.length() + 1, y = text2.length() + 1;
                int arr[x][y];
                //in array prev, 0 means from uppper left, 1 means left, 2 means top.
        
                //init the array.
                for(int i = 0; i &lt x; i++){
                    for(int j = 0; j &lt y; j++){
                        arr[i][j] = 0;
                    }
                }
        
                //do the adding
                for(int i = 1; i &lt x; i++){
                    for(int j = 1; j &lt y; j++){
                        if(text1[i - 1] == text2[j - 1]){
                            arr[i][j] = arr[i - 1][j - 1] + 1;
                        }
                        else{
                            arr[i][j] = max(arr[i - 1][j], arr[i][j - 1]);
                        }
                    }
                }
                return (arr[x - 1][y - 1]);
            }
        };
    `,
    `
    // LeetCode 1221
    class Solution {
        public:
            int balancedStringSplit(string s) {
                int ans = 0, temp = 0;
                for(int i = 0; i &lt s.length(); i++){
                    if(s[i] == 'R'){
                        temp++;
                    }
                    else{
                        temp--;
                    }
                    if(temp == 0){
                        ans++;
                    }
                }
                return ans;
            }
        };
    `,
    `
    // LeetCode 1295
    class Solution {
        public:
            int findNumbers(vector&ltint&gt& nums) {
                int count = 0;
                for(int i = 0; i &lt nums.size(); i++){
                    if(int(log10(nums[i])) % 2 == 1){
                        count++;
                    }
                }
                return count;
            }
        };
    `,
    `
    // LeetCode 1313
    class Solution {
        public:
            vector&ltint&gt decompressRLElist(vector&ltint&gt& nums) {
                vector&ltint&gt ans;
                for(int i = 0; i &lt nums.size(); i += 2){
                    for(int j = 0; j &lt nums[i]; j++){
                        ans.push_back(nums[i + 1]);   
                    }
                }
                return ans;
            }
        };
    `,
    `
    // LeetCode 1323
    class Solution {
        public:
            int maximum69Number (int num) {
                string number = to_string(num);
                for(int i = 0; i &lt number.length(); i++){
                    if(number[i] == '6'){
                        number[i] = '9';
                        break;
                    }
                }
                return stoi(number);
            }
        };
    `,
    `
    // LeetCode 1365
    class Solution {
        public:
            vector&ltint&gt smallerNumbersThanCurrent(vector&ltint&gt& nums) {
                vector&ltint&gt ans(nums.size(), 0);
                for(int i = 0; i &lt nums.size(); i++){
                    for(int j = 0; j &lt nums.size(); j++){
                        if(nums[i] &gt nums[j]){
                            ans[i]++;
                        }
                    }
                }
                return ans;
            }
        };
    `,
    `
    // LeetCode 1389
    class Solution {
        public:
            vector&ltint&gt createTargetArray(vector&ltint&gt& nums, vector&ltint&gt& index) {
                vector&ltint&gt ans;
                for(int i = 0; i &lt nums.size(); i++){
                    ans.insert(ans.begin() + index[i], nums[i]);
                }
                return ans;
            }
        };
    `,
    `
    // LeetCode 1431
    class Solution {
        public:
            vector&ltbool&gt kidsWithCandies(vector&ltint&gt& candies, int extraCandies) {
                int maximum = *max_element(candies.begin(), candies.end());
                vector&ltbool&gt ans;
                for(int i = 0; i &lt candies.size(); i++){
                    if(candies[i] + extraCandies &gt= maximum){
                        ans.push_back(true);
                    }
                    else{
                        ans.push_back(false);
                    }
                }
                return ans;
            }
        };
    `,
    `
    // LeetCode 1450
    class Solution {
        public:
            int busyStudent(vector&ltint&gt& startTime, vector&ltint&gt& endTime, int queryTime) {
                int ans = 0;
                for(int i = 0; i &lt startTime.size(); i++){
                    if(startTime[i] &lt= queryTime && queryTime &lt= endTime[i]){
                        ans++;
                    }
                }
                return ans;
            }
        };
    `,
    `
    // LeetCode 1470
    class Solution {
        public:
            vector&ltint&gt shuffle(vector&ltint&gt& nums, int n) {
                vector&ltint&gt ans;
                for(int i = 0; i &lt n; i++){
                    ans.push_back(nums[i]);
                    ans.push_back(nums[i + n]);
                }
                return ans;
            }
        };
        
    `,
    `
    // LeetCode 1480
    class Solution {
        public:
            vector&ltint&gt runningSum(vector&ltint&gt& nums) {
                vector&ltint&gt ans;
                int temp = 0;
                for(int i = 0; i &lt nums.size(); i++){
                    temp += nums[i];
                    ans.push_back(temp);
                }
                return ans;
            }
        };
    `,
    `
    // LeetCode 1486
    class Solution {
        public:
            int xorOperation(int n, int start) {
                int ans = start;
                for(int i = 1; i &lt n; i++){
                    ans = ans ^ (start + 2 * i);
                }
                return ans;
            }
        };
    `,
    `
    // LeetCode 1512
    class Solution {
        public:
            int numIdenticalPairs(vector&ltint&gt& nums) {
                int ans = 0;
                for(int i = 0; i &lt nums.size(); i++){
                    for(int j = i + 1; j &lt nums.size(); j++){
                        if(nums[i] == nums[j]){
                            ans++;
                        }
                    }
                }
                return ans;
            }
        };
    `,
    `
    // LeetCode 1603
    class ParkingSystem {
        public:
            vector&ltint&gt parking;
            ParkingSystem(int big, int medium, int small) {
                parking = {0, big, medium, small};
            }
            
            bool addCar(int carType) {
                return --parking[carType] &gt= 0;
            }
        };
        
        /**
         * Your ParkingSystem object will be instantiated and called as such:
         * ParkingSystem* obj = new ParkingSystem(big, medium, small);
         * bool param_1 = obj-&gtaddCar(carType);
         */
    `,
    `
    // LeetCode 1614
    class Solution {
        public:
            int maxDepth(string s) {
                int ans = 0, temp = 0;
                for(int i = 0; i &lt s.length(); i++){
                    if(s[i] == '('){
                        temp++;
                        if(temp &gt ans){
                            ans = temp;
                        }
                    }
                    if(s[i] == ')'){
                        temp--;
                    }
                }
                return ans;
            }
        };
    `,
    `
    // LeetCode 1662
    class Solution {
        public:
            bool arrayStringsAreEqual(vector&ltstring&gt& word1, vector&ltstring&gt& word2) {
                string str1 = "", str2 = "";
                for(int i = 0; i &lt word1.size(); i++){
                    str1 = str1 + word1[i];
                }
                for(int i = 0; i &lt word2.size(); i++){
                    str2 = str2 + word2[i];
                }
                return (str1 == str2);
            }
        };
    `,
    `
    // LeetCode 1672
    class Solution {
        public:
            int maximumWealth(vector&ltvector&ltint&gt&gt& accounts) {
                int ans = 0;
                for(int i = 0; i &lt accounts.size(); i++){
                    int temp = 0;
                    for(int j = 0; j &lt accounts[i].size(); j++){
                        temp += accounts[i][j];
                    }
                    if(ans &lt temp){
                        ans = temp;
                    }
                }
                return ans;
            }
        };
    `,
    `
    // LeetCode 1688
    class Solution {
        public:
            int numberOfMatches(int n) {
                return n - 1;
            }
        };
    `,
    `
    // LeetCode 1704
    class Solution {
        public:
            bool halvesAreAlike(string s) {
                int count_a = 0, count_b = 0;
                for(int i = 0; i &lt s.length() / 2; i++){
                    if((s[i] == 'a')||(s[i] == 'e')||(s[i] == 'i')||(s[i] == 'o')||(s[i] == 'u')||(s[i] == 'A')||(s[i] == 'E')||(s[i] == 'I')||(s[i] == 'O')||(s[i] == 'U')){
                        count_a++;
                    }
                }
                for(int i = s.length() / 2; i &lt s.length(); i++){
                    if((s[i] == 'a')||(s[i] == 'e')||(s[i] == 'i')||(s[i] == 'o')||(s[i] == 'u')||(s[i] == 'A')||(s[i] == 'E')||(s[i] == 'I')||(s[i] == 'O')||(s[i] == 'U')){
                        count_b++;
                    }
                }
                return (count_a == count_b);
            }
        };
    `,
    `
    // LeetCode 1725
    class Solution {
        public:
            int countGoodRectangles(vector&ltvector&ltint&gt&gt& rectangles) {
                vector&ltint&gt vec;
                int ans = 0;
                for(int i = 0; i &lt rectangles.size(); i++){
                    vec.push_back( min(rectangles[i][0], rectangles[i][1]) );
                }
                sort(vec.begin(), vec.end());
                int arr[vec.size()], target = vec[ vec.size() - 1 ];
                for(int i = vec.size() - 1; i &gt= 0; i--){
                    if(vec[i] == target){
                        ans++;
                    }
                    else{
                        break;
                    }
                }
                return ans;
            }
        };
    `,
    `
    // LeetCode 1732
    class Solution {
        public:
            int largestAltitude(vector&ltint&gt& gain) {
                int ans = 0, temp = 0;
                for(int i = 0; i &lt gain.size(); i++){
                    temp += gain[i];
                    ans = max(ans, temp);
                }
                return ans;
            }
        };
    `,
    `
    // LeetCode 1768
    class Solution {
        public:
            string mergeAlternately(string word1, string word2) {
                string ans = "";
                int i = 0, j = 0;
                while(i &lt word1.length() && j &lt word2.length()){
                    ans = ans + word1[i++] + word2[j++];
                }
                while(i &lt word1.length()){
                    ans = ans + word1[i++];
                }
                while(j &lt word2.length()){
                    ans = ans + word2[j++];
                }
                return ans;
            }
        };
    `,
    `
    // LeetCode 1773
    class Solution {
        public:
            int countMatches(vector&ltvector&ltstring&gt&gt& items, string ruleKey, string ruleValue) {
                int ans = 0;
                for(int i = 0; i &lt items.size(); i++){
                    if(ruleKey == "type" && items[i][0] == ruleValue){
                        ans++;
                    }
                    else if(ruleKey == "color" && items[i][1] == ruleValue){
                        ans++;
                    }
                    else if(ruleKey == "name" && items[i][2] == ruleValue){
                        ans++;
                    }
                }
                return ans;
            }
        };
    `,
    `
    // LeetCode 1796
    class Solution {
        public:
            int secondHighest(string s) {
                int count[10] = {0};
                for(int i = 0; i &lt s.length(); i++){
                    if(s[i] &gt= '0' && s[i] &lt= '9'){
                        count[ s[i] - '0' ]++;
                    }
                }
                int counting = 0, ans;
                for(int i = 9; i &gt= 0; i--){
                    if(count[i] != 0){
                        counting++;
                        if(counting == 2){
                            ans = i;
                            break;
                        }
                    }
                }
                return ans;
            }
        };
    `,
    `
    // LeetCode 1812
    class Solution {
        public:
            bool squareIsWhite(string coordinates) {
                if((coordinates[0] - 'a') % 2){
                    if((coordinates[1] - '0') % 2){
                        return true;
                    }
                    else{
                        return false;
                    }
                }
                else{
                    if((coordinates[1] - '0') % 2){
                        return false;
                    }
                    else{
                        return true;
                    }
                }
            }
        };
    `,
    `
    // LeetCode 1920
    class Solution {
        public:
            vector&lt;int&gt; buildArray(vector&lt;int&gt;& nums) {
                vector&lt;int&gt; output(nums.size(), 0);
                for(int i = 0; i &lt; nums.size(); i++) {
                    output[i] = nums[nums[i]];
                }
                return output;
            }
        };
    `,
    `
    // LeetCode 1929
    class Solution {
        public:
            vector&lt;int&gt; getConcatenation(vector&lt;int&gt;& nums) {
                int n = nums.size();
                for(int i = 0; i &lt; n; i++) {
                    nums.push_back(nums[i]);
                }
                return nums;
            }
        };
    `,
    `
    // LeetCode 2011
    class Solution {
        public:
            int finalValueAfterOperations(vector&lt;string&gt;& operations) {
                int result = 0;
                for(int i = 0; i &lt; operations.size(); i++) {
                    if(operations[i][0] == '+' || operations[i][2] == '+') {
                        result++;
                    }
                    else if(operations[i][0] == '-' || operations[i][2] == '-') {
                        result--;
                    }   
                }
                return result;
            }
        };
    `
]