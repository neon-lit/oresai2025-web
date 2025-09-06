// タイムテーブルデータ
const timetableData = {
    day1: {
        musicRoom: [
            { time: "10:14", band: "エーデルワイス" },
            { time: "10:28", band: "peony" },
            { time: "10:42", band: "社会不適ROSA" },
            { time: "10:51", band: "ルミナージュ" },
            { time: "11:01", band: "Chanoir" },
            { time: "11:10", band: "Pneuma" },
            { time: "11:26", band: "owl" },
            { time: "11:36", band: "消費期限" },
            { time: "11:47", band: "REVE" },
            { time: "11:58", band: "Toxic Tune" },
            { time: "12:07", band: "インクブルー" },
            { time: "12:16", band: "TheSETS" },
            { time: "13:53", band: "Emz." },
            { time: "14:09", band: "first.PENGUINS" },
            { time: "14:20", band: "（空き時間）" },
            { time: "14:29", band: "CELESTLIVE" },
            { time: "14:45", band: "juicy" },
            { time: "14:54", band: "UNIVE" },
            { time: "15:04", band: "Vibes" },
            { time: "15:20", band: "Alstroemeria" }
        ],
        gymnasium: [
            { time: "10:30", band: "umbrain" },
            { time: "10:55", band: "世にも奇妙なバンド" },
            { time: "11:15", band: "juicy" },
            { time: "11:40", band: "Aperon" },
            { time: "12:05", band: "Celestial Penguins" },
            { time: "12:29", band: "るなべる。" },
            { time: "12:42", band: "あぷりこっと" },
            { time: "12:55", band: "消費期限" },
            { time: "13:11", band: "reversible" },
            { time: "13:27", band: "（空き時間）" }
        ]
    },
    day2: {
        musicRoom: [
            { time: "09:19", band: "Chilvania" },
            { time: "09:28", band: "MISS:TEEN" },
            { time: "09:44", band: "るなべる。" },
            { time: "10:00", band: "reversible" },
            { time: "10:16", band: "Fortuna" },
            { time: "10:29", band: "lapislazuli" },
            { time: "10:42", band: "GREENERYTHEATER" },
            { time: "10:52", band: "BeaTEEN" },
            { time: "11:08", band: ".exe" },
            { time: "11:24", band: "あぷりこっと" },
            { time: "11:33", band: "with" },
            { time: "11:49", band: "honey bunny" },
            { time: "12:02", band: "Ast." },
            { time: "12:12", band: "VIVACE" },
            { time: "12:28", band: "Chanoir" },
            { time: "12:37", band: "デリカシー咀嚼" },
            { time: "12:47", band: "berry jam" },
            { time: "12:58", band: "Luminous" },
            { time: "14:10", band: "SOAR" },
            { time: "14:22", band: "ALCHU" },
            { time: "14:37", band: "Emperor" },
            { time: "14:47", band: "あくびまじり。" },
            { time: "14:58", band: "LuNA" }
        ],
        gymnasium: [
            { time: "12:45", band: "BRASS ROCK" },
            { time: "13:11", band: "with" },
            { time: "13:27", band: "TheSETS" },
            { time: "13:40", band: "GREENERYTHEATER" },
            { time: "14:05", band: "CELESTE LIVE" },
            { time: "14:35", band: "QUAL!A" },
            { time: "15:10", band: "RE:バロック" },
            { time: "16:00", band: "reversible" },
            { time: "16:09", band: "with" },
            { time: "16:18", band: "GREENERYTHEATER" },
            { time: "16:27", band: "CELESTE LIVE" }
        ]
    }
};

// 現在時刻を取得して時間を比較する関数
function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

// 時間文字列を分に変換
function timeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
}

