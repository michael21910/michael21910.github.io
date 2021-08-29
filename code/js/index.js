/* My solved uva problems */
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

/* My solved leetcode problems */
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

/* sort arrays */
solved_uva.sort(function compareNumbers(a, b) {
    return a - b;
})


solved_leetcode.sort(function compareNumbers(a, b) {
    return a - b;
})

/* when the webpage is finish loading */
window.onload = function () {
    /* for the initital condition, shows uva first */
    for (var i = 0; i < solved_uva.length; i++) {
        var temp = document.createElement('option')
        temp.value = solved_uva[i]
        temp.text = "UVa" + solved_uva[i]
        document.getElementById('problemSet').add(temp, null);
    }
}

/* for goes to top button */
function goTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* runs every time when the first select tag changes */
function updateTable(table) {
    if (table.value === 'uva') {
        /* remove the child(options) first */
        while (document.getElementById('problemSet').firstChild) {
            document.getElementById('problemSet').removeChild(document.getElementById('problemSet').firstChild)
        }
        /* add option tag for uva */
        for (var i = 0; i < solved_uva.length; i++) {
            var temp = document.createElement('option')
            temp.value = solved_uva[i]
            temp.text = "UVa" + solved_uva[i]
            document.getElementById('problemSet').add(temp, null);
        }
        console.log(document.getElementById('problemSet').options[0].text);
    }
    else if (table.value === 'leetcode') {
        /* remove the child(options) first */
        while (document.getElementById('problemSet').firstChild) {
            document.getElementById('problemSet').removeChild(document.getElementById('problemSet').firstChild)
        }
        /* add option tag for leetcode */
        for (var i = 0; i < solved_leetcode.length; i++) {
            var temp = document.createElement('option')
            temp.value = solved_leetcode[i]
            temp.text = "LeetCode" + solved_leetcode[i]
            document.getElementById('problemSet').add(temp, null);
        }
    }
}