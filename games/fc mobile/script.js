window.appState = {
    currentView: 'editions', 
    editions: [
        {
            id: 'edition-1',
            name: '第一屆BD盃足球大賽',
            bgImage: './images/第一屆BD盃冠軍.jpg',
            csvUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ_7xh2REb9TXEVDMy8RBiHES8Yz2YpN-qJy_a-HC1RRgK-yS2VrGgp1jg0o7ppb9Uu72OHVdd0PzWl/pub?gid=1007921436&single=true&output=csv',
            rules: `
            <p>1. <strong>小組循環賽（無加時、無12碼）</strong>：6人隨機分成2組，1組3人，進行循環賽。以3個人為例，即A vs B、B vs C、A vs C。勝者得3分積分、平手各得1分積分、落敗無積分。</p>
            <p>1-1. <strong>小組循環賽積分規則</strong>：每組取2個人進入淘汰賽。若積分相同則以淨勝球決定晉級者。若淨勝球相同則以進球數決定晉級者。若進球數相同則以黃紅牌決定晉級者；黃牌扣1分、黃+黃扣3分；紅扣4分；黃+紅扣5分。若黃紅牌扣點相同則以抽籤決定晉級者。</p>
            <p>2. <strong>淘汰賽（有加時、有12碼）</strong>：4人隨機分組，淘汰賽制。半決賽BO3、決賽BO5。</p>
            <p>3. <strong>其他規則</strong>：若被罰下則下一場禁賽。一球員被黃牌總計兩次則下一場禁賽，若一球員被黃牌但下一場比賽無獲得黃牌，則黃牌計數-1，意即同一角色連續兩場被罰黃牌則觸發禁賽機制，禁賽對象為角色人名。</p>
            `
        },
        {
            id: 'edition-2',
            name: '第二屆BD盃足球大賽',
            bgImage: './images/default_bg.jpg',
            csvUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSnOqLGtloGbA8jkxcD3mEwApwqDkkEX0SOYec8f3QF8NiQN6YjZNlECF1Hr6M21x2x5KGROL9i-4jB/pub?gid=60729703&single=true&output=csv',
            rules: `
            <p>1. 比照歐冠賽制（八強淘汰賽制），決賽一把定勝負，且開加時、12碼</p>
            <p>2. 取勝者準則：打兩把後比淨球數差；如果相同則打加賽，且開加時、12碼</p>
            `
        }
    ],
    selectedEdition: null,
    tournaments: [],
    players: [],
    rawData: {},           
    tournamentPlayers: {}, 
    matchFixtures: {},     // 儲存各賽制的對戰比分與分組紀錄
    selectedTournament: null,
    selectedPlayer: null,
    playerActiveTab: null  
};

const getVal = (obj, keys, defaultVal = '-') => {
    if (!obj) return defaultVal;
    for (let k of keys) {
        if (obj[k] !== undefined && obj[k] !== null && obj[k] !== '') {
            let v = obj[k];
            if (v === '#DIV/0!' || v === '#VALUE!') return defaultVal;
            return v;
        }
    }
    return defaultVal;
};

const views = {
    editions: document.getElementById('view-editions'),
    sections: document.getElementById('view-sections'),
    tournament: document.getElementById('view-tournament'),
    player: document.getElementById('view-player'),
    loading: document.getElementById('loading-screen')
};

function initApp() {
    renderViews();
}

function loadEditionData(edition, callback, isManualSync = false) {
    const state = window.appState;
    const errEl = document.getElementById('loading-text');

    state.tournaments = [];
    state.players = [];
    state.rawData = {};
    state.tournamentPlayers = {};
    state.matchFixtures = {};

    views.loading.classList.remove('hidden');
    if (!isManualSync) {
        errEl.innerText = `正在載入 ${edition.name} 數據...`;
    }

    const csvUrl = (edition.csvUrl || '') + '&t=' + new Date().getTime();

    Papa.parse(csvUrl, {
        download: true,
        header: false,
        skipEmptyLines: false,
        complete: function(results) {
            processData(results.data, edition, isManualSync);
            if (callback) callback();
        },
        error: function(err) {
            if (!isManualSync) {
                errEl.classList.remove('text-blue-500');
                errEl.classList.add('text-red-500');
                errEl.innerText = "讀取線上資料失敗：" + err + "。請確認該屆的 CSV 連結是否正確。";
            } else {
                alert("同步失敗：" + err);
                const icon = document.getElementById('sync-icon');
                if (icon) icon.classList.remove('animate-spin');
            }
        }
    });
}

