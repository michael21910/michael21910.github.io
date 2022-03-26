window.onload = function() {
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

    crawlingBlocks = document.getElementById('crawlingBlocks')
    webBlocks = document.getElementById('webBlocks')
    practiceBlocks = document.getElementById('practiceBlocks')
    othersBlocks = document.getElementById('othersBlocks')

    // projects - Crawling part
    crawlingTitle = [
        'Auto Receipt Check',
        'Harvest Moon Recipe Web Crawler',
        'NDHU Dogs Web Crawler',
    ]
    crawlingContent = [
        'Web crawl receipt prize number and then auto checks your receipt number in txt file.',
        'Web crawling and Data collation recipes of Harvest Moon, allows users enter multiple ingredients to find the recipe.',
        'Web crawling dog pictures according to the webpage of aowoo club in NDHU.'
    ]
    crawlingLink = [
        'auto-receipt-check',
        'harvest-moon-recipe-web-crawler',
        'NDHU-dogs-web-crawler'
    ]

    // projects - web Development part
    webTitle = [
        'JS Counter',
        'JS Face Detection',
        'JS Sort Visualization'
    ]
    webContent = [
        'A simple JS counter that can count up and down.',
        'Face detection that can detect faces and your emoji in the webcam.',
        'A visualization of sorting algorithm. Including bubble sort, exchange sort, selection sort, and insertion sort.'
    ]
    webLink = [
        'js-counter',
        'js-face-detection',
        'js-sort-visualization'
    ]

    // projects - Others part
    othersTitle = [
        'Swift Temperature Converter',
        'Swift Todo List',
        'Dynamic Programming in C++',
        'A Mini Math Game'
    ]
    othersContent = [
        'A iOS application that can convert Celsius to Fahrenheit.',
        'A iOS application that can ro CRUD to a todo list.',
        'Some dynamic programming problems and implementation in C++.',
        'This is a mini math game you can play on console.'
    ]
    othersLink = [
        'swift-temperature-converter',
        'swift-todo-list',
        'dynamic-programming',
        'A-mini-math-game'
    ]

    // add projects block - crawling
    for (let i = 0; i < crawlingTitle.length; i++) {
        let temp = `
        <div class="blockTitle">` +
            crawlingTitle[i] +
            `</div>
        <div class="block">
            <div class="blockContent">` +
            crawlingContent[i] +
            `</div>
            <div class="blockImg">
                <a target="_blank" href="https://github.com/michael21910/` + crawlingLink[i] + `">
                    <img src="../img/project_images/` + crawlingLink[i] + `.jpg">
                </a>
            </div>
        </div>
        `
        crawlingBlocks.insertAdjacentHTML('beforeend', temp);
    }

    // add projects block - web development
    for (let i = 0; i < webTitle.length; i++) {
        let temp = `
        <div class="blockTitle">` +
            webTitle[i] +
            `</div>
        <div class="block">
            <div class="blockContent">` +
            webContent[i] +
            `</div>
            <div class="blockImg">
                <a target="_blank" href="https://github.com/michael21910/` + webLink[i] + `">
                    <img src="../img/project_images/` + webLink[i] + `.jpg">
                </a>
            </div>
        </div>
        `
        webBlocks.insertAdjacentHTML('beforeend', temp);
    }

    // add projects block - others
    for (let i = 0; i < othersTitle.length; i++) {
        let temp = `
        <div class="blockTitle">` +
            othersTitle[i] +
            `</div>
        <div class="block">
            <div class="blockContent">` +
            othersContent[i] +
            `</div>
            <div class="blockImg">
                <a target="_blank" href="https://github.com/michael21910/` + othersLink[i] + `">
                    <img src="../img/project_images/` + othersLink[i] + `.jpg">
                </a>
            </div>
        </div>
        `
        othersBlocks.insertAdjacentHTML('beforeend', temp);
    }

};

function goTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}