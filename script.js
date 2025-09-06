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
    const musicRoomContainer = document.getElementById(`music-room-${day}`);
    musicRoomContainer.innerHTML = '';
    
    data.musicRoom.forEach((performance, index) => {
        const div = document.createElement('div');
        div.className = 'performance';
        div.innerHTML = `
            <span class="performance-time">${performance.time}</span>
            <span class="performance-band">${performance.band}</span>
        `;
        musicRoomContainer.appendChild(div);
    });
    
    // 体育館のタイムテーブル
    const gymnasiumContainer = document.getElementById(`gymnasium-${day}`);
    gymnasiumContainer.innerHTML = '';
    
    data.gymnasium.forEach((performance, index) => {
        const div = document.createElement('div');
        div.className = 'performance';
        div.innerHTML = `
            <span class="performance-time">${performance.time}</span>
            <span class="performance-band">${performance.band}</span>
        `;
        gymnasiumContainer.appendChild(div);
    });
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
    } else {
        document.getElementById('current-music-room').textContent = '開催日外';
        document.getElementById('current-music-room-time').textContent = '';
        document.getElementById('current-gymnasium').textContent = '開催日外';
        document.getElementById('current-gymnasium-time').textContent = '';
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
