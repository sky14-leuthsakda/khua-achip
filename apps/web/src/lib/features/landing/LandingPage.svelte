<script lang="ts">
  import { navStore } from "../../stores/navStore";
  import { profileStore } from "../../stores/profileStore";

  function handleStart(targetScreen: "home" | "riasecWelcome" = "home") {
    navStore.go(targetScreen);
  }
</script>

<div class="landing-page">
  <!-- Top Navigation Bar -->
  <header class="landing-nav">
    <div class="nav-container">
      <div class="brand">
        <div class="logo-circle">🧭</div>
        <div class="brand-names">
          <span class="brand-title">ຂົວອາຊີບ</span>
          <span class="brand-sub">Compass Youth</span>
        </div>
      </div>

      <nav class="desktop-menu">
        <a href="#features">ຟີເຈີຫຼັກ</a>
        <a href="#riasec">ແບບປະເມີນ RIASEC</a>
        <a href="#mentor">AI Mentor</a>
        <a href="#about">ກ່ຽວກັບເຮົາ</a>
      </nav>

      <div class="nav-cta">
        <button
          type="button"
          class="btn-login"
          on:click={() => handleStart("home")}
        >
          ເຂົ້າສູ່ລະບົບ
        </button>
        <button
          type="button"
          class="btn-start"
          on:click={() => handleStart("home")}
        >
          ເລີ່ມຕົ້ນໃຊ້ງານ
        </button>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="hero-section">
    <div class="hero-container">
      <div class="hero-content">
        <div class="badge-pill">
          <span>✨ ແພລັດຟອມແນະນຳອາຊີບສຳລັບໄວໜຸ່ມລາວ</span>
        </div>
        <h1 class="hero-headline">
          ຄົ້ນຫາຕົວຕົນ ສ້າງເສັ້ນທາງສູ່ <span class="highlight"
            >ອະນາຄົດທີ່ສົດໃສ</span
          >
        </h1>
        <p class="hero-sub">
          <strong>ຂົວອາຊີບ (Khua Achip)</strong> ເຊື່ອມຕໍ່ເຈົ້າກັບ ອາຊີບໃນຝັນ, ມະຫາວິທະຍາໄລ,
          ອາຈານສອນເພີ່ມ, ສູນຮຽນ ແລະ ທຶນການສຶກສາທັງພາຍໃນ ແລະ ຕ່າງປະເທດ ດ້ວຍລະບົບວິເຄາະ
          RIASEC ແລະ AI Mentor ສ່ວນຕົວ.
        </p>

        <div class="hero-buttons">
          <button
            type="button"
            class="btn-cta-primary"
            on:click={() => handleStart("home")}
          >
            ເລີ່ມຕົ້ນໃຊ້ງານເລີຍ 🚀
          </button>
          <button
            type="button"
            class="btn-cta-secondary"
            on:click={() => handleStart("riasecWelcome")}
          >
            ທົດລອງເຮັດແບບປະເມີນ RIASEC 🧭
          </button>
        </div>

        <div class="stats-row">
          <div class="stat-item">
            <span class="stat-num">120+</span>
            <span class="stat-lbl">ອາຊີບທີ່ແນະນຳ</span>
          </div>
          <div class="stat-item">
            <span class="stat-num">340+</span>
            <span class="stat-lbl">ອາຈານສອນເພີ່ມ</span>
          </div>
          <div class="stat-item">
            <span class="stat-num">85+</span>
            <span class="stat-lbl">ສູນຮຽນທົ່ວປະເທດ</span>
          </div>
          <div class="stat-item">
            <span class="stat-num">60+</span>
            <span class="stat-lbl">ທຶນການສຶກສາ</span>
          </div>
        </div>
      </div>

      <div class="hero-visual">
        <div class="hero-card-preview">
          <div class="preview-header">
            <div class="dot red"></div>
            <div class="dot yellow"></div>
            <div class="dot green"></div>
            <span class="preview-title">Khua Achip App</span>
          </div>
          <div class="preview-inner">
            <div class="mock-card hero-gradient">
              <div style="font-size: 14px; opacity: 0.85;">
                ສະບາຍດີ, ນັກຮຽນລາວ 👋
              </div>
              <div style="font-size: 18px; font-weight: 800; margin-top: 4px;">
                ມື້ນີ້ຢາກຄົ້ນຫາຫຍັງ?
              </div>
              <div class="mock-search">
                🔍 ຄົ້ນຫາອາຊີບ, ວິຊາ, ອາຈານ, ສູນຮຽນ...
              </div>
            </div>

            <div class="mock-grid">
              <div class="mock-item">
                <span class="icon">🎯</span>
                <b>ຄົ້ນຫາອາຊີບ</b>
                <small>120+ ອາຊີບ</small>
              </div>
              <div class="mock-item">
                <span class="icon">👨‍🏫</span>
                <b>ຊອກຫາອາຈານ</b>
                <small>340+ ອາຈານ</small>
              </div>
              <div class="mock-item">
                <span class="icon">🏫</span>
                <b>ຊອກຫາສູນຮຽນ</b>
                <small>85+ ສູນຮຽນ</small>
              </div>
              <div class="mock-item">
                <span class="icon">🎓</span>
                <b>ທຶນການສຶກສາ</b>
                <small>60+ ທຶນ</small>
              </div>
            </div>

            <div class="mock-chat-bubble">
              <span class="bot-avatar">AI</span>
              <div class="bot-text">
                <b>AI Mentor:</b> "ຍິນດີຕ້ອນຮັບສູ່ ຂົວອາຊີບ! ຂ້ອຍພ້ອມຊ່ວຍເຈົ້າວາງແຜນການຮຽນ
                ແລະ ຄົ້ນຫາອາຊີບທີ່ໃຊ່."
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Feature Highlights Section -->
  <section id="features" class="features-section">
    <div class="section-container">
      <div class="section-header">
        <span class="section-tag">ຄົບທຸກຄວາມຕ້ອງການໃນບ່ອນດຽວ</span>
        <h2 class="section-heading">ຟີເຈີຫຼັກທີ່ອອກແບບມາເພື່ອໄວໜຸ່ມລາວ</h2>
        <p class="section-desc">
          ບໍ່ວ່າເຈົ້າຈະກຳລັງຮຽນຢູ່ ມ.ຕົ້ນ, ມ.ປາຍ ຫຼື ກຳລັງຊອກຫາທິດທາງໃນອະນາຄົດ,
          ຂົວອາຊີບ ພ້ອມຢູ່ຄຽງຂ້າງເຈົ້າ.
        </p>
      </div>

      <div class="features-grid">
        <!-- Feature 1: RIASEC -->
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="feature-box" on:click={() => handleStart("riasecWelcome")}>
          <div class="feature-icon-box teal">🧭</div>
          <h3>ແບບປະເມີນຕົນເອງ (RIASEC)</h3>
          <p>
            ຄົ້ນຫາຈຸດແຂງ ແລະ ບຸກຄະລິກທີ່ແທ້ຈິງຂອງເຈົ້າຜ່ານ 20 ຄຳຖາມມາດຕະຖານສາກົນ
            ພ້ອມຮັບລາຍການອາຊີບທີ່ເໝາະສົມທັນທີ.
          </p>
          <span class="feature-link">ທົດລອງເຮັດແບບປະເມີນ ›</span>
        </div>

        <!-- Feature 2: Career Explorer -->
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="feature-box" on:click={() => handleStart("home")}>
          <div class="feature-icon-box navy">🎯</div>
          <h3>ຄົ້ນຫາອາຊີບ (Career Explorer)</h3>
          <p>
            ຖານຂໍ້ມູນ 120+ ອາຊີບໃນຍຸກດິຈິຕອນ ບອກລະອຽດທັງເງິນເດືອນສະເລ່ຍ,
            ຄວາມຕ້ອງການຂອງຕະຫຼາດແຮງງານ ແລະ ເສັ້ນທາງການສຶກສາ.
          </p>
          <span class="feature-link">ຄົ້ນຫາອາຊີບ ›</span>
        </div>

        <!-- Feature 3: Verified Tutors -->
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="feature-box" on:click={() => handleStart("home")}>
          <div class="feature-icon-box orange">👨‍🏫</div>
          <h3>ຊອກຫາອາຈານສອນເພີ່ມ (Tutors)</h3>
          <p>
            ຕະຫຼາດລວມອາຈານສອນເພີ່ມທີ່ມີໃບຢັ້ງຢືນ ໂປຣແກຣມມິ່ງ, ພາສາອັງກິດ,
            ຄະນິດສາດ ສາມາດເລືອກຮຽນແບບອອນລາຍ ຫຼື ອອຟລາຍໄດ້.
          </p>
          <span class="feature-link">ຊອກຫາອາຈານ ›</span>
        </div>

        <!-- Feature 4: Learning Centers -->
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="feature-box" on:click={() => handleStart("home")}>
          <div class="feature-icon-box purple">🏫</div>
          <h3>ຊອກຫາສູນຮຽນ ແລະ ສະຖາບັນ</h3>
          <p>
            ລວມສູນຮຽນວິຊາຊີບ ແລະ ຫຼັກສູດພັດທະນາທັກສະໃນ ນະຄອນຫຼວງວຽງຈັນ ແລະ
            ຕ່າງແຂວງ ພ້ອມຣີວິວ ແລະ ລາຄາຄ່າຮຽນທີ່ໂປ່ງໃສ.
          </p>
          <span class="feature-link">ຊອກຫາສູນຮຽນ ›</span>
        </div>

        <!-- Feature 5: Scholarships -->
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="feature-box" on:click={() => handleStart("home")}>
          <div class="feature-icon-box amber">🎓</div>
          <h3>ທຶນການສຶກສາ (Scholarships)</h3>
          <p>
            ອັບເດດທຶນການສຶກສາເຕັມຈຳນວນທັງພາຍໃນ ແລະ ຕ່າງປະເທດ (ສິງກະໂປ,
            ເກົາຫຼີໃຕ້, ຍີ່ປຸ່ນ, ອົດສະຕຣາລີ) ພ້ອມລະບົບກວດສອບເປີເຊັນທີ່ກົງກັບ
            Profile.
          </p>
          <span class="feature-link">ເບິ່ງທຶນການສຶກສາ ›</span>
        </div>

        <!-- Feature 6: AI Mentor -->
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="feature-box" on:click={() => handleStart("home")}>
          <div class="feature-icon-box teal">🤖</div>
          <h3>AI Mentor ທີ່ປຶກສາສ່ວນຕົວ 24/7</h3>
          <p>
            ສົນທະນາແບບ Real-time ເພື່ອຂໍຄຳແນະນຳການກຽມຕົວສະໝັກວຽກ, ຂຽນ Resume,
            ວາງແຜນການຮຽນ ແລະ ຕອບຄຳຖາມທຸກຂໍ້ສົງໄສເປັນພາສາລາວ.
          </p>
          <span class="feature-link">ລົມກັບ AI Mentor ›</span>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Banner Section -->
  <section class="cta-banner-section">
    <div class="cta-card">
      <h2>ພ້ອມແລ້ວບໍທີ່ຈະຄົ້ນພົບເສັ້ນທາງອາຊີບຂອງເຈົ້າ?</h2>
      <p>ເລີ່ມຕົ້ນໃຊ້ງານຟຣີມື້ນີ້ ເພື່ອອະນາຄົດທີ່ເຈົ້າສາມາດກຳນົດໄດ້ເອງ.</p>
      <button
        type="button"
        class="btn-cta-large"
        on:click={() => handleStart("home")}
      >
        ເລີ່ມຕົ້ນໃຊ້ງານດຽວນີ້ (Free)
      </button>
    </div>
  </section>

  <!-- Footer -->
  <footer class="landing-footer">
    <div class="footer-container">
      <div class="footer-col brand-col">
        <div class="brand">
          <div class="logo-circle">🧭</div>
          <div class="brand-names">
            <span class="brand-title">ຂົວອາຊີບ</span>
            <span class="brand-sub">Compass Youth</span>
          </div>
        </div>
        <p class="footer-desc">
          ເວທີແນະນຳອາຊີບ, ຫຼັກສູດການຮຽນ, ອາຈານສອນເພີ່ມ, ສູນຮຽນ ແລະ ທຶນການສຶກສາ
          ສຳລັບໄວໜຸ່ມລາວ.
        </p>
      </div>

      <div class="footer-col">
        <h4>ບໍລິການ</h4>
        <ul>
          <li>
            <a
              href="#riasec"
              on:click|preventDefault={() => handleStart("riasecWelcome")}
              >ແບບປະເມີນ RIASEC</a
            >
          </li>
          <li>
            <a
              href="#careers"
              on:click|preventDefault={() => handleStart("home")}>ຄົ້ນຫາອາຊີບ</a
            >
          </li>
          <li>
            <a
              href="#tutors"
              on:click|preventDefault={() => handleStart("home")}>ຊອກຫາອາຈານ</a
            >
          </li>
          <li>
            <a
              href="#scholarships"
              on:click|preventDefault={() => handleStart("home")}>ທຶນການສຶກສາ</a
            >
          </li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>ການຮ່ວມມື</h4>
        <ul>
          <li>ມະຫາວິທະຍາໄລແຫ່ງຊາດ (NUOL)</li>
          <li>ກະຊວງແຮງງານ ແລະ ສະຫວັດດີການສັງຄົມ</li>
          <li>ສູນພັດທະນາໄວໜຸ່ມລາວ</li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>ຕິດຕໍ່ພວກເຮົາ</h4>
        <p>ນະຄອນຫຼວງວຽງຈັນ, ສປປ ລາວ</p>
        <p>Email: contact@khua-achip.la</p>
      </div>
    </div>

    <div class="footer-bottom">
      <p>© 2026 Khua Achip (ຂົວອາຊີບ / Compass Youth). All rights reserved.</p>
    </div>
  </footer>