function manualSyncData() {
    const state = window.appState;
    const icon = document.getElementById('sync-icon');
    if (icon) icon.classList.add('animate-spin');
    
    if (state.selectedEdition) {
        loadEditionData(state.selectedEdition, () => {
            if (icon) icon.classList.remove('animate-spin');
        }, true);
    } else {
        if (icon) icon.classList.remove('animate-spin');
    }
}

function processData(data, edition, isManualSync = false) {
    const state = window.appState;
    const curView = state.currentView;
    const edObj = state.selectedEdition;
    const tourName = state.selectedTournament?.name;
    const playerName = state.selectedPlayer?.name;
    const activeTab = state.playerActiveTab;

    state.tournaments = [];
    state.players = [];
    state.rawData = {};
    state.tournamentPlayers = {};
    state.matchFixtures = {};
    
    let titleRowIdx = 0;
    let nameRowIdx = 1;
    for (let i = 0; i < Math.min(5, data.length); i++) {
        if (data[i] && data[i].includes("姓名")) {
            nameRowIdx = i;
            titleRowIdx = Math.max(0, i - 1);
            break;
        }
    }

    const titleRow = data[titleRowIdx] || [];
    const nameRow = data[nameRowIdx] || [];

    let blocks = [];
    for (let c = 0; c < nameRow.length; c++) {
        if (nameRow[c] && nameRow[c].trim() === "姓名") {
            let sectionName = titleRow[c] ? titleRow[c].trim() : `賽事區塊 ${blocks.length + 1}`;
            blocks.push({ startCol: c, name: sectionName });
        }
    }

    let parsedPlayers = new Map(); 
    let rawData = {};
    let tourPlayersMap = {};
    let matchFixturesMap = {};

    const statLabels = [
        // basic info
        "總場次", "獲勝場次", "踢平場次", "落敗場次", "賽事總進球", "賽事總失球",
        // advanced stats
        "勝率", "不敗率", "賽事淨勝球", "場均進球", "場均失球","賽事淨勝球", "賽事淨勝球率", "得失球比"
    ];

    blocks.forEach((block, bIdx) => {
        // 🌟 如果區塊名稱包含「排名」，則走專屬的簡易讀取邏輯，不讀取對戰比分與勝負統計
        if (block.name.includes("排名")) {
            let nextBlockStart = blocks[bIdx + 1] ? blocks[bIdx + 1].startCol : nameRow.length;
            let tid = 'tour-' + bIdx;
            state.tournaments.push({ id: tid, name: block.name });
            tourPlayersMap[tid] = [];
            matchFixturesMap[block.name] = []; // 排名區塊不需要賽程
            
            for (let c = block.startCol + 1; c < nextBlockStart; c++) {
                let playerName = nameRow[c] ? nameRow[c].trim() : "";
                if (!playerName) continue;

                if (!parsedPlayers.has(playerName)) {
                    parsedPlayers.set(playerName, { name: playerName, id: 'p-' + Math.random().toString(36).substring(7) });
                }
                tourPlayersMap[tid].push(playerName);

                if (!rawData[playerName]) rawData[playerName] = {};
                if (!rawData[playerName][block.name]) rawData[playerName][block.name] = {};

                // 讀取該欄位底下的數值（例如「排名」欄位對應的值）
                for (let r = nameRowIdx + 1; r < data.length; r++) {
                    if (!data[r]) continue;
                    let metricName = data[r][block.startCol] ? data[r][block.startCol].trim() : "";
                    if (metricName) {
                        let val = data[r][c] ? data[r][c].trim() : "";
                        rawData[playerName][block.name][metricName] = val;
                    }
                }
            }
            return; // ⭐️ 直接跳過後續標準賽事的複雜邏輯
        }

        let nextBlockStart = blocks[bIdx + 1] ? blocks[bIdx + 1].startCol : nameRow.length;
        let tid = 'tour-' + bIdx;
        state.tournaments.push({ id: tid, name: block.name });
        tourPlayersMap[tid] = [];
        matchFixturesMap[block.name] = [];

        // 1. 抓取選手與統計數據
        for (let c = block.startCol + 1; c < nextBlockStart; c++) {
            let playerName = nameRow[c] ? nameRow[c].trim() : "";
            if (!playerName) continue;

            if (!parsedPlayers.has(playerName)) {
                parsedPlayers.set(playerName, { name: playerName, id: 'p-' + Math.random().toString(36).substring(7) });
            }
            tourPlayersMap[tid].push(playerName);

            if (!rawData[playerName]) rawData[playerName] = {};
            if (!rawData[playerName][block.name]) rawData[playerName][block.name] = {};

            for (let r = nameRowIdx + 1; r < data.length; r++) {
                if (!data[r]) continue;
                let metricName = data[r][block.startCol] ? data[r][block.startCol].trim() : "";
                if (metricName) {
                    let val = data[r][c] ? data[r][c].trim() : "";
                    rawData[playerName][block.name][metricName] = val;
                }
            }
        }

        // 2. 嚴格侷限於該 block 欄位範圍內抓取賽程階段與對戰組合
        let currentSubGroup = "一般賽程";
        let currentMatchTime = "";
        let columnHeaders = {}; // 🌟 記錄該行右側各欄位的標題（例如：比分、判罰、或玩家名稱）

        for (let r = nameRowIdx + 1; r < data.length; r++) {
            if (!data[r]) continue;
            let colLeft = data[r][block.startCol] ? data[r][block.startCol].trim() : "";
            if (!colLeft) continue;

            if (statLabels.includes(colLeft)) continue;

            // 判斷是否為時間字串，同時這行通常也包含欄位標題（比分、判罰等）
            if (colLeft.includes("/") || colLeft.includes("PM") || colLeft.includes("AM") || colLeft.includes("下午") || colLeft.includes("上午") || colLeft.includes(":") || colLeft.includes("2026")) {
                currentMatchTime = colLeft;
                // 🌟 抓取這一橫排右側所有欄位的標題
                columnHeaders = {};
                for (let c = block.startCol + 1; c < nextBlockStart; c++) {
                    columnHeaders[c] = data[r][c] ? data[r][c].trim() : "";
                }
                continue;
            }

            if (colLeft.includes("vs")) {
                let score = "尚未開賽";
                let penalties = []; // { label: XX隊伍, value: 判罰內容 }
                const teams = colLeft.split(" vs ");

                for (let c = block.startCol + 1; c < nextBlockStart; c++) {
                    let cellVal = data[r][c] ? data[r][c].trim() : "";
                    if (cellVal && cellVal !== '-' && cellVal !== '') {
                        if (score === "尚未開賽") {
                            score = cellVal; // 第一個有效值為比分
                        } else {
                            // 🌟 取得上方對應的標題（例如「判罰」或玩家名字），若空白則預設為「判罰」
                            let index = c - (block.startCol + 2); 
                            let teamName = teams[index] ? teams[index] : "隊";
                            penalties.push({ label: teamName, value: cellVal });
                        }
                    }
                }

                matchFixturesMap[block.name].push({
                    subGroup: currentSubGroup,
                    time: currentMatchTime || "賽程時間未定",
                    fixture: colLeft,
                    score: score,
                    penalties: penalties
                });
            } else {
                currentSubGroup = colLeft;
                currentMatchTime = "";
                columnHeaders = {}; // 切換群組時重設
            }
        }
    });

    state.rawData = rawData;
    state.tournamentPlayers = tourPlayersMap;
    state.matchFixtures = matchFixturesMap;
    state.players = Array.from(parsedPlayers.values());

    if(state.players.length === 0) {
        const errEl = document.getElementById('loading-text');
        errEl.classList.remove('hidden');
        errEl.innerText = "無法解析資料：找不到橫向排列的「姓名」欄位，請確認 CSV 格式。";
        return;
    }

    if (isManualSync) {
        const icon = document.getElementById('sync-icon');
        icon.classList.remove('animate-spin');

        if (curView === 'sections' && edObj) {
            navigateTo('sections', edObj);
        } else if (curView === 'tournament' && tourName) {
            let matchedTour = state.tournaments.find(t => t.name === tourName);
            if (matchedTour) navigateTo('tournament', matchedTour);
            else navigateTo('sections', { id: 'edition-1', name: '第一屆BD盃足球大賽' });
        } else if (curView === 'player' && playerName) {
            let matchedPlayer = state.players.find(p => p.name === playerName);
            if (matchedPlayer) {
                navigateTo('player', matchedPlayer);
                if (activeTab) state.playerActiveTab = activeTab;
                renderPlayerDashboard();
            } else {
                navigateTo('editions');
            }
        } else {
            navigateTo('editions');
        }
    } else {
        renderViews();
    }
}

