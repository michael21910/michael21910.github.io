// My solved uva problems
var solved_uva = [
    10041, 10055, 10035, 100, 10929,
    10101, 10420, 10008, 10222, 11332,
    10252, 490, 272, 12019, 10038,
    10056, 10170, 10268, 10783, 10812,
    11349, 11461, 11063, 10071, 10093,
    948, 10019, 10931, 11005, 10050,
    10193, 10190, 10235, 10922, 11417,
    10908, 10221, 10642, 10242/*,10057,
    10062, 299, 10226, 10189, 10409,
    10415, 118, 11150, 11321*/
]

// My solved leetcode problems
var solved_leetcode = [
    20, 35, 53, 66, 122,
    300, 326, 367, 645, 704,
    709, 711, 832, 938, 943,
    946, 977, 1108, 1143, 1221,
    1295, 1313, 1323, 1365, 1389,
    1431, 1450, 1470, 1480, 1486,
    1512, 1603, 1614, 1662, 1672,
    1688, 1704, 1725, 1732, 1768,
    1773, 1796, 1812
]

// sort arrays
solved_uva.sort(function compareNumbers(a, b) {
    return a - b;
})


solved_leetcode.sort(function compareNumbers(a, b) {
    return a - b;
})

// My UVa accept codes
var UVa_ac = [
    `
    //100
    #include &ltbits/stdc++.h&gt
    using namespace std;
    int main()
    {
        int n1, n2;
        while(cin >> n1 >> n2){
            cout << n1 << " " << n2 << " ";
            int ans = 0;
            for(int i = min(n1, n2); i <= max(n1, n2); i++){
                int temp = i, counter = 1;
                while(temp > 1){
                    if(temp % 2 == 0){
                        temp /= 2;
                    }
                    else{
                        temp = temp * 3 + 1;
                    }
                    counter++;
                }
                if(ans < counter){
                    ans = counter;
                }
            }
            cout << ans << endl;
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
            for(int i = 0; i < str.length(); i++){
                if(str[i] == '"'){
                    (counter % 2) ? cout << "''" : cout << "\`\`";
                    counter++;
                }
                else{
                    cout << str[i];
                }
            }
            cout << endl;
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

        for(int i = 0 ; i < colLimit ; i++){
            for(int j = rowLimit - 1 ; j >= 0 ; j--){
                if(sentences[j][i] == 0){
                    cout << " ";
                    continue;
                }
                cout << sentences[j][i];
            }
            cout << endl;
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
        cin >> total;
        string str;
        int counter[2][26];
        for(int i = 0; i < 26; i++){
            counter[0][i] = i;
            counter[1][i] = 0;
        }
        for(int i = 0; i <= total; i++){
            getline(cin, str);
            for(int j = 0; j < str.length(); j++){
                if(toupper(str[j]) <= 'Z' && 'A' <= toupper(str[j])){
                    counter[1][toupper(str[j]) - 'A']++;
                }
            }
        }

        for(int i = 0; i < 26; i++){
            for(int j = 0; j < 26; j++){
                if(counter[1][i] > counter[1][j]){
                    swap(counter[0][i], counter[0][j]);
                    swap(counter[1][i], counter[1][j]);
                }
                if(counter[1][i] == counter[1][j]){
                    if(counter[0][i] < counter[0][j]){
                        swap(counter[0][i], counter[0][j]);
                        swap(counter[1][i], counter[1][j]);
                    }
                }
            }
        }

        for(int i = 0; i < 26; i++){
            if(counter[1][i] != 0){
                cout << char(counter[0][i] + 'A') << " " << counter[1][i] << endl;
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
        cin >> total;
        string str;
        int counter[2][26];
        for(int i = 0; i < 26; i++){
            counter[0][i] = i;
            counter[1][i] = 0;
        }
        for(int i = 0; i <= total; i++){
            getline(cin, str);
            for(int j = 0; j < str.length(); j++){
                if(toupper(str[j]) <= 'Z' && 'A' <= toupper(str[j])){
                    counter[1][toupper(str[j]) - 'A']++;
                }
            }
        }

        for(int i = 0; i < 26; i++){
            for(int j = 0; j < 26; j++){
                if(counter[1][i] > counter[1][j]){
                    swap(counter[0][i], counter[0][j]);
                    swap(counter[1][i], counter[1][j]);
                }
                if(counter[1][i] == counter[1][j]){
                    if(counter[0][i] < counter[0][j]){
                        swap(counter[0][i], counter[0][j]);
                        swap(counter[1][i], counter[1][j]);
                    }
                }
            }
        }

        for(int i = 0; i < 26; i++){
            if(counter[1][i] != 0){
                cout << char(counter[0][i] + 'A') << " " << counter[1][i] << endl;
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
        cin >> cases;
        while(cases--){
            int num, count_binary = 0, count_hex = 0, num_temp;
            cin >> num;
            num_temp = num;
            while(num > 0){
                if(num % 2){
                    count_binary++;
                }
                num /= 2;
            }
            num = num_temp;
            while(num > 0){
                int temp = num % 10;
                while(temp > 0){
                    if(temp % 2){
                        count_hex++;
                    }
                    temp /= 2;
                }
                num /= 10;
            }
            cout << count_binary << " " << count_hex << endl;
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
        while(cin >> str1 >> str2 && (str1 != "0" || str2 != "0")){
            int counter = 0;
            int arr1[11] = {0}, arr2[11] = {0};
            if(str2.length() > str1.length()){
                swap(str1, str2);
            }
            for(int i = 0; i < str1.length(); i++){
                arr1[str1.length() - i - 1] = str1[i] - '0';
            }
            for(int i = 0; i < str2.length(); i++){
                arr2[str2.length() - i - 1] = str2[i] - '0';
            }
            for(int i = 0; i < 10; i++){
                arr1[i] += arr2[i];
                if(arr1[i] >= 10){
                    arr1[i + 1]++;
                    arr1[i] -= 10;
                    counter++;
                }
            }
            if(counter == 0){
                cout << "No carry operation.";
            }
            else if(counter == 1){
                cout << "1 carry operation.";
            }
            else{
                cout << counter << " carry operations.";
            }
            cout << endl;
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
        while(cin >> total){
            int numbers[total];
            int check[total - 1] = {0};
            for(int i = 0; i < total; i++){
                cin >> numbers[i];
            }
            for(int i = 0; i < total - 1; i++){
                check[ abs(numbers[i] - numbers[i + 1]) - 1 ]++;
            }
            bool Jolly = true;
            for(int i = 0; i < total - 1; i++){
                if(check[i] != 1){
                    Jolly = false;
                    break;
                }
            }
            if(Jolly){
                cout << "Jolly" << endl;
            }
            else{
                cout << "Not jolly" << endl;
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
        cin >> n;
        for(int i = 0; i < n; i++){
            int r;
            cin >> r;
            for(int j = 0; j < r; j++){
                cin >> arr[j];
            }
            sort(arr, arr + r);
            int middle = (r / 2), total1 = 0, total2 = 0;
            if(r % 2 == 1){
                for(int j = 0; j < r; j++){
                    total1 += abs(arr[j] - arr[middle]);
                }
                cout << total1 << endl;
            }
            else{
                for(int j = 0; j < r; j++){
                    total1 += abs(arr[j] - arr[middle]);
                }
                middle--;
                for(int j = 0; j < r; j++){
                    total2 += abs(arr[j] - arr[middle]);
                }
                cout << min(total1, total2) << endl;
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
        cin >> cases;
        while(cases--){
            int days;
            cin >> days;
            int arr[days + 1] = {0};
            int count_h;
            cin >> count_h;
            for(int i = 0; i < count_h; i++){
                int temp, temp_h;
                cin >> temp_h;
                temp = temp_h;
                while(temp <= days){
                    arr[temp]++;
                    temp += temp_h;
                }
            }
            int ans = 0;
            for(int i = 1; i <= days; i++){
                if(arr[i] > 0 && i % 7 != 0 && i % 7 != 6){
                    ans++;
                }
            }
            cout << ans << endl;
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
        while(cin >> a >> b){
            cout << abs(a - b) << endl;
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
        cin >> cases;
        while(cases--){
            int n, x;
            double p, q;
            cin >> n >> p >> x;
            q = 1 - p;
            if(q == 1){
                cout << "0.0000" << endl;
            }
            else{
                cout << fixed << setprecision(4) << pow(q, x - 1) * p / (1 - pow(q, n)) << endl;
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
        while(cin >> v >> t){
            cout << 2 * v * t << endl;
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
            for(int i = 0; i < str.length(); i++){
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
                if(temp > base){
                    base = temp;
                }
                sum += temp;
            }
            for(int i = base; i < 62; i++){
                if(sum % i == 0){
                    cout << i + 1 << endl;
                    break;
                }
                if(i == 61){
                    cout << "such number is impossible!" << endl;
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
        if(number >= 10000000){
            bangla(number / 10000000);
            cout << " kuti ";
            number %= 10000000;
        }
        if(number >= 100000){
            bangla(number / 100000);
            cout << " lakh ";
            number %= 100000;
        }
        if(number >= 1000){
            bangla(number / 1000);
            cout << " hajar ";
            number %= 1000;
        }
        if(number >= 100){
            bangla(number / 100);
            cout << " shata ";
            number %= 100;
        }
        if(0 <= number && number < 100){
            cout << number;
        }
    }

    int main()
    {
        long long int number;
        int counter = 0;
        while(cin >> number){
            cout << ++counter << ". ";
            bangla(number);
            cout << endl;
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
        while(cin >> init >> day){
            while(day > 0){
                day -= init;
                init++;
            }
            cout << init - 1 << endl;
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
            if(num1 < pow(num2, i)){
                return false;
            }
        }
    }

    int main()
    {
        long long num1, num2;
        while(cin >> num1 >> num2){
            if(num2 == 0 || num2 == 1 || !notBoring(num1, num2)){
                cout << "Boring!" << endl;
                continue;
            }
            else if(notBoring(num1, num2)){
                cout << num1 << " ";
                while(num1 != num2){
                    num1 /= num2;
                    cout << num1<< " ";
                }
                cout << "1" << endl;
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
        for(int i = 0; i < str.length(); i++){
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
        cin >> cases;
        while(c++ < cases){
            string str1, str2;
            cin >> str1 >> str2;
            long long num1 = b_to_d(str1), num2 = b_to_d(str2);
            if(GCD(num1, num2) == 1){
                cout << "Pair #" << c << ": Love is not all you need!" << endl;
            }
            else{
                cout << "Pair #" << c << ": All you need is love!" << endl;
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
        while(cin >> s >> a >> unit){
            if(unit == "min"){
                a /= 60.0;
            }
            if(a > 180.0){
                a = 360.0 - a;
            }
            cout << fixed << setprecision(6) << 2.0 * acos(0.0) * 2.0 * (r + s) * a / 360.0 << " "
                 << (r + s) * cos((90.0 - a / 2.0) / 180.0 * acos(0.0) * 2.0) * 2.0 << endl;
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
        for(int i = 0; i < inputString.length(); i++){
            inputString[i] = tolower(inputString[i]);
        }
        for(int i = 0; i < inputString.length(); i++){
            if(inputString[i] == ' '){
                cout << " ";
            }
            else{
                for(int j = 0; j < str.length(); j++){
                    if(str[j] == inputString[i]){
                        cout << str[j - 2];
                        break;
                    }
                }
            }
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
        for(int i = 2; i < 1000001; i++){
            if(!notPrime[i]){
                for(int j = i + i; j < 1000001; j += i){
                    notPrime[j] = true;
                }
            }
        }
    }

    int main()
    {
        makeTable();
        string str, temp;
        while(cin >> str){
            temp = str;
            cout << str << " ";
            if(!notPrime[stoi(str)]){
                reverse(str.begin(), str.end());
                if(temp == str){
                    cout << "is prime." << endl;
                    continue;
                }
                if(!notPrime[stoi(str)]){
                    cout << "is emirp." << endl;
                    continue;
                }
                else{
                    cout << "is prime." << endl;
                    continue;
                }
            }
            else{
                cout << "is not prime." << endl;
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
        while(cin >> x1 >> y1 >> x2 >> y2 >> x3 >> y3 >> x4 >> y4){
            if(x1 == x3 && y1 == y3){
                cout << fixed << setprecision(3) << (x2 + x4) - x1 << " "
                     << fixed << setprecision(3) << (y2 + y4) - y1 << endl;
            }
            else if(x1 == x4 && y1 == y4){
                cout << fixed << setprecision(3) << (x2 + x3) - x1 << " "
                << fixed << setprecision(3) << (y2 + y3) - y1 << endl;
            }
            else if(x2 == x3 && y2 == y3){
                cout << fixed << setprecision(3) << (x1 + x4) - x2 << " "
                << fixed << setprecision(3) << (y1 + y4) - y2 << endl;
            }
            else{
                cout << fixed << setprecision(3) << (x1 + x3) - x2 << " "
                << fixed << setprecision(3) << (y1 + y3) - y2 << endl;
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
            for(int i = 0; i < str1.length(); i++){
                for(int j = 0; j < str2.length(); j++){
                    if(str1[i] == str2[j]){
                        output += str1[i];
                        str2[j] = ' ';
                        break;
                    }
                }
            }
            sort(output.begin(), output.end());
            cout << output << endl;
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
        for(int i = length - 1; i >= 0; i--){
            ans += a[i] * exp * (length - i);
            exp *= x;
        }
        cout << ans <<endl;
    }
    int main()
    {
        int x, n;
        while(scanf("%d", &x) != EOF){
            for(n = 0; ; n++){
                cin >> a[n];
                if(getchar() == '\n'){
                    break;
                }
            }
            run(n,x);
        }
    }
    `,
    `
    //10420
    #include &ltbits/stdc++.h&gt
    using namespace std;
    int main()
    {
        int n;
        cin >> n;
        map<string, int> ans;
        for(int i = 0; i < n; i++){
            string country, foo;
            cin >> country;
            getline(cin, foo);
            ans[country]++;
        }
        for(auto x : ans){
            cout << x.first << " " << x.second << endl;
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
        cin >> T;
        while(t++ < T){
            int x1, y1, x2, y2;
            cin >> x1 >> y1 >> x2 >> y2;
            int ans = 0;
            ans += (x1 + y1 + x2 + y2 + 1) * (x2 + y2 - x1 - y1) / 2;
            ans += (x2 - x1);
            cout << "Case " << t << ": " << ans << endl;
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
        cin >> cases;
        for(int i = 0; i < cases; i++){
            int a, b, ans = 0;
            cin >> a >> b;
            for(int j = a; j <= b; j++){
                if(j % 2){
                    ans += j;
                }
            }
            cout << "Case " << i + 1 << ": " << ans << endl;
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
        cin >> cases;
        for(int i = 0; i < cases; i++){
            int x, y;
            cin >> x >> y;
            if((x + y) / 2 < 0 || (x - y) / 2 < 0 || (x + y) % 2 || (x - y) % 2){
                cout << "impossible" << endl;
            }
            else{
                cout << (x + y) / 2 << " " << (x - y) / 2 << endl;
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
        cin >> cases;
        while(cases--){
            int row, col, test_cases;
            cin >> row >> col >> test_cases;
            char arr[row][col];
            for(int i = 0; i < row; i++){
                for(int j = 0; j < col; j++){
                    cin >> arr[i][j];
                }
            }
            cout << row << " " << col << " " << test_cases << endl;
            for(int i = 0; i < test_cases; i++){
                int x, y;
                cin >> x >> y;
                int ans = 1;
                for(int j = 1; ; j++){
                    bool flag = false;
                    for(int r = x - j; r <= x + j; r++){
                        for(int c = y - j; c <= y + j; c++){
                            if(r < 0 || c < 0 || r >= row || c >= col || arr[r][c] != arr[x][y]){
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
                cout << ans << endl;
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
        for(int i = 0; i < str.length(); i++){
            sum += str[i] - '0';
        }
    
        if(sum == 9){
            cout << " is a multiple of 9 and has 9-degree " << counter << "." << endl;
            return;
        }
        else if(sum < 9){
            cout << " is not a multiple of 9." << endl;
            return;
        }
        counter++;
        run(to_string(sum), counter);
    }
    
    int main()
    {
        string str;
        while(cin >> str && str != "0"){
            cout << str;
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
        while(cin >> str && str != "0"){
           int odd = 0, even = 0;
           for(int i = 0; i < str.length(); i++){
               (i % 2 == 0) ? even += str[i] - '0' : odd += str[i] - '0';
           }
           (abs(odd - even) % 11 == 0) ? cout << str <<  " is a multiple of 11." << endl : 
                                         cout << str << " is not a multiple of 11." << endl;
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
        while(cin >> num && num){
            string str = "";
            int sum = 0;
            while(num > 0){
                if(num % 2){
                    str = "1" + str;
                    sum++;
                }
                else{
                    str = "0" + str;
                }
                num /= 2;
            }
            cout << "The parity of " << str << " is " << sum << " (mod 2)." << endl;
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
        for(int i = 2; i <= 36; i++){
            test = num;
            total_price[i - 2] = 0;
            for(int j = i; test > 0; test /= j){
                total_price[i - 2] += price[test % j];
            }
            if(cheap > total_price[i - 2]){
                cheap = total_price[i - 2];
            }
        }
        cout << "Cheapest base(s) for number " << num << ": ";
        for(int i = 0; i < 35; i++){
            if(cheap == total_price[i]){
                cout << i + 2 << " ";
            }
        }
        cout << endl;
    }

    int main()
    {
        int T, t = 0;
        cin >> T;
        while(t++ < T){
            for(int i = 0; i < 36; i++){
                cin >> price[i];
            }
            int numbers;
            cin >> numbers;
            for(int i = 0; i < numbers; i++){
                int num;
                cin >> num;
                if(i == 0){
                    cout << "Case " << t << ":" << endl;
                }
                run(num);
            }
            if(t < T){
                cout << endl;
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
        while(cin >> numbers){
            int arr[101] = {0};
            bool isB2 = true;
            for(int i = 1; i <= numbers; i++){
                cin >> arr[i];
                if(arr[i] <= arr[i - 1] || arr[i] < 1){
                    isB2 = false;
                }
            }
            bool counter[20001] = {false};
            if(isB2){
                for(int i = 1; i <= numbers; i++){
                    for(int j = i; j <= numbers; j++){
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
                cout << "Case #" << cases_count << ": It is a B2-Sequence." << endl << endl;
            }
            else{
                cout << "Case #" << cases_count << ": It is not a B2-Sequence." << endl << endl;
            }
            cases_count++;
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
        for(int i = 0; i < str.length(); i++){
            total += int(str[i] - '0');
        }
        if(to_string(total).length() == 1){
            cout << to_string(total) << endl;
        }
        else{
            recursive(to_string(total));
        }
    }

    int main()
    {
        string str;
        while(cin >> str && str != "0"){
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
        cin >> cases;
        for(int a = 0; a < cases; a++){
            char foo, foo2;
            long long s;
            cin >> foo >> foo2 >> s;
            long long arr[s][s];
            for(int i = 0; i < s; i++){
                for(int j = 0; j < s; j++){
                    cin >> arr[i][j];
                }
            }
            bool isSym = true;
            for(int i = 0; i < s; i++){
                for(int j = 0; j < s; j++){
                    if(arr[i][j] < 0){
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
                cout << "Test #" << a + 1 << ": Symmetric." << endl;
            }
            else{
                cout << "Test #" << a + 1 << ": Non-symmetric." << endl;
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
        while(cin >> n && n){
            int sum = 0;
            for(int i = 1; i < n; i++){
                for(int j = i + 1; j <= n; j++){
                    sum += GCD(i, j);
                }
            }
            cout << sum << endl;
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
        while(cin >> num1 >> num2 && num1 && num2){
            int counter = 0;
            for(int i = num1; i <= num2; i++){
                double temp = sqrt(i);
                int temp2 = temp;
                if(temp == temp2){
                    counter++;
                }
            }
            cout << counter << endl;
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
                cout << "Friday" << endl;
                break;
            case 1:
                cout << "Saturday" << endl;
                break;
            case 2:
                cout << "Sunday" << endl;
                break;
            case 3:
                cout << "Monday" << endl;
                break;
            case 4:
                cout << "Tuesday" << endl;
                break;
            case 5:
                cout << "Wednesday" << endl;
                break;
            case 6:
                cout << "Thursday" << endl;
                break;
        }
    }

    int main()
    {
        int cases, month, day;
        cin >> cases;
        for(int i = 0; i < cases; i++){
            cin >> month >> day;
            run(month, day);
        }
        return 0;
    }
    `
]