</div>

<style>
  .landing-page {
    min-height: 100vh;
    background: #fafaf8;
    color: var(--ink-900);
    display: flex;
    flex-direction: column;
  }

  /* Navigation Bar */
  .landing-nav {
    position: sticky;
    top: 0;
    z-index: 50;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--line);
  }
  .nav-container {
    max-width: 1140px;
    margin: 0 auto;
    padding: 14px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .logo-circle {
    width: 42px;
    height: 42px;
    border-radius: 14px;
    background: var(--navy-900);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    box-shadow: 0 4px 12px rgba(15, 27, 61, 0.25);
  }
  .brand-names {
    display: flex;
    flex-direction: column;
  }
  .brand-title {
    font-size: 17px;
    font-weight: 800;
    color: var(--navy-900);
    line-height: 1.2;
  }
  .brand-sub {
    font-size: 11px;
    font-weight: 700;
    color: var(--teal-600);
    letter-spacing: 0.5px;
  }
  .desktop-menu {
    display: flex;
    gap: 28px;
  }
  .desktop-menu a {
    text-decoration: none;
    color: var(--ink-600);
    font-size: 13.5px;
    font-weight: 600;
    transition: color 0.15s ease;
  }
  .desktop-menu a:hover {
    color: var(--navy-900);
  }
  .nav-cta {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .btn-login {
    background: none;
    border: none;
    font-size: 13.5px;
    font-weight: 700;
    color: var(--navy-900);
    padding: 8px 14px;
    cursor: pointer;
    font-family: inherit;
  }
  .btn-start {
    background: var(--navy-900);
    color: #fff;
    border: none;
    padding: 10px 18px;
    border-radius: 14px;
    font-size: 13.5px;
    font-weight: 700;
    cursor: pointer;
    font-family: inherit;
    transition:
      transform 0.15s ease,
      background 0.15s ease;
  }
  .btn-start:hover {
    background: var(--navy-800);
    transform: translateY(-1px);
  }

  /* Hero Section */
  .hero-section {
    padding: 60px 24px 80px 24px;
    background: linear-gradient(180deg, #ffffff 0%, #eef1f8 100%);
    overflow: hidden;
  }
  .hero-container {
    max-width: 1140px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    gap: 48px;
    align-items: center;
  }
  .badge-pill {
    display: inline-block;
    background: var(--teal-100);
    color: var(--teal-600);
    font-size: 12px;
    font-weight: 700;
    padding: 6px 14px;
    border-radius: 20px;
    margin-bottom: 20px;
  }
  .hero-headline {
    font-size: 42px;
    font-weight: 800;
    line-height: 1.35;
    color: var(--navy-900);
    margin: 0 0 18px 0;
    letter-spacing: -0.5px;
  }
  .hero-headline .highlight {
    color: var(--teal-600);
    position: relative;
  }
  .hero-sub {
    font-size: 16px;
    color: var(--ink-600);
    line-height: 1.7;
    margin: 0 0 28px 0;
  }
  .hero-buttons {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
    margin-bottom: 40px;
  }
  .btn-cta-primary {
    background: var(--navy-900);
    color: #fff;
    border: none;
    padding: 15px 28px;
    border-radius: 16px;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    font-family: inherit;
    box-shadow: 0 12px 24px -8px rgba(15, 27, 61, 0.4);
    transition: transform 0.15s ease;
  }
  .btn-cta-primary:hover {
    transform: translateY(-2px);
  }
  .btn-cta-secondary {
    background: #fff;
    color: var(--navy-900);
    border: 1.5px solid var(--line);
    padding: 15px 24px;
    border-radius: 16px;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.15s ease;
  }
  .btn-cta-secondary:hover {
    border-color: var(--teal-600);
    color: var(--teal-600);
  }
  .stats-row {
    display: flex;
    gap: 32px;
    padding-top: 24px;
    border-top: 1px solid var(--line);
  }
  .stat-item {
    display: flex;
    flex-direction: column;
  }
  .stat-num {
    font-size: 26px;
    font-weight: 800;
    color: var(--navy-900);
  }
  .stat-lbl {
    font-size: 12px;
    color: var(--ink-400);
    margin-top: 2px;
  }

  /* Hero Visual Mock */
  .hero-visual {
    display: flex;
    justify-content: center;
  }
  .hero-card-preview {
    width: 100%;
    max-width: 380px;
    background: #fff;
    border-radius: 28px;
    box-shadow: 0 30px 60px -20px rgba(15, 27, 61, 0.35);
    border: 1px solid var(--line);
    overflow: hidden;
  }
  .preview-header {
    background: #f4f5f8;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    gap: 6px;
    border-bottom: 1px solid var(--line);
  }
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  .dot.red {
    background: #ff5f56;
  }
  .dot.yellow {
    background: #ffbd2e;
  }
  .dot.green {
    background: #27c93f;
  }
  .preview-title {
    font-size: 11px;
    font-weight: 700;
    color: var(--ink-400);
    margin-left: 6px;
  }
  .preview-inner {
    padding: 18px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .mock-card.hero-gradient {
    background: linear-gradient(135deg, var(--navy-900), var(--navy-700));
    color: #fff;
    border-radius: 18px;
    padding: 16px;
  }
  .mock-search {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    padding: 8px 12px;
    font-size: 11.5px;
    margin-top: 12px;
    color: rgba(255, 255, 255, 0.8);
  }
  .mock-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .mock-item {
    background: var(--paper);
    padding: 12px;
    border-radius: 14px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    border: 1px solid var(--line);
  }
  .mock-item .icon {
    font-size: 18px;
    margin-bottom: 2px;
  }
  .mock-item b {
    font-size: 12px;
    color: var(--navy-900);
  }
  .mock-item small {
    font-size: 10px;
    color: var(--ink-400);
  }
  .mock-chat-bubble {
    background: #f0f8f8;
    border-left: 3px solid var(--teal-500);
    border-radius: 12px;
    padding: 12px;
    display: flex;
    gap: 10px;
    align-items: flex-start;
  }
  .bot-avatar {
    width: 26px;
    height: 26px;
    border-radius: 8px;
    background: var(--teal-600);
    color: #fff;
    font-size: 10px;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .bot-text {
    font-size: 11.5px;
    line-height: 1.45;
    color: var(--navy-900);
  }

  /* Features Grid Section */
  .features-section {
    padding: 80px 24px;
    background: #fff;
  }
  .section-container {
    max-width: 1140px;
    margin: 0 auto;
  }
  .section-header {
    text-align: center;
    max-width: 640px;
    margin: 0 auto 50px auto;
  }
  .section-tag {
    font-size: 12.5px;
    font-weight: 700;
    color: var(--teal-600);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .section-heading {
    font-size: 32px;
    font-weight: 800;
    color: var(--navy-900);
    margin: 8px 0 14px 0;
    line-height: 1.35;
  }
  .section-desc {
    font-size: 15px;
    color: var(--ink-600);
    line-height: 1.65;
    margin: 0;
  }
  .features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
  .feature-box {
    background: var(--paper);
    border-radius: 20px;
    padding: 28px 24px;
    border: 1px solid var(--line);
    cursor: pointer;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
    display: flex;
    flex-direction: column;
  }
  .feature-box:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 32px -12px rgba(15, 27, 61, 0.15);
    border-color: rgba(15, 173, 166, 0.3);
  }
  .feature-icon-box {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    margin-bottom: 16px;
  }
  .feature-icon-box.teal {
    background: var(--teal-100);
  }
  .feature-icon-box.navy {
    background: #e6ecfa;
  }
  .feature-icon-box.orange {
    background: #fdece6;
  }
  .feature-icon-box.purple {
    background: #f0e8fa;
  }
  .feature-icon-box.amber {
    background: #fbf0dd;
  }

  .feature-box h3 {
    font-size: 17px;
    font-weight: 700;
    color: var(--navy-900);
    margin: 0 0 10px 0;
  }
  .feature-box p {
    font-size: 13.5px;
    color: var(--ink-600);
    line-height: 1.6;
    margin: 0 0 16px 0;
    flex: 1;
  }
  .feature-link {
    font-size: 13px;
    font-weight: 700;
    color: var(--teal-600);
  }

  /* CTA Banner */
  .cta-banner-section {
    padding: 40px 24px 80px 24px;
  }
  .cta-card {
    max-width: 1140px;
    margin: 0 auto;
    background: linear-gradient(135deg, var(--navy-900), var(--navy-800));
    border-radius: 28px;
    padding: 60px 40px;
    text-align: center;
    color: #fff;
    box-shadow: 0 24px 50px -16px rgba(15, 27, 61, 0.45);
  }
  .cta-card h2 {
    font-size: 32px;
    font-weight: 800;
    margin: 0 0 12px 0;
  }
  .cta-card p {
    font-size: 16px;
    opacity: 0.85;
    margin: 0 0 30px 0;
  }
  .btn-cta-large {
    background: var(--teal-500);
    color: #fff;
    border: none;
    padding: 16px 36px;
    border-radius: 18px;
    font-size: 16px;
    font-weight: 800;
    cursor: pointer;
    font-family: inherit;
    box-shadow: 0 10px 25px -5px rgba(15, 173, 166, 0.6);
    transition:
      transform 0.15s ease,
      background 0.15s ease;
  }
  .btn-cta-large:hover {
    background: var(--teal-600);
    transform: translateY(-2px);
  }

  /* Footer */
  .landing-footer {
    background: #0b0f1f;
    color: #fff;
    padding: 60px 24px 24px 24px;
    margin-top: auto;
  }
  .footer-container {
    max-width: 1140px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr 1fr;
    gap: 40px;
    padding-bottom: 40px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  .brand-col .brand-title {
    color: #fff;
  }
  .footer-desc {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.65;
    margin-top: 14px;
    max-width: 280px;
  }
  .footer-col h4 {
    font-size: 14px;
    font-weight: 700;
    margin: 0 0 16px 0;
    color: #fff;
  }
  .footer-col ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .footer-col li,
  .footer-col p {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.5;
  }
  .footer-col a {
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    transition: color 0.15s ease;
  }
  .footer-col a:hover {
    color: var(--teal-500);
  }
  .footer-bottom {
    max-width: 1140px;
    margin: 24px auto 0 auto;
    text-align: center;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.4);
  }

  /* Responsive Breakpoints */
  @media (max-width: 960px) {
    .hero-container {
      grid-template-columns: 1fr;
      text-align: center;
      gap: 40px;
    }
    .hero-buttons {
      justify-content: center;
    }
    .stats-row {
      justify-content: center;
    }
    .features-grid {
      grid-template-columns: 1fr 1fr;
    }
    .footer-container {
      grid-template-columns: 1fr 1fr;
    }
    .desktop-menu {
      display: none;
    }
  }

  @media (max-width: 600px) {
    .hero-headline {
      font-size: 32px;
    }
    .features-grid {
      grid-template-columns: 1fr;
    }
    .footer-container {
      grid-template-columns: 1fr;
    }
    .stats-row {
      flex-wrap: wrap;
      gap: 20px;
    }
    .cta-card {
      padding: 40px 20px;
    }
    .cta-card h2 {
      font-size: 24px;
    }
  }
</style>
