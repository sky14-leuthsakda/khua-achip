import { a as store_get, e as ensure_array_like, b as attr_class, c as attr, d as escape_html, u as unsubscribe_stores, s as slot, f as bind_props, g as fallback, h as attr_style, i as stringify, j as head } from "../../chunks/index.js";
import { d as derived, w as writable } from "../../chunks/index2.js";
import "clsx";
const TAB_SCREENS = ["home", "explore", "mentor", "saved", "profile"];
const initialState = {
  currentScreen: "home",
  stack: ["home"],
  params: {
    careerId: "sw",
    tutorId: "t1",
    centerId: "c1",
    scholId: "s1"
  }
};
function createNavStore() {
  const { subscribe, set, update } = writable(initialState);
  return {
    subscribe,
    go: (screen, newParams) => {
      update((state) => {
        const isTab = TAB_SCREENS.includes(screen);
        const stack = isTab ? [screen] : [...state.stack, screen];
        const params = newParams ? { ...state.params, ...newParams } : state.params;
        return {
          currentScreen: screen,
          stack,
          params
        };
      });
    },
    back: () => {
      update((state) => {
        if (state.stack.length > 1) {
          const nextStack = [...state.stack];
          nextStack.pop();
          const prevScreen = nextStack[nextStack.length - 1];
          return {
            ...state,
            currentScreen: prevScreen,
            stack: nextStack
          };
        }
        return {
          ...state,
          currentScreen: "home",
          stack: ["home"]
        };
      });
    },
    setParams: (params) => {
      update((state) => ({
        ...state,
        params: { ...state.params, ...params }
      }));
    },
    reset: () => set(initialState)
  };
}
const navStore = createNavStore();
const isBottomNavVisible = derived(navStore, ($nav) => {
  return TAB_SCREENS.includes($nav.currentScreen);
});
function BottomNav($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const tabs = [
      { id: "home", label: "ໜ້າຫຼັກ", icon: "home" },
      { id: "explore", label: "ຄົ້ນຫາ", icon: "explore" },
      { id: "mentor", label: "AI Mentor", icon: "mentor" },
      { id: "saved", label: "ບັນທຶກ", icon: "saved" },
      { id: "profile", label: "ໂປຣໄຟລ໌", icon: "profile" }
    ];
    if (store_get($$store_subs ??= {}, "$isBottomNavVisible", isBottomNavVisible)) {
      $$renderer2.push(`<!--[0--><nav class="bottomnav svelte-oeh3u8" id="bottomnav"><!--[-->`);
      const each_array = ensure_array_like(tabs);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let tab = each_array[$$index];
        $$renderer2.push(`<button type="button"${attr_class(`navitem ${store_get($$store_subs ??= {}, "$navStore", navStore).currentScreen === tab.id ? "active" : ""}`, "svelte-oeh3u8")}${attr("data-tab", tab.id)}>`);
        if (tab.icon === "home") {
          $$renderer2.push(`<!--[0--><svg viewBox="0 0 24 24" class="svelte-oeh3u8"><path d="M3 11.5 12 4l9 7.5"></path><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"></path></svg>`);
        } else if (tab.icon === "explore") {
          $$renderer2.push(`<!--[1--><svg viewBox="0 0 24 24" class="svelte-oeh3u8"><circle cx="11" cy="11" r="7"></circle><path d="m21 21-4.3-4.3"></path></svg>`);
        } else if (tab.icon === "mentor") {
          $$renderer2.push(`<!--[2--><svg viewBox="0 0 24 24" class="svelte-oeh3u8"><path d="M12 3a5 5 0 0 0-5 5c0 2 1 3 1 5v1h8v-1c0-2 1-3 1-5a5 5 0 0 0-5-5Z"></path><path d="M9 18h6M10 21h4"></path></svg>`);
        } else if (tab.icon === "saved") {
          $$renderer2.push(`<!--[3--><svg viewBox="0 0 24 24" class="svelte-oeh3u8"><path d="M12 21s-7-4.35-9.5-8.5C.5 8.5 2.8 5 6.3 5c2 0 3.3 1 5.7 3.5C14.4 6 15.7 5 17.7 5 21.2 5 23.5 8.5 21.5 12.5 19 16.65 12 21 12 21Z"></path></svg>`);
        } else if (tab.icon === "profile") {
          $$renderer2.push(`<!--[4--><svg viewBox="0 0 24 24" class="svelte-oeh3u8"><circle cx="12" cy="8" r="4"></circle><path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6"></path></svg>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--> <span class="svelte-oeh3u8">${escape_html(tab.label)}</span></button>`);
      }
      $$renderer2.push(`<!--]--></nav>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
const DEMO_STEPS = [
  { screen: "home", name: "ໜ້າຫຼັກ" },
  { screen: "riasecResult", name: "ຜົນການປະເມີນ RIASEC" },
  { screen: "careerDetail", name: "ອາຊີບທີ່ແນະນຳ", params: { careerId: "sw" } },
  { screen: "uniDetail", name: "ມະຫາວິທະຍາໄລ" },
  { screen: "mentor", name: "AI Mentor" },
  { screen: "tutorDetail", name: "ອາຈານແນະນຳ", params: { tutorId: "t1" } },
  { screen: "centerDetail", name: "ສູນຮຽນແນະນຳ", params: { centerId: "c1" } },
  { screen: "scholDetail", name: "ທຶນການສຶກສາ", params: { scholId: "s1" } },
  { screen: "roadmap", name: "ເສັ້ນທາງການຮຽນ" }
];
function createDemoStore() {
  const { subscribe, set, update } = writable({
    isActive: false,
    stepIndex: 0
  });
  const applyStep = (index) => {
    const step = DEMO_STEPS[index];
    if (step) {
      navStore.go(step.screen, step.params);
    }
  };
  return {
    subscribe,
    startDemo: () => {
      set({ isActive: true, stepIndex: 0 });
      applyStep(0);
    },
    next: () => {
      update((state) => {
        if (!state.isActive) return state;
        const nextIdx = Math.min(DEMO_STEPS.length - 1, state.stepIndex + 1);
        applyStep(nextIdx);
        return { ...state, stepIndex: nextIdx };
      });
    },
    prev: () => {
      update((state) => {
        if (!state.isActive) return state;
        const prevIdx = Math.max(0, state.stepIndex - 1);
        applyStep(prevIdx);
        return { ...state, stepIndex: prevIdx };
      });
    },
    exit: () => {
      set({ isActive: false, stepIndex: 0 });
      navStore.go("home");
    }
  };
}
const demoStore = createDemoStore();
function DemoBar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let currentStep;
    currentStep = DEMO_STEPS[store_get($$store_subs ??= {}, "$demoStore", demoStore).stepIndex] || DEMO_STEPS[0];
    if (store_get($$store_subs ??= {}, "$demoStore", demoStore).isActive) {
      $$renderer2.push(`<!--[0--><div class="demo-bar show svelte-1s4n44k"><div><div class="step-lbl svelte-1s4n44k">${escape_html(store_get($$store_subs ??= {}, "$demoStore", demoStore).stepIndex + 1)}/${escape_html(DEMO_STEPS.length)}</div> <div class="step-name svelte-1s4n44k">${escape_html(currentStep.name)}</div></div> <div class="demo-controls svelte-1s4n44k"><button type="button" aria-label="ຂັ້ນຕອນກ່ອນໜ້າ" class="svelte-1s4n44k">‹</button> <button type="button" aria-label="ຂັ້ນຕອນຕໍ່ໄປ" class="svelte-1s4n44k">›</button> <button type="button" class="exit svelte-1s4n44k">ອອກ</button></div></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function DeviceFrame($$renderer, $$props) {
  $$renderer.push(`<div class="device" id="device"><div class="notch"></div> <div class="screens" id="screens"><!--[-->`);
  slot($$renderer, $$props, "default", {});
  $$renderer.push(`<!--]--></div> `);
  BottomNav($$renderer);
  $$renderer.push(`<!----> `);
  DemoBar($$renderer);
  $$renderer.push(`<!----></div>`);
}
function CareerCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let career = $$props["career"];
    let layout = fallback($$props["layout"], "scroll");
    if (layout === "scroll") {
      $$renderer2.push(`<!--[0--><div class="career-card"><div class="emoji-badge">${escape_html(career.icon)}</div> <h4>${escape_html(career.title)}</h4> <div class="tag">${escape_html(career.tag)}</div> <div class="match-pill">ກົງກັນ ${escape_html(career.match)}%</div></div>`);
    } else if (layout === "list") {
      $$renderer2.push(`<!--[1--><div class="career-card" style="min-width: auto;"><div class="row"><div class="emoji-badge" style="margin:0;">${escape_html(career.icon)}</div> <div style="flex:1;"><h4>${escape_html(career.title)}</h4> <div class="tag">${escape_html(career.tag)}</div> <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;"><span style="font-size:11.5px; color:var(--ink-600);">${escape_html(career.salary)}</span> <span class="match-pill">ກົງກັນ ${escape_html(career.match)}%</span></div></div></div></div>`);
    } else if (layout === "result") {
      $$renderer2.push(`<!--[2--><div class="career-card" style="min-width: auto;"><div class="row"><div class="emoji-badge" style="margin:0;">${escape_html(career.icon)}</div> <div style="flex:1;"><h4>${escape_html(career.title)}</h4> <div class="tag" style="margin-bottom:4px;">${escape_html(career.tag)}</div> <div style="font-size:11px; color:var(--ink-600);">ເໝາະສົມເພາະເຈົ້າມີຄະແນນ Investigative ສູງ ແລະ ມັກແກ້ໄຂບັນຫາທີ່ທ້າທາຍ</div></div> <span class="match-pill" style="align-self:flex-start;">${escape_html(career.match)}%</span></div></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { career, layout });
  });
}
function TutorCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let tutor = $$props["tutor"];
    let layout = fallback($$props["layout"], "scroll");
    if (layout === "scroll") {
      $$renderer2.push(`<!--[0--><div class="tutor-card" style="min-width:190px;"><div class="avatar" style="margin-bottom:8px;">${escape_html(tutor.init)}</div> <div class="name-row"><h4>${escape_html(tutor.name)}</h4></div> <div class="meta-line">${escape_html(tutor.subj)}</div> <div class="rating">⭐ ${escape_html(tutor.rating)} <span style="color:var(--ink-400); font-weight:400;">· ${escape_html(tutor.students)} ນັກຮຽນ</span></div> <div class="price-tag" style="display:block; margin-top:6px;">${escape_html(tutor.price)}</div></div>`);
    } else if (layout === "list") {
      $$renderer2.push(`<!--[1--><div class="tutor-card"><div class="row"><div class="avatar">${escape_html(tutor.init)}</div> <div style="flex:1;"><div class="name-row"><h4>${escape_html(tutor.name)}</h4> <span class="badge-verified">✅</span></div> <div class="meta-line">${escape_html(tutor.subj)} · ${escape_html(tutor.years)} ປີປະສົບການ</div> <div class="rating">⭐ ${escape_html(tutor.rating)} <span style="color:var(--ink-400); font-weight:400;">· ນັກຮຽນ ${escape_html(tutor.students)} ຄົນ</span></div> <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;"><span class="price-tag">${escape_html(tutor.price)}</span> <span class="chip">${escape_html(tutor.mode)}</span></div></div></div></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { tutor, layout });
  });
}
function CenterCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let center = $$props["center"];
    let layout = fallback($$props["layout"], "scroll");
    if (layout === "scroll") {
      $$renderer2.push(`<!--[0--><div class="center-card" style="min-width:190px;"><div class="avatar"${attr_style(`background:${stringify(center.grad)}; margin-bottom:8px;`)}>${escape_html(center.init)}</div> <h4 style="font-size:13px; margin:0;">${escape_html(center.name)}</h4> <div class="meta-line">${escape_html(center.loc)}</div> <div class="rating">⭐ ${escape_html(center.rating)}</div></div>`);
    } else if (layout === "list") {
      $$renderer2.push(`<!--[1--><div class="center-card"><div class="row"><div class="avatar"${attr_style(`background:${stringify(center.grad)};`)}>${escape_html(center.init)}</div> <div style="flex:1;"><h4 style="font-size:13.5px; margin:0;">${escape_html(center.name)}</h4> <div class="meta-line">${escape_html(center.subj)} · ${escape_html(center.loc)}</div> <div class="rating">⭐ ${escape_html(center.rating)} <span style="color:var(--ink-400); font-weight:400;">· ${escape_html(center.mode)}</span></div> <div class="price-tag" style="display:block; margin-top:6px;">${escape_html(center.price)}</div></div></div></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { center, layout });
  });
}
function ScholCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let scholarship = $$props["scholarship"];
    let layout = fallback($$props["layout"], "scroll");
    if (layout === "scroll") {
      $$renderer2.push(`<!--[0--><div class="schol-card" style="min-width:210px;"><b style="font-size:13px;">${escape_html(scholarship.name)}</b> <div class="meta-line">${escape_html(scholarship.country)} · ${escape_html(scholarship.funded)}</div> <div class="match-pill">ກົງກັນ ${escape_html(scholarship.match)}%</div></div>`);
    } else if (layout === "list") {
      $$renderer2.push(`<!--[1--><div class="schol-card"><div style="display:flex; justify-content:space-between;"><b style="font-size:13.5px;">${escape_html(scholarship.name)}</b> <span class="match-pill">ກົງກັນ ${escape_html(scholarship.match)}%</span></div> <div class="meta-line">${escape_html(scholarship.country)} · ${escape_html(scholarship.level)} · ${escape_html(scholarship.funded)}</div> <div class="pill-source">📅 ໝົດເຂດ ${escape_html(scholarship.deadline)}</div></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { scholarship, layout });
  });
}
const __vite_import_meta_env__ = {};
const DEFAULT_API_URL = "http://localhost:8787";
function getApiBaseUrl() {
  if (typeof window !== "undefined") {
    const envUrl = __vite_import_meta_env__?.VITE_API_URL || __vite_import_meta_env__?.PUBLIC_API_URL;
    if (envUrl) return envUrl;
  }
  return DEFAULT_API_URL;
}
async function apiFetch(endpoint, options = {}) {
  const baseUrl = getApiBaseUrl();
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${baseUrl}${cleanEndpoint}`;
  const headers = new Headers(options.headers || {});
  if (!headers.has("Content-Type") && options.body && typeof options.body === "string") {
    headers.set("Content-Type", "application/json");
  }
  try {
    const res = await fetch(url, {
      ...options,
      headers
    });
    const data = await res.json();
    if (!res.ok || data.success === false) {
      throw new Error(data.error || `API request failed with status ${res.status}`);
    }
    return data.data !== void 0 ? data.data : data;
  } catch (err) {
    console.error(`[API Fetch Error] ${endpoint}:`, err);
    throw err;
  }
}
async function fetchCareerById(id) {
  return apiFetch(`/api/careers/${id}`);
}
async function fetchTutorById(id) {
  return apiFetch(`/api/tutors/${id}`);
}
async function fetchCenterById(id) {
  return apiFetch(`/api/centers/${id}`);
}
async function fetchScholarshipById(id) {
  return apiFetch(`/api/scholarships/${id}`);
}
function HomeView($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let careers = [];
    let tutors = [];
    let centers = [];
    let scholarships = [];
    $$renderer2.push(`<div class="screen active"><div class="status-space"></div> <div class="pad"><div class="hero-card"><div style="font-size:20px;">ສະບາຍດີ, ອາລິສາ 👋</div> <div style="font-size:13px; color:rgba(255,255,255,0.75); margin-top:4px;">ມື້ນີ້ຢາກຄົ້ນຫາຫຍັງ?</div>  <div class="searchbar"><span>🔍</span> <input readonly="" placeholder="ຄົ້ນຫາອາຊີບ, ວິຊາ, ອາຈານ, ສູນຮຽນ…"/></div></div> <div class="feature-grid"><div class="feature-card"><div class="feature-icon" style="background:var(--teal-100);">🎯</div> <h4>ຄົ້ນຫາອາຊີບ</h4> <p>ອາຊີບ 120+ ລາຍການ</p></div>  <div class="feature-card"><div class="feature-icon" style="background:#FDECE6;">👨‍🏫</div> <h4>ຊອກຫາອາຈານ</h4> <p>ອາຈານ 340+ ຄົນ</p></div>  <div class="feature-card"><div class="feature-icon" style="background:#EFF1FA;">🏫</div> <h4>ຊອກຫາສູນຮຽນ</h4> <p>ສູນຮຽນ 85+ ແຫ່ງ</p></div>  <div class="feature-card"><div class="feature-icon" style="background:#FBF0DD;">🎓</div> <h4>ຊອກຫາທຶນການສຶກສາ</h4> <p>ທຶນ 60+ ລາຍການ</p></div></div> <div class="section-title"><h3>ອາຊີບແນະນຳສຳລັບເຈົ້າ</h3>  <span class="see-all">ເບິ່ງທັງໝົດ</span></div></div> <div class="hscroll"><!--[-->`);
    const each_array = ensure_array_like(careers);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let c = each_array[$$index];
      CareerCard($$renderer2, { career: c, layout: "scroll" });
    }
    $$renderer2.push(`<!--]--></div> <div class="pad"><div class="section-title"><h3>ອາຈານແນະນຳ</h3>  <span class="see-all">ເບິ່ງທັງໝົດ</span></div></div> <div class="hscroll"><!--[-->`);
    const each_array_1 = ensure_array_like(tutors);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let t = each_array_1[$$index_1];
      TutorCard($$renderer2, { tutor: t, layout: "scroll" });
    }
    $$renderer2.push(`<!--]--></div> <div class="pad"><div class="section-title"><h3>ສູນຮຽນໃກ້ເຈົ້າ</h3>  <span class="see-all">ເບິ່ງທັງໝົດ</span></div></div> <div class="hscroll"><!--[-->`);
    const each_array_2 = ensure_array_like(centers);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let ce = each_array_2[$$index_2];
      CenterCard($$renderer2, { center: ce, layout: "scroll" });
    }
    $$renderer2.push(`<!--]--></div> <div class="pad"><div class="section-title"><h3>ທຶນການສຶກສາແນະນຳ</h3>  <span class="see-all">ເບິ່ງທັງໝົດ</span></div></div> <div class="hscroll"><!--[-->`);
    const each_array_3 = ensure_array_like(scholarships);
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let s = each_array_3[$$index_3];
      ScholCard($$renderer2, { scholarship: s, layout: "scroll" });
    }
    $$renderer2.push(`<!--]--></div> <div class="pad" style="margin-top:6px;"><div class="card" style="display:flex; gap:14px; align-items:center; cursor:pointer;"><div style="font-size:26px;">🧭</div> <div style="flex:1;"><div style="font-weight:700; font-size:13.5px;">ຍັງບໍ່ໄດ້ເຮັດແບບປະເມີນ?</div> <div style="font-size:11.5px; color:var(--ink-400); margin-top:2px;">ຮູ້ຈັກຕົວເອງ ແລະ ຄົ້ນຫາອາຊີບທີ່ໃຊ່ພາຍໃນ 5 ນາທີ</div></div> <div style="color:var(--teal-600); font-size:18px;">›</div></div></div> <div style="height:20px;"></div> <button class="demo-fab">▶ ໂໝດສາທິດ</button></div>`);
  });
}
function ExploreHub($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="screen active"><div class="status-space"></div> <div class="pad"><div class="topbar" style="padding:0 0 4px 0;"><h2>ຄົ້ນຫາ</h2></div> <div class="searchbar" style="background:#EFF1EC; border-color:var(--line); margin-top:6px;"><span>🔍</span> <input style="color:var(--ink-900);" placeholder="ຄົ້ນຫາອາຊີບ, ວິຊາ, ອາຈານ, ສູນຮຽນ…"/></div> <div class="section-title" style="margin-top:20px;"><h3>ໝວດໝູ່</h3></div> <div style="display:flex; flex-direction:column; gap:12px;"><div class="card" style="display:flex; gap:14px; align-items:center; cursor:pointer;"><div class="feature-icon" style="background:var(--teal-100); margin:0;">🎯</div> <div style="flex:1;"><b style="font-size:13.5px;">ຄົ້ນຫາອາຊີບ</b> <div style="font-size:11.5px; color:var(--ink-400);">ຄົ້ນພົບອາຊີບທີ່ເໝາະກັບເຈົ້າ</div></div> <span style="color:var(--ink-400);">›</span></div>  <div class="card" style="display:flex; gap:14px; align-items:center; cursor:pointer;"><div class="feature-icon" style="background:#EFF1FA; margin:0;">🎓</div> <div style="flex:1;"><b style="font-size:13.5px;">ມະຫາວິທະຍາໄລ ແລະ ວິຊາຮຽນ</b> <div style="font-size:11.5px; color:var(--ink-400);">ຂໍ້ມູນມະຫາວິທະຍາໄລໃນ ສປປ ລາວ</div></div> <span style="color:var(--ink-400);">›</span></div>  <div class="card" style="display:flex; gap:14px; align-items:center; cursor:pointer;"><div class="feature-icon" style="background:#FDECE6; margin:0;">👨‍🏫</div> <div style="flex:1;"><b style="font-size:13.5px;">ຊອກຫາອາຈານສອນເພີ່ມ</b> <div style="font-size:11.5px; color:var(--ink-400);">ຈອງອາຈານສ່ວນຕົວ ອອນລາຍ ຫຼື ອອຟລາຍ</div></div> <span style="color:var(--ink-400);">›</span></div>  <div class="card" style="display:flex; gap:14px; align-items:center; cursor:pointer;"><div class="feature-icon" style="background:#EFF1FA; margin:0;">🏫</div> <div style="flex:1;"><b style="font-size:13.5px;">ຊອກຫາສູນຮຽນເພີ່ມ</b> <div style="font-size:11.5px; color:var(--ink-400);">ພາສາ, ໂປຣແກຣມ, ຄະນິດສາດ ແລະ ອື່ນໆ</div></div> <span style="color:var(--ink-400);">›</span></div>  <div class="card" style="display:flex; gap:14px; align-items:center; cursor:pointer;"><div class="feature-icon" style="background:#FBF0DD; margin:0;">🎓</div> <div style="flex:1;"><b style="font-size:13.5px;">ຊອກຫາທຶນການສຶກສາ</b> <div style="font-size:11.5px; color:var(--ink-400);">ທຶນພາຍໃນ ແລະ ຕ່າງປະເທດ</div></div> <span style="color:var(--ink-400);">›</span></div></div></div></div>`);
  });
}
function MentorChat($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let messages = [
      {
        id: "m1",
        sender: "user",
        text: "ຂ້ອຍຢາກເປັນ Software Developer ຄວນຮຽນຫຍັງ?",
        timestamp: "10:00"
      },
      {
        id: "m2",
        sender: "ai",
        text: "ຈາກຄວາມສົນໃຈ ແລະ ຜົນປະເມີນຂອງເຈົ້າ (Investigative ສູງ) ນີ້ແມ່ນຄວາມຮູ້ພື້ນຖານທີ່ຄວນເລີ່ມຮຽນ:",
        recommendations: [
          "1. ຄະນິດສາດ",
          "2. ພື້ນຖານໂປຣແກຣມມິ່ງ",
          "3. ພາສາອັງກິດ",
          "4. Database",
          "5. Web Development"
        ],
        suggestedAction: {
          type: "tutor",
          label: "ອາຈານ ວັນນະລີ",
          targetId: "t1",
          meta: {
            name: "ອາຈານ ວັນນະລີ",
            subj: "ໂປຣແກຣມມິ່ງ",
            rating: "4.8",
            init: "ວລ"
          }
        },
        timestamp: "10:00"
      }
    ];
    let inputText = "";
    let sending = false;
    const quickChips = [
      "ຄວນຮຽນຫຍັງ?",
      "ແນະນຳອາຈານ",
      "ແນະນຳສູນຮຽນ",
      "ທຶນທີ່ເໝາະກັບຂ້ອຍ"
    ];
    $$renderer2.push(`<div class="screen active svelte-nnjvbq" style="padding-bottom: 74px;"><div class="status-space svelte-nnjvbq"></div> <div class="topbar svelte-nnjvbq" style="padding-bottom:10px; border-bottom:1px solid var(--line);"><div class="avatar svelte-nnjvbq" style="width:34px; height:34px; border-radius:10px; font-size:15px;">AI</div> <div class="svelte-nnjvbq"><h2 style="font-size:15px;" class="svelte-nnjvbq">AI Mentor</h2> <div class="topbar-sub svelte-nnjvbq">ຮູ້ຈັກເຈົ້າຈາກຜົນປະເມີນ ແລະ ຄວາມສົນໃຈ</div></div></div> <div class="quick-chip-row svelte-nnjvbq"><!--[-->`);
    const each_array = ensure_array_like(quickChips);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let chip = each_array[$$index];
      $$renderer2.push(`<div class="quick-chip svelte-nnjvbq">${escape_html(chip)}</div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="chat-scroll svelte-nnjvbq" style="max-height: calc(100% - 170px);"><!--[-->`);
    const each_array_1 = ensure_array_like(messages);
    for (let $$index_2 = 0, $$length = each_array_1.length; $$index_2 < $$length; $$index_2++) {
      let msg = each_array_1[$$index_2];
      $$renderer2.push(`<div${attr_class(`bubble ${stringify(msg.sender)}`, "svelte-nnjvbq")}>${escape_html(msg.text)} `);
      if (msg.recommendations && msg.recommendations.length > 0) {
        $$renderer2.push(`<!--[0--><div class="reco-inline svelte-nnjvbq" style="margin-top:8px;"><!--[-->`);
        const each_array_2 = ensure_array_like(msg.recommendations);
        for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
          let reco = each_array_2[$$index_1];
          $$renderer2.push(`<div class="reco-chip svelte-nnjvbq">${escape_html(reco)}</div>`);
        }
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div> `);
      if (msg.suggestedAction) {
        $$renderer2.push("<!--[0-->");
        if (msg.suggestedAction.type === "tutor" && msg.suggestedAction.meta) {
          $$renderer2.push(`<!--[0--><div class="card svelte-nnjvbq" style="cursor:pointer; margin-top:-4px;"><div class="row svelte-nnjvbq"><div class="avatar svelte-nnjvbq">${escape_html(msg.suggestedAction.meta.init || "ວລ")}</div> <div style="flex:1;" class="svelte-nnjvbq"><div class="name-row svelte-nnjvbq"><h4 class="svelte-nnjvbq">${escape_html(msg.suggestedAction.meta.name || "ອາຈານ ວັນນະລີ")}</h4> <span class="badge-verified svelte-nnjvbq">✅</span></div> <div class="meta-line svelte-nnjvbq">${escape_html(msg.suggestedAction.meta.subj || "ໂປຣແກຣມມິ່ງ")} · ⭐ ${escape_html(msg.suggestedAction.meta.rating || "4.8")}</div></div> <span style="color:var(--ink-400); align-self:center;" class="svelte-nnjvbq">›</span></div></div>`);
        } else if (msg.suggestedAction.type === "roadmap") {
          $$renderer2.push(`<!--[1--><button type="button" class="btn-secondary svelte-nnjvbq" style="margin-top:-4px;">${escape_html(msg.suggestedAction.label || "ເບິ່ງເສັ້ນທາງການຮຽນ")}</button>`);
        } else {
          $$renderer2.push(`<!--[-1--><button type="button" class="btn-secondary svelte-nnjvbq" style="margin-top:-4px;">${escape_html(msg.suggestedAction.label)}</button>`);
        }
        $$renderer2.push(`<!--]-->`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="chat-input-bar svelte-nnjvbq"><input type="text"${attr("value", inputText)} placeholder="ພິມຄຳຖາມ..."${attr("disabled", sending, true)} class="svelte-nnjvbq"/> <button type="button" class="chat-send svelte-nnjvbq"${attr("disabled", sending, true)} aria-label="ສົ່ງຂໍ້ຄວາມ">➤</button></div></div>`);
  });
}
const initialSaved = {
  careers: ["sw"],
  unis: [{ name: "ຄະນະວິທະຍາສາດຄອມພິວເຕີ, ມຊ.ລ", sub: "National University of Laos" }],
  tutors: ["t1"],
  centers: ["c1"],
  scholarships: ["s1"]
};
function createSavedStore() {
  const { subscribe, update } = writable(initialSaved);
  return {
    subscribe,
    toggleCareer: (id) => {
      update((s) => {
        const exists = s.careers.includes(id);
        return {
          ...s,
          careers: exists ? s.careers.filter((x) => x !== id) : [...s.careers, id]
        };
      });
    },
    toggleTutor: (id) => {
      update((s) => {
        const exists = s.tutors.includes(id);
        return {
          ...s,
          tutors: exists ? s.tutors.filter((x) => x !== id) : [...s.tutors, id]
        };
      });
    },
    toggleCenter: (id) => {
      update((s) => {
        const exists = s.centers.includes(id);
        return {
          ...s,
          centers: exists ? s.centers.filter((x) => x !== id) : [...s.centers, id]
        };
      });
    },
    toggleSchol: (id) => {
      update((s) => {
        const exists = s.scholarships.includes(id);
        return {
          ...s,
          scholarships: exists ? s.scholarships.filter((x) => x !== id) : [...s.scholarships, id]
        };
      });
    }
  };
}
const savedStore = createSavedStore();
function SavedView($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let savedCareers;
    let allCareers = [];
    let allTutors = [];
    let allCenters = [];
    let allSchols = [];
    savedCareers = allCareers.filter((c) => store_get($$store_subs ??= {}, "$savedStore", savedStore).careers.includes(c.id));
    allTutors.filter((t) => store_get($$store_subs ??= {}, "$savedStore", savedStore).tutors.includes(t.id));
    allCenters.filter((ce) => store_get($$store_subs ??= {}, "$savedStore", savedStore).centers.includes(ce.id));
    allSchols.filter((s) => store_get($$store_subs ??= {}, "$savedStore", savedStore).scholarships.includes(s.id));
    $$renderer2.push(`<div class="screen active"><div class="status-space"></div> <div class="pad"><div class="topbar" style="padding:0 0 4px 0;"><h2>ບັນທຶກໄວ້</h2></div> <div class="tab-row" id="savedTabs"><button type="button"${attr_class(`tab-btn ${"on"}`)}>ອາຊີບ</button> <button type="button"${attr_class(`tab-btn ${""}`)}>ມະຫາວິທະຍາໄລ</button> <button type="button"${attr_class(`tab-btn ${""}`)}>ອາຈານ</button> <button type="button"${attr_class(`tab-btn ${""}`)}>ສູນຮຽນ</button> <button type="button"${attr_class(`tab-btn ${""}`)}>ທຶນການສຶກສາ</button></div> <div id="savedContent" style="margin-top:12px;">`);
    {
      $$renderer2.push("<!--[0-->");
      if (savedCareers.length > 0) {
        $$renderer2.push(`<!--[0--><div style="display:flex; flex-direction:column; gap:12px;"><!--[-->`);
        const each_array = ensure_array_like(savedCareers);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let c = each_array[$$index];
          CareerCard($$renderer2, { career: c, layout: "list" });
        }
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push(`<!--[-1--><div class="empty-illustration"><div class="em">🗂️</div> <div>ຍັງບໍ່ມີລາຍການບັນທຶກໄວ້<br/>ໃນໝວດນີ້</div></div>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function ProfileView($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="screen active"><div class="status-space"></div> <div class="pad"><div class="profile-head"><div class="profile-avatar">ອລ</div> <h2>ອາລິສາ ດວງຈັນ</h2> <p>ມ.5 · ໂຮງຮຽນ ມ.ສົມສະໜຸກ, ວຽງຈັນ</p></div> <div class="chip-row" style="justify-content:center; display:flex; margin-top:10px;"><span class="chip">Investigative</span> <span class="chip">ຮັກໂປຣແກຣມມິ່ງ</span> <span class="chip">ຮັກອອກແບບ</span></div> <div class="divider"></div>  <div class="menu-row"><div class="left"><span class="icn">🧭</span> ຜົນການປະເມີນຕົນເອງ</div> <span style="color:var(--ink-400);">›</span></div>  <div class="menu-row"><div class="left"><span class="icn">🗺️</span> ເສັ້ນທາງການຮຽນ</div> <span style="color:var(--ink-400);">›</span></div>  <div class="menu-row"><div class="left"><span class="icn">❤️</span> ລາຍການບັນທຶກໄວ້</div> <span style="color:var(--ink-400);">›</span></div> <div class="menu-row"><div class="left"><span class="icn">✏️</span> ແກ້ໄຂໂປຣໄຟລ໌</div> <span style="color:var(--ink-400);">›</span></div> <div class="menu-row"><div class="left"><span class="icn">🔔</span> ການແຈ້ງເຕືອນ</div> <span style="color:var(--ink-400);">›</span></div> <div class="menu-row"><div class="left"><span class="icn">⚙️</span> ຕັ້ງຄ່າ</div> <span style="color:var(--ink-400);">›</span></div> <div class="menu-row" style="border-bottom:none;"><div class="left" style="color:var(--coral-500);"><span class="icn" style="background:#FDECE6;">🚪</span> ອອກຈາກລະບົບ</div></div></div></div>`);
  });
}
function TopBar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let title = fallback($$props["title"], "");
    let subtitle = fallback($$props["subtitle"], "");
    let showBack = fallback($$props["showBack"], true);
    let onBack = fallback($$props["onBack"], null);
    $$renderer2.push(`<div class="topbar svelte-yic9pk">`);
    if (showBack) {
      $$renderer2.push(`<!--[0--><button type="button" class="back svelte-yic9pk" aria-label="ກັບຄືນ">←</button>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (title) {
      $$renderer2.push(`<!--[0--><div><h2 class="svelte-yic9pk">${escape_html(title)}</h2> `);
      if (subtitle) {
        $$renderer2.push(`<!--[0--><div class="topbar-sub svelte-yic9pk">${escape_html(subtitle)}</div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <!--[-->`);
    slot($$renderer2, $$props, "default", {});
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { title, subtitle, showBack, onBack });
  });
}
function CareerList($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let careers = [];
    let searchQuery = "";
    let activeFilter = "ທັງໝົດ";
    const filters = ["ທັງໝົດ", "ເທັກໂນໂລຊີ", "ອອກແບບ", "ທຸລະກິດ", "ວິທະຍາສາດ"];
    careers.filter((c) => {
      const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.tag.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeFilter === "ທັງໝົດ";
      return matchesSearch && matchesCategory;
    });
    $$renderer2.push(`<div class="screen active"><div class="status-space"></div> `);
    TopBar($$renderer2, { title: "ຄົ້ນຫາອາຊີບ" });
    $$renderer2.push(`<!----> <div class="pad"><div class="searchbar" style="background:#EFF1EC; border-color:var(--line);"><span>🔍</span> <input type="text"${attr("value", searchQuery)} style="color:var(--ink-900);" placeholder="ຄົ້ນຫາອາຊີບ..."/></div> <div class="filter-scroll"><!--[-->`);
    const each_array = ensure_array_like(filters);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let f = each_array[$$index];
      $$renderer2.push(`<div${attr_class(`filter-chip ${activeFilter === f ? "on" : ""}`)}>${escape_html(f)}</div>`);
    }
    $$renderer2.push(`<!--]--></div> <div style="display:flex; flex-direction:column; gap:12px; margin-top:8px;">`);
    {
      $$renderer2.push(`<!--[0--><div style="text-align:center; padding:30px; color:var(--ink-400);">ກຳລັງໂຫລດ...</div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
  });
}
function CareerDetail($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let isSaved;
    let careerId = fallback($$props["careerId"], "sw");
    let career = null;
    let loading = true;
    async function loadCareer(id) {
      loading = true;
      try {
        career = await fetchCareerById(id);
      } catch (err) {
        err.message || "Failed to load career";
      } finally {
        loading = false;
      }
    }
    isSaved = store_get($$store_subs ??= {}, "$savedStore", savedStore).careers.includes(careerId);
    if (careerId) {
      loadCareer(careerId);
    }
    $$renderer2.push(`<div class="screen active">`);
    if (loading && !career) {
      $$renderer2.push(`<!--[0--><div class="status-space"></div> <div style="text-align:center; padding:50px; color:var(--ink-400);">ກຳລັງໂຫລດ...</div>`);
    } else if (career) {
      $$renderer2.push(`<!--[1--><div class="detail-hero" id="careerHero"><button class="back" style="position:absolute; top:16px; left:16px;" aria-label="ກັບຄືນ">←</button> <button class="saved-toggle" aria-label="ບັນທຶກ">${escape_html(isSaved ? "❤️" : "🤍")}</button> <div class="icon-circle" id="careerHeroIcon">${escape_html(career.icon)}</div> <div><h1 id="careerHeroTitle">${escape_html(career.title)}</h1> <div class="tag-light" id="careerHeroTag">${escape_html(career.tag)}</div></div></div> <div class="pad"><div class="info-block"><h4>ເຮັດຫຍັງແດ່?</h4> <p id="careerWhat">${escape_html(career.what)}</p></div> <div class="info-block"><h4>ທັກສະທີ່ຕ້ອງການ</h4> <div class="chip-row" id="careerSkills"><!--[-->`);
      const each_array = ensure_array_like(career.skills);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let skill = each_array[$$index];
        $$renderer2.push(`<span class="chip">${escape_html(skill)}</span>`);
      }
      $$renderer2.push(`<!--]--></div></div> <div class="stat-grid"><div class="stat-box"><div class="lbl">ເງິນເດືອນ (ໂດຍປະມານ)</div> <div class="val" id="careerSalary">${escape_html(career.salary)}</div></div> <div class="stat-box"><div class="lbl">ໂອກາດວຽກ</div> <div class="val" id="careerDemand">${escape_html(career.demand)}</div></div></div> <div class="disclaimer">ອ້າງອີງ: ກົມແຮງງານ, 2025 — ລາຍໄດ້ຕົວຈິງອາດແຕກຕ່າງກັນຕາມບໍລິສັດ ແລະ ປະສົບການ</div> <div class="info-block"><h4>ເສັ້ນທາງການສຶກສາ</h4> <p id="careerEdu">${escape_html(career.edu)}</p></div> <div class="section-title" style="margin:20px 0 10px 0;"><h3>ມະຫາວິທະຍາໄລທີ່ກ່ຽວຂ້ອງ</h3></div>  <div class="card" style="display:flex; gap:14px; align-items:center; cursor:pointer;"><div class="feature-icon" style="background:#EFF1FA; margin:0;">🎓</div> <div style="flex:1;"><b style="font-size:13px;">ຄະນະວິທະຍາສາດຄອມພິວເຕີ, ມຊ.ລ</b> <div style="font-size:11px; color:var(--ink-400);">National University of Laos</div></div> <span style="color:var(--ink-400);">›</span></div> <div class="section-title"><h3>ອາຈານແນະນຳ</h3></div>  <div class="tutor-card" style="margin-bottom:0;"><div class="row"><div class="avatar">ວລ</div> <div style="flex:1;"><div class="name-row"><h4>ອາຈານ ວັນນະລີ</h4> <span class="badge-verified">✅</span></div> <div class="meta-line">ໂປຣແກຣມມິ່ງ · ອອນລາຍ</div> <div class="rating">⭐ 4.8 <span style="color:var(--ink-400); font-weight:400;">· ນັກຮຽນ 62 ຄົນ</span></div></div></div></div> <div class="section-title"><h3>ສູນຮຽນແນະນຳ</h3></div>  <div class="center-card" style="margin-bottom:0;"><div class="row"><div class="avatar" style="background:linear-gradient(135deg,#5865C2,#0FADA6);">CS</div> <div style="flex:1;"><h4 style="font-size:13.5px; margin:0;">CodeLab Vientiane</h4> <div class="meta-line">ໂປຣແກຣມມິ່ງ · ວຽງຈັນ</div> <div class="rating">⭐ 4.7 <span style="color:var(--ink-400); font-weight:400;">· ອອນລາຍ+ອອຟລາຍ</span></div></div></div></div> <div class="section-title"><h3>ທຶນການສຶກສາທີ່ກ່ຽວຂ້ອງ</h3></div>  <div class="schol-card" style="margin-bottom:0;"><div style="display:flex; justify-content:space-between;"><b style="font-size:13.5px;">ASEAN Digital Scholarship</b> <span class="match-pill">ກົງກັນ 88%</span></div> <div class="meta-line">ສິງກະໂປ · ປະລິນຍາຕີ · ທຶນເຕັມ</div></div> <div style="height:14px;"></div> <button class="btn-primary">ສ້າງເສັ້ນທາງການຮຽນສຳລັບອາຊີບນີ້</button></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { careerId });
  });
}
function UniDetail($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="screen active"><div class="detail-hero" style="background:linear-gradient(135deg,#1F2A56,#0F1B3D);"><button class="back" style="position:absolute; top:16px; left:16px;" aria-label="ກັບຄືນ">←</button> <button class="saved-toggle" aria-label="ບັນທຶກ">${escape_html("🤍")}</button> <div class="icon-circle">🎓</div> <div><h1>ຄະນະວິທະຍາສາດຄອມພິວເຕີ</h1> <div class="tag-light">ມະຫາວິທະຍາໄລແຫ່ງຊາດລາວ · ວຽງຈັນ</div></div></div> <div class="pad"><div class="stat-grid"><div class="stat-box"><div class="lbl">🎓 ໄລຍະເວລາ</div> <div class="val">4 ປີ</div></div> <div class="stat-box"><div class="lbl">💰 ຄ່າຮຽນ/ປີ</div> <div class="val">6.5 ລ້ານ LAK</div></div> <div class="stat-box"><div class="lbl">📍 ສະຖານທີ່</div> <div class="val">ວຽງຈັນ</div></div> <div class="stat-box"><div class="lbl">🗓 ຮັບສະໝັກ</div> <div class="val">ພຶດສະພາ-ກໍລະກົດ</div></div></div> <div class="info-block"><h4>ເງື່ອນໄຂຮັບເຂົ້າ</h4> <p>ຈົບມັດທະຍົມປາຍ (ມ.7), ຄະແນນສະເລ່ຍວິຊາຄະນິດສາດ ແລະ ວິທະຍາສາດຜ່ານເກນ, ສອບເສັງເສັງເຂົ້າຫຼັກສູດ</p></div> <div class="info-block"><h4>ອາຊີບທີ່ກ່ຽວຂ້ອງ</h4> <div class="chip-row"><span class="chip">ນັກພັດທະນາຊອບແວ</span> <span class="chip">ນັກວິເຄາະຂໍ້ມູນ</span> <span class="chip">ຄວາມປອດໄພໄຊເບີ</span> <span class="chip">UI/UX Designer</span></div></div> <button class="btn-secondary">ເບິ່ງອາຊີບທີ່ກ່ຽວຂ້ອງ</button></div></div>`);
  });
}
function TutorList($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let activeFilter = "ທັງໝົດ";
    const filters = [
      "ທັງໝົດ",
      "ພາສາອັງກິດ",
      "ໂປຣແກຣມມິ່ງ",
      "ຄະນິດສາດ",
      "ອອນລາຍ",
      "ລາຄາ",
      "ຄະແນນ"
    ];
    $$renderer2.push(`<div class="screen active"><div class="status-space"></div> `);
    TopBar($$renderer2, { title: "ຊອກຫາອາຈານສອນເພີ່ມ" });
    $$renderer2.push(`<!----> <div class="pad"><div class="filter-scroll"><!--[-->`);
    const each_array = ensure_array_like(filters);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let f = each_array[$$index];
      $$renderer2.push(`<div${attr_class(`filter-chip ${activeFilter === f ? "on" : ""}`)}>${escape_html(f)}</div>`);
    }
    $$renderer2.push(`<!--]--></div> <div style="display:flex; flex-direction:column; gap:0; margin-top:6px;">`);
    {
      $$renderer2.push(`<!--[0--><div style="text-align:center; padding:40px; color:var(--ink-400);">ກຳລັງໂຫລດ...</div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="divider"></div> <div class="card" style="display:flex; align-items:center; gap:12px; cursor:pointer;"><span style="font-size:22px;">👋</span> <div style="flex:1;"><b style="font-size:13px;">ຂ້ອຍຢາກສອນ</b> <div style="font-size:11px; color:var(--ink-400);">ສະໝັກເປັນອາຈານກັບ Khua Achip</div></div> <span style="color:var(--ink-400);">›</span></div></div></div>`);
  });
}
function TutorDetail($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let tutorId = fallback($$props["tutorId"], "t1");
    let tutor = null;
    let loading = true;
    async function loadTutor(id) {
      loading = true;
      try {
        tutor = await fetchTutorById(id);
      } catch (err) {
        err.message || "Error loading tutor";
      } finally {
        loading = false;
      }
    }
    if (tutorId) {
      loadTutor(tutorId);
    }
    $$renderer2.push(`<div class="screen active"><div class="status-space"></div> `);
    TopBar($$renderer2, {});
    $$renderer2.push(`<!----> <div class="pad">`);
    if (loading && !tutor) {
      $$renderer2.push(`<!--[0--><div style="text-align:center; padding:50px; color:var(--ink-400);">ກຳລັງໂຫລດ...</div>`);
    } else if (tutor) {
      $$renderer2.push(`<!--[1--><div style="display:flex; gap:16px; align-items:center;"><div class="avatar" style="width:72px; height:72px; font-size:24px; border-radius:20px;">${escape_html(tutor.init)}</div> <div><div class="name-row"><h2 style="margin:0;">${escape_html(tutor.name)}</h2> <span class="badge-verified">✅</span></div> <div class="meta-line">${escape_html(tutor.subj)} · Python, Web Development</div> <div class="rating">⭐ ${escape_html(tutor.rating)} · ນັກຮຽນ ${escape_html(tutor.students)} ຄົນ</div></div></div> <div class="stat-grid"><div class="stat-box"><div class="lbl">ປະສົບການ</div> <div class="val">${escape_html(tutor.years)} ປີ</div></div> <div class="stat-box"><div class="lbl">ລາຄາ</div> <div class="val">${escape_html(tutor.price)}</div></div> <div class="stat-box"><div class="lbl">ຮູບແບບ</div> <div class="val">${escape_html(tutor.mode)} + ອອຟລາຍ</div></div> <div class="stat-box"><div class="lbl">ຕາຕະລາງ</div> <div class="val">ຈ-ສ, 18:00-20:00</div></div></div> <div class="info-block"><h4>ແນວທາງການສອນ</h4> <p>ເນັ້ນການລົງມືປະຕິບັດຕົວຈິງ, ໃຫ້ນັກຮຽນສ້າງໂປຣເຈັກຂອງຕົນເອງໄປພ້ອມກັບການຮຽນທິດສະດີ ເໝາະສຳລັບຜູ້ເລີ່ມຕົ້ນ</p></div> <div class="info-block"><h4>ວິຊາທີ່ສອນ</h4> <div class="chip-row"><span class="chip">Python</span> <span class="chip">Web Development</span> <span class="chip">Database ພື້ນຖານ</span></div></div> <div class="section-title"><h3>ຣີວິວ (48)</h3></div> <div class="review-row"><div class="top"><b>ນັກຮຽນ ອ.</b> <span class="stars">★★★★★</span></div> <p>ອະທິບາຍເຂົ້າໃຈງ່າຍ, ໃຈເຢັນຫຼາຍ ແນະນຳໃຫ້ຄົນທີ່ຢາກເລີ່ມຮຽນເຂດນີ້.</p></div> <div class="review-row"><div class="top"><b>ນັກຮຽນ ບ.</b> <span class="stars">★★★★★</span></div> <p>ໄດ້ຄວາມຮູ້ຫຼາຍກວ່າໃນຫ້ອງຮຽນ, ມີໂປຣເຈັກຕົວຈິງໃຫ້ລອງເຮັດ.</p></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="pad" style="position:absolute; bottom:26px; left:0; right:0; display:flex; gap:10px;"><button class="btn-secondary" style="flex:1;">ຕິດຕໍ່</button> <button class="btn-primary btn-teal" style="flex:2;">ຈອງຮຽນ</button></div></div>`);
    bind_props($$props, { tutorId });
  });
}
function CenterList($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let activeFilter = "ທັງໝົດ";
    const filters = [
      "ທັງໝົດ",
      "🗣 ພາສາອັງກິດ",
      "🗣 ພາສາຈີນ",
      "💻 ໂປຣແກຣມມິ່ງ",
      "📐 ຄະນິດສາດ",
      "🧪 ວິທະຍາສາດ",
      "🎨 ອອກແບບ"
    ];
    $$renderer2.push(`<div class="screen active"><div class="status-space"></div> `);
    TopBar($$renderer2, { title: "ຊອກຫາສູນຮຽນເພີ່ມ" });
    $$renderer2.push(`<!----> <div class="pad"><div class="filter-scroll"><!--[-->`);
    const each_array = ensure_array_like(filters);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let f = each_array[$$index];
      $$renderer2.push(`<div${attr_class(`filter-chip ${activeFilter === f ? "on" : ""}`)}>${escape_html(f)}</div>`);
    }
    $$renderer2.push(`<!--]--></div> <div style="display:flex; flex-direction:column; gap:0; margin-top:6px;">`);
    {
      $$renderer2.push(`<!--[0--><div style="text-align:center; padding:40px; color:var(--ink-400);">ກຳລັງໂຫລດ...</div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
  });
}
function CenterDetail($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let isSaved;
    let centerId = fallback($$props["centerId"], "c1");
    let center = null;
    let loading = true;
    async function loadCenter(id) {
      loading = true;
      try {
        center = await fetchCenterById(id);
      } catch (err) {
        err.message || "Error loading center";
      } finally {
        loading = false;
      }
    }
    isSaved = store_get($$store_subs ??= {}, "$savedStore", savedStore).centers.includes(centerId);
    if (centerId) {
      loadCenter(centerId);
    }
    $$renderer2.push(`<div class="screen active">`);
    if (loading && !center) {
      $$renderer2.push(`<!--[0--><div class="status-space"></div> <div style="text-align:center; padding:50px; color:var(--ink-400);">ກຳລັງໂຫລດ...</div>`);
    } else if (center) {
      $$renderer2.push(`<!--[1--><div class="detail-hero"${attr_style(`background: ${stringify(center.grad)};`)}><button class="back" style="position:absolute; top:16px; left:16px;" aria-label="ກັບຄືນ">←</button> <button class="saved-toggle" aria-label="ບັນທຶກ">${escape_html(isSaved ? "❤️" : "🤍")}</button> <div class="icon-circle">💻</div> <div><h1>${escape_html(center.name)}</h1> <div class="tag-light">${escape_html(center.subj)} · ${escape_html(center.loc)}</div></div></div> <div class="pad"><div class="rating" style="margin-top:14px;">⭐ ${escape_html(center.rating)} <span style="color:var(--ink-400); font-weight:400;">· ຣີວິວ 96 ຄັ້ງ</span></div> <div class="info-block"><h4>ກ່ຽວກັບ</h4> <p>ສູນຮຽນສະເພາະດ້ານໂປຣແກຣມມິ່ງ ສອນຕັ້ງແຕ່ພື້ນຖານຈົນເຖິງລະດັບສ້າງແອັບຕົວຈິງ ມີຫ້ອງ Lab ພ້ອມຄອມພິວເຕີໃນທຸກຫ້ອງຮຽນ</p></div> <div class="info-block"><h4>ຫຼັກສູດ</h4> <div class="chip-row"><span class="chip">Python ພື້ນຖານ</span> <span class="chip">Web Development</span> <span class="chip">Mobile App</span> <span class="chip">Data Science</span></div></div> <div class="stat-grid"><div class="stat-box"><div class="lbl">ລາຄາ</div> <div class="val">ເລີ່ມ ${escape_html(center.price)}</div></div> <div class="stat-box"><div class="lbl">ຮູບແບບ</div> <div class="val">${escape_html(center.mode)}</div></div></div> <div class="info-block"><h4>ຕາຕະລາງ</h4> <p>ຈັນ-ສຸກ 17:00-20:00 · ເສົາ-ອາທິດ 09:00-16:00</p></div> <div class="info-block"><h4>ສະຖານທີ່ ແລະ ຕິດຕໍ່</h4> <p>ບ້ານໂພນສະຫວ່າງ, ນະຄອນຫຼວງວຽງຈັນ · ໂທ 020 5555 1234</p></div></div> <div class="pad" style="position:absolute; bottom:26px; left:0; right:0;"><button class="btn-primary">ຕິດຕໍ່ສູນຮຽນ</button></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { centerId });
  });
}
function ScholList($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let activeFilter = "ທັງໝົດ";
    const filters = [
      "ທັງໝົດ",
      "ທຶນເຕັມ",
      "ປະລິນຍາຕີ",
      "ປະລິນຍາໂທ",
      "ອາຊຽນ",
      "ໃກ້ໝົດເຂດ"
    ];
    $$renderer2.push(`<div class="screen active"><div class="status-space"></div> `);
    TopBar($$renderer2, { title: "ຊອກຫາທຶນການສຶກສາ" });
    $$renderer2.push(`<!----> <div class="pad"><div class="filter-scroll"><!--[-->`);
    const each_array = ensure_array_like(filters);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let f = each_array[$$index];
      $$renderer2.push(`<div${attr_class(`filter-chip ${activeFilter === f ? "on" : ""}`)}>${escape_html(f)}</div>`);
    }
    $$renderer2.push(`<!--]--></div> <div style="display:flex; flex-direction:column; gap:0; margin-top:6px;">`);
    {
      $$renderer2.push(`<!--[0--><div style="text-align:center; padding:40px; color:var(--ink-400);">ກຳລັງໂຫລດ...</div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
  });
}
function ScholDetail($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let isSaved;
    let scholId = fallback($$props["scholId"], "s1");
    let scholarship = null;
    let loading = true;
    async function loadSchol(id) {
      loading = true;
      try {
        scholarship = await fetchScholarshipById(id);
      } catch (err) {
        err.message || "Error loading scholarship";
      } finally {
        loading = false;
      }
    }
    isSaved = store_get($$store_subs ??= {}, "$savedStore", savedStore).scholarships.includes(scholId);
    if (scholId) {
      loadSchol(scholId);
    }
    $$renderer2.push(`<div class="screen active">`);
    if (loading && !scholarship) {
      $$renderer2.push(`<!--[0--><div class="status-space"></div> <div style="text-align:center; padding:50px; color:var(--ink-400);">ກຳລັງໂຫລດ...</div>`);
    } else if (scholarship) {
      $$renderer2.push(`<!--[1--><div class="detail-hero" style="background:linear-gradient(135deg,#B9822F,#7A5417);"><button class="back" style="position:absolute; top:16px; left:16px;" aria-label="ກັບຄືນ">←</button> <button class="saved-toggle" aria-label="ບັນທຶກ">${escape_html(isSaved ? "❤️" : "🤍")}</button> <div class="icon-circle">🎓</div> <div><h1>${escape_html(scholarship.name)}</h1> <div class="tag-light">${escape_html(scholarship.country)} · ${escape_html(scholarship.level)}</div></div></div> <div class="pad"><div style="display:flex; gap:8px; margin-top:14px; flex-wrap:wrap;"><span class="chip" style="background:var(--teal-100); color:var(--teal-600);">${escape_html(scholarship.funded)} 100%</span> <span class="match-pill" style="margin-top:0;">ເໝາະກັບ Profile ຂອງເຈົ້າ ${escape_html(scholarship.match)}%</span></div> <div class="info-block"><h4>ລາຍລະອຽດທຶນ</h4> <p>ທຶນສະໜັບສະໜູນຄ່າຮຽນ ແລະ ຄ່າຄອງຊີບເຕັມຈຳນວນ ສຳລັບນັກສຶກສາອາຊຽນທີ່ຮຽນສາຍວິທະຍາສາດຄອມພິວເຕີ ຫຼື ດ້ານດິຈິຕອນ</p></div> <div class="info-block"><h4>ຄຸນສົມບັດຜູ້ສະໝັກ</h4> <p>ອາຍຸບໍ່ເກີນ 22 ປີ, ຈົບ ມ.7 ດ້ວຍຄະແນນສະເລ່ຍ 3.2 ຂຶ້ນໄປ, ມີໃບຮັບຮອງພາສາອັງກິດ IELTS 6.0+</p></div> <div class="info-block"><h4>ເອກະສານທີ່ຕ້ອງການ</h4> <p>ໃບຄະແນນ, ໃບຢັ້ງຢືນພາສາອັງກິດ, ຈົດໝາຍແນະນຳຕົນເອງ, ຈົດໝາຍຮັບຮອງ 2 ສະບັບ</p></div> <div class="stat-grid"><div class="stat-box"><div class="lbl">📅 ໝົດເຂດສະໝັກ</div> <div class="val">${escape_html(scholarship.deadline)}</div></div> <div class="stat-box"><div class="lbl">🎓 ລະດັບ</div> <div class="val">${escape_html(scholarship.level)}</div></div></div> <div class="disclaimer">ຂໍ້ມູນອ້າງອີງຈາກແຫຼ່ງທາງການ · ອັບເດດລ່າສຸດ ກັນຍາ 2026 — ວັນທີ ແລະ ເງື່ອນໄຂອາດມີການປ່ຽນແປງ ກະລຸນາກວດສອບກັບແຫຼ່ງທາງການອີກຄັ້ງ</div></div> <div class="pad" style="position:absolute; bottom:26px; left:0; right:0;"><button class="btn-primary">ໄປຍັງເວັບໄຊທາງການ ↗</button></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { scholId });
  });
}
function RiasecWelcome($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="screen active"><div class="status-space"></div> `);
    TopBar($$renderer2, {});
    $$renderer2.push(`<!----> <div class="pad" style="text-align:center; padding-top:10px;"><div style="font-size:64px; margin:20px 0 10px 0;">🧭</div> <h1 style="font-size:22px; margin:0 0 10px 0;">ມາຮູ້ຈັກຕົວເອງ</h1> <p style="font-size:13.5px; color:var(--ink-600); line-height:1.7;">ແບບປະເມີນນີ້ອີງໃສ່ຫຼັກ RIASEC ເພື່ອຄົ້ນຫາຄວາມສົນໃຈ ແລະ ຈຸດແຂງຂອງເຈົ້າ ແລ້ວແນະນຳອາຊີບທີ່ອາດເໝາະສົມ</p> <div class="card" style="margin-top:24px; text-align:left;"><div style="display:flex; gap:10px; align-items:center; margin-bottom:14px;"><span style="font-size:18px;">⏱</span> <span style="font-size:12.5px; color:var(--ink-600);">ໃຊ້ເວລາປະມານ 5-7 ນາທີ</span></div> <div style="display:flex; gap:10px; align-items:center; margin-bottom:14px;"><span style="font-size:18px;">📝</span> <span style="font-size:12.5px; color:var(--ink-600);">20 ຄຳຖາມ ແບບເລືອກລະດັບຄວາມເຫັນດີ</span></div> <div style="display:flex; gap:10px; align-items:center;"><span style="font-size:18px;">🔒</span> <span style="font-size:12.5px; color:var(--ink-600);">ຄຳຕອບຂອງເຈົ້າຈະຖືກເກັບໄວ້ເປັນສ່ວນຕົວ</span></div></div></div> <div class="pad" style="position:absolute; bottom:26px; left:0; right:0;"><button class="btn-primary">ເລີ່ມການປະເມີນ</button></div></div>`);
  });
}
const riasecResultStore = writable(null);
function RiasecQuestions($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    function handlePrev() {
      {
        navStore.back();
      }
    }
    $$renderer2.push(`<div class="screen active"><div class="status-space"></div> `);
    TopBar($$renderer2, { title: "ແບບປະເມີນຕົນເອງ", onBack: handlePrev });
    $$renderer2.push(`<!----> <div class="pad">`);
    {
      $$renderer2.push(`<!--[0--><div style="text-align:center; padding:50px; color:var(--ink-400);">ກຳລັງໂຫລດຄຳຖາມ...</div>`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
function RiasecResult($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let result = null;
    if (store_get($$store_subs ??= {}, "$riasecResultStore", riasecResultStore)) {
      result = store_get($$store_subs ??= {}, "$riasecResultStore", riasecResultStore);
    }
    $$renderer2.push(`<div class="screen active"><div class="status-space"></div> `);
    TopBar($$renderer2, { title: "ຜົນການປະເມີນ" });
    $$renderer2.push(`<!----> <div class="pad">`);
    if (result) {
      $$renderer2.push(`<!--[2--><div class="card" style="text-align:center; background:linear-gradient(135deg,var(--navy-900),var(--navy-700)); color:#fff; border:none;"><div style="font-size:12px; color:rgba(255,255,255,0.7);">ບຸກຄະລິກອາຊີບຫຼັກຂອງເຈົ້າ</div> <div style="font-size:26px; font-weight:800; margin:6px 0 2px 0;">${escape_html(result.primaryDimension.name)}</div> <div style="font-size:12px; color:rgba(255,255,255,0.75);">${escape_html(result.primaryDimension.description)}</div></div> <div class="section-title"><h3>ຄະແນນແຕ່ລະດ້ານ</h3></div> <div><!--[-->`);
      const each_array = ensure_array_like(result.dimensions);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let d = each_array[$$index];
        $$renderer2.push(`<div class="riasec-bar-row"><div class="lbl-row"><span>${escape_html(d.name)}</span> <b>${escape_html(d.score)}%</b></div> <div class="riasec-track"><div class="riasec-fill"${attr_style(`width:${stringify(d.score)}%; background:${stringify(d.color)};`)}></div></div></div>`);
      }
      $$renderer2.push(`<!--]--></div> <div class="section-title"><h3>ອາຊີບທີ່ອາດເໝາະກັບເຈົ້າ</h3></div> <div style="display:flex; flex-direction:column; gap:12px;"><!--[-->`);
      const each_array_1 = ensure_array_like(result.matchedCareers);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let career = each_array_1[$$index_1];
        CareerCard($$renderer2, { career, layout: "result" });
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function RoadmapTimeline($$renderer) {
  const roadmapSteps = [
    {
      year: "2026",
      title: "ພື້ນຖານໂປຣແກຣມມິ່ງ",
      desc: "ຮຽນ Python ພື້ນຖານ ແລະ ຕັກກະການຄິດແບບໂປຣແກຣມເມີ",
      status: "done"
    },
    {
      year: "2027",
      title: "ການພັດທະນາເວັບໄຊ (Web Development)",
      desc: "HTML, CSS, JavaScript ແລະ ສ້າງເວັບໄຊທຳອິດຂອງຕົນເອງ",
      status: "current"
    },
    {
      year: "2028",
      title: "Backend + Database",
      desc: "ຮຽນການສ້າງລະບົບຫຼັງບ້ານ ແລະ ຈັດການຖານຂໍ້ມູນ",
      status: "upcoming"
    },
    {
      year: "2029",
      title: "ຝຶກງານ (Internship)",
      desc: "ຝຶກງານກັບບໍລິສັດເທັກໂນໂລຊີ ເພື່ອສະສົມປະສົບການຕົວຈິງ",
      status: "upcoming"
    },
    {
      year: "2030",
      title: "ນັກພັດທະນາຊອບແວ",
      desc: "ເລີ່ມຕົ້ນອາຊີບເປັນນັກພັດທະນາຊອບແວເຕັມຕົວ",
      status: "upcoming"
    }
  ];
  function getStatusLabel(status) {
    if (status === "done") return "ສຳເລັດແລ້ວ";
    if (status === "current") return "ກຳລັງຮຽນ";
    return "ຍັງບໍ່ເຖິງ";
  }
  $$renderer.push(`<div class="screen active"><div class="status-space"></div> `);
  TopBar($$renderer, { title: "ເສັ້ນທາງການຮຽນຂອງຂ້ອຍ" });
  $$renderer.push(`<!----> <div class="pad"><div class="card" style="display:flex; gap:14px; align-items:center; background:linear-gradient(135deg,var(--navy-900),var(--navy-700)); color:#fff; border:none;"><div style="font-size:26px;">💻</div> <div><div style="font-size:11px; color:rgba(255,255,255,0.7);">ເປົ້າໝາຍຂອງຂ້ອຍ</div> <div style="font-weight:700; font-size:15px;">ນັກພັດທະນາຊອບແວ</div></div></div> <div class="roadmap-line"><!--[-->`);
  const each_array = ensure_array_like(roadmapSteps);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let step = each_array[$$index];
    $$renderer.push(`<div class="rm-step"><div${attr_class(`rm-dot ${stringify(step.status)}`)}>${escape_html(step.status === "done" ? "✓" : "")}</div> <div class="rm-year">${escape_html(step.year)}</div> <div class="rm-title">${escape_html(step.title)}</div> <div class="rm-desc">${escape_html(step.desc)}</div> <div${attr_class(`rm-status ${stringify(step.status)}`)}>${escape_html(getStatusLabel(step.status))}</div></div>`);
  }
  $$renderer.push(`<!--]--></div></div></div>`);
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    head("1uha8ag", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>ຂົວອາຊີບ — Khua Achip</title>`);
      });
    });
    DeviceFrame($$renderer2, {
      children: ($$renderer3) => {
        if (store_get($$store_subs ??= {}, "$navStore", navStore).currentScreen === "home") {
          $$renderer3.push("<!--[0-->");
          HomeView($$renderer3);
        } else if (store_get($$store_subs ??= {}, "$navStore", navStore).currentScreen === "explore") {
          $$renderer3.push("<!--[1-->");
          ExploreHub($$renderer3);
        } else if (store_get($$store_subs ??= {}, "$navStore", navStore).currentScreen === "mentor") {
          $$renderer3.push("<!--[2-->");
          MentorChat($$renderer3);
        } else if (store_get($$store_subs ??= {}, "$navStore", navStore).currentScreen === "saved") {
          $$renderer3.push("<!--[3-->");
          SavedView($$renderer3);
        } else if (store_get($$store_subs ??= {}, "$navStore", navStore).currentScreen === "profile") {
          $$renderer3.push("<!--[4-->");
          ProfileView($$renderer3);
        } else if (store_get($$store_subs ??= {}, "$navStore", navStore).currentScreen === "careerList") {
          $$renderer3.push("<!--[5-->");
          CareerList($$renderer3);
        } else if (store_get($$store_subs ??= {}, "$navStore", navStore).currentScreen === "careerDetail") {
          $$renderer3.push("<!--[6-->");
          CareerDetail($$renderer3, {
            careerId: store_get($$store_subs ??= {}, "$navStore", navStore).params.careerId || "sw"
          });
        } else if (store_get($$store_subs ??= {}, "$navStore", navStore).currentScreen === "uniDetail") {
          $$renderer3.push("<!--[7-->");
          UniDetail($$renderer3);
        } else if (store_get($$store_subs ??= {}, "$navStore", navStore).currentScreen === "tutorList") {
          $$renderer3.push("<!--[8-->");
          TutorList($$renderer3);
        } else if (store_get($$store_subs ??= {}, "$navStore", navStore).currentScreen === "tutorDetail") {
          $$renderer3.push("<!--[9-->");
          TutorDetail($$renderer3, {
            tutorId: store_get($$store_subs ??= {}, "$navStore", navStore).params.tutorId || "t1"
          });
        } else if (store_get($$store_subs ??= {}, "$navStore", navStore).currentScreen === "centerList") {
          $$renderer3.push("<!--[10-->");
          CenterList($$renderer3);
        } else if (store_get($$store_subs ??= {}, "$navStore", navStore).currentScreen === "centerDetail") {
          $$renderer3.push("<!--[11-->");
          CenterDetail($$renderer3, {
            centerId: store_get($$store_subs ??= {}, "$navStore", navStore).params.centerId || "c1"
          });
        } else if (store_get($$store_subs ??= {}, "$navStore", navStore).currentScreen === "scholList") {
          $$renderer3.push("<!--[12-->");
          ScholList($$renderer3);
        } else if (store_get($$store_subs ??= {}, "$navStore", navStore).currentScreen === "scholDetail") {
          $$renderer3.push("<!--[13-->");
          ScholDetail($$renderer3, {
            scholId: store_get($$store_subs ??= {}, "$navStore", navStore).params.scholId || "s1"
          });
        } else if (store_get($$store_subs ??= {}, "$navStore", navStore).currentScreen === "riasecWelcome") {
          $$renderer3.push("<!--[14-->");
          RiasecWelcome($$renderer3);
        } else if (store_get($$store_subs ??= {}, "$navStore", navStore).currentScreen === "riasecQ") {
          $$renderer3.push("<!--[15-->");
          RiasecQuestions($$renderer3);
        } else if (store_get($$store_subs ??= {}, "$navStore", navStore).currentScreen === "riasecResult") {
          $$renderer3.push("<!--[16-->");
          RiasecResult($$renderer3);
        } else if (store_get($$store_subs ??= {}, "$navStore", navStore).currentScreen === "roadmap") {
          $$renderer3.push("<!--[17-->");
          RoadmapTimeline($$renderer3);
        } else {
          $$renderer3.push("<!--[-1-->");
        }
        $$renderer3.push(`<!--]-->`);
      },
      $$slots: { default: true }
    });
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
