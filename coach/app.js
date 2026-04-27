// ===== Firebase 初始化（CDN compat 版本）=====
const firebaseConfig = {
  apiKey: "AIzaSyDUIR6toOWOhrPZFWEWkSbK3obC_kA9mFA",
  authDomain: "flora-coach-ai.firebaseapp.com",
  projectId: "flora-coach-ai",
  storageBucket: "flora-coach-ai.firebasestorage.app",
  messagingSenderId: "820953466288",
  appId: "1:820953466288:web:36d7fc862ad32bae9f0275",
  measurementId: "G-RN7TN7890B"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

auth.signInAnonymously()
  .then((userCredential) => {
    const uid = userCredential.user.uid;
    localStorage.setItem("flora.user.id", uid);
    console.log("Firebase UID:", uid);
  })
  .catch((error) => {
    console.error("Firebase error:", error);
  });


if (!localStorage.getItem("flora.user.id")) {
  localStorage.setItem("flora.user.id", "user_" + Date.now());
}

(() => {
  const API_BASE = "http://localhost:3000";
  
   const GAS_COUNTER_URL = "https://script.google.com/macros/s/AKfycbxxsSjeAeiUaTmZgM6zBsz_nA9sZ_tGHLXdBhG3yed99pgBz2s1a8utrcZa-tei6SjfBQ/exec";

function trackGlobalAction(action, page = document.body.dataset.page || '') {
  if (!GAS_COUNTER_URL || GAS_COUNTER_URL.includes("貼上你的GAS")) return;

  const url = `${GAS_COUNTER_URL}?action=${encodeURIComponent(action)}&page=${encodeURIComponent(page)}&source=flora-coach-ai&ua=${encodeURIComponent(navigator.userAgent)}`;

  fetch(url, {
    method: "GET",
    mode: "no-cors"
  }).catch(() => {
    console.warn("GAS 統計送出失敗，但不影響使用者操作。");
  });
}


  const COUNTER_KEYS = {
  generate: 'flora.count.generate',
  judge: 'flora.count.judge',
  optimize: 'flora.count.optimize',
  talent: 'flora.count.talent'
};

function countAction(type) {
  const key = COUNTER_KEYS[type];
  if (!key) return;

  const current = Number(localStorage.getItem(key) || 0);
  const next = current + 1;

  localStorage.setItem(key, next);

  console.log(`📊 ${type} 使用次數：`, next);
}


  const STORAGE_KEYS = {
    generateForm: 'flora.generate.form',
    generateResult: 'flora.generate.result',
    selectedDirection: 'flora.generate.selectedDirection',
    judgeForm: 'flora.judge.form',
    judgeResult: 'flora.judge.result',
    judgeImage: 'flora.judge.image',
    optimizeForm: 'flora.optimize.form',
    optimizeResult: 'flora.optimize.result',
    generatePrefill: 'flora.generate.prefill'
  };

  const exampleData = {
    wedding: {
      theme: "春日婚禮桌花",
      palette: "奶茶白、淡粉、淺綠",
      style: "韓系自然感",
      scene: "婚禮花禮",
      mood: "溫柔、明亮、精緻",
      flowers: "玫瑰、桔梗、尤加利、洋桔梗",
      purpose: "婚禮提案與花禮設計練習",
      extra: "希望層次柔和，不要太厚重，整體有高級感與市場接受度。"
    },
    market: {
      theme: "高級商業花禮設計",
      palette: "奶油白、焦糖棕、霧粉",
      style: "高級商業花禮",
      scene: "節慶送禮",
      mood: "精緻、穩重、質感",
      flowers: "玫瑰、火鶴、康乃馨、尤加利",
      purpose: "高單價花禮提案",
      extra: "希望適合社群拍照與送禮市場，主花焦點清楚，作品有精品感。"
    },
    contest: {
      theme: "花藝競賽訓練作品",
      palette: "白、綠、淡橘",
      style: "競賽造型導向",
      scene: "花藝競賽",
      mood: "張力、結構感、明確焦點",
      flowers: "火鶴、文心蘭、玫瑰、鐵線蓮",
      purpose: "競賽訓練",
      extra: "希望有主題表現力，線條與量體變化明顯，能讓評審一眼看出重點。"
    },
    road: {
      theme: "一般道路、隧道路上、爬坡、下坡的花藝呈現",
      palette: "綠、灰、土色、亮黃點綴",
      style: "現代線條感",
      scene: "花藝競賽",
      mood: "節奏、方向感、流動感",
      flowers: "火鶴、天堂鳥、文心蘭、尤加利、枝材",
      purpose: "主題表現訓練",
      extra: "希望花藝結構能表現道路延伸、隧道包覆、爬坡上升與下坡流線感。"
    }
  };

  const judgeExamples = {
    general: {
      workTheme: "一般花藝作品練習",
      judgeMode: "general",
      flowerInfo: "玫瑰、桔梗、尤加利",
      judgeNote: "請看整體構圖是否平衡，色彩是否協調，主花焦點是否足夠明確。"
    },
    contest: {
      workTheme: "花藝競賽訓練作品",
      judgeMode: "contest",
      flowerInfo: "火鶴、文心蘭、鐵線蓮、枝材",
      judgeNote: "請從競賽評審角度評估主題表現、結構張力、焦點與整體完成度。"
    },
    road: {
      workTheme: "一般道路、隧道路上、爬坡、下坡的花藝呈現",
      judgeMode: "contest",
      flowerInfo: "火鶴、天堂鳥、文心蘭、枝材、尤加利",
      judgeNote: "請特別看作品是否有表現道路延伸、隧道包覆、爬坡上升與下坡流線感。"
    },
    market: {
      workTheme: "高級商業花禮設計",
      judgeMode: "market",
      flowerInfo: "玫瑰、康乃馨、火鶴、尤加利",
      judgeNote: "請特別看市場感、送禮接受度、視覺高級感與社群拍照吸引力。"
    }
  };

  const optimizeExamples = {
    contest: {
      theme: "花藝競賽訓練作品",
      style: "競賽造型導向",
      palette: "白、綠、淡橘",
      flowers: "火鶴、文心蘭、鐵線蓮、枝材",
      strengths: "整體已有競賽感，色彩穩定，線條與量體具變化。",
      weaknesses: "主題辨識度不夠強，焦點還不夠集中，中層銜接略生硬。",
      goal: "讓評審第一眼就看懂主題，並強化主焦點與結構完整度。",
      mode: "contest"
    },
    market: {
      theme: "高級商業花禮設計",
      style: "高級商業花禮",
      palette: "奶油白、焦糖棕、霧粉",
      flowers: "玫瑰、康乃馨、火鶴、尤加利",
      strengths: "色彩成熟，成品感高，具高級花禮市場感。",
      weaknesses: "局部資訊量稍多，某些配材過於平均，精緻感還可再拉高。",
      goal: "提高高單價感，讓作品更俐落、更精品。",
      mode: "market"
    },
    road: {
      theme: "一般道路、隧道路上、爬坡、下坡的花藝呈現",
      style: "現代線條感",
      palette: "綠、灰、土色、亮黃點綴",
      flowers: "火鶴、天堂鳥、文心蘭、枝材、尤加利",
      strengths: "已有方向感與流動感，線條有試圖表現主題。",
      weaknesses: "道路延伸與隧道包覆感不夠清楚，爬坡與下坡節奏感還不夠明顯。",
      goal: "讓主題訊息更具象、更一眼可辨識。",
      mode: "contest"
    },
    minimal: {
      theme: "精緻感提升練習作品",
      style: "韓系自然感",
      palette: "奶茶白、淡粉、淺綠",
      flowers: "玫瑰、桔梗、尤加利",
      strengths: "色彩柔和，整體舒服，基礎構圖穩定。",
      weaknesses: "細節略顯平均，主花不夠突出，畫面稍微偏散。",
      goal: "讓畫面更乾淨、更集中、更有高級感。",
      mode: "minimal"
    }
  };

  const qs = (sel) => document.querySelector(sel);
  const byId = (id) => document.getElementById(id);
  const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  const load = (key, fallback = null) => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  };
  const remove = (key) => localStorage.removeItem(key);

  function getModeLabel(mode) {
    if (mode === 'contest') return '競賽強化模式';
    if (mode === 'market') return '市場強化模式';
    if (mode === 'minimal') return '精緻收斂模式';
    return '平衡優化模式';
  }

  function getJudgeModeLabel(mode) {
    if (mode === 'contest') return '競賽評審模式';
    if (mode === 'market') return '市場導向模式';
    return '一般教練模式';
  }

  function show(el, display = 'block') {
    if (el) el.style.display = display;
  }

  function hide(el) {
    if (el) el.style.display = 'none';
  }
   
  const PLAN_KEY = 'flora.user.plan'; 
const USAGE_DATE_KEY = 'flora.usage.date';
const USAGE_COUNT_KEY = 'flora.usage.dailyCount';

const PLAN_LIMITS = {
  free: 10,
  pro: 100,
  teacher: 300,
  unlimited: Infinity
};

const PLAN_LABELS = {
  free: '免費版',
  pro: '專業版',
  teacher: '教師版',
  unlimited: '無限版'
};

function getTodayString() {
  return new Date().toLocaleDateString('sv-SE', {
    timeZone: 'Asia/Taipei'
  });
}

function getUserPlan() {
  return localStorage.getItem(PLAN_KEY) || 'free';
}

function setUserPlan(plan) {
  if (!PLAN_LIMITS.hasOwnProperty(plan)) return;
  localStorage.setItem(PLAN_KEY, plan);
}

function getPlanLimit() {
  const plan = getUserPlan();
  return PLAN_LIMITS[plan] ?? PLAN_LIMITS.free;
}

function resetDailyUsageIfNeeded() {
  const today = getTodayString();
  const savedDate = localStorage.getItem(USAGE_DATE_KEY);

  if (savedDate !== today) {
    localStorage.setItem(USAGE_DATE_KEY, today);
    localStorage.setItem(USAGE_COUNT_KEY, '0');
  }
}

function getUsageCount() {
  resetDailyUsageIfNeeded();
  return Number(localStorage.getItem(USAGE_COUNT_KEY) || 0);
}

function increaseUsageCount() {
  resetDailyUsageIfNeeded();
  const next = getUsageCount() + 1;
  localStorage.setItem(USAGE_COUNT_KEY, String(next));
  return next;
}

function isPaidUser() {
  return getUserPlan() !== 'free';
}

function checkFreeLimit() {
  resetDailyUsageIfNeeded();

  const plan = getUserPlan();
  const limit = getPlanLimit();
  const used = getUsageCount();

  if (limit !== Infinity && used >= limit) {
    alert(
      `${PLAN_LABELS[plan]}今日使用次數已用完。\n\n` +
      `目前方案每日可使用 ${limit} 次 AI 功能。\n\n` +
      `升級 Flora Coach AI 專業版，可解鎖更多 AI 預演、評審與優化功能。`
    );
    return false;
  }

  return true;
}

function showUsageAlert() {
  const plan = getUserPlan();
  const limit = getPlanLimit();
  const used = getUsageCount();

  if (limit === Infinity) {
    alert(`本次 AI 功能已使用成功。\n目前方案：${PLAN_LABELS[plan]}，不限次數。`);
    return;
  }

  const left = Math.max(0, limit - used);

  alert(
    `本次 AI 功能已使用成功。\n` +
    `目前方案：${PLAN_LABELS[plan]}\n` +
    `今日剩餘 ${left} 次。`
  );
}


  function copyText(text, success = '已複製。') {
    navigator.clipboard.writeText(text)
      .then(() => alert(success))
      .catch(() => alert('複製失敗，請手動複製。'));
  }

  async function fetchJson(url, options = {}) {
    const res = await fetch(url, options);
    let data;
    try {
      data = await res.json();
    } catch {
      data = null;
    }
    if (!res.ok) {
      throw new Error(data?.error || data?.detail || `請求失敗：${res.status}`);
    }
    return data;
  }

  function initIndexPage() {
    const startLinks = document.querySelectorAll('[data-link-generate]');
    const judgeLinks = document.querySelectorAll('[data-link-judge]');
    startLinks.forEach(a => a.setAttribute('href', 'generate.html'));
    judgeLinks.forEach(a => a.setAttribute('href', 'judge.html'));
  }

  function buildGeneratePrompt(data) {
    return `請生成一張高質感花藝設計概念圖，條件如下：

主題：${data.theme || "未填寫"}
色系：${data.palette || "未填寫"}
風格：${data.style || "未填寫"}
場景：${data.scene || "未填寫"}
指定花材：${data.flowers || "未填寫"}
情緒氛圍：${data.mood || "未填寫"}
作品用途：${data.purpose || "未填寫"}
補充說明：${data.extra || "無"}

需求：
- 畫面具有專業花藝設計感
- 花材層次分明
- 構圖完整，有明確視覺焦點
- 色彩協調且具市場吸引力
- 適合用於花藝競賽或商業花禮提案參考`;
  }

  function buildMockDirections(data) {
    return [
      {
        label: "方向 A",
        title: "市場感成熟版本",
        summary: "整體走向較柔和、穩定，適合高接受度商業市場與花禮提案。",
        focus: "主花焦點清楚，色調較耐看",
        market: "商業接受度高",
        badge: "市場導向",
        score: "市場感：9/10",
        image: `linear-gradient(rgba(255,255,255,0.06), rgba(255,255,255,0.06)),
                url('assets/sample-floral-a.jpg') center/cover no-repeat,
                linear-gradient(135deg, #e7d3c1, #f7efe8)`
      },
      {
        label: "方向 B",
        title: "競賽表現強化版本",
        summary: "結構與張力更明顯，適合需要評審一眼看出主題的競賽訓練。",
        focus: "量體與線條變化較大，視覺衝擊更強",
        market: "競賽辨識度高",
        badge: "競賽導向",
        score: "主題表現：9/10",
        image: `linear-gradient(rgba(255,255,255,0.05), rgba(255,255,255,0.05)),
                url('assets/sample-floral-b.jpg') center/cover no-repeat,
                linear-gradient(135deg, #dcc6b3, #f8efe7)`
      },
      {
        label: "方向 C",
        title: "自然層次細緻版本",
        summary: "更重視花材之間的銜接與呼吸感，視覺流動較自然細膩。",
        focus: "中層與下層過渡較柔和，整體更有空氣感",
        market: "適合高質感審美客群",
        badge: "自然層次",
        score: "精緻度：8.8/10",
        image: `linear-gradient(rgba(255,255,255,0.05), rgba(255,255,255,0.05)),
                url('assets/sample-floral-c.jpg') center/cover no-repeat,
                linear-gradient(135deg, #ead9cc, #fff3ea)`
      }
    ];
  }

  function initGeneratePage() {
    const form = byId('generateForm');
    const ids = ['theme', 'palette', 'style', 'scene', 'mood', 'flowers', 'purpose', 'extra'];
    const statusBar = byId('statusBar');
    const emptyState = byId('emptyState');
    const resultHeader = byId('resultHeader');
    const resultsGrid = byId('resultsGrid');
    const promptBox = byId('promptBox');
    const promptText = byId('promptText');
    const subtitle = byId('resultSubtitle');

    function getFormData() {
      return Object.fromEntries(ids.map(id => [id, byId(id).value.trim()]));
    }

    function setFormData(data = {}) {
      ids.forEach(id => {
        if (byId(id)) byId(id).value = data[id] || '';
      });
    }

    function renderResults(payload) {
      resultsGrid.innerHTML = '';
      payload.directions.forEach((item) => {
        const card = document.createElement('article');
        card.className = 'design-card';
        card.innerHTML = `
          <div class="design-image" style="background:${item.image || `linear-gradient(135deg, #ead9cc, #fff3ea)`};">
            <div class="design-badge">${item.badge || ''}</div>
            <div class="design-score">
              <small>${item.label || ''}</small>
              <strong>${item.score || ''}</strong>
            </div>
          </div>
          <div class="design-content">
            <h3>${item.title || ''}</h3>
            <p>${item.summary || ''}</p>
            <div class="info-list">
              <div class="info-item"><strong>設計焦點：</strong>${item.focus || ''}</div>
              <div class="info-item"><strong>預測定位：</strong>${item.market || ''}</div>
              <div class="info-item"><strong>適合主題：</strong>${payload.form.theme || ''}</div>
            </div>
            <div class="card-actions">
              <button class="small-btn primary" data-action="select-direction" data-title="${item.title || ''}">選擇此方向</button>
              <button class="small-btn secondary" data-action="copy-direction" data-title="${item.title || ''}" data-summary="${item.summary || ''}">複製說明</button>
            </div>
          </div>`;
        resultsGrid.appendChild(card);
      });

      show(statusBar, 'block');
      hide(emptyState);
      show(resultHeader, 'flex');
      show(resultsGrid, 'grid');
      show(promptBox, 'block');
      subtitle.textContent = `主題：${payload.form.theme}｜風格：${payload.form.style}｜色系：${payload.form.palette}`;
      promptText.textContent = payload.prompt || '';
    }
      
     async function handleGenerate() {
  if (!checkFreeLimit()) return;

  const data = getFormData();

  if (!data.theme || !data.palette || !data.style) {
    alert('請至少填寫：作品主題、色系、風格。');
    return;
  }

  try {
    const result = await fetchJson(`${API_BASE}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
            ...data,
      userId: localStorage.getItem("flora.user.id") || "guest"
     })
    });

    const payload = {
      form: data,
      directions: Array.isArray(result?.directions) && result.directions.length
        ? result.directions
        : buildMockDirections(data),
      prompt: result?.prompt || buildGeneratePrompt(data),
      createdAt: new Date().toISOString()
    };

    save(STORAGE_KEYS.generateForm, data);
    save(STORAGE_KEYS.generateResult, payload);
    increaseUsageCount();
    countAction('generate');
    trackGlobalAction('generate');
    renderResults(payload);
    showUsageAlert();

  } catch (err) {
    alert(`AI 生成失敗：${err.message}`);
  }
} 


    function resetForm() {
      form.reset();
      hide(statusBar);
      show(emptyState, 'flex');
      hide(resultHeader);
      hide(resultsGrid);
      resultsGrid.innerHTML = '';
      hide(promptBox);
      remove(STORAGE_KEYS.generateForm);
      remove(STORAGE_KEYS.generateResult);
      remove(STORAGE_KEYS.selectedDirection);
      remove(STORAGE_KEYS.generatePrefill);
    }

    function fillExample(type) {
      setFormData(exampleData[type] || {});
      save(STORAGE_KEYS.generateForm, getFormData());
    }

    function selectDirection(title) {
      const payload = load(STORAGE_KEYS.generateResult);
      const direction = payload?.directions?.find(item => item.title === title);
      save(STORAGE_KEYS.selectedDirection, direction || { title });
      alert(`已儲存「${title}」到 localStorage。\n接下來可前往 judge.html 做作品評審。`);
    }

    form?.addEventListener('input', () => save(STORAGE_KEYS.generateForm, getFormData()));

    resultsGrid?.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-action]');
      if (!btn) return;
      const action = btn.dataset.action;
      if (action === 'select-direction') selectDirection(btn.dataset.title);
      if (action === 'copy-direction') copyText(`${btn.dataset.title}\n${btn.dataset.summary}`, '已複製設計方向說明。');
    });

    document.querySelectorAll('[data-example-generate]').forEach(btn => {
      btn.addEventListener('click', () => fillExample(btn.dataset.exampleGenerate));
    });

    byId('generateBtn')?.addEventListener('click', handleGenerate);
    byId('resetGenerateBtn')?.addEventListener('click', resetForm);

    const savedForm = load(STORAGE_KEYS.generateForm, {});
    const prefill = load(STORAGE_KEYS.generatePrefill, null);
    setFormData(savedForm);

    if (prefill) {
      const merged = { ...savedForm, ...prefill };
      setFormData(merged);
      save(STORAGE_KEYS.generateForm, merged);
      remove(STORAGE_KEYS.generatePrefill);
    }

    const savedResult = load(STORAGE_KEYS.generateResult);
    if (savedResult) renderResults(savedResult);
  }

  function buildJudgePrompt(data) {
    return `你是一位專業花藝競賽評審與商業花藝設計顧問。

請根據使用者上傳的花藝作品圖片，從以下面向進行專業分析：
1. 主題表現
2. 構圖平衡
3. 色彩和諧
4. 焦點設計
5. 花材層次
6. 整體完成度

作品主題：${data.workTheme || "未填寫"}
評審模式：${getJudgeModeLabel(data.judgeMode)}
花材 / 結構補充：${data.flowerInfo || "未填寫"}
使用者補充：${data.judgeNote || "無"}

請對每一項給出 1–10 分，並簡要說明原因。
再整理出：
- 作品優點 2–3 點
- 作品待改善處 2–3 點
- 下一步修改建議 2–3 點
- 商業市場接受度簡短判斷

請用繁體中文回答，語氣專業、具教練感，重點是幫助學習者成長。`;
  }

  function buildMockJudgeResult(data) {
    if (data.judgeMode === "contest") {
      return {
        scores: [
          { key: "主題表現", value: 8.8, note: "作品有嘗試呼應題目，整體方向明確，但主題辨識度還可再集中。" },
          { key: "構圖平衡", value: 8.2, note: "左右量體大致成立，但局部張力與重心轉換仍可更精準。" },
          { key: "色彩和諧", value: 8.6, note: "整體色調穩定，具視覺一致性，沒有明顯衝突。" },
          { key: "焦點設計", value: 7.9, note: "視覺焦點有形成，但主花與線條引導還能更明確。" },
          { key: "花材層次", value: 8.1, note: "前中後層次有基礎，但局部銜接略顯生硬。" },
          { key: "整體完成度", value: 8.4, note: "整體完成感不錯，已有競賽作品基礎，但細節仍可再拉高。" }
        ],
        strengths: [
          "作品整體已有競賽感，主題並非鬆散拼湊，而是有明確方向。",
          "色彩控制穩定，視覺氣質統一，不會出現花材各自為政的問題。",
          "量體與線條具備一定變化，能看出作者有在經營節奏與結構。"
        ],
        weaknesses: [
          "主題辨識度還不夠強，觀者需要多看幾秒才較能理解作品要表達的核心。",
          "焦點與輔助線條的關係還可再清楚，局部容易產生視線分散。",
          "局部過渡稍硬，若能再增加中介層次，作品會更成熟。"
        ],
        suggestions: [
          "建議再強化主焦點周圍的視覺凝聚，讓評審第一眼就能抓到核心。",
          "可調整次要花材與枝材的方向性，讓線條更能服務主題，而非彼此競爭。",
          "中層銜接區可增加柔化過渡，讓結構感與自然感之間更平衡。"
        ],
        market: "中高，偏作品展示與競賽訓練價值高",
        summary: "這是一件具備競賽基礎的作品，整體不是零散堆疊，而是有試圖建立主題與結構。若進一步強化主題辨識、焦點凝聚與局部銜接，整體水準會更接近成熟競賽作品。",
        coach: "以目前表現來看，這件作品已具備不錯的骨架與整體感，但真正決定分數高低的，會是『評審能不能快速讀懂你的主題』。你現在最值得優先修正的，不是再加更多元素，而是讓視覺重點更集中、輔助線條更有目的，並把中層過渡做得更順。當這三件事到位後，作品會立刻從「不錯」往「成熟」再升一階。"
      };
    }

    if (data.judgeMode === "market") {
      return {
        scores: [
          { key: "主題表現", value: 8.4, note: "作品主題完整，視覺氛圍明確，易被一般客群理解。" },
          { key: "構圖平衡", value: 8.7, note: "整體量體舒適，視線流動自然，具陳列與拍照友善度。" },
          { key: "色彩和諧", value: 9.1, note: "色彩層次成熟，有高級感，市場接受度高。" },
          { key: "焦點設計", value: 8.5, note: "主花位置與視覺焦點明確，能快速抓住觀者視線。" },
          { key: "花材層次", value: 8.3, note: "花材銜接穩定，整體氣質完整，但局部層次仍可更細膩。" },
          { key: "整體完成度", value: 8.8, note: "成品感高，具商業銷售與提案展示潛力。" }
        ],
        strengths: [
          "色彩成熟、氣質穩定，整體視覺很有高級花禮的商業感。",
          "構圖對一般消費者相對友善，容易理解，也較適合拍照與展示。",
          "主花焦點與整體完成度高，已具備提案與商品化的基礎。"
        ],
        weaknesses: [
          "局部層次可再拉開，讓作品近看時更有細節驚喜。",
          "若想提高高單價感，可再減少部分雜訊元素，讓畫面更乾淨。",
          "某些配材的存在感略平均，若能區分主次會更精緻。"
        ],
        suggestions: [
          "建議適度收斂次要花材，讓主花與高價值視覺區更突出。",
          "可增加局部精緻細節，例如高質感葉材或更有質地差異的輔材。",
          "若作為商業產品，建議進一步思考包裝、拍攝角度與客群定位。"
        ],
        market: "高，適合婚禮花禮、精品送禮與社群視覺展示",
        summary: "這件作品在市場導向上表現不錯，尤其色彩成熟度與整體成品感較強，已具備商業花禮的視覺條件。若再收斂局部資訊量，精緻度還能再向上提升。",
        coach: "從商業角度看，這件作品最大的優勢在於『看起來已經很像可以被賣出去的作品』。你下一步最值得做的，是把局部細節再做得更俐落，並把主視覺區的價值感拉高。當作品不只是漂亮，而是能讓人覺得『值得花錢買』，它就真正跨進市場了。"
      };
    }

    return {
      scores: [
        { key: "主題表現", value: 8.1, note: "作品整體方向明確，但主題的視覺訊息還可更集中。" },
        { key: "構圖平衡", value: 8.4, note: "量體安排大致穩定，整體視覺不會失衡。" },
        { key: "色彩和諧", value: 8.7, note: "色彩關係自然，整體看起來舒服且具有一致性。" },
        { key: "焦點設計", value: 8.0, note: "主花焦點有建立，但仍有提升空間。" },
        { key: "花材層次", value: 8.2, note: "花材高低與前後關係已有基礎，局部可更細緻。" },
        { key: "整體完成度", value: 8.5, note: "整體完成感不錯，已具成熟作品雛形。" }
      ],
      strengths: [
        "整體畫面不凌亂，色彩控制穩定，觀感舒服。",
        "作品有建立基礎焦點，不會讓人找不到主花位置。",
        "完成度不低，已具備作品展示與訓練討論的基礎。"
      ],
      weaknesses: [
        "主題表現仍有些平均，視覺上還能更有記憶點。",
        "局部過渡略平，若能增加層次，作品會更有深度。",
        "某些次要元素的功能性還不夠明確。"
      ],
      suggestions: [
        "建議再強化主花與周圍區域的視覺凝聚，提升記憶點。",
        "可調整部分次要花材的位置，讓層次更明顯。",
        "若再做一版，建議從『焦點更集中』與『中層更柔順』兩個方向優先修正。"
      ],
      market: "中高，適合教學展示與一般花禮發展",
      summary: "這件作品整體觀感穩定，已經不是零散拼貼，而是具備一定完成感與整體性。若焦點再更集中、層次再更細緻，整體成熟度會更往上提升。",
      coach: "你現在的作品已經有不錯的整體感，這很重要，因為很多作品問題不是技巧，而是『看起來像沒有整合』。你已經跨過這一關了。下一步就是開始追求更高一層的精準度：讓焦點更有力、讓中層更柔順、讓主題更有辨識。這會讓你的作品從「穩定」變成「有說服力」。"
    };
  }

  function initJudgePage() {
    const ids = ['workTheme', 'judgeMode', 'flowerInfo', 'judgeNote'];
    let currentReportText = '';

    function getFormData() {
      return Object.fromEntries(ids.map(id => [id, byId(id).value.trim()]));
    }

    function setFormData(data = {}) {
      ids.forEach(id => {
        if (byId(id)) byId(id).value = data[id] || (id === 'judgeMode' ? 'general' : '');
      });
    }

    function readImage(file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    }

    function handleImagePreview(dataUrl, metaText = '作品預覽') {
      const previewBox = byId('previewBox');
      const previewImage = byId('previewImage');
      const previewMeta = byId('previewMeta');
      previewImage.src = dataUrl;
      previewMeta.textContent = metaText;
      show(previewBox, 'block');
    }

    async function onFileChange(event) {
      const file = event.target.files?.[0];
      if (!file) return;
      const dataUrl = await readImage(file);
      save(STORAGE_KEYS.judgeImage, { dataUrl, name: file.name, size: file.size });
      handleImagePreview(dataUrl, `已選擇：${file.name}｜大小：約 ${(file.size / 1024 / 1024).toFixed(2)} MB`);
    }

    function renderScores(scores) {
      const scoreGrid = byId('scoreGrid');
      scoreGrid.innerHTML = '';
      scores.forEach(item => {
        const percent = Math.max(0, Math.min(100, item.value * 10));
        const card = document.createElement('div');
        card.className = 'score-card';
        card.innerHTML = `
          <div class="score-head">
            <h3 class="score-title">${item.key}</h3>
            <div class="score-num">${Number(item.value).toFixed(1)} / 10</div>
          </div>
          <div class="score-bar"><div class="score-fill" style="width:${percent}%"></div></div>
          <div class="score-note">${item.note || ''}</div>`;
        scoreGrid.appendChild(card);
      });
    }

    function renderList(targetId, items) {
      const el = byId(targetId);
      el.innerHTML = '';
      items.forEach(text => {
        const div = document.createElement('div');
        div.className = 'analysis-item';
        div.textContent = text;
        el.appendChild(div);
      });
    }

    function buildReportText(result, data, total) {
      const scoreText = result.scores.map(item => `${item.key}：${Number(item.value).toFixed(1)} / 10`).join('\n');
      const strengthText = result.strengths.map((t, i) => `${i + 1}. ${t}`).join('\n');
      const weaknessText = result.weaknesses.map((t, i) => `${i + 1}. ${t}`).join('\n');
      const suggestionText = result.suggestions.map((t, i) => `${i + 1}. ${t}`).join('\n');
      return `AI 花藝作品評審結果

作品主題：${data.workTheme}
評審模式：${getJudgeModeLabel(data.judgeMode)}
花材 / 結構補充：${data.flowerInfo || "未填寫"}

總分：${total}

【六項評分】
${scoreText}

【作品優點】
${strengthText}

【待改善處】
${weaknessText}

【AI 教練建議】
${suggestionText}

【市場接受度】
${result.market}

【整體摘要】
${result.summary}

【綜合講評】
${result.coach}`;
    }

    function renderReport(payload) {
      const { result, form, image } = payload;
      const total = result.scores.reduce((sum, item) => sum + Number(item.value), 0).toFixed(1);
      byId('reportImage').src = image?.dataUrl || 'assets/sample-floral.jpg';
      byId('reportImageMeta').textContent = `作品主題：${form.workTheme}${form.flowerInfo ? "｜花材 / 結構：" + form.flowerInfo : ""}`;
      byId('reportSubtitle').textContent = `主題：${form.workTheme}｜${getJudgeModeLabel(form.judgeMode)}`;
      byId('totalScore').textContent = total;
      byId('marketChip').textContent = `市場接受度：${result.market || ''}`;
      byId('modeChip').textContent = `評審模式：${getJudgeModeLabel(form.judgeMode)}`;
      byId('summaryText').textContent = result.summary || '';
      byId('coachSummary').textContent = result.coach || '';
      byId('promptText').textContent = buildJudgePrompt(form);
      renderScores(result.scores || []);
      renderList('strengthList', result.strengths || []);
      renderList('weaknessList', result.weaknesses || []);
      renderList('suggestionList', result.suggestions || []);
      currentReportText = buildReportText(result, form, total);
      show(byId('statusBar'), 'block');
      hide(byId('emptyState'));
      show(byId('reportWrap'), 'block');
    }

    async function handleJudge() {
      
  if (!checkFreeLimit()) return;

  const image = load(STORAGE_KEYS.judgeImage);

  if (!image?.dataUrl) {
    alert('請先上傳作品圖片。');
    return;
  }

  const form = getFormData();

  if (!form.workTheme) {
    alert('請至少填寫作品主題 / 題目。');
    return;
  }

  const payload = {
    form,
    result: buildMockJudgeResult(form),
    image,
    createdAt: new Date().toISOString()
  };

  save(STORAGE_KEYS.judgeForm, form);
  save(STORAGE_KEYS.judgeResult, payload);
  increaseUsageCount();
  countAction('judge');
  trackGlobalAction('judge');
  renderReport(payload);
  showUsageAlert();
  }

    function resetJudgeForm() {
      setFormData({});
      byId('judgeMode').value = 'general';
      byId('imageUpload').value = '';
      hide(byId('previewBox'));
      hide(byId('statusBar'));
      show(byId('emptyState'), 'flex');
      hide(byId('reportWrap'));
      byId('scoreGrid').innerHTML = '';
      remove(STORAGE_KEYS.judgeForm);
      remove(STORAGE_KEYS.judgeResult);
      remove(STORAGE_KEYS.judgeImage);
      currentReportText = '';
    }

    function goOptimize() {
      const payload = load(STORAGE_KEYS.judgeResult);
      if (!payload) {
        alert('目前沒有可帶去優化頁的評審結果。');
        return;
      }

      const optimizeSeed = {
        theme: payload.form.workTheme || '',
        style: load(STORAGE_KEYS.generateForm, {}).style || '',
        palette: load(STORAGE_KEYS.generateForm, {}).palette || '',
        flowers: payload.form.flowerInfo || load(STORAGE_KEYS.generateForm, {}).flowers || '',
        strengths: (payload.result.strengths || []).join('；'),
        weaknesses: (payload.result.weaknesses || []).join('；'),
        goal: payload.result.suggestions?.[0] || '',
        mode: payload.form.judgeMode === 'market'
          ? 'market'
          : (payload.form.judgeMode === 'contest' ? 'contest' : 'balanced')
      };

      save(STORAGE_KEYS.optimizeForm, optimizeSeed);
      window.location.href = 'optimize.html';
    }

    byId('imageUpload')?.addEventListener('change', onFileChange);

    document.querySelectorAll('[data-example-judge]').forEach(btn => {
      btn.addEventListener('click', () => {
        setFormData(judgeExamples[btn.dataset.exampleJudge] || {});
        save(STORAGE_KEYS.judgeForm, getFormData());
      });
    });

    ids.forEach(id => byId(id)?.addEventListener('input', () => save(STORAGE_KEYS.judgeForm, getFormData())));
    byId('judgeBtn')?.addEventListener('click', handleJudge);
    byId('resetJudgeBtn')?.addEventListener('click', resetJudgeForm);
    byId('optimizeBtn')?.addEventListener('click', goOptimize);

    byId('copyJudgeBtn')?.addEventListener('click', () => {
      if (!currentReportText) return alert('目前沒有可複製的評審結果。');
      copyText(currentReportText, '已複製評審結果。');
    });

    const savedForm = load(STORAGE_KEYS.judgeForm, {});
    const selectedDirection = load(STORAGE_KEYS.selectedDirection, null);
    const generateForm = load(STORAGE_KEYS.generateForm, {});
    const mergedForm = {
      workTheme: savedForm.workTheme || selectedDirection?.title || generateForm.theme || '',
      judgeMode: savedForm.judgeMode || 'general',
      flowerInfo: savedForm.flowerInfo || generateForm.flowers || '',
      judgeNote: savedForm.judgeNote || ''
    };
    setFormData(mergedForm);

    const savedImage = load(STORAGE_KEYS.judgeImage, null);
    if (savedImage?.dataUrl) {
      handleImagePreview(
        savedImage.dataUrl,
        savedImage.name ? `已選擇：${savedImage.name}` : '已載入先前作品圖片'
      );
    }

    const savedReport = load(STORAGE_KEYS.judgeResult);
    if (savedReport) renderReport(savedReport);
  }

  function buildOptimizationPlan(data) {
    const base = {
      summary: "下一輪優化不應該從頭推翻，而是保留已成立的優點，集中修正最影響完成度的核心問題，讓作品更成熟、更有說服力。",
      priorities: [
        { title: "先修正最影響分數的核心問題", desc: "不要同時改太多地方，先聚焦在真正會拉低整體完成度的那一點。" },
        { title: "保留原本有效的優勢", desc: "優化不是重做全部，而是留下作品原本最有價值的部分。" },
        { title: "讓下一輪視覺訊息更集中", desc: "觀者第一眼看到什麼，比你加了多少元素更重要。" }
      ],
      actions: [
        "重新確認主花與視覺焦點位置，避免次要元素分散注意力。",
        "調整中層與過渡區，讓花材之間的銜接更自然。",
        "檢查量體與線條是否真的在服務主題，而不是只是填滿畫面。"
      ]
    };

    if (data.mode === "contest") {
      base.summary = "本輪應以『主題辨識度』與『焦點凝聚力』為優先，讓評審在第一眼就能抓到作品核心，再進一步提升結構成熟度。";
      base.priorities = [
        { title: "讓主題一眼可讀", desc: "競賽作品最怕觀者要想很久才懂，主題訊息必須更直接。" },
        { title: "強化主焦點與輔助線條關係", desc: "所有視覺引導都應該服務主題核心，不應彼此競爭。" },
        { title: "提升中層與量體的完成度", desc: "結構感與自然感要同時成立，才能讓作品更像成熟稿。" }
      ];
      base.actions = [
        "縮減不必要的次要視覺點，讓主題區域更集中。",
        "加強主焦點周圍的花材凝聚，形成清楚的視覺核心。",
        "重新梳理枝材或線條走向，讓方向性更有目的。"
      ];
    }

    if (data.mode === "market") {
      base.summary = "本輪應以『高級感』與『可銷售感』為優先，讓作品不只漂亮，而是真的讓人感覺值得買。";
      base.priorities = [
        { title: "提高高單價感", desc: "收斂畫面雜訊，讓焦點區更精緻、更有精品感。" },
        { title: "強化主視覺商品感", desc: "觀者應快速感受到這是一件完成度高、可展示、可送禮的作品。" },
        { title: "保留市場接受度高的色彩關係", desc: "不要因優化而失去原本好看的商業氣質。" }
      ];
      base.actions = [
        "減少不必要的平均配材，讓主花與高價值區更突出。",
        "提高視覺留白與呼吸感，讓作品更乾淨。",
        "思考拍照、展示與消費者第一眼接受度。"
      ];
    }

    if (data.mode === "minimal") {
      base.summary = "本輪應以『減法優化』為核心，透過收斂、集中與細節提升，讓作品從穩定變成精緻。";
      base.priorities = [
        { title: "先做減法", desc: "不是再加更多，而是刪掉沒有必要的視覺干擾。" },
        { title: "讓主花更有記憶點", desc: "保留柔和氣質，但讓觀者更容易記住焦點。" },
        { title: "提升近看細節", desc: "精緻感往往來自局部處理，而不是整體堆量。" }
      ];
      base.actions = [
        "收斂次要花材數量，讓畫面更乾淨。",
        "增加主花周邊的層次控制，讓焦點更集中。",
        "檢查整體邊界與輪廓，避免作品外形過於鬆散。"
      ];
    }

    return base;
  }

  function buildOptimizePrompt(data, plan) {
    return `請生成一張「優化後的花藝設計概念圖」，條件如下：

【作品主題】
${data.theme}

【原本風格】
${data.style || "請延續原作品風格語言"}

【原本色系】
${data.palette || "請保留原作品已成立的色彩關係"}

【原本花材】
${data.flowers || "請以原作品常用花材邏輯延伸"}

【本輪優化模式】
${getModeLabel(data.mode)}

【必須保留的優點】
${data.strengths || "請保留原作品已具備的整體氣質與有效優勢"}

【上一輪主要問題點】
${data.weaknesses}

【這一輪最優先改善的目標】
${data.goal}

【本輪優化策略】
${plan.summary}

【優化執行重點】
1. ${plan.priorities[0].title}：${plan.priorities[0].desc}
2. ${plan.priorities[1].title}：${plan.priorities[1].desc}
3. ${plan.priorities[2].title}：${plan.priorities[2].desc}

【具體要求】
- 不要完全推翻原作品方向
- 保留原本已成立的優點
- 優先修正最影響完成度的核心問題
- 讓主花焦點更明確
- 讓花材層次與中層過渡更自然
- 讓整體構圖更成熟、更完整、更有說服力
- 若為競賽作品，請提升主題辨識度與第一眼衝擊力
- 若為市場作品，請提升高級感與可銷售感
- 若為精緻收斂方向，請強化留白、集中與細節

【輸出目標】
請生成一個比上一輪更成熟、更精準、更貼近目標的花藝設計版本。`;
  }

  function getTalentProfiles() {
  return {
    aesthetic: {
      title: "直覺美感型花藝師",
      subtitle: "你天生對色彩、氛圍與畫面美感很敏銳",
      score: 92,
      tags: ["色彩敏銳", "氛圍感強", "適合婚禮花藝"],
      summary: "你最擅長感受作品的美感、溫度與整體氛圍。你很容易看出什麼顏色舒服、什麼畫面讓人心動，適合發展韓系自然感、婚禮桌花、溫柔系花禮與社群視覺作品。",
      strengths: [
        "你對色彩與整體氣氛有很好的直覺。",
        "你容易做出讓人覺得舒服、溫暖、有畫面感的作品。",
        "你適合發展婚禮花藝、生活花藝與高質感花禮。"
      ],
      suggestions: [
        "練習時可以多做不同色系搭配，建立自己的色彩資料庫。",
        "下一步建議加強構圖比例，讓作品不只美，也更穩定。",
        "可以用 AI 設計預演先測試 3 種色彩方向，再選最成熟的一版製作。"
      ],
      prefill: {
        theme: "溫柔系高質感花禮設計",
        palette: "奶茶白、霧粉、淡綠",
        style: "韓系自然感",
        scene: "婚禮花禮",
        mood: "溫柔、明亮、精緻",
        purpose: "色彩與氛圍練習",
        extra: "請強調色彩協調、柔和氛圍與高級感。"
      }
    },
    structure: {
      title: "結構競賽型花藝師",
      subtitle: "你擅長觀察空間、比例、線條與作品架構",
      score: 94,
      tags: ["結構感強", "競賽潛力", "空間敏銳"],
      summary: "你比較在意作品是否站得住、構圖是否有張力、線條是否有目的。這類型很適合發展競賽花藝、主題裝置、現代線條感作品與大型空間花藝。",
      strengths: [
        "你對作品比例、重心與線條方向特別敏感。",
        "你適合處理需要主題、結構與視覺張力的作品。",
        "你有潛力在競賽作品中做出明確辨識度。"
      ],
      suggestions: [
        "練習時可以先畫構圖草圖，再決定花材位置。",
        "下一步建議加強色彩柔和度，避免作品太硬或太滿。",
        "可以用 AI 評審模式檢查主題辨識度與結構平衡。"
      ],
      prefill: {
        theme: "花藝競賽訓練作品",
        palette: "白、綠、淡橘",
        style: "競賽造型導向",
        scene: "花藝競賽",
        mood: "張力、結構感、明確焦點",
        purpose: "競賽結構訓練",
        extra: "請強調主題辨識、結構張力、線條方向與視覺焦點。"
      }
    },
    market: {
      title: "市場提案型花藝師",
      subtitle: "你很懂作品是否吸引人、是否有商品價值",
      score: 90,
      tags: ["商業感強", "提案敏銳", "適合花禮市場"],
      summary: "你很容易思考：這樣客人會不會喜歡？這樣拍照好不好看？這樣值不值得買？你很適合發展商業花禮、節慶商品、花店提案與高單價作品。",
      strengths: [
        "你能從消費者角度思考作品價值。",
        "你適合做有商品感、送禮感與拍照感的花藝。",
        "你對市場接受度與提案方向有不錯直覺。"
      ],
      suggestions: [
        "練習時可以多分析花店商品照與節慶花禮設計。",
        "下一步建議加強細節與層次，讓作品更有高單價感。",
        "可以用市場導向模式檢查作品是否具備商業吸引力。"
      ],
      prefill: {
        theme: "高級商業花禮設計",
        palette: "奶油白、焦糖棕、霧粉",
        style: "高級商業花禮",
        scene: "節慶送禮",
        mood: "精緻、穩重、質感",
        purpose: "高單價花禮提案",
        extra: "請強調商品感、拍照效果、市場接受度與高級感。"
      }
    },
    craft: {
      title: "細節工藝型花藝師",
      subtitle: "你重視完成度、細節、收尾與作品精緻感",
      score: 91,
      tags: ["細節控", "完成度高", "精緻路線"],
      summary: "你不是只看作品遠看美不美，也很在意近看是否乾淨、花材是否處理好、層次是否自然。你適合發展高級花禮、精緻桌花、作品集與教學示範作品。",
      strengths: [
        "你重視細節，作品容易有乾淨、完整的感覺。",
        "你適合追求高完成度、高質感與穩定輸出。",
        "你在修正作品時，通常能抓到細節問題。"
      ],
      suggestions: [
        "練習時可以針對一件作品連續修三輪，觀察細節提升。",
        "下一步建議加強主題表現，讓作品不只精緻，也更有記憶點。",
        "可以用 AI 優化頁整理下一輪要修的 2～3 個關鍵細節。"
      ],
      prefill: {
        theme: "精緻感提升練習作品",
        palette: "奶茶白、淡粉、淺綠",
        style: "極簡精緻感",
        scene: "桌花設計",
        mood: "乾淨、細緻、高級",
        purpose: "作品完成度訓練",
        extra: "請強調細節、層次、留白、收尾與高級感。"
      }
    },
    creative: {
      title: "創意實驗型花藝師",
      subtitle: "你喜歡把花藝變成有故事、有驚喜的作品",
      score: 93,
      tags: ["創意強", "主題感高", "適合展演作品"],
      summary: "你不太滿足於普通漂亮，而是希望作品有故事、有主題、有新鮮感。你適合發展主題創作、展演花藝、跨材料實驗與具有辨識度的競賽作品。",
      strengths: [
        "你敢嘗試不同材料、主題與表現方式。",
        "你容易做出有故事性與記憶點的作品。",
        "你適合主題創作、展演花藝與競賽發想。"
      ],
      suggestions: [
        "練習時可以先寫一句作品概念，再開始做設計。",
        "下一步建議加強結構與收斂，避免作品想法太多而分散。",
        "可以用 AI 預演先產生 3 種主題方向，再挑最有說服力的一個深化。"
      ],
      prefill: {
        theme: "主題創意花藝作品",
        palette: "綠、灰、亮黃點綴",
        style: "現代線條感",
        scene: "花藝競賽",
        mood: "創意、故事感、視覺張力",
        purpose: "主題創作訓練",
        extra: "請強調故事性、主題辨識、創意材料運用與視覺記憶點。"
      }
    }
  };
}

