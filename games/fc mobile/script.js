window.appState = {
    currentView: 'editions', 
    editions: [
        {
            id: 'edition-1',
            name: '第一屆長榮盃足球大賽',
            rules: `
            <p>1. <strong>小組循環賽（無加時、無12碼）</strong>：6人隨機分成2組，1組3人，進行循環賽。以3個人為例，即A vs B、B vs C、A vs C。勝者得3分積分、平手各得1分積分、落敗無積分。</p>
            <p>1-1. <strong>小組循環賽積分規則</strong>：每組取2個人進入淘汰賽。若積分相同則以淨勝球決定晉級者。若淨勝球相同則以進球數決定晉級者。若進球數相同則以黃紅牌決定晉級者；黃牌扣1分、黃+黃扣3分；紅扣4分；黃+紅扣5分。若黃紅牌扣點相同則以抽籤決定晉級者。</p>
            <p>2. <strong>淘汰賽（有加時、有12碼）</strong>：4人隨機分組，淘汰賽制。半決賽BO3、決賽BO5。</p>
            <p>3. <strong>其他規則</strong>：若被罰下則下一場禁賽。一球員被黃牌總計兩次則下一場禁賽，若一球員被黃牌但下一場比賽無獲得黃牌，則黃牌計數-1，意即同一角色連續兩場被罰黃牌則觸發禁賽機制，禁賽對象為角色人名。</p>
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

const SPREADSHEET_ID = '1QhxShxPc72Ge5Vg71qHJKubrizfJ4-D_m3truE1s_Oc';
const BASE_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ_7xh2REb9TXEVDMy8RBiHES8Yz2YpN-qJy_a-HC1RRgK-yS2VrGgp1jg0o7ppb9Uu72OHVdd0PzWl/pub?gid=1007921436&single=true&output=csv';

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
const breadcrumbs = document.getElementById('breadcrumbs');

function initApp() {
    fetchAndProcessData(false);
}

function fetchAndProcessData(isManualSync = false) {
    const errEl = document.getElementById('loading-text');
    if (!isManualSync) {
        errEl.innerText = "載入中，請稍候...";
    }

    const csvUrl = BASE_CSV_URL + '&t=' + new Date().getTime();

    Papa.parse(csvUrl, {
        download: true,
        header: false,
        skipEmptyLines: false,
        complete: function(results) {
            processData(results.data, isManualSync);
        },
        error: function(err) {
            if (!isManualSync) {
                errEl.classList.remove('text-blue-500');
                errEl.classList.add('text-red-500');
                errEl.innerText = "讀取線上資料失敗：" + err + "。請確認網路連線。";
            } else {
                alert("同步失敗：" + err);
            }
        }
    });
}

function manualSyncData() {
    const icon = document.getElementById('sync-icon');
    icon.classList.add('animate-spin');
    fetchAndProcessData(true);
}

function processData(data, isManualSync = false) {
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
        "總場次", "獲勝場次", "勝", "踢平場次", "平", "落敗場次", "負", 
        "勝率", "不敗率", "賽事總進球", "賽事總失球", "賽事淨勝球", 
        "場均進球", "場均失球", "賽事淨勝球率", "得失球比", "積分", 
        "進球轉化積分率", "防守容錯率"
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
        for (let r = nameRowIdx + 1; r < data.length; r++) {
            if (!data[r]) continue;
            let colLeft = data[r][block.startCol] ? data[r][block.startCol].trim() : "";
            if (!colLeft) continue;

            if (statLabels.includes(colLeft)) continue;

            // 判斷是否為時間字串，若是則記錄為當前賽程時間，不覆蓋分組標題
            if (colLeft.includes("/") || colLeft.includes("PM") || colLeft.includes("AM") || colLeft.includes("下午") || colLeft.includes("上午") || colLeft.includes(":") || colLeft.includes("2026")) {
                currentMatchTime = colLeft;
                continue;
            }

            if (colLeft.includes("vs")) {
                let score = "尚未開賽";
                for (let c = block.startCol + 1; c < nextBlockStart; c++) {
                    let cellVal = data[r][c] ? data[r][c].trim() : "";
                    if (cellVal && cellVal !== '-' && cellVal !== '' && !cellVal.toLowerCase().includes('vs')) {
                        score = cellVal;
                        break;
                    }
                }

                matchFixturesMap[block.name].push({
                    subGroup: currentSubGroup,
                    time: currentMatchTime || "賽程時間未定",
                    fixture: colLeft,
                    score: score
                });
            } else {
                // 正確對應試算表中的標題行（例如「小組循環賽 A組」、「淘汰賽」、「銅牌戰」、「總決賽」）
                currentSubGroup = colLeft;
                currentMatchTime = ""; // 切換群組時重設時間
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
            else navigateTo('sections', { id: 'edition-1', name: '第一屆長榮盃足球大賽' });
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

window.navigateTo = function(viewName, data = null) {
    window.appState.currentView = viewName;
    
    if (viewName === 'editions') {
        window.appState.selectedEdition = null;
        window.appState.selectedTournament = null;
        window.appState.selectedPlayer = null;
    } else if (viewName === 'sections') {
        window.appState.selectedEdition = data;
        window.appState.selectedTournament = null;
        window.appState.selectedPlayer = null;
    } else if (viewName === 'tournament') {
        window.appState.selectedTournament = data;
        window.appState.selectedPlayer = null;
    } else if (viewName === 'player') {
        window.appState.selectedPlayer = data;
        window.appState.playerActiveTab = window.appState.selectedTournament 
            ? window.appState.selectedTournament.name 
            : window.appState.tournaments[0]?.name;
    }
    
    renderViews();
};

function renderViews() {
    views.loading.classList.add('hidden');
    Object.values(views).forEach(v => {
        if(v !== views.loading) v.classList.add('hidden');
    });

    const state = window.appState;
    updateBreadcrumbs();

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

function updateBreadcrumbs() {
    const state = window.appState;
    let html = `<span class="cursor-pointer hover:text-white transition-colors" onclick="navigateTo('editions')">歷屆賽事</span>`;
    
    if (state.selectedEdition) {
        html += `<span class="mx-2">></span><span class="cursor-pointer hover:text-white transition-colors" onclick="navigateTo('sections', window.appState.selectedEdition)">${state.selectedEdition.name}</span>`;
    }
    if (state.selectedTournament) {
        html += `<span class="mx-2">></span><span class="cursor-pointer hover:text-white transition-colors" onclick="navigateTo('tournament', window.appState.selectedTournament)">${state.selectedTournament.name}</span>`;
    }
    if (state.selectedPlayer) {
        html += `<span class="mx-2">></span><span class="text-white font-bold">${state.selectedPlayer.name}</span>`;
    }
    breadcrumbs.innerHTML = html;
}

function renderEditions() {
    const list = document.getElementById('edition-list');
    list.innerHTML = '';
    
    window.appState.editions.forEach(edition => {
        const card = document.createElement('div');
        card.className = "bg-white p-6 rounded-2xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-md transition-shadow group";
        
        card.innerHTML = `
            <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">⚽</div>
            <h3 class="text-xl font-bold text-slate-800 mb-2">${edition.name}</h3>
            <p class="text-slate-500 text-sm">點擊進入查看各賽制與排行榜</p>
        `;
        card.onclick = () => navigateTo('sections', edition);
        list.appendChild(card);
    });
}

function renderSections() {
    const edition = window.appState.selectedEdition;
    document.getElementById('current-edition-title').innerText = `🏆 ${edition.name} - 賽事選單`;
    
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
                    let parts = match.score.split(":").map(s => parseInt(s.trim()));
                    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
                        let leftClass = parts[0] > parts[1] ? 'text-emerald-400 font-black' : 'text-slate-700';
                        let rightClass = parts[1] > parts[0] ? 'text-emerald-400 font-black' : 'text-slate-700';
                        matchScoreDisplay = `<span class="${leftClass}">${parts[0]}</span> : <span class="${rightClass}">${parts[1]}</span>`;
                    }
                }
                fixturesHtml += `
                    <div class="bg-white border border-slate-200 rounded-xl p-4 flex justify-between items-center shadow-xs">
                        <div>
                            <span class="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">${match.time}</span>
                            <p class="text-base font-bold text-slate-800 mt-2">${match.fixture}</p>
                        </div>
                        <div class="text-right">
                            <span class="text-xs text-slate-400 block mb-1">比分結果</span>
                            <span class="text-lg font-black text-slate-700 bg-slate-50 border border-slate-200 px-3 py-1 rounded-lg">${matchScoreDisplay}</span>
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
            <th scope="col" class="px-6 py-4 text-center text-yellow-600">積分</th>
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
            const Pts = getVal(pData, ['積分', 'Pts', '積分 (Pts)'], '-');
            
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
                <td class="px-6 py-4 text-center font-black text-lg text-yellow-500">${Pts}</td>
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
    const pts = getVal(pData, ['積分', 'Pts', '積分 (Pts)', '積分(Pts)'], '-');
    const gd = getVal(pData, ['賽事淨勝球', '淨勝球', 'GD', '淨勝球 (GD)'], '-');

    const winRate = getVal(pData, ['勝率', '勝率 (Win %)', 'Win%'], '-');
    const unbeatenRate = getVal(pData, ['不敗率', '不敗率 (Unbeaten)'], '-');
    
    const gpg = getVal(pData, ['場均進球'], '-');
    const gapg = getVal(pData, ['場均失球'], '-');
    const gdRate = getVal(pData, ['賽事淨勝球率', '淨勝球率'], '-');

    const goalRatio = getVal(pData, ['得失球比'], '-');
    const ptsPerGoal = getVal(pData, ['進球轉化積分率', '進球轉化率'], '-');
    const gaPerPt = getVal(pData, ['防守容錯率', '防守容錯'], '-');

    document.getElementById('out-matches').innerText = totalMatches;
    document.getElementById('out-record').innerText = (W === '-' && D === '-' && L === '-') ? '-' : `${W}-${D}-${L}`;
    document.getElementById('out-pts').innerText = pts;
    
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
    document.getElementById('out-ptspergoal').innerText = ptsPerGoal;
    document.getElementById('out-gaperpt').innerText = gaPerPt;
}

window.addEventListener('DOMContentLoaded', initApp);