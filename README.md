# Khua Achip (ຂົວອາຊີບ / Compass Youth)

> ເວທີແນະນຳອາຊີບ, ຫຼັກສູດ, ອາຈານສອນເພີ່ມ, ສູນຮຽນ ແລະ ທຶນການສຶກສາ ສຳລັບໄວໜຸ່ມລາວ (Youth Career Guidance Platform for Lao Youth).

ໂປຣເຈັກນີ້ຖືກພັດທະນາແຍກອອກເປັນ 2 Services ຕາມມາດຕະຖານ Cloudflare Workers:
- **`apps/api`**: Hono TypeScript REST API ເຮັດວຽກເທິງ Cloudflare Workers.
- **`apps/web`**: SvelteKit + TypeScript ເຮັດວຽກເທິງ Cloudflare Workers/Pages ຜ່ານ `@sveltejs/adapter-cloudflare`.

---

## 📁 ໂຄງສ້າງໂຟນເດີ (Repository Structure)

```
khua-achip/
├── apps/
│   ├── api/                      # Hono Backend (Cloudflare Worker)
│   │   ├── src/
│   │   │   ├── connector/        # Stub ສຳລັບເຊື່ອມຕໍ່ LLM ພາຍນອກ (Anthropic Claude, etc.)
│   │   │   ├── features/         # Feature-based modular structure
│   │   │   │   ├── careers/      # routes.ts, service.ts, types.ts
│   │   │   │   ├── tutors/       # routes.ts, service.ts, types.ts
│   │   │   │   ├── centers/      # routes.ts, service.ts, types.ts
│   │   │   │   ├── scholarships/ # routes.ts, service.ts, types.ts
│   │   │   │   ├── riasec/       # routes.ts, service.ts, types.ts (ການຄິດໄລ່ຄະແນນ RIASEC 20 ຂໍ້)
│   │   │   │   └── mentor/       # routes.ts, service.ts, types.ts (ກົດເກນຕອບພາສາລາວ + Hook LLM)
│   │   │   ├── middlewares/      # CORS, Error handler, Validation
│   │   │   ├── models/           # Shared domain types
│   │   │   ├── config/           # Environment bindings
│   │   │   ├── main.ts           # Main Hono app
│   │   │   └── local.ts          # Local Node runner (@hono/node-server)
│   │   ├── .env.example
│   │   ├── wrangler.jsonc
│   │   └── package.json
│   │
│   └── web/                      # SvelteKit Frontend (Cloudflare Worker)
│       ├── src/
│       │   ├── routes/           # SvelteKit pages
│       │   │   ├── +layout.svelte
│       │   │   └── +page.svelte  # Device frame & screen routing
│       │   └── lib/
│       │       ├── components/   # BottomNav, DeviceFrame, TopBar, DemoBar
│       │       ├── features/     # Feature-specific components & API clients
│       │       │   ├── careers/  # CareerCard, CareerList, CareerDetail, careersApi.ts
│       │       │   ├── riasec/   # RiasecWelcome, RiasecQuestions, RiasecResult, riasecApi.ts
│       │       │   ├── tutors/   # TutorCard, TutorList, TutorDetail, tutorsApi.ts
│       │       │   ├── centers/  # CenterCard, CenterList, CenterDetail, centersApi.ts
│       │       │   ├── scholarships/ # ScholCard, ScholList, ScholDetail, scholarshipsApi.ts
│       │       │   ├── mentor/   # MentorChat.svelte, mentorApi.ts (Interactive real chat UI)
│       │       │   ├── roadmap/  # RoadmapTimeline.svelte
│       │       │   ├── saved/    # SavedView.svelte
│       │       │   ├── profile/  # ProfileView.svelte
│       │       │   ├── home/     # HomeView.svelte
│       │       │   ├── explore/  # ExploreHub.svelte
│       │       │   └── uni/      # UniDetail.svelte
│       │       ├── api/          # Shared fetch client (client.ts)
│       │       └── stores/       # navStore.ts, demoStore.ts, savedStore.ts
│       ├── static/
│       ├── svelte.config.js      # @sveltejs/adapter-cloudflare
│       ├── vite.config.ts
│       ├── wrangler.jsonc
│       └── package.json
├── package.json                  # Root monorepo workspace scripts
└── README.md
```

---

## 💻 ວິທີລັນ Local Development (Local Commands)

### 1. ຕິດຕັ້ງ Dependencies
```bash
npm install
```

### 2. ລັນ Backend API (Port 8787)
ເປີດ Terminal ທີ 1:
```bash
npm run dev:api
```
ຫຼື:
```bash
cd apps/api
npm run dev
```
API ຈະ run ຢູ່: `http://localhost:8787` (ກວດສອບຜ່ານ `http://localhost:8787/api/health`).

### 3. ລັນ Frontend SvelteKit (Port 5173)
ເປີດ Terminal ທີ 2:
```bash
npm run dev:web
```
ຫຼື:
```bash
cd apps/web
npm run dev
```
Frontend ຈະ run ຢູ່: `http://localhost:5173` (ສາມາດເປີດ Browser ທົດສອບໄດ້ທັນທີ).

### 4. ກວດສອບ TypeScript & Build
- ກວດສອບ Backend:
  ```bash
  npm run build --workspace=@khua-achip/api
  ```
- ກວດສອບ Frontend:
  ```bash
  npm run check --workspace=@khua-achip/web
  npm run build --workspace=@khua-achip/web
  ```

---

## 🚀 ຄູ່ມືການ Deploy ໄປ Cloudflare (Human Deployment Guide)