function initTalentPage() {
  const questions = Array.from(document.querySelectorAll('[data-talent-question]'));
  const statusBar = byId('talentStatusBar');
  const emptyState = byId('talentEmptyState');
  const resultWrap = byId('talentResultWrap');
  const profiles = getTalentProfiles();
  let currentResultText = "";
function updateTalentProgress() {
  const done = questions.filter(q => q.value).length;
  const el = byId('talentProgress');
  if (el) {
    el.textContent = `已完成 ${done} / ${questions.length} 題`;
  }
}

  function calculateResult() {
    const scores = {
      aesthetic: 0,
      structure: 0,
      market: 0,
      craft: 0,
      creative: 0
    };

    for (const q of questions) {
      if (!q.value) {
        alert('請完成所有題目後再查看結果。');
        return null;
      }
      scores[q.value] += 1;
    }

    const topType = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    return {
      type: topType,
      profile: profiles[topType],
      scores
    };
  }

  function renderTalentResult(result) {
    const { profile, scores } = result;

    byId('talentTitle').textContent = profile.title;
    byId('talentSubtitle').textContent = profile.subtitle;
    byId('talentScore').textContent = profile.score;

       let level = "";
     if (profile.score >= 93) level = "🔥 天才級";
     else if (profile.score >= 90) level = "⭐ 高潛力";
     else level = "🌱 發展型";

    byId('talentSubtitle').textContent = profile.subtitle + "｜" + level;
    byId('talentSummary').textContent = profile.summary;

    const tags = byId('talentTags');
    tags.innerHTML = '';
    profile.tags.forEach(tag => {
      const div = document.createElement('div');
      div.className = 'market-chip';
      div.textContent = tag;
      tags.appendChild(div);
    });

    const strengthBox = byId('talentStrengths');
    strengthBox.innerHTML = '';
    profile.strengths.forEach(text => {
      const div = document.createElement('div');
      div.className = 'analysis-item';
      div.textContent = text;
      strengthBox.appendChild(div);
    });

    const suggestionBox = byId('talentSuggestions');
    suggestionBox.innerHTML = '';
    profile.suggestions.forEach(text => {
      const div = document.createElement('div');
      div.className = 'analysis-item';
      div.textContent = text;
      suggestionBox.appendChild(div);
    });

    currentResultText = `我的花藝天分測驗結果：${profile.title}

${profile.subtitle}

【天分指數】
${profile.score}

【分析】
${profile.summary}

【我的優勢】
${profile.strengths.map((t, i) => `${i + 1}. ${t}`).join('\n')}

【建議練習方向】
${profile.suggestions.map((t, i) => `${i + 1}. ${t}`).join('\n')}

【五項分布】
直覺美感型：${scores.aesthetic}
結構競賽型：${scores.structure}
市場提案型：${scores.market}
細節工藝型：${scores.craft}
創意實驗型：${scores.creative}`;

    save('flora.talent.result', result);
    show(statusBar, 'block');
    hide(emptyState);
    show(resultWrap, 'block');
  }

  function submitTalent() {
    const result = calculateResult();
    if (!result) return;
    countAction('talent');
    trackGlobalAction('talent');
    renderTalentResult(result);
  }

  function resetTalent() {
    questions.forEach(q => q.value = '');
    hide(statusBar);
    show(emptyState, 'flex');
    hide(resultWrap);
    currentResultText = '';
    remove('flora.talent.result');
    updateTalentProgress();
  }

  function goGenerateWithTalent() {
    const saved = load('flora.talent.result');
    if (!saved?.profile?.prefill) {
      alert('請先完成測驗。');
      return;
    }

    save(STORAGE_KEYS.generatePrefill, saved.profile.prefill);
    window.location.href = 'generate.html';
  }
  
   questions.forEach(q => {
   q.addEventListener('change', updateTalentProgress);
   });
    updateTalentProgress();

  byId('talentSubmitBtn')?.addEventListener('click', submitTalent);
  byId('talentResetBtn')?.addEventListener('click', resetTalent);
  byId('talentToGenerateBtn')?.addEventListener('click', goGenerateWithTalent);
  byId('talentCopyBtn')?.addEventListener('click', () => {
    if (!currentResultText) return alert('目前沒有可複製的測驗結果。');
    copyText(currentResultText, '已複製花藝天分測驗結果。');
  });

  const saved = load('flora.talent.result');
  if (saved?.profile) {
    renderTalentResult(saved);
  } else {
    hide(statusBar);
    hide(resultWrap);
  }
}


  function initOptimizePage() {
    const ids = ['theme', 'style', 'palette', 'flowers', 'strengths', 'weaknesses', 'goal', 'mode'];

    function getFormData() {
      return Object.fromEntries(ids.map(id => [id, byId(id).value.trim()]));
    }

    function setFormData(data = {}) {
      ids.forEach(id => {
        if (byId(id)) byId(id).value = data[id] || (id === 'mode' ? 'balanced' : '');
      });
    }

    function renderPriorities(items) {
      const container = byId('priorityList');
      container.innerHTML = '';
      items.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'priority-item';
        div.innerHTML = `
          <div class="priority-num">${index + 1}</div>
          <div class="priority-content">
            <strong>${item.title}</strong>
            <span>${item.desc}</span>
          </div>`;
        container.appendChild(div);
      });
    }

    function renderActions(items) {
      const container = byId('actionList');
      container.innerHTML = '';
      items.forEach(text => {
        const div = document.createElement('div');
        div.className = 'list-item';
        div.textContent = text;
        container.appendChild(div);
      });
    }

    function renderModeTags(data) {
      const container = byId('modeTags');
      container.innerHTML = '';
      [getModeLabel(data.mode), data.theme || '作品主題', data.style || '原風格延續', data.palette || '原色系延續'].forEach(tagText => {
        const span = document.createElement('span');
        span.className = 'tag';
        span.textContent = tagText;
        container.appendChild(span);
      });
    }

    function renderPlan(payload) {
      byId('summaryBox').textContent = payload.plan.summary;
      byId('keepFocusText').textContent = payload.form.strengths || '保留原作品中已經成立的優點與氣質。';
      byId('improveFocusText').textContent = payload.form.goal;
      renderPriorities(payload.plan.priorities || []);
      renderActions(payload.plan.actions || []);
      renderModeTags(payload.form);
      byId('promptArea').value = payload.prompt || '';

      show(byId('statusBar'), 'block');
      hide(byId('emptyState'));
      hide(byId('emptyStateRight'));
      show(byId('middleResult'), 'block');
      show(byId('rightResult'), 'block');
    }

    async function handleOptimize() {
      
     if (!checkFreeLimit()) return;

     const form = getFormData();
      if (!form.theme || !form.weaknesses || !form.goal) {
        alert('請至少填寫：作品主題、主要問題點、這一輪最想優先改善什麼。');
        return;
      }

      try {
        const result = await fetchJson(`${API_BASE}/api/optimize`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        });

        const payload = {
          form,
          plan: {
            summary: result?.summary || '',
            priorities: Array.isArray(result?.priorities) ? result.priorities : [],
            actions: Array.isArray(result?.actions) ? result.actions : []
          },
          prompt: result?.prompt || '',
          createdAt: new Date().toISOString()
        };

        save(STORAGE_KEYS.optimizeForm, form);
        save(STORAGE_KEYS.optimizeResult, payload);
        increaseUsageCount();
        countAction('optimize');
        trackGlobalAction('optimize');
        renderPlan(payload);
        showUsageAlert();
      } catch (err) {
        alert(`AI 優化失敗：${err.message}`);
      }
    }

    function resetOptimize() {
      setFormData({});
      byId('mode').value = 'balanced';
      hide(byId('statusBar'));
      show(byId('emptyState'), 'flex');
      show(byId('emptyStateRight'), 'flex');
      hide(byId('middleResult'));
      hide(byId('rightResult'));
      byId('priorityList').innerHTML = '';
      byId('actionList').innerHTML = '';
      byId('modeTags').innerHTML = '';
      byId('promptArea').value = '';
      remove(STORAGE_KEYS.optimizeForm);
      remove(STORAGE_KEYS.optimizeResult);
    }

    function goToGenerate() {
      const payload = load(STORAGE_KEYS.optimizeResult);
      if (!payload) {
        alert('請先產生優化方向。');
        return;
      }

      const prefill = {
        theme: payload.form.theme,
        palette: payload.form.palette,
        style: payload.form.style,
        flowers: payload.form.flowers,
        extra: payload.prompt,
        purpose: '優化再生成',
        scene: payload.form.mode === 'market' ? '節慶送禮' : '花藝競賽',
        mood: payload.form.mode === 'market' ? '精緻、穩重、質感' : '張力、結構感、明確焦點'
      };

      save(STORAGE_KEYS.generatePrefill, prefill);
      window.location.href = 'generate.html';
    }

    document.querySelectorAll('[data-example-optimize]').forEach(btn => {
      btn.addEventListener('click', () => {
        setFormData(optimizeExamples[btn.dataset.exampleOptimize] || {});
        save(STORAGE_KEYS.optimizeForm, getFormData());
      });
    });

    ids.forEach(id => byId(id)?.addEventListener('input', () => save(STORAGE_KEYS.optimizeForm, getFormData())));
    byId('optimizeBtn')?.addEventListener('click', handleOptimize);
    byId('resetOptimizeBtn')?.addEventListener('click', resetOptimize);

    byId('copyPromptBtn')?.addEventListener('click', () => {
      const text = byId('promptArea').value;
      if (!text) return alert('目前沒有可複製的 prompt。');
      copyText(text, '已複製優化 prompt。');
    });

    byId('toGenerateBtn')?.addEventListener('click', goToGenerate);

    const savedForm = load(STORAGE_KEYS.optimizeForm, {});
    const judgePayload = load(STORAGE_KEYS.judgeResult, null);
    if (judgePayload && !savedForm.theme) {
      savedForm.theme = judgePayload.form.workTheme || '';
      savedForm.flowers = judgePayload.form.flowerInfo || '';
      savedForm.strengths = (judgePayload.result.strengths || []).join('；');
      savedForm.weaknesses = (judgePayload.result.weaknesses || []).join('；');
      savedForm.goal = judgePayload.result.suggestions?.[0] || '';
      savedForm.mode = judgePayload.form.judgeMode === 'market'
        ? 'market'
        : (judgePayload.form.judgeMode === 'contest' ? 'contest' : 'balanced');
    }

    const generateForm = load(STORAGE_KEYS.generateForm, {});
    savedForm.style = savedForm.style || generateForm.style || '';
    savedForm.palette = savedForm.palette || generateForm.palette || '';
    setFormData(savedForm);

    const savedResult = load(STORAGE_KEYS.optimizeResult);
    if (savedResult) renderPlan(savedResult);
  }

  document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;
  if (page === 'index') initIndexPage();
  if (page === 'generate') initGeneratePage();
  if (page === 'judge') initJudgePage();
  if (page === 'optimize') initOptimizePage();
  if (page === 'talent') initTalentPage();
  });
})();