// my LeetCode accept codes
var LeetCode_ac = [
    `
    //LeetCode20
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
    
            for(int i = 0 ; i < s.length(); i++){
                char c = s[i];
                cout << c;
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
    //LeetCode35
    class Solution {
        public:
            int searchInsert(vector&ltint&gt& nums, int target) {
                return (lower_bound(nums.begin(), nums.end(), target) - nums.begin());
            }
        };
    `,
    `
    //LeetCode53
    class Solution {
        public:
            int maxSubArray(vector&ltint&gt& nums) {
                int temp = 0, ans = nums[0];
                for(int i = 0; i < nums.size(); i++){
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
    //LeetCode66
    class Solution {
        public:
            vector&ltint&gt plusOne(vector&ltint&gt& digits) {
                for (int i = digits.size() - 1; i >= 0; i--) {
                    if (digits[i] < 9) {
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
    //LeetCode122
    class Solution {
        public:
            int maxProfit(vector&ltint&gt& prices) {
                int ans = 0;
                for(int i = 0; i < prices.size() - 1; i++){
                    if(prices[i + 1] > prices[i]){
                        ans += prices[i + 1] - prices[i];
                    }
                }
                return ans;
            }
        };
    `,
    `
    //LeetCode300
    class Solution {
        public:
            int lengthOfLIS(vector&ltint&gt& nums) {
                int n = nums.size();
                vector&ltint&gtLIS(n, 1);
                for (int i = 0; i < n; i++) {
                    for (int j = 0; j < i; j++) {
                        if (nums[i] > nums[j])
                            LIS[i] = max(LIS[i], 1 + LIS[j]);
                    }
                }
                int ans = 0;
                for (int i = 0; i < n; i++) {
                    ans = max(ans, LIS[i]);
                }
                return ans;
            }
        };
    `,
    `
    //LeetCode326
    class Solution {
        public:
            bool isPowerOfThree(int n) {
                while(n % 3 == 0 && n >= 1){
                    n /= 3;
                }
                return (n == 1);
            }
        };
    `,
    `
    //LeetCode367
    class Solution {
        public:
            bool isPowerOfThree(int n) {
                while(n % 3 == 0 && n >= 1){
                    n /= 3;
                }
                return (n == 1);
            }
        };
    `,
    `
    //LeetCode645
    class Solution {
        public:
            vector&ltint&gt findErrorNums(vector&ltint&gt& nums) {
                int r = nums.size() - 1, l = 0;
                while (l < r) {
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
    //LeetCode704
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
    //LeetCode709
    class Solution {
        public:
            string toLowerCase(string str) {
                for(int i = 0; i < str.length(); i++){
                    str[i] = tolower(str[i]);
                }
                return str;
            }
        };
    `,
    `
    //LeetCode771
    class Solution {
        public:
            int numJewelsInStones(string jewels, string stones) {
                int ans = 0;
                for(int i = 0; i < jewels.length(); i++){
                    for(int j = 0; j < stones.size(); j++){
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
    //LeetCode832
    class Solution {
        public:
            vector&ltvector&ltint&gt&gt flipAndInvertImage(vector&ltvector&ltint&gt&gt& image) {
                vector&ltvector&ltint&gt&gt ans(image.size(), vector&ltint&gt(image.size(), 0));
                for(int i = 0; i < image.size(); i++){
                    for(int j = image[i].size() - 1; j >= 0; j--){
                        ans[i][image[i].size() - j - 1] = (!(image[i][j]));
                    }
                }
                return ans;
            }
        };
    `,
    `
    //LeetCode938
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
            if( (low <= root -> val) && (root -> val <= high) ){
                ans += root -> val;
            }
            if(root -> left != NULL){
                run(root -> left, low, high, ans);     
            }
            if(root -> right != NULL){
                run(root -> right, low, high, ans);     
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
    //LeetCode943
    class Solution {
        vector&ltvector&ltint&gt&gt kmp;   // store prev for each string
        vector&ltvector&ltint&gt&gt edges; // store length of string j - string i

        /*
        res[i]: use binary integer i to represent a index set, every bit indicates the existence of each number, 
        map key is the leading number index, value is the minimum possible value
        */
        vector&ltstd::unordered_map&ltint, int&gt&gt res; 
        vector&ltint> aux = { 0b1, 0b10, 0b100, 0b1000, 0b10000, 0b100000, 0b1000000, 0b10000000, 0b100000000, 0b1000000000, 0b10000000000, 0b100000000000, 0b1000000000000 };
        vector&ltstd::unordered_map&ltint, int&gt&gt last; // last index correspond to current index to make the value smallest
        public:
            void findKMP(string& s, vector&ltint&gt& pre) {
                pre.push_back(-1);
                for (int i = 1; i < s.size(); i++) {
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
                for (int i = 0; i < d.size(); i++) {
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
                for (int i = 0; i < s.size(); i++) {
                    if (s[i] == '1') {
                        int key = t - aux[s.size() - 1 - i];
                        int temp = key;
                        res[t][i] = INT_MAX;
                        for (auto& j : res[key]) {
                            temp = j.second + edges[j.first][i];
                            if (temp < res[t][i]) {
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
                res.assign(1 << A.size(), std::unordered_map&ltint, int&gt());
                last.assign(1 << A.size(), std::unordered_map&ltint, int&gt());
                for (string& s : A) {
                    res[aux[A.size() - 1 - kmp.size()]][kmp.size()] = s.size();
                    kmp.push_back(vector&ltint&gt());
                    findKMP(s, kmp.back());
                    edges.push_back(vector&ltint&gt(A.size(), 0));
                }


                for (int i = 0; i < A.size(); i++) {
                    for (int j = i + 1; j < A.size(); j++) {
                        get_overlap(i, A[i], j, A[j]);
                    }
                }

                for (int len = 2; len <= A.size(); len++) {
                    string s(A.size() - len, '0');
                    s.append(len, '1');
                    do {
                        int t = std::stoi(s, NULL, 2);
                        calculate(s, t);
                    } while (std::next_permutation(s.begin(), s.end()));
                }

                string realres;

                int minvalue = INT_MAX, ind = (1 << A.size()) - 1, minind;

                for (auto& x : res[ind]) {
                    if (x.second < minvalue) {
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
    //LeetCode946
    class Solution
    {
    public:
        bool validateStackSequences(vector&ltint&gt& pushed, vector&ltint&gt& popped)
        {
            stack &ltint&gt temp;
            int indexPush = 0, indexPop = 0;
            while(indexPush < pushed.size() && indexPop < popped.size()){
                if(temp.size() > 0){
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
    //LeetCode977
    class Solution {
        public:
            vector&ltint&gt sortedSquares(vector&ltint&gt& nums) {
                for(int i = 0; i < nums.size(); i++){
                    nums[i] *= nums[i];
                }
                sort(nums.begin(), nums.end());
                return nums;
            }
        };
    `,
    `
    //LeetCode1108
    class Solution {
        public:
            string defangIPaddr(string address) {
                string ans;
                for(int i = 0; i < address.length(); i++){
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
    //LeetCode1143
    class Solution {
        public:
            int longestCommonSubsequence(string text1, string text2) {
                int x = text1.length() + 1, y = text2.length() + 1;
                int arr[x][y];
                //in array prev, 0 means from uppper left, 1 means left, 2 means top.
        
                //init the array.
                for(int i = 0; i < x; i++){
                    for(int j = 0; j < y; j++){
                        arr[i][j] = 0;
                    }
                }
        
                //do the adding
                for(int i = 1; i < x; i++){
                    for(int j = 1; j < y; j++){
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
    //LeetCode1221
    class Solution {
        public:
            int balancedStringSplit(string s) {
                int ans = 0, temp = 0;
                for(int i = 0; i < s.length(); i++){
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
    //LeetCode1295
    class Solution {
        public:
            int findNumbers(vector&ltint&gt& nums) {
                int count = 0;
                for(int i = 0; i < nums.size(); i++){
                    if(int(log10(nums[i])) % 2 == 1){
                        count++;
                    }
                }
                return count;
            }
        };
    `,
    `
    //LeetCode1313
    class Solution {
        public:
            vector&ltint&gt decompressRLElist(vector&ltint&gt& nums) {
                vector&ltint&gt ans;
                for(int i = 0; i < nums.size(); i += 2){
                    for(int j = 0; j < nums[i]; j++){
                        ans.push_back(nums[i + 1]);   
                    }
                }
                return ans;
            }
        };
    `,
    `
    //LeetCode1323
    class Solution {
        public:
            int maximum69Number (int num) {
                string number = to_string(num);
                for(int i = 0; i < number.length(); i++){
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
    //LeetCode1365
    class Solution {
        public:
            vector&ltint&gt smallerNumbersThanCurrent(vector&ltint&gt& nums) {
                vector&ltint&gt ans(nums.size(), 0);
                for(int i = 0; i < nums.size(); i++){
                    for(int j = 0; j < nums.size(); j++){
                        if(nums[i] > nums[j]){
                            ans[i]++;
                        }
                    }
                }
                return ans;
            }
        };
    `,
    `
    //LeetCode1389
    class Solution {
        public:
            vector&ltint&gt createTargetArray(vector&ltint&gt& nums, vector&ltint&gt& index) {
                vector&ltint&gt ans;
                for(int i = 0; i < nums.size(); i++){
                    ans.insert(ans.begin() + index[i], nums[i]);
                }
                return ans;
            }
        };
    `,
    `
    //LeetCode1431
    class Solution {
        public:
            vector&ltbool&gt kidsWithCandies(vector&ltint&gt& candies, int extraCandies) {
                int maximum = *max_element(candies.begin(), candies.end());
                vector&ltbool&gt ans;
                for(int i = 0; i < candies.size(); i++){
                    if(candies[i] + extraCandies >= maximum){
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
    //LeetCode1450
    class Solution {
        public:
            int busyStudent(vector&ltint&gt& startTime, vector&ltint&gt& endTime, int queryTime) {
                int ans = 0;
                for(int i = 0; i < startTime.size(); i++){
                    if(startTime[i] <= queryTime && queryTime <= endTime[i]){
                        ans++;
                    }
                }
                return ans;
            }
        };
    `,
    `
    //LeetCode1470
    class Solution {
        public:
            vector&ltint&gt shuffle(vector&ltint&gt& nums, int n) {
                vector&ltint&gt ans;
                for(int i = 0; i < n; i++){
                    ans.push_back(nums[i]);
                    ans.push_back(nums[i + n]);
                }
                return ans;
            }
        };
        
    `,
    `
    //LeetCode1480
    class Solution {
        public:
            vector&ltint&gt runningSum(vector&ltint&gt& nums) {
                vector&ltint&gt ans;
                int temp = 0;
                for(int i = 0; i < nums.size(); i++){
                    temp += nums[i];
                    ans.push_back(temp);
                }
                return ans;
            }
        };
    `,
    `
    //LeetCode1486
    class Solution {
        public:
            int xorOperation(int n, int start) {
                int ans = start;
                for(int i = 1; i < n; i++){
                    ans = ans ^ (start + 2 * i);
                }
                return ans;
            }
        };
    `,
    `
    //LeetCode1512
    class Solution {
        public:
            int numIdenticalPairs(vector&ltint&gt& nums) {
                int ans = 0;
                for(int i = 0; i < nums.size(); i++){
                    for(int j = i + 1; j < nums.size(); j++){
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
    //LeetCode1603
    class ParkingSystem {
        public:
            vector&ltint&gt parking;
            ParkingSystem(int big, int medium, int small) {
                parking = {0, big, medium, small};
            }
            
            bool addCar(int carType) {
                return --parking[carType] >= 0;
            }
        };
        
        /**
         * Your ParkingSystem object will be instantiated and called as such:
         * ParkingSystem* obj = new ParkingSystem(big, medium, small);
         * bool param_1 = obj->addCar(carType);
         */
    `,
    `
    //LeetCode1614
    class Solution {
        public:
            int maxDepth(string s) {
                int ans = 0, temp = 0;
                for(int i = 0; i < s.length(); i++){
                    if(s[i] == '('){
                        temp++;
                        if(temp > ans){
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
    //LeetCode1662
    class Solution {
        public:
            bool arrayStringsAreEqual(vector&ltstring&gt& word1, vector&ltstring&gt& word2) {
                string str1 = "", str2 = "";
                for(int i = 0; i < word1.size(); i++){
                    str1 = str1 + word1[i];
                }
                for(int i = 0; i < word2.size(); i++){
                    str2 = str2 + word2[i];
                }
                return (str1 == str2);
            }
        };
    `,
    `
    //LeetCode1672
    class Solution {
        public:
            int maximumWealth(vector&ltvector&ltint&gt&gt& accounts) {
                int ans = 0;
                for(int i = 0; i < accounts.size(); i++){
                    int temp = 0;
                    for(int j = 0; j < accounts[i].size(); j++){
                        temp += accounts[i][j];
                    }
                    if(ans < temp){
                        ans = temp;
                    }
                }
                return ans;
            }
        };
    `,
    `
    //LeetCode1688
    class Solution {
        public:
            int numberOfMatches(int n) {
                return n - 1;
            }
        };
    `,
    `
    //LeetCode1704
    class Solution {
        public:
            bool halvesAreAlike(string s) {
                int count_a = 0, count_b = 0;
                for(int i = 0; i < s.length() / 2; i++){
                    if((s[i] == 'a')||(s[i] == 'e')||(s[i] == 'i')||(s[i] == 'o')||(s[i] == 'u')||(s[i] == 'A')||(s[i] == 'E')||(s[i] == 'I')||(s[i] == 'O')||(s[i] == 'U')){
                        count_a++;
                    }
                }
                for(int i = s.length() / 2; i < s.length(); i++){
                    if((s[i] == 'a')||(s[i] == 'e')||(s[i] == 'i')||(s[i] == 'o')||(s[i] == 'u')||(s[i] == 'A')||(s[i] == 'E')||(s[i] == 'I')||(s[i] == 'O')||(s[i] == 'U')){
                        count_b++;
                    }
                }
                return (count_a == count_b);
            }
        };
    `,
    `
    //LeetCode1725
    class Solution {
        public:
            int countGoodRectangles(vector&ltvector&ltint&gt&gt& rectangles) {
                vector&ltint&gt vec;
                int ans = 0;
                for(int i = 0; i < rectangles.size(); i++){
                    vec.push_back( min(rectangles[i][0], rectangles[i][1]) );
                }
                sort(vec.begin(), vec.end());
                int arr[vec.size()], target = vec[ vec.size() - 1 ];
                for(int i = vec.size() - 1; i >= 0; i--){
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
    //LeetCode1732
    class Solution {
        public:
            int largestAltitude(vector&ltint&gt& gain) {
                int ans = 0, temp = 0;
                for(int i = 0; i < gain.size(); i++){
                    temp += gain[i];
                    ans = max(ans, temp);
                }
                return ans;
            }
        };
    `,
    `
    //LeetCode1768
    class Solution {
        public:
            string mergeAlternately(string word1, string word2) {
                string ans = "";
                int i = 0, j = 0;
                while(i < word1.length() && j < word2.length()){
                    ans = ans + word1[i++] + word2[j++];
                }
                while(i < word1.length()){
                    ans = ans + word1[i++];
                }
                while(j < word2.length()){
                    ans = ans + word2[j++];
                }
                return ans;
            }
        };
    `,
    `
    //LeetCode1773
    class Solution {
        public:
            int countMatches(vector&ltvector&ltstring&gt&gt& items, string ruleKey, string ruleValue) {
                int ans = 0;
                for(int i = 0; i < items.size(); i++){
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
    //LeetCode 1796
    class Solution {
        public:
            int secondHighest(string s) {
                int count[10] = {0};
                for(int i = 0; i < s.length(); i++){
                    if(s[i] >= '0' && s[i] <= '9'){
                        count[ s[i] - '0' ]++;
                    }
                }
                int counting = 0, ans;
                for(int i = 9; i >= 0; i--){
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
    //LeetCode1812
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
    `
]

