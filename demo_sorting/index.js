var BS_num_arr = new Array(5);
var SS_num_arr = new Array(5);
window.onload = function () {
    //reset all sorting algorithms and patterns
    BS_resetAll()
    SS_resetAll()

    //For Bubble sort
    //If click reset then reset all (color, number, next step btn)
    document.getElementById("BSresetBtn").addEventListener('click', function () {
        BS_resetAll()
    })

    //if click next step then check finish sort or not
    //if need sort then change all color red then sort, swapped element both by color blue
    //if no need to sort then all color green, cannot press next step button
    document.getElementById("BSnextBtn").addEventListener('click', function () {
        var BS_needSort = false
        for (var i = 0; i < BS_num_arr.length - 1; i++) {
            if (BS_num_arr[i] > BS_num_arr[i + 1]) {
                BS_needSort = true
            }
        }

        if (BS_needSort) {
            for (var i = 0; i < BS_num_arr.length; i++) {
                document.getElementById("BScircle" + (i + 1)).style.backgroundColor = "rgb(155, 84, 84)"
            }

            for (var i = BS_num_arr.length - 1; i > 0; i--) {
                var BS_stop = false
                for (var j = 0; j < i; j++) {
                    if (BS_num_arr[i] < BS_num_arr[j]) {
                        var temp = BS_num_arr[i]
                        BS_num_arr[i] = BS_num_arr[j]
                        BS_num_arr[j] = temp
                        BS_stop = true
                        document.getElementById("BScircle" + (i + 1)).style.backgroundColor = "rgb(156, 168, 184)"
                        document.getElementById("BScircle" + (j + 1)).style.backgroundColor = "rgb(156, 168, 184)"
                        break
                    }
                }
                if (BS_stop) {
                    break
                }
            }

            for (var i = 0; i < BS_num_arr.length; i++) {
                document.getElementById("BScircle" + (i + 1)).innerHTML = BS_num_arr[i]
            }
        }
        else {
            document.getElementById("BSnextBtn").innerHTML = "Finish sorting!"
            document.getElementById("BSnextBtn").style.cursor = "not-allowed"
            for (var i = 0; i < BS_num_arr.length; i++) {
                document.getElementById("BScircle" + (i + 1)).style.backgroundColor = "rgb(123, 139, 111)"
            }
        }
    })

    //for selection sort
    //If click reset then reset all (color, number, next step btn)
    document.getElementById("SSresetBtn").addEventListener('click', function () {
        SS_resetAll()
    })

    //if click next step then check finish sort or not
    //if need sort then change all color red then sort, swapped element both by color blue
    //if no need to sort then all color green, cannot press next step button
    document.getElementById("SSnextBtn").addEventListener('click', function () {
        var SS_needSort = false
        for (var i = 0; i < SS_num_arr.length - 1; i++) {
            if (SS_num_arr[i] > SS_num_arr[i + 1]) {
                SS_needSort = true
            }
        }

        if (SS_needSort) {
            for (var i = 0; i < SS_num_arr.length; i++) {
                document.getElementById("SScircle" + (i + 1)).style.backgroundColor = "rgb(155, 84, 84)"
            }

            for (var i = 0; i < SS_num_arr.length; i++) {
                var temp_index = i
                for (var j = i + 1; j < SS_num_arr.length; j++) {
                    if (SS_num_arr[j] < SS_num_arr[temp_index]) {
                        temp_index = j
                    }
                }
                if (i != temp_index) {
                    var temp = SS_num_arr[i]
                    SS_num_arr[i] = SS_num_arr[temp_index]
                    SS_num_arr[temp_index] = temp
                    document.getElementById("SScircle" + (i + 1)).style.backgroundColor = "rgb(156, 168, 184)"
                    document.getElementById("SScircle" + (temp_index + 1)).style.backgroundColor = "rgb(156, 168, 184)"
                    break
                }
                else {
                    continue
                }
            }

            for (var i = 0; i < SS_num_arr.length; i++) {
                document.getElementById("SScircle" + (i + 1)).innerHTML = SS_num_arr[i]
            }
        }
        else {
            document.getElementById("SSnextBtn").innerHTML = "Finish sorting!"
            document.getElementById("SSnextBtn").style.cursor = "not-allowed"
            for (var i = 0; i < SS_num_arr.length; i++) {
                document.getElementById("SScircle" + (i + 1)).style.backgroundColor = "rgb(123, 139, 111)"
            }
        }
    })
}

function BS_resetAll() {
    for (var i = 0; i < BS_num_arr.length; i++) {
        var temp = Math.floor(Math.random() * 100 + 1)
        document.getElementById("BScircle" + (i + 1)).innerHTML = temp
        BS_num_arr[i] = temp
        document.getElementById("BScircle" + (i + 1)).style.backgroundColor = "rgb(155, 84, 84)"
    }
    document.getElementById("BSnextBtn").innerHTML = "Next step"
    document.getElementById("BSnextBtn").style.cursor = "pointer"
}

function SS_resetAll() {
    for (var i = 0; i < 5; i++) {
        var temp = Math.floor(Math.random() * 100 + 1)
        document.getElementById("SScircle" + (i + 1)).innerHTML = temp
        SS_num_arr[i] = temp
        document.getElementById("SScircle" + (i + 1)).style.backgroundColor = "rgb(155, 84, 84)"
    }
    document.getElementById("SSnextBtn").innerHTML = "Next step"
    document.getElementById("SSnextBtn").style.cursor = "pointer"
}