> ໝາຍເຫດ: ລະບົບຖືກ Configure ໄຟລ໌ `wrangler.jsonc` ໄວ້ຮຽບຮ້ອຍແລ້ວ. ທ່ານພຽງແຕ່ລັນຄຳສັ່ງຕາມຂັ້ນຕອນດ້ານລຸ່ມນີ້ດ້ວຍຕົນເອງ:

### ຂັ້ນຕອນທີ 1: Login ເຂົ້າ Cloudflare
```bash
npx wrangler login
```

### ຂັ້ນຕອນທີ 2: Deploy Backend API (`apps/api`)
1. ເຂົ້າໄປທີ່ໂຟນເດີ API:
   ```bash
   cd apps/api
   ```
2. ສັ່ງ Deploy Worker:
   ```bash
   npx wrangler deploy
   ```
3. ບັນທຶກ URL ທີ່ Cloudflare ສ້າງໃຫ້ (ເຊັ່ນ: `https://khua-achip-api.<your-subdomain>.workers.dev`).
4. (ທາງເລືອກ) ຕັ້ງຄ່າ AI Secret ສຳລັບອະນາຄົດ (ຖ້າຕ້ອງການໃຊ້ Anthropic/OpenAI API):
   ```bash
   npx wrangler secret put AI_API_KEY
   ```
   *(ໃສ່ Key ເມື່ອ CLI ຖາມຫາ)*

### ຂັ້ນຕອນທີ 3: Deploy Frontend Web (`apps/web`)
1. ເຂົ້າໄປທີ່ໂຟນເດີ Web:
   ```bash
   cd ../web
   ```
2. Build ໂປຣເຈັກ (ພ້ອມຕັ້ງຄ່າ API URL ໃຫ້ຊີ້ໄປຫາ Worker API ທີ່ Deploy ສຳເລັດໃນຂັ້ນຕອນທີ 2):
   - ຕັ້ງໃນ `.env` ຂອງ `apps/web`:
     ```env
     PUBLIC_API_URL=https://khua-achip-api.<your-subdomain>.workers.dev
     ```
   - ຫຼື build ດ້ວຍ inline env:
     ```bash
     npm run build
     ```
3. ສັ່ງ Deploy ໄປ Cloudflare:
   ```bash
   npx wrangler deploy
   ```
4. ທ່ານຈະໄດ້ຮັບ URL ສາທາລະນະສຳລັບໃຫ້ກຳມະການເປີດໃນໂທລະສັບໄດ້ທັນທີ!

---

## 🔌 ລາຍການ API Endpoints ຫຼັກ

| Method | Endpoint | ລາຍລະອຽດ |
|---|---|---|
| `GET` | `/api/careers` | ດຶງລາຍການອາຊີບທັງໝົດ |
| `GET` | `/api/careers/:id` | ດຶງລາຍລະອຽດອາຊີບຕາມ ID |
| `GET` | `/api/tutors` | ດຶງລາຍການອາຈານສອນເພີ່ມ |
| `GET` | `/api/tutors/:id` | ດຶງລາຍລະອຽດອາຈານຕາມ ID |
| `GET` | `/api/centers` | ດຶງລາຍການສູນຮຽນ |
| `GET` | `/api/centers/:id` | ດຶງລາຍລະອຽດສູນຮຽນຕາມ ID |
| `GET` | `/api/scholarships` | ດຶງລາຍການທຶນການສຶກສາ |
| `GET` | `/api/scholarships/:id` | ດຶງລາຍລະອຽດທຶນການສຶກສາຕາມ ID |
| `GET` | `/api/riasec/questions` | ດຶງຄຳຖາມແບບປະເມີນ 20 ຂໍ້ |
| `POST` | `/api/riasec/submit` | ສົ່ງຄຳຕອບ 20 ຂໍ້ `{ answers: [1..5] }` ເພື່ອໃຫ້ Backend ຄິດໄລ່ຄະແນນ |
| `POST` | `/api/mentor` | ສົ່ງຂໍ້ຄວາມຫາ AI Mentor `{ message: "..." }` ແລະ ຮັບຄຳແນະນຳ |

---

## 🌟 ຟີເຈີຫຼັກໃນ Demo

1. **ໜ້າຫຼັກ (Home)**: ສະແດງ Header ທັກທາຍ, ປຸ່ມຄົ້ນຫາ, 4 ໝວດໝູ່ຫຼັກ, ລາຍການອາຊີບ/ອາຈານ/ສູນຮຽນ/ທຶນທີ່ດຶງມາຈາກ Backend API.
2. **ແບບປະເມີນ RIASEC (20 ຂໍ້)**: ຕອບຄະແນນ Likert 1–5, ສົ່ງຄຳຕອບໄປປະມວນຜົນຢູ່ Backend API ແລະ ສະແດງຜົນການວິເຄາະບຸກຄະລິກພ້ອມອາຊີບທີ່ກົງກັນ.
3. **AI Mentor Chat**: ລະບົບສົນທະນາແບບ Real-time ທີ່ສົ່ງຂໍ້ຄວາມໄປຫາ Backend ແລະ ຕອບກັບຄຳແນະນຳວິຊາຮຽນ, ແນະນຳອາຈານ ພ້ອມ Quick action cards.
4. **Demo Mode (ໂໝດສາທິດ 9 ຂັ້ນຕອນ)**: ກົດປຸ່ມ `▶ ໂໝດສາທິດ` ຢູ່ໜ້າຫຼັກ ເພື່ອນຳທ່ຽວ Flow ຕັ້ງແຕ່ຕົ້ນຈົນຈົບ (ໜ້າຫຼັກ → ຜົນ RIASEC → ອາຊີບ → ມະຫາວິທະຍາໄລ → AI Mentor → ອາຈານ → ສູນຮຽນ → ທຶນ → ເສັ້ນທາງການຮຽນ).
