const videos = [
  {
    id: 982341001,
    name: "刑法案例解析：正當防衛",
    keywords: ["刑法", "正當防衛", "案例"],
    durationMin: 18,
    usage: 256,
    favorites: 143,
    recentUser: "王小明",
    recentLogs: ["2026-05-17 王小明", "2026-05-16 李雅婷", "2026-05-15 陳建宏"],
    users: ["王小明", "李雅婷", "陳建宏", "林詩涵"],
    related: ["民法契約基礎", "行政法核心觀念"]
  },
  {
    id: 982341002,
    name: "民法契約基礎",
    keywords: ["民法", "契約", "債編"],
    durationMin: 35,
    usage: 341,
    favorites: 198,
    recentUser: "張家瑜",
    recentLogs: ["2026-05-18 張家瑜", "2026-05-17 林思妤", "2026-05-14 趙柏翰"],
    users: ["張家瑜", "林思妤", "趙柏翰", "黃郁婷"],
    related: ["刑法案例解析：正當防衛", "民事訴訟流程介紹"]
  },
  {
    id: 982341003,
    name: "行政法核心觀念",
    keywords: ["行政法", "比例原則", "裁量"],
    durationMin: 12,
    usage: 177,
    favorites: 120,
    recentUser: "吳承恩",
    recentLogs: ["2026-05-16 吳承恩", "2026-05-15 楊舒涵", "2026-05-13 陳俊豪"],
    users: ["吳承恩", "楊舒涵", "陳俊豪", "蔡依庭"],
    related: ["憲法人權判例導讀", "刑法案例解析：正當防衛"]
  },
  {
    id: 982341004,
    name: "憲法人權判例導讀",
    keywords: ["憲法", "人權", "判例"],
    durationMin: 27,
    usage: 289,
    favorites: 211,
    recentUser: "林宥辰",
    recentLogs: ["2026-05-17 林宥辰", "2026-05-16 高語彤", "2026-05-15 鄭凱文"],
    users: ["林宥辰", "高語彤", "鄭凱文", "詹雅雯"],
    related: ["行政法核心觀念", "刑事訴訟證據法則"]
  },
  {
    id: 982341005,
    name: "刑事訴訟證據法則",
    keywords: ["刑訴", "證據", "程序"],
    durationMin: 22,
    usage: 224,
    favorites: 132,
    recentUser: "陳怡潔",
    recentLogs: ["2026-05-18 陳怡潔", "2026-05-16 葉家豪", "2026-05-14 郭佳穎"],
    users: ["陳怡潔", "葉家豪", "郭佳穎", "許皓鈞"],
    related: ["民事訴訟流程介紹", "憲法人權判例導讀"]
  },
  {
    id: 982341006,
    name: "民事訴訟流程介紹",
    keywords: ["民訴", "流程", "審理"],
    durationMin: 9,
    usage: 153,
    favorites: 88,
    recentUser: "周彥廷",
    recentLogs: ["2026-05-15 周彥廷", "2026-05-14 呂欣穎", "2026-05-12 林睿哲"],
    users: ["周彥廷", "呂欣穎", "林睿哲", "柯語晴"],
    related: ["民法契約基礎", "刑事訴訟證據法則"]
  },
  {
    id: 982341007,
    name: "智慧財產權入門",
    keywords: ["智財", "著作權", "商標"],
    durationMin: 31,
    usage: 198,
    favorites: 167,
    recentUser: "曾品妤",
    recentLogs: ["2026-05-17 曾品妤", "2026-05-16 陳柏宇", "2026-05-13 彭子恩"],
    users: ["曾品妤", "陳柏宇", "彭子恩", "沈冠宇"],
    related: ["民法契約基礎", "憲法人權判例導讀"]
  }
];

const els = {
  cards: document.getElementById("cards"),
  ranking: document.getElementById("ranking"),
  detail: document.getElementById("detail"),
  searchName: document.getElementById("searchName"),
  searchKeyword: document.getElementById("searchKeyword"),
  durationFilter: document.getElementById("durationFilter"),
  sortFilter: document.getElementById("sortFilter")
};

function vimeoThumb(id) {
  return `https://vumbnail.com/${id}.jpg`;
}

function durationLabel(min) {
  return `${Math.floor(min / 60)}:${String(min % 60).padStart(2, "0")}`;
}

function applyFilters() {
  const nameText = els.searchName.value.trim().toLowerCase();
  const keywordText = els.searchKeyword.value.trim().toLowerCase();
  const dur = els.durationFilter.value;
  const sort = els.sortFilter.value;

  let list = videos.filter(v => {
    const nameHit = v.name.toLowerCase().includes(nameText);
    const keywordHit = keywordText
      ? v.keywords.join(" ").toLowerCase().includes(keywordText) || v.name.toLowerCase().includes(keywordText)
      : true;
    const durationHit = dur === "all" ||
      (dur === "short" && v.durationMin <= 10) ||
      (dur === "medium" && v.durationMin > 10 && v.durationMin <= 30) ||
      (dur === "long" && v.durationMin > 30);
    return nameHit && keywordHit && durationHit;
  });

  if (sort === "usage") list.sort((a, b) => b.usage - a.usage);
  if (sort === "favorites") list.sort((a, b) => b.favorites - a.favorites);
  if (sort === "recent") list.sort((a, b) => b.recentLogs[0].localeCompare(a.recentLogs[0]));

  renderCards(list);
  renderRanking(videos);
}

function renderCards(list) {
  els.cards.innerHTML = list.map(v => `
    <article class="video-card card">
      <img src="${vimeoThumb(v.id)}" alt="${v.name} 縮圖" />
      <h3>${v.name}</h3>
      <div class="meta">
        <div>影片長度：${durationLabel(v.durationMin)}</div>
        <div>使用次數：${v.usage}</div>
        <div>收藏數：${v.favorites}</div>
        <div>最近使用者：${v.recentUser}</div>
      </div>
      <button onclick="showDetail(${v.id})">查看詳細</button>
    </article>
  `).join("");
}

function renderRanking(list) {
  const sorted = [...list].sort((a, b) => b.usage - a.usage);
  const max = sorted[0]?.usage || 1;
  els.ranking.innerHTML = sorted.map(v => `
    <div class="rank-row">
      <div class="label"><span>${v.name}</span><strong>${v.usage}</strong></div>
      <div class="bar"><span style="width: ${(v.usage / max) * 100}%"></span></div>
    </div>
  `).join("");
}

window.showDetail = function (id) {
  const v = videos.find(item => item.id === id);
  if (!v) return;
  els.detail.classList.remove("hidden");
  els.detail.innerHTML = `
    <h2>${v.name}</h2>
    <iframe src="https://player.vimeo.com/video/${v.id}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
    <p><strong>播放次數：</strong>${v.usage}</p>
    <h3>最近使用紀錄</h3>
    <ul class="list">${v.recentLogs.map(log => `<li>${log}</li>`).join("")}</ul>
    <h3>使用者名單</h3>
    <ul class="list">${v.users.map(u => `<li>${u}</li>`).join("")}</ul>
    <h3>推薦相關法影</h3>
    <ul class="list">${v.related.map(r => `<li>${r}</li>`).join("")}</ul>
  `;
  els.detail.scrollIntoView({ behavior: "smooth", block: "start" });
};

[els.searchName, els.searchKeyword, els.durationFilter, els.sortFilter].forEach(el => {
  el.addEventListener("input", applyFilters);
  el.addEventListener("change", applyFilters);
});

applyFilters();