// 現在演奏中のバンドを取得
function getCurrentBand(performances) {
    const currentTime = timeToMinutes(getCurrentTime());
    
    for (let i = 0; i < performances.length; i++) {
        const performance = performances[i];
        if (performance.band === "（空き時間）") continue;
        
        const startTime = timeToMinutes(performance.time);
        const endTime = i < performances.length - 1 ? 
            timeToMinutes(performances[i + 1].time) : 
            startTime + 15; // 最後の場合は15分間と仮定
        
        if (currentTime >= startTime && currentTime < endTime) {
            return {
                band: performance.band,
                time: performance.time,
                endTime: endTime
            };
        }
    }
    
    return null;
}

// タイムテーブルを表示
function renderTimetable(day) {
    const data = timetableData[day];
    
    // 音楽室のタイムテーブル
    renderVenueTimeline(`music-room-${day}`, data.musicRoom);
    
    // 体育館のタイムテーブル
    renderVenueTimeline(`gymnasium-${day}`, data.gymnasium);
}

// 会場のタイムラインを描画
function renderVenueTimeline(containerId, performances) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    // タイムラインコンテナを作成
    const timelineContainer = document.createElement('div');
    timelineContainer.className = 'timeline-container';
    
    // タイムラインを作成
    const timelineLine = document.createElement('div');
    timelineLine.className = 'timeline-line';
    timelineContainer.appendChild(timelineLine);
    
    // 各パフォーマンスをタイムライン上に配置
    performances.forEach((performance, index) => {
        const topPosition = calculateTimelinePosition(performance.time, performances);
        
        // タイムマーカーを作成
        const marker = document.createElement('div');
        marker.className = 'timeline-marker';
        marker.style.top = `${topPosition}px`;
        timelineContainer.appendChild(marker);
        
        // 時刻ラベルを作成
        const timeLabel = document.createElement('div');
        timeLabel.className = 'time-label';
        timeLabel.style.top = `${topPosition - 10}px`;
        timeLabel.textContent = performance.time;
        timelineContainer.appendChild(timeLabel);
        
        // パフォーマンス情報を作成
        const performanceDiv = document.createElement('div');
        performanceDiv.className = 'performance';
        performanceDiv.style.top = `${topPosition - 15}px`;
        performanceDiv.innerHTML = `
            <div class="performance-time">${performance.time}</div>
            <a href="https://instagram.com/k_on.bu_" target="_blank" class="performance-band">${performance.band}</a>
        `;
        timelineContainer.appendChild(performanceDiv);
    });
    
    container.appendChild(timelineContainer);
}

// タイムライン上の位置を計算
function calculateTimelinePosition(timeStr, performances) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    
    // 最初と最後の時刻を取得
    const firstTime = performances[0].time.split(':').map(Number);
    const lastTime = performances[performances.length - 1].time.split(':').map(Number);
    const firstTotalMinutes = firstTime[0] * 60 + firstTime[1];
    const lastTotalMinutes = lastTime[0] * 60 + lastTime[1];
    
    // タイムラインの高さ（400px - 40px padding）
    const timelineHeight = 360;
    
    // 位置を計算（最初の時刻を0、最後の時刻を最大高さとする）
    const position = ((totalMinutes - firstTotalMinutes) / (lastTotalMinutes - firstTotalMinutes)) * timelineHeight;
    
    return Math.max(20, Math.min(timelineHeight - 20, position + 20));
}