// when the webpage is finish loading
window.onload = function () {
    /* for the initital condition, shows uva first */
    for (let i = 0; i < solved_uva.length; i++) {
        let temp = document.createElement('option')
        temp.value = 'u' + solved_uva[i]
        temp.text = 'UVa' + solved_uva[i]
        document.getElementById('problemSet').add(temp, null);
    }
    document.getElementById('codeContainer').style.backgroundColor = "transparent"
}

// for goes to top button
function goTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// runs every time when the first select tag changes
function updateTable(table) {
    if (table.value === 'uva') {
        // remove the child(options) first
        while (document.getElementById('problemSet').firstChild) {
            document.getElementById('problemSet').removeChild(document.getElementById('problemSet').firstChild)
        }
        // add option tag for uva
        for (let i = 0; i < solved_uva.length; i++) {
            let temp = document.createElement('option')
            temp.value = 'u' + solved_uva[i]
            temp.text = "UVa" + solved_uva[i]
            document.getElementById('problemSet').add(temp, null);
        }
    }
    else if (table.value === 'leetcode') {
        // remove the child(options) first
        while (document.getElementById('problemSet').firstChild) {
            document.getElementById('problemSet').removeChild(document.getElementById('problemSet').firstChild)
        }
        // add option tag for leetcode
        for (let i = 0; i < solved_leetcode.length; i++) {
            let temp = document.createElement('option')
            temp.value = 'l' + solved_leetcode[i]
            temp.text = "LeetCode" + solved_leetcode[i]
            document.getElementById('problemSet').add(temp, null);
        }
    }
}

function updateCode(target){
    // display the background color
    document.getElementById('codeContainer').style.backgroundColor = '#ffc4b6'
    //if the user choose uva problems
    if(target.options[target.selectedIndex].value[0] === 'u'){
        for(let i = 0; i < solved_uva.length; i++){
            if('u' + solved_uva[i] === target.options[target.selectedIndex].value){
                document.getElementById('codeSpace').innerHTML = UVa_ac[i]
                document.getElementById('problemTitle').innerHTML = 'UVa' + solved_uva[i]
            }
        }
    }
    //if the user choose leetcode problems
    if(target.options[target.selectedIndex].value[0] === 'l'){
        for(let i = 0; i < solved_leetcode.length; i++){
            if('l' + solved_leetcode[i] === target.options[target.selectedIndex].value){
                document.getElementById('codeSpace').innerHTML = LeetCode_ac[i]
                document.getElementById('problemTitle').innerHTML = 'LeetCode' + solved_leetcode[i]
            }
        }
    }
}