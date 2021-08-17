window.onload = function () {
    //window.alert("Welcome to Sorting Demo made by Tsuen Hsueh :D")
    resetAll()
    getNums()
    document.getElementById("resetBtn").addEventListener('click', function () {
        resetAll()
        getNums()
    })

    document.getElementById("nextBtn").addEventListener('click', function () {
        var needSort = false
        for (var i = 0; i < num_arr.length - 1; i++) {
            if (num_arr[i] > num_arr[i + 1]) {
                needSort = true
            }
        }

        if (needSort) {
            for (var i = 0; i < num_arr.length; i++) {
                document.getElementById("circle" + (i + 1)).style.backgroundColor = "rgb(155, 84, 84)"
            }

            for (var i = num_arr.length - 1; i > 0; i--) {
                var stop = false
                for (var j = 0; j < i; j++) {
                    if (num_arr[i] < num_arr[j]) {
                        var temp = num_arr[i]
                        num_arr[i] = num_arr[j]
                        num_arr[j] = temp
                        stop = true
                        document.getElementById("circle" + (i + 1)).style.backgroundColor = "rgb(156, 168, 184)"
                        document.getElementById("circle" + (j + 1)).style.backgroundColor = "rgb(156, 168, 184)"
                        break
                    }
                }
                if (stop) {
                    break
                }
            }

            for (var i = 0; i < num_arr.length; i++) {
                document.getElementById("circle" + (i + 1)).innerHTML = num_arr[i]
            }
        }
        else {
            document.getElementById("nextBtn").innerHTML = "Finish sorting!"
            for (var i = 0; i < num_arr.length; i++) {
                document.getElementById("circle" + (i + 1)).style.backgroundColor = "rgb(123, 139, 111)"
            }
        }
    })
}

function resetAll() {
    for (var i = 1; i <= 5; i++) {
        document.getElementById("circle" + i).innerHTML = Math.floor(Math.random() * 100 + 1)
    }
}

var num_arr = new Array(5);
function getNums() {
    for (var i = 1; i <= 5; i++) {
        num_arr[i - 1] = parseInt(document.getElementById("circle" + i).innerHTML)
    }
    for (var i = 0; i < 5; i++) {
        console.log(num_arr[i]);
    }
}