window.navigateTo = function(viewName, data = null, pushHistory = true) {
    window.appState.currentView = viewName;
    
    // 🌟 處理瀏覽器歷史紀錄 (History API)
    if (pushHistory) {
        let stateObj = { viewName, dataId: data ? data.id : null };
        let title = "BD盃賽事系統";
        let url = `#${viewName}`;
        if (viewName === 'sections' && data) {
            url = `#section-${data.id}`;
        } else if (viewName === 'tournament' && data) {
            url = `#tournament-${data.name}`;
        } else if (viewName === 'player' && data) {
            url = `#player-${data.name}`;
        }
        history.pushState(stateObj, title, url);
    }

    if (viewName === 'editions') {
        window.appState.selectedEdition = null;
        window.appState.selectedTournament = null;
        window.appState.selectedPlayer = null;
        renderViews();
    } else if (viewName === 'sections') {
        window.appState.selectedEdition = data;
        window.appState.selectedTournament = null;
        window.appState.selectedPlayer = null;
        
        window.appState.tournaments = [];
        window.appState.players = [];
        window.appState.rawData = {};
        window.appState.matchFixtures = {};
        
        views.loading.classList.remove('hidden');
        Object.values(views).forEach(v => {
            if (v !== views.loading) v.classList.add('hidden');
        });
        document.getElementById('loading-text').innerText = `正在載入 ${data.name} 數據...`;

        loadEditionData(data, null);
    } else if (viewName === 'tournament') {
        window.appState.selectedTournament = data;
        window.appState.selectedPlayer = null;
        renderViews();
    } else if (viewName === 'player') {
        window.appState.selectedPlayer = data;
        window.appState.playerActiveTab = window.appState.selectedTournament 
            ? window.appState.selectedTournament.name 
            : window.appState.tournaments[0]?.name;
        renderViews();
    }
};