// 現在演奏中のバンドを更新
function updateCurrentBands() {
    const currentTime = getCurrentTime();
    const currentDate = new Date();
    const isDay1 = currentDate.getMonth() === 8 && currentDate.getDate() === 20; // 9月20日
    const isDay2 = currentDate.getMonth() === 8 && currentDate.getDate() === 21; // 9月21日
    
    let currentDay = null;
    if (isDay1) currentDay = 'day1';
    else if (isDay2) currentDay = 'day2';
    
    if (currentDay) {
        const data = timetableData[currentDay];
        
        // 音楽室の現在のバンド
        const musicRoomCurrent = getCurrentBand(data.musicRoom);
        if (musicRoomCurrent) {
            document.getElementById('current-music-room').textContent = musicRoomCurrent.band;
            document.getElementById('current-music-room-time').textContent = 
                `${musicRoomCurrent.time} - ${Math.floor(musicRoomCurrent.endTime / 60).toString().padStart(2, '0')}:${(musicRoomCurrent.endTime % 60).toString().padStart(2, '0')}`;
        } else {
            document.getElementById('current-music-room').textContent = '休憩中';
            document.getElementById('current-music-room-time').textContent = '';
        }
        
        // 体育館の現在のバンド
        const gymnasiumCurrent = getCurrentBand(data.gymnasium);
        if (gymnasiumCurrent) {
            document.getElementById('current-gymnasium').textContent = gymnasiumCurrent.band;
            document.getElementById('current-gymnasium-time').textContent = 
                `${gymnasiumCurrent.time} - ${Math.floor(gymnasiumCurrent.endTime / 60).toString().padStart(2, '0')}:${(gymnasiumCurrent.endTime % 60).toString().padStart(2, '0')}`;
        } else {
            document.getElementById('current-gymnasium').textContent = '休憩中';
            document.getElementById('current-gymnasium-time').textContent = '';
        }
        
        // タイムラインの現在のバンドをハイライト
        highlightCurrentPerformances(currentDay, data);
    } else {
        document.getElementById('current-music-room').textContent = '開催日外';
        document.getElementById('current-music-room-time').textContent = '';
        document.getElementById('current-gymnasium').textContent = '開催日外';
        document.getElementById('current-gymnasium-time').textContent = '';
    }
}

// 現在演奏中のパフォーマンスをハイライト
function highlightCurrentPerformances(day, data) {
    // 音楽室の現在のバンド
    const musicRoomCurrent = getCurrentBand(data.musicRoom);
    const musicRoomMarkers = document.querySelectorAll(`#music-room-${day} .timeline-marker`);
    const musicRoomPerformances = document.querySelectorAll(`#music-room-${day} .performance`);
    
    musicRoomMarkers.forEach((marker, index) => {
        marker.classList.remove('current');
        if (musicRoomPerformances[index]) {
            musicRoomPerformances[index].classList.remove('current');
        }
    });
    
    if (musicRoomCurrent) {
        const currentIndex = data.musicRoom.findIndex(p => p.time === musicRoomCurrent.time);
        if (currentIndex >= 0 && musicRoomMarkers[currentIndex]) {
            musicRoomMarkers[currentIndex].classList.add('current');
            musicRoomPerformances[currentIndex].classList.add('current');
        }
    }
    
    // 体育館の現在のバンド
    const gymnasiumCurrent = getCurrentBand(data.gymnasium);
    const gymnasiumMarkers = document.querySelectorAll(`#gymnasium-${day} .timeline-marker`);
    const gymnasiumPerformances = document.querySelectorAll(`#gymnasium-${day} .performance`);
    
    gymnasiumMarkers.forEach((marker, index) => {
        marker.classList.remove('current');
        if (gymnasiumPerformances[index]) {
            gymnasiumPerformances[index].classList.remove('current');
        }
    });
    
    if (gymnasiumCurrent) {
        const currentIndex = data.gymnasium.findIndex(p => p.time === gymnasiumCurrent.time);
        if (currentIndex >= 0 && gymnasiumMarkers[currentIndex]) {
            gymnasiumMarkers[currentIndex].classList.add('current');
            gymnasiumPerformances[currentIndex].classList.add('current');
        }
    }
}

// 日付切り替え
function showDay(day) {
    // ボタンのアクティブ状態を更新
    document.querySelectorAll('.day-button').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // コンテンツの表示を切り替え
    document.querySelectorAll('.timetable-content').forEach(content => content.classList.remove('active'));
    document.getElementById(day).classList.add('active');
}

// 初期化
function init() {
    renderTimetable('day1');
    renderTimetable('day2');
    updateCurrentBands();
    
    // 1分ごとに現在のバンドを更新
    setInterval(updateCurrentBands, 60000);
}

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', init);
