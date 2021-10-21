num = 0
function addOne() {
    num++
    updateDisplay(num)
}

function resetToZero() {
    num = 0
    updateDisplay(num)
}

function subtractOne() {
    num--;
    updateDisplay(num)
}

function updateDisplay(num) {
    document.getElementById("number").innerHTML = num;
}