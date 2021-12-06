// sort arrays
solved_cpeOneStar.sort(function compareNumbers(a, b) {
    return a - b;
})

solved_leetcode.sort(function compareNumbers(a, b) {
    return a - b;
})

// when the webpage is finish loading
window.onload = function () {
    /* for the initital condition, shows uva first */
    for (let i = 0; i < solved_cpeOneStar.length; i++) {
        let temp = document.createElement('option')
        temp.value = 'u' + solved_cpeOneStar[i]
        temp.text = 'UVa' + solved_cpeOneStar[i]
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
    if (table.value === 'cpeOne') {
        // remove the child(options) first
        while (document.getElementById('problemSet').firstChild) {
            document.getElementById('problemSet').removeChild(document.getElementById('problemSet').firstChild)
        }
        // add option tag for uva
        for (let i = 0; i < solved_cpeOneStar.length; i++) {
            let temp = document.createElement('option')
            temp.value = 'u' + solved_cpeOneStar[i]
            temp.text = "UVa" + solved_cpeOneStar[i]
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

function updateCode(target) {
    // display the background color
    document.getElementById('codeContainer').style.backgroundColor = '#f2f0dd'
    //if the user choose uva problems
    if (target.options[target.selectedIndex].value[0] === 'u') {
        for (let i = 0; i < solved_cpeOneStar.length; i++) {
            if ('u' + solved_cpeOneStar[i] === target.options[target.selectedIndex].value) {
                document.getElementById('codeSpace').innerHTML = UVa_ac[i]
                document.getElementById('problemTitle').innerHTML = 'CPE 1 star - UVa' + solved_cpeOneStar[i]
            }
        }
    }
    //if the user choose leetcode problems
    if (target.options[target.selectedIndex].value[0] === 'l') {
        for (let i = 0; i < solved_leetcode.length; i++) {
            if ('l' + solved_leetcode[i] === target.options[target.selectedIndex].value) {
                document.getElementById('codeSpace').innerHTML = LeetCode_ac[i]
                document.getElementById('problemTitle').innerHTML = 'LeetCode' + solved_leetcode[i]
            }
        }
    }
}