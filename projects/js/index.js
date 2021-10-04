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

    crawlingBlocks = document.getElementById('crawlingBlocks')
    appBlocks = document.getElementById('appBlocks')
    practiceBlocks = document.getElementById('practiceBlocks')
    othersBlocks = document.getElementById('othersBlocks')

    // Crawling part
    crawlingTitle = [
        'Auto Receipt Check',
        'PTT Word Cloud Generator',
        'Harvest Moon Recipe Web Crawler',
        'YouTube Video Web Crawler',
        'NDHU Dogs Web Crawler',
        'NDHUAC Latest Activity Web Crawler',
        'Running Man Web Crawler',
        'Top 20 Programming Languages Web Crawler'
    ]
    crawlingContent = [
        'Web crawl receipt prize number and then auto checks your receipt number in txt file.',
        'Generates a word cloud image according to first 10 pages of ptt.',
        'Web crawling and Data collation recipes of Harvest Moon, allows users enter multiple ingredients to find the recipe.',
        'Crawls videos by the keyword and the number you enter after the code execution.',
        'Web crawling dog pictures according to the webpage of aowoo club in NDHU.',
        'Web crawling the 5 latest activities according to the webpage of Activity Center in NDHU.',
        'Crawls the episode URL of running man according to you input.',
        'Crawls the top20 programming languages on the webpage TIOBE.'
    ]
    crawlingLink = [
        'auto-receipt-check',
        'ptt-word-cloud-generator',
        'harvest-moon-recipe-web-crawler',
        'yt-video-web-crawler',
        'NDHU-dogs-web-crawler',
        'NDHUAC-latest-activity-web-crawler',
        'running-man-web-crawler',
        'top20-programming-langs-web-crawler'
    ]

    // App Development part
    appTitle = [
        'Swift ToDo List.',
        'Swift Random Photo Generator.'
    ]
    appContent = [
        'A to do list app, code in swift.',
        'Generates a random photo after you click the button.'
    ]
    appLink = [
        'A to do list coded using swift',
        'swift-random-photo-generator'
    ]

    // Practice part
    practiceTitle = [
        'Dynamic Programming',
        'C Programming Lab',
        'C Data Structure',
        'ZeroJudge',
        'CPE 1 star Problems',
        'LeetCode',
    ]
    practiceContent = [
        'Implement some problems using dynamic programming.',
        'Implementation using C in programming lab class when being Teacher Assistant.',
        'Practice Data Structure using C.',
        'My submissions on ZeroJudge.',
        'My practice code, 1 star UVa problems.',
        'My submissions on LeetCode.'
    ]
    practiceLink = [
        'dynamic-programming',
        'c-programming-lab',
        'c-data-structure',
        'zerojudge',
        'CPE-1-star-problems',
        'leetcode'
    ]

    // Others part
    othersTitle = [
        'JS Face Detection',
        'JS Sort Visualization',
        'To Do List',
        'A Mini Math Game'
    ]
    othersContent = [
        'Detects your face emotions.',
        'Sort visualization using JavaScript.',
        'Sorts your "to do list.txt" by date in a fixed format.',
        'This is a mini math game you can play on console.'
    ]
    othersLink = [
        'js-face-detection',
        'js-sort-visualization',
        'to-do-list',
        'A-mini-math-game'
    ]

    // add projects block - crawling
    for(let i = 0; i < crawlingTitle.length; i++) {
        let temp=`
        <div class="blockTitle">` + 
            crawlingTitle[i]
         + `</div>
        <div class="block">
            <div class="blockContent">` + 
                crawlingContent[i]
             + `</div>
            <div class="blockImg">
                <a target="_blank" href="https://github.com/michael21910/` + crawlingLink[i] + `">
                    <img src="../img/project_images/` + crawlingLink[i] + `.PNG">
                </a>
            </div>
        </div>
        `
        crawlingBlocks.insertAdjacentHTML('beforeend', temp);
    }

    // add projects block - app development
    for(let i = 0; i < appTitle.length; i++) {
        let temp=`
        <div class="blockTitle">` + 
            appTitle[i]
         + `</div>
        <div class="block">
            <div class="blockContent">` + 
                appContent[i]
             + `</div>
            <div class="blockImg">
                <a target="_blank" href="https://github.com/michael21910/` + appLink[i] + `">
                    <img src="../img/project_images/` + appLink[i] + `.PNG">
                </a>
            </div>
        </div>
        `
        appBlocks.insertAdjacentHTML('beforeend', temp);
    }

    // add projects block - practice
    for(let i = 0; i < practiceTitle.length; i++) {
        let temp=`
        <div class="blockTitle">` + 
            practiceTitle[i]
         + `</div>
        <div class="block">
            <div class="blockContent">` + 
                practiceContent[i]
             + `</div>
            <div class="blockImg">
                <a target="_blank" href="https://github.com/michael21910/` + practiceLink[i] + `">
                    <img src="../img/project_images/` + practiceLink[i] + `.PNG">
                </a>
            </div>
        </div>
        `
        practiceBlocks.insertAdjacentHTML('beforeend', temp);
    }

    // add projects block - others
    for(let i = 0; i < othersTitle.length; i++) {
        let temp=`
        <div class="blockTitle">` + 
            othersTitle[i]
         + `</div>
        <div class="block">
            <div class="blockContent">` + 
                othersContent[i]
             + `</div>
            <div class="blockImg">
                <a target="_blank" href="https://github.com/michael21910/` + othersLink[i] + `">
                    <img src="../img/project_images/` + othersLink[i] + `.PNG">
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