// 🌟 監聽瀏覽器的上一頁/下一頁按鈕
window.addEventListener('popstate', function(event) {
    const state = event.state;
    if (state && state.viewName) {
        if (state.viewName === 'editions') {
            window.navigateTo('editions', null, false);
        } else if (state.viewName === 'sections' && state.dataId) {
            let edition = window.appState.editions.find(e => e.id === state.dataId);
            if (edition) window.navigateTo('sections', edition, false);
        } else {
            window.navigateTo('editions', null, false);
        }
    } else {
        window.navigateTo('editions', null, false);
    }
});

function renderViews() {
    views.loading.classList.add('hidden');
    Object.values(views).forEach(v => {
        if(v !== views.loading) v.classList.add('hidden');
    });

    const state = window.appState;

    if (state.currentView === 'editions') {
        views.editions.classList.remove('hidden');
        renderEditions();
    } else if (state.currentView === 'sections') {
        views.sections.classList.remove('hidden');
        renderSections();
    } else if (state.currentView === 'tournament' && state.selectedTournament) {
        views.tournament.classList.remove('hidden');
        renderTournament();
    } else if (state.currentView === 'player' && state.selectedPlayer) {
        views.player.classList.remove('hidden');
        renderPlayerDashboard();
    }
}

function renderNavbarEditions() {
    const count = window.appState.editions.length;
    const dropdownContainer = document.getElementById('nav-edition-dropdown');
    dropdownContainer.innerHTML = '';

    window.appState.editions.forEach(edition => {
        const item = document.createElement('div');
        item.className = "px-3 py-2 rounded-xl text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors flex items-center justify-between";
        item.innerHTML = `
            <span>🏆 ${edition.name}</span>
            <span class="text-xs text-slate-400">進入 ➔</span>
        `;
        item.onclick = () => {
            navigateTo('sections', edition);
        };
        dropdownContainer.appendChild(item);
    });
}

function renderEditions() {
    renderNavbarEditions();
    const list = document.getElementById('edition-list');
    list.innerHTML = '';
    
    window.appState.editions.forEach(edition => {
        const card = document.createElement('div');
        card.className = "bg-white p-6 rounded-2xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-md transition-shadow group";
        
        card.innerHTML = `
            <div class="h-40 rounded-xl bg-cover bg-center mb-4 relative overflow-hidden flex items-end p-4 shadow-sm" style="background-image: url('${edition.bgImage || ''}');">
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <h3 class="text-xl font-bold text-white relative z-10">⚽${edition.name}</h3>
            </div>
            <p class="text-slate-500 text-sm px-1">點擊進入查看各賽制與排行榜</p>
        `;
        card.onclick = () => navigateTo('sections', edition);
        list.appendChild(card);
    });
}

function renderSections() {
    const edition = window.appState.selectedEdition;
    document.getElementById('current-edition-title').innerText = `🏆 ${edition.name}`;
    
    // 動態填入該屆專屬的規則說明
    const rulesContainer = document.getElementById('edition-rules-content');
    if (rulesContainer) {
        rulesContainer.innerHTML = edition.rules || '<p>目前尚無此屆的規則說明。</p>';
    }

    const list = document.getElementById('section-list');
    list.innerHTML = '';
    
    window.appState.tournaments.forEach(tour => {
        const card = document.createElement('div');
        card.className = "bg-white p-6 rounded-2xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-md transition-shadow group";
        const playerCount = window.appState.tournamentPlayers[tour.id]?.length || 0;
        
        // <div class="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">📊</div>
        card.innerHTML = `
            <h3 class="text-xl font-bold text-slate-800 mb-2">${tour.name}</h3>
            <p class="text-slate-500 text-sm">參賽選手：${playerCount} 人</p>
        `;
        card.onclick = () => navigateTo('tournament', tour);
        list.appendChild(card);
    });
}

function renderTournament() {
    const tour = window.appState.selectedTournament;
    document.getElementById('current-tournament-title').innerText = tour.name;
    
    // 1. 獨立渲染上方：該系列賽專屬的對戰與比分紀錄
    const fixturesContainer = document.getElementById('tournament-fixtures-container');
    fixturesContainer.innerHTML = '';

    let fixtures = window.appState.matchFixtures[tour.name] || [];
    if (fixtures.length > 0) {
        let groupMap = {};
        fixtures.forEach(match => {
            if (!groupMap[match.subGroup]) groupMap[match.subGroup] = [];
            groupMap[match.subGroup].push(match);
        });

        const fixturesSection = document.createElement('div');
        fixturesSection.className = "mb-8 pb-6 border-b border-slate-200";
        
        let fixturesHtml = `
            <h3 class="text-xl font-black text-slate-800 mb-4 flex items-center gap-2">⚽ 賽事對戰與比分紀錄</h3>
        `;

        for (let [groupName, matches] of Object.entries(groupMap)) {
            fixturesHtml += `
                <div class="mb-5 bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-xs">
                    <h4 class="text-base font-bold text-blue-900 mb-3 flex items-center gap-2 border-b border-slate-200 pb-2">📌 ${groupName}</h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            `;
            matches.forEach(match => {
                let matchScoreDisplay = match.score;
                if (match.score && match.score.includes(":")) {
                    let sides = match.score.split(":").map(s => s.trim());
                    if (sides.length === 2) {
                        let parseSide = (str) => {
                            let m = str.match(/(\d+)(?:\s*\((\d+)\))?/);
                            if (!m) return { main: 0, pen: null };
                            return {
                                main: parseInt(m[1]),
                                pen: m[2] !== undefined ? parseInt(m[2]) : null
                            };
                        };
                        let left = parseSide(sides[0]);
                        let right = parseSide(sides[1]);
                        let leftWins = false, rightWins = false;

                        // 比較正規比分，若平手則比較括號內的加時/PK分數
                        if (left.main > right.main) {
                            leftWins = true;
                        } else if (right.main > left.main) {
                            rightWins = true;
                        } else if (left.pen !== null && right.pen !== null) {
                            if (left.pen > right.pen) leftWins = true;
                            else if (right.pen > left.pen) rightWins = true;
                        }

                        let leftClass = leftWins ? 'text-emerald-400 font-black' : 'text-slate-700';
                        let rightClass = rightWins ? 'text-emerald-400 font-black' : 'text-slate-700';
                        matchScoreDisplay = `<span class="${leftClass}">${sides[0]}</span> : <span class="${rightClass}">${sides[1]}</span>`;
                    }
                }
                // 🌟 組合判罰訊息的 HTML 標籤
                let penaltiesHtml = '';
                if (match.penalties && match.penalties.length > 0) {
                    penaltiesHtml = `<div class="mt-2 flex flex-wrap gap-1.5">`;
                    match.penalties.forEach(pen => {
                        penaltiesHtml += `<span class="text-xs bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded-md font-bold">⚠️ ${pen.label}隊判罰：${pen.value}</span>`;
                    });
                    penaltiesHtml += `</div>`;
                }
                fixturesHtml += `
                    <div class="bg-white border border-slate-200 rounded-xl p-4 flex justify-between items-start gap-4 shadow-xs">
                        <!-- 左側：賽程名稱與判罰 (增加 flex-grow 讓它自動擴展) -->
                        <div class="flex-grow">
                            <span class="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">${match.time}</span>
                            <p class="text-base font-bold text-slate-800 mt-2">${match.fixture}</p>
                            ${penaltiesHtml}
                        </div>
                        
                        <!-- 右側：比分 (增加 flex-shrink-0 確保比分盒不會被壓扁) -->
                        <div class="text-right flex-shrink-0">
                            <span class="text-xs text-slate-400 block mb-1">比分結果</span>
                            <span class="text-lg font-black text-slate-700 bg-slate-50 border border-slate-200 px-3 py-1 rounded-lg block ">${matchScoreDisplay}</span>
                        </div>
                    </div>
                `;
            });
            fixturesHtml += `</div></div>`;
        }
        fixturesSection.innerHTML = fixturesHtml;
        fixturesContainer.appendChild(fixturesSection);
    }

    // 2. 獨立渲染下方：該系列賽的選手積分與數據排行榜
    const tbody = document.getElementById('player-list-body');
    tbody.innerHTML = '';

    const theadTr = document.querySelector('#view-tournament thead tr');
    let pNames = window.appState.tournamentPlayers[tour.id] || [];

    // ⭐️ 判斷如果是「最終排名」頁面
    if (tour.name.includes("最終排名")) {
        // 設定排名專屬的表格標題
        theadTr.innerHTML = `
            <th scope="col" class="px-6 py-4 text-center text-yellow-600">最終排名</th>
            <th scope="col" class="px-6 py-4">選手名稱</th>
        `;

        let sortedPNames = [...pNames].sort((a, b) => {
            let dataA = window.appState.rawData[a][tour.name] || {};
            let dataB = window.appState.rawData[b][tour.name] || {};
            let rA = parseFloat(getVal(dataA, ['排名', '最終排名', 'Rank'], 999));
            let rB = parseFloat(getVal(dataB, ['排名', '最終排名', 'Rank'], 999));
            if (isNaN(rA)) rA = 999;
            if (isNaN(rB)) rB = 999;
            return rA - rB;
        });

        sortedPNames.forEach((pName, index) => {
            let pData = window.appState.rawData[pName][tour.name] || {};
            const tr = document.createElement('tr');
            tr.className = "hover:bg-slate-50 transition-colors";
            
            let rankVal = getVal(pData, ['排名', '最終排名', 'Rank'], '-');

            tr.innerHTML = `
                <td class="px-6 py-4 text-center font-black text-lg text-yellow-500">${rankVal}</td>
                <td class="px-6 py-4 font-bold text-slate-800 flex items-center gap-2">
                    <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-black">${pName.charAt(0)}</div>
                    ${pName}
                </td>
            `;
            tbody.appendChild(tr);
        });
    } else {
        // ⭐️ 一般賽事頁面：重設回標準的表格標題
        theadTr.innerHTML = `
            <th scope="col" class="px-6 py-4 text-center">編號</th>
            <th scope="col" class="px-6 py-4">選手名稱</th>
            <th scope="col" class="px-6 py-4 text-center">勝</th>
            <th scope="col" class="px-6 py-4 text-center">平</th>
            <th scope="col" class="px-6 py-4 text-center">負</th>
            <th scope="col" class="px-6 py-4 text-center text-blue-600">淨勝球</th>
        `;

        pNames.forEach((pName, index) => {
            let pData = window.appState.rawData[pName][tour.name] || {};
            let pObj = window.appState.players.find(p => p.name === pName);
    
            const tr = document.createElement('tr');
            tr.className = "hover:bg-slate-50 cursor-pointer transition-colors";
            tr.onclick = () => navigateTo('player', pObj);
            
            let rankVisual = `${index + 1}`;
    
            const W = getVal(pData, ['獲勝場次', '勝', 'W', 'Wins', '勝場'], '-');
            const D = getVal(pData, ['踢平場次', '平', '和', 'D', 'Draws', '平手', '平局'], '-');
            const L = getVal(pData, ['落敗場次', '負', '敗', 'L', 'Losses', '敗場'], '-');
            const GD = getVal(pData, ['賽事淨勝球', '淨勝球', 'GD', '淨勝球 (GD)'], '-');
            
            let gdClass = 'text-slate-400';
            let formattedGD = GD;
            if (GD !== '-') {
                const gdNum = parseFloat(GD);
                gdClass = gdNum > 0 ? 'text-emerald-500' : (gdNum < 0 ? 'text-red-500' : 'text-slate-400');
                formattedGD = (gdNum > 0 && !GD.toString().startsWith('+')) ? '+' + GD : GD;
            }
            
            tr.innerHTML = `
                <td class="px-6 py-4 text-center font-bold text-slate-500">${rankVisual}</td>
                <td class="px-6 py-4 font-bold text-slate-800 flex items-center gap-2">
                    <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-black">${pName.charAt(0)}</div>
                    ${pName}
                </td>
                <td class="px-6 py-4 text-center">${W}</td>
                <td class="px-6 py-4 text-center">${D}</td>
                <td class="px-6 py-4 text-center">${L}</td>
                <td class="px-6 py-4 text-center font-bold ${gdClass}">${formattedGD}</td>
            `;
            tbody.appendChild(tr);
        });
        
        if(pNames.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" class="px-6 py-8 text-center text-slate-400">目前尚無選手資料。</td></tr>`;
        }
    }
}

function renderPlayerDashboard() {
    const p = window.appState.selectedPlayer;
    document.getElementById('player-view-name').innerText = p.name;

    const tabsContainer = document.getElementById('player-tabs');
    tabsContainer.innerHTML = '';
    
    window.appState.tournaments.forEach(tour => {
        const isActive = (window.appState.playerActiveTab === tour.name);
        const btn = document.createElement('button');
        btn.className = `px-5 py-2 font-bold rounded-full text-sm transition-all shadow-sm border whitespace-nowrap outline-none ${
            isActive ? 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-300 ring-offset-1' 
                     : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
        }`;
        btn.innerText = tour.name;
        btn.onclick = () => {
            window.appState.playerActiveTab = tour.name;
            renderPlayerDashboard();
        };
        tabsContainer.appendChild(btn);
    });

    const activeTourName = window.appState.playerActiveTab;
    document.getElementById('player-view-tournament-name').innerText = activeTourName;

    const pData = window.appState.rawData[p.name][activeTourName] || {};

    const W = getVal(pData, ['獲勝場次', '勝', 'W', 'Wins', '勝場'], '-');
    const D = getVal(pData, ['踢平場次', '平', '和', 'D', 'Draws', '平手', '平局'], '-');
    const L = getVal(pData, ['落敗場次', '負', '敗', 'L', 'Losses', '敗場'], '-');
    const GF = getVal(pData, ['賽事總進球', '進球', '得球', 'GF', 'Goals For', '進'], '-');
    const GA = getVal(pData, ['賽事總失球', '失球', 'GA', 'Goals Against', '失'], '-');

    const totalMatches = getVal(pData, ['總場次', '場次', 'Matches'], '-');
    const gd = getVal(pData, ['賽事淨勝球', '淨勝球', 'GD', '淨勝球 (GD)'], '-');

    const winRate = getVal(pData, ['勝率', '勝率 (Win %)', 'Win%'], '-');
    const unbeatenRate = getVal(pData, ['不敗率', '不敗率 (Unbeaten)'], '-');
    
    const gpg = getVal(pData, ['場均進球'], '-');
    const gapg = getVal(pData, ['場均失球'], '-');
    const gdRate = getVal(pData, ['賽事淨勝球率', '淨勝球率'], '-');

    const goalRatio = getVal(pData, ['得失球比'], '-');

    document.getElementById('out-matches').innerText = totalMatches;
    document.getElementById('out-record').innerText = (W === '-' && D === '-' && L === '-') ? '-' : `${W}-${D}-${L}`;
    
    const gdEl = document.getElementById('out-gd');
    if (gd === '-') {
        gdEl.innerText = '-';
        gdEl.className = 'text-2xl font-black text-slate-300';
    } else {
        const gdNum = parseFloat(gd);
        gdEl.innerText = (gdNum > 0 && !gd.toString().startsWith('+')) ? '+' + gd : gd;
        gdEl.className = `text-2xl font-black ${gdNum > 0 ? 'text-emerald-400' : (gdNum < 0 ? 'text-red-400' : 'text-slate-300')}`;
    }

    document.getElementById('out-winrate').innerText = winRate;
    document.getElementById('out-unbeaten').innerText = unbeatenRate;

    document.getElementById('out-total-gf').innerText = GF;
    document.getElementById('out-total-ga').innerText = GA;
    document.getElementById('out-gpg').innerText = gpg;
    document.getElementById('out-gapg').innerText = gapg;
    
    const gdRateEl = document.getElementById('out-gdrate');
    if (gdRate === '-') {
        gdRateEl.innerText = '-';
        gdRateEl.className = 'text-2xl font-black text-slate-400';
    } else {
        const gdRateNum = parseFloat(gdRate);
        gdRateEl.innerText = (gdRateNum > 0 && !gdRate.toString().startsWith('+')) ? '+' + gdRate : gdRate;
        gdRateEl.className = `text-2xl font-black ${gdRateNum > 0 ? 'text-emerald-500' : (gdRateNum < 0 ? 'text-red-500' : 'text-slate-400')}`;
    }

    document.getElementById('out-goalratio').innerText = goalRatio;
    // document.getElementById('out-ptspergoal').innerText = ptsPerGoal;
    document.getElementById('out-gaperpt').innerText = gaPerPt;
}

window.addEventListener('DOMContentLoaded', initApp);