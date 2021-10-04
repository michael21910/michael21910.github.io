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
        'Web crawl receipt prize number, auto-check in txt file.',
        'Generates a word cloud image according to ptt.',
        'Web crawling and Data collation recipes of Harvest Moon.',
        'Crawls videos by the keyword and the number you input.',
        'Web crawling dog pictures.',
        'Web crawling the 5 latest activities on a webpage.',
        'Crawls the episode URL of running man.',
        'Crawls the top20 programming languages.'
    ]
    crawlingImg = [
        'pro_HMDS',
        'pro_HMDS',
        'pro_HMDS',
        'pro_HMDS',
        'pro_HMDS',
        'pro_HMDS',
        'pro_HMDS',
        'pro_HMDS'
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
    appImg = [
        'pro_HMDS',
        'pro_HMDS'
    ]
    appLink = [
        'swift-todo-list',
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
    practiceImg = [
        'pro_HMDS',
        'pro_HMDS',
        'pro_HMDS',
        'pro_HMDS',
        'pro_HMDS',
        'pro_HMDS'
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
    othersImg = [
        'pro_HMDS',
        'pro_HMDS',
        'pro_HMDS',
        'pro_HMDS'
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
                    <img src="../img/` + crawlingImg[i] + `.png">
                </a>
            </div>
        </div>
        `
        console.log("https://github.com/michael21910/" + crawlingLink[i]);
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
                    <img src="../img/` + appImg[i] + `.png">
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
                    <img src="../img/` + practiceImg[i] + `.png">
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
                    <img src="../img/` + othersImg[i] + `.png">
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