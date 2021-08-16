window.onload = function () {
    var topBox = document.getElementById("topBox");
    topBox.style.opacity = 1;
    setTimeout(() => {
        var navi = document.getElementById("navi");
        navi.style.opacity = 1;
    }, 250);
    setTimeout(() => {
        var forJS = document.getElementById("forJS");
        forJS.style.opacity = 1;
    }, 750);
};

function goTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}