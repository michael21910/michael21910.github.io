function startTime(){
	var today = new Date();
	var h = checkTime(today.getHours());
	var m = checkTime(today.getMinutes());
	var s = checkTime(today.getSeconds());
	document.getElementById('time').innerHTML =
	"Current time " + h + " : " + m + " : " + s;
	var t = setTimeout(startTime, 500);
}

function checkTime(i){
	if (i < 10){
		i = "0" + i;
	};
	return i;
}