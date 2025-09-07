/* =========================================================
   文化祭タイムテーブル（9:00–16:30を共通スケールに統一）
   - index.html の #music-room-day1 等の中身を自動生成
   - style.css の --px-per-minute を使って分→px に変換
   ========================================================= */

   (() => {
    /* ---------- 1) データ（演奏のみ。転換/セッティングは省略） ---------- */
    // start/end は HH:MM（24h）。必要ならここを編集するだけでOK
    const timetableData = {
      day1: {
        musicRoom: [
          { start: "10:14", end: "10:24", band: "エーデルワイス" },
          { start: "10:28", end: "10:38", band: "peony" },
          { start: "10:42", end: "10:47", band: "社会不適ROSA" },
          { start: "10:51", end: "10:57", band: "ルミナージュ" },
          { start: "11:01", end: "11:06", band: "Chanoir" },
          { start: "11:10", end: "11:22", band: "Pneuma" },
          { start: "11:26", end: "11:32", band: "owl" },
          { start: "11:36", end: "11:43", band: "消費期限" },
          { start: "11:47", end: "11:53", band: "REVE" },
          { start: "11:58", end: "12:03", band: "Toxic Tune" },
          { start: "12:07", end: "12:12", band: "インクブルー" },
          { start: "12:16", end: "12:22", band: "TheSETS" },
          { start: "13:53", end: "14:05", band: "Emz." },
          { start: "14:09", end: "14:16", band: "first.PENGUIN" },
          { start: "14:20", end: "14:25", band: "Φ" },
          { start: "14:29", end: "14:41", band: "CELESTELIVE" },
          { start: "14:45", end: "14:50", band: "juicy" },
          { start: "14:54", end: "15:00", band: "UNIVE" },
          { start: "15:04", end: "15:16", band: "Vibes" },
          { start: "15:20", end: "15:25", band: "Alstroemeria" },
        ],
        gymnasium: [
          { start: "10:30", end: "10:50", band: "umbrain" },
          { start: "10:55", end: "11:10", band: "世にも奇妙なバンド" },
          { start: "11:15", end: "11:35", band: "juicy" },
          { start: "11:40", end: "12:00", band: "Aperon" },
          { start: "12:05", end: "12:25", band: "Celestial Penguins" },
          { start: "12:29", end: "12:38", band: "るなべる。" },
          { start: "12:42", end: "12:51", band: "あぶりこっと" },
          { start: "12:55", end: "13:07", band: "消費期限" },
          { start: "13:11", end: "13:23", band: "reversible" },
          { start: "13:27", end: "13:39", band: "Φ" },
        ],
      },
      day2: {
        musicRoom: [
          { start: "09:19", end: "09:24", band: "Chilvania" },
          { start: "09:28", end: "09:40", band: "MISS:TEEN" },
          { start: "09:44", end: "09:56", band: "るなべる。" },
          { start: "10:00", end: "10:12", band: "reversible" },
          { start: "10:16", end: "10:25", band: "Fortuna" },
          { start: "10:29", end: "10:38", band: "lapislazuli" },
          { start: "10:42", end: "10:48", band: "GREENERYTHEATER" },
          { start: "10:52", end: "11:04", band: "BeaTEEN" },
          { start: "11:08", end: "11:15", band: ".exe" },
          { start: "11:24", end: "11:29", band: "あぶりこっと" },
          { start: "11:33", end: "11:45", band: "with" },
          { start: "11:49", end: "11:58", band: "honey bunny" },
          { start: "12:02", end: "12:08", band: "Ast." },
          { start: "12:12", end: "12:24", band: "VIVACE" },
          { start: "12:28", end: "12:33", band: "Chanoir" },
          { start: "12:37", end: "12:43", band: "デリカシー咀嚼" },
          { start: "12:47", end: "12:54", band: "berry jam" },
          { start: "12:58", end: "13:03", band: "Luminous" },
          { start: "14:10", end: "14:17", band: "SOAR" },
          { start: "14:22", end: "14:32", band: "ALCHU" },
          { start: "14:37", end: "14:42", band: "Emperor" },
          { start: "14:47", end: "14:53", band: "あくびまじり。" },
          { start: "14:58", end: "15:03", band: "LuNA" },
        ],
        gymnasium: [
          { start: "12:45", end: "13:05", band: "BRASS ROCK" },
          { start: "13:11", end: "13:23", band: "with" },
          { start: "13:27", end: "13:36", band: "TheSETS" },
          { start: "13:40", end: "13:52", band: "GREENERYTHEATER" },
          { start: "14:05", end: "14:30", band: "CELESTE LIVE" },
          { start: "14:35", end: "15:00", band: "QUAL!A" },
          { start: "15:10", end: "15:30", band: "RE:バロック" },
          { start: "16:00", end: "16:05", band: "reversible" },
          { start: "16:09", end: "16:14", band: "with" },
          { start: "16:18", end: "16:23", band: "GREENERYTHEATER" },
          // 共通スケールで 16:30 にクリップ
          { start: "16:27", end: "16:30", band: "CELESTELIVE" },
        ],
      },
    };
  
    /* ---------- 2) 共通ユーティリティ ---------- */
    const DAY_START_MIN = 9 * 60;        // 540 (9:00)
    const DAY_END_MIN   = 16 * 60 + 30;  // 990 (16:30)
  
    const timeToMinutes = (hhmm) => {
      const [h, m] = hhmm.split(':').map(Number);
      return h * 60 + m;
    };
    const clipToDay = (min) => Math.max(DAY_START_MIN, Math.min(min, DAY_END_MIN));
    const pxPerMinute = () => {
      const v = getComputedStyle(document.documentElement)
        .getPropertyValue('--px-per-minute').trim();
      return parseFloat(v || '5');
    };
    const yFromMinutes = (min) => (clipToDay(min) - DAY_START_MIN) * pxPerMinute();
  
    /* ---------- 3) タイムライン生成（容器＋補助線＋演奏枠） ---------- */
    const createTimelineContainer = () => {
      const el = document.createElement('div');
      el.className = 'timeline-container';
      el.style.height = ((DAY_END_MIN - DAY_START_MIN) * pxPerMinute()) + 'px';
  
      const line = document.createElement('div');
      line.className = 'timeline-line';
      el.appendChild(line);
  
      const marker = document.createElement('div');
      marker.className = 'timeline-marker';
      el.appendChild(marker);
  
      // 20分刻みでガイド線＆ラベル
      for (let m = DAY_START_MIN; m <= DAY_END_MIN; m += 20) {
        const y = yFromMinutes(m);
        const guide = document.createElement('div');
        Object.assign(guide.style, {
          position: 'absolute', left: 0, right: 0, top: `${y}px`,
          height: '1px', background: '#e6eef5', pointerEvents: 'none'
        });
        el.appendChild(guide);
  
        const label = document.createElement('div');
        const hh = String(Math.floor(m / 60)).padStart(2, '0');
        const mm = String(m % 60).padStart(2, '0');
        label.textContent = `${hh}:${mm}`;
        label.className = 'time-label';
        label.style.top = (y - 7) + 'px';
        el.appendChild(label);
      }
      return el;
    };
  
    // 1会場分を描画
    const renderVenueTimeline = (containerId, performances) => {
      const mount = document.getElementById(containerId);
      mount.innerHTML = '';
      const tl = createTimelineContainer();
      mount.appendChild(tl);
  
      performances.forEach(({ start, end, band }) => {
        const s = timeToMinutes(start);
        const e = timeToMinutes(end);
        const top = yFromMinutes(s);
        const height = Math.max((clipToDay(e) - clipToDay(s)) * pxPerMinute(), 28); // 最低高さ
  
        const item = document.createElement('div');
        item.className = 'performance';
        item.dataset.start = start;
        item.dataset.end = end;
        item.dataset.band = band;
        item.style.top = `${top}px`;
        item.style.height = `${height}px`;
  
        const t = document.createElement('div');
        t.className = 'performance-time';
        t.textContent = start;
  
        const a = document.createElement('a');
        a.className = 'performance-band';
        a.href = 'https://instagram.com/k_on.bu_';
        a.target = '_blank';
        a.textContent = band;
  
        item.appendChild(t);
        item.appendChild(a);
        tl.appendChild(item);
      });
  
      // 初回の現在時刻ラインを合わせる
      updateMarkerInContainer(tl);
    };
  
    /* ---------- 4) 現在演奏中の表示＆ハイライト ---------- */
    let activeDay = 'day1'; // デフォはday1。showDay()で更新
  
    const getCurrentBandFrom = (list, nowMin) =>
      list.find(({ start, end }) => nowMin >= timeToMinutes(start) && nowMin < timeToMinutes(end)) || null;
  
    const updateCurrentBands = () => {
      const now = new Date();
      const nowMin = now.getHours() * 60 + now.getMinutes();
  
      // 実日付が 9/20 or 9/21 のときは自動、違う日はタブ選択を優先
      const m = now.getMonth(); // 0-11
      const d = now.getDate();
      const dayKey = (m === 8 && d === 20) ? 'day1' : (m === 8 && d === 21) ? 'day2' : activeDay;
      const data = timetableData[dayKey];
  
      const mr = getCurrentBandFrom(data.musicRoom, nowMin);
      const gy = getCurrentBandFrom(data.gymnasium, nowMin);
  
      const setNow = (nameId, timeId, obj) => {
        const n = document.getElementById(nameId);
        const t = document.getElementById(timeId);
        if (!n || !t) return;
        if (obj) {
          n.textContent = obj.band;
          t.textContent = `${obj.start} - ${obj.end}`;
        } else {
          n.textContent = '休憩中';
          t.textContent = '';
        }
      };
      setNow('current-music-room', 'current-music-room-time', mr);
      setNow('current-gymnasium', 'current-gymnasium-time', gy);
  
      // 画面上のハイライト
      highlightCurrentInContainer(`music-room-${dayKey}`, nowMin);
      highlightCurrentInContainer(`gymnasium-${dayKey}`, nowMin);
    };
  
    const highlightCurrentInContainer = (containerId, nowMin) => {
      const container = document.getElementById(containerId);
      if (!container) return;
      container.querySelectorAll('.performance').forEach(el => {
        const s = timeToMinutes(el.dataset.start);
        const e = timeToMinutes(el.dataset.end);
        el.classList.toggle('current', nowMin >= s && nowMin < e);
      });
    };
  
    /* ---------- 5) 現在時刻ライン ---------- */
    const updateMarkerInContainer = (tl) => {
      const marker = tl.querySelector('.timeline-marker');
      if (!marker) return;
      const now = new Date();
      const nowMin = now.getHours() * 60 + now.getMinutes();
  
      if (nowMin < DAY_START_MIN || nowMin > DAY_END_MIN) {
        marker.classList.remove('current');
        marker.style.background = 'transparent';
        if (marker.firstElementChild) marker.firstElementChild.style.display = 'none';
        return;
      }
  
      const y = yFromMinutes(nowMin);
      marker.classList.add('current');
      marker.style.top = '0';
      marker.style.bottom = '0';
      marker.style.background = 'var(--current)';
  
      let dot = marker.querySelector('[data-dot]');
      if (!dot) {
        dot = document.createElement('div');
        dot.setAttribute('data-dot','');
        Object.assign(dot.style, {
          position:'absolute', left:'50%', transform:'translate(-50%,0)',
          width:'10px', height:'10px', borderRadius:'50%', background:'var(--current)'
        });
        marker.appendChild(dot);
      }
      dot.style.display = 'block';
      dot.style.top = `${y}px`;
    };
  
    const updateAllMarkers = () => {
      document.querySelectorAll('.timeline-container').forEach(updateMarkerInContainer);
    };
  
    /* ---------- 6) 初期描画・リサイズ再描画 ---------- */
    const renderTimetable = (dayKey) => {
      const data = timetableData[dayKey];
      renderVenueTimeline(`music-room-${dayKey}`, data.musicRoom);
      renderVenueTimeline(`gymnasium-${dayKey}`, data.gymnasium);
    };
  
    const renderAll = () => {
      renderTimetable('day1');
      renderTimetable('day2');
      updateCurrentBands();
    };
  
    window.addEventListener('resize', () => {
      // px/min がメディアクエリで変わるので作り直し
      renderAll();
    });
  
    /* ---------- 7) 日付タブ切替（index.html の onclick から呼ぶ） ---------- */
    window.showDay = (dayId) => {
      activeDay = (dayId === 'day2') ? 'day2' : 'day1';
  
      // ボタンの active
      const buttons = document.querySelectorAll('.day-button');
      buttons.forEach((btn, idx) => {
        const isActive = (activeDay === 'day1' && idx === 0) || (activeDay === 'day2' && idx === 1);
        btn.classList.toggle('active', isActive);
      });
  
      // セクションの表示切替
      document.querySelectorAll('.timetable-content').forEach(sec => {
        sec.classList.toggle('active', sec.id === dayId);
      });
  
      updateCurrentBands();
      updateAllMarkers();
    };
  
    /* ---------- 8) 起動 & 定期更新 ---------- */
    document.addEventListener('DOMContentLoaded', () => {
      renderAll();
      // 30秒ごとに「現在演奏中」とマーカーを更新
      setInterval(() => { updateCurrentBands(); updateAllMarkers(); }, 30000);
    });
  })();
  