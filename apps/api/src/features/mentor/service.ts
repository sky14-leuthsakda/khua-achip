import type { MentorResponse } from './types';
import type { Env } from '../../config';
import { callAIProvider } from '../../connector/aiProvider';
import { careersData } from '../careers/service';
import { tutorsData } from '../tutors/service';
import { centersData } from '../centers/service';
import { scholarshipsData } from '../scholarships/service';

/**
 * getMentorReply handles generating AI responses for the youth career guidance mentor.
 * 
 * Persona: "AI Mentor ຈາກ ຂົວອາຊີບ (Khua Achip)"
 * - Polite, supportive, encouraging Lao youth in their education and career goals.
 * - Capable of greeting, introducing identity, answering platform data queries (RAG),
 *   and providing general career/education preparation advice.
 * 
 * TODO: To replace this rule/RAG implementation with a real LLM API call (e.g. Anthropic Claude API):
 * 1. Ensure `AI_API_KEY` is configured in your Cloudflare Worker via `npx wrangler secret put AI_API_KEY`.
 * 2. Connect via `callAIProvider` in `src/connector/aiProvider.ts`.
 */
export async function getMentorReply(
  message: string,
  context?: Record<string, any>,
  env?: Env
): Promise<MentorResponse> {
  const apiKey = env?.AI_API_KEY || process.env.AI_API_KEY;

  // If a real API key is configured in the future, delegate to the LLM connector
  if (apiKey) {
    try {
      const llmResult = await callAIProvider(message, {
        apiKey,
        systemPrompt: `You are 'AI Mentor ຈາກ ຂົວອາຊີບ (Khua Achip)', a helpful, inspiring career and education mentor for Lao youth. Answer politely in Lao language.`
      });
      if (llmResult) {
        return {
          reply: llmResult
        };
      }
    } catch (err) {
      console.error('Failed calling external LLM provider, falling back to intelligent RAG engine:', err);
    }
  }

  const normalized = (message || '').toLowerCase().trim();

  // 1. GREETING & IDENTITY HANDLING ("ເຈົ້າແມ່ນໃຜ?", "ສະບາຍດີ", "ແນະນຳຕົວ", "hello", "hi")
  if (
    normalized.includes('ເຈົ້າແມ່ນໃຜ') ||
    normalized.includes('ເຈົ້າຄືໃຜ') ||
    normalized.includes('ແນະນຳຕົວ') ||
    normalized.includes('who are you') ||
    normalized.includes('ແມ່ນຫຍັງ') && (normalized.includes('mentor') || normalized.includes('ai'))
  ) {
    return {
      reply: `ສະບາຍດີ! ຂ້ອຍແມ່ນ **AI Mentor ຈາກ ຂົວອາຊີບ (Khua Achip)** 🧭\n\nຂ້ອຍເປັນທີ່ປຶກສາດ້ານການຮຽນ ແລະ ການວາງແຜນອາຊີບສຳລັບໄວໜຸ່ມລາວ. ຂ້ອຍສາມາດຊ່ວຍເຈົ້າ:\n• 🔍 ຄົ້ນຫາອາຊີບທີ່ເໝາະສົມກັບບຸກຄະລິກ ແລະ ຄວາມຖະໜັດ (RIASEC)\n• 👨‍🏫 ແນະນຳອາຈານສອນເພີ່ມທີ່ຊ່ຽວຊານສະເພາະດ້ານ\n• 🏫 ແນະນຳສູນຮຽນ ແລະ ຫຼັກສູດຝຶກອົບຮົມໃນ ສປປ ລາວ\n• 🎓 ຄົ້ນຫາທຶນການສຶກສາທັງພາຍໃນ ແລະ ຕ່າງປະເທດ\n• 🗺️ ວາງແຜນເສັ້ນທາງການຮຽນ (Learning Roadmap) ຕັ້ງແຕ່ ມ.ປາຍ ຈົນຮອດເຮັດວຽກ\n\nມື້ນີ້ເຈົ້າຢາກປຶກສາ ຫຼື ຄົ້ນຫາເລື່ອງໃດເປັນພິເສດບໍ?`,
      recommendations: [
        'ຄວນເລີ່ມຮຽນຫຍັງກ່ອນ?',
        'ແນະນຳອາຈານສອນໂປຣແກຣມ',
        'ທຶນການສຶກສາທີ່ເໝາະກັບຂ້ອຍ',
        'ຢາກເຮັດແບບປະເມີນອາຊີບ'
      ]
    };
  }

  if (
    normalized === 'ສະບາຍດີ' ||
    normalized === 'ສະບາຍດີເຈົ້າ' ||
    normalized === 'hello' ||
    normalized === 'hi' ||
    normalized === 'sabaidee'
  ) {
    return {
      reply: `ສະບາຍດີ! ຂ້ອຍແມ່ນ AI Mentor ຈາກ ຂົວອາຊີບ (Khua Achip) 👋\n\nຍິນດີທີ່ໄດ້ພົບເຈົ້າ! ມື້ນີ້ເຈົ້າມີຄຳຖາມກ່ຽວກັບອາຊີບ, ການເລືອກສາຍຮຽນ, ອາຈານສອນເພີ່ມ, ສູນຮຽນ ຫຼື ທຶນການສຶກສາ ຢາກໃຫ້ຂ້ອຍຊ່ວຍແນະນຳບໍ?`,
      recommendations: [
        'ຄວນຮຽນຫຍັງດີ?',
        'ແນະນຳອາຈານ',
        'ແນະນຳສູນຮຽນ',
        'ທຶນທີ່ເໝາະກັບຂ້ອຍ'
      ]
    };
  }

  // 2. RAG RETRIEVAL: SCHOLARSHIPS (ທຶນ, scholarship, kgsp, mext, asean)
  if (
    normalized.includes('ທຶນ') ||
    normalized.includes('scholarship') ||
    normalized.includes('kgsp') ||
    normalized.includes('mext') ||
    normalized.includes('asean')
  ) {
    const s1 = scholarshipsData[0]; // ASEAN Digital
    const s2 = scholarshipsData[1]; // KGSP
    const s3 = scholarshipsData[2]; // MEXT

    return {
      reply: `ໃນລະບົບ ຂົວອາຊີບ ປະຈຸບັນມີທຶນການສຶກສາທີ່ໜ້າສົນໃຈ ແລະ ກົງກັບໄວໜຸ່ມລາວຫຼາຍລາຍການ:\n\n1. 🇸🇬 **${s1.name}** (${s1.country} · ${s1.level} · ${s1.funded})\n   - ໝົດເຂດ: ${s1.deadline} (ກົງກັບສາຍເທັກໂນໂລຊີ 88%)\n2. 🇰🇷 **${s2.name}** (${s2.country} · ${s2.level} · ${s2.funded})\n   - ໝົດເຂດ: ${s2.deadline}\n3. 🇯🇵 **${s3.name}** (${s3.country} · ${s3.level} · ${s3.funded})\n   - ໝົດເຂດ: ${s3.deadline}\n\nເຈົ້າສາມາດກົດເບິ່ງລາຍລະອຽດ ຫຼື ຄຸນສົມບັດຂອງແຕ່ລະທຶນໄດ້ເລີຍ:`,
      suggestedAction: {
        type: 'scholarship',
        label: `ເບິ່ງທຶນ ${s1.name}`,
        targetId: s1.id,
        meta: {
          name: s1.name,
          country: s1.country,
          match: s1.match
        }
      }
    };
  }

  // 3. RAG RETRIEVAL: LEARNING CENTERS (ສູນຮຽນ, codelab, center, ສະຖາບັນ)
  if (
    normalized.includes('ສູນ') ||
    normalized.includes('center') ||
    normalized.includes('codelab') ||
    normalized.includes('ສະຖາບັນ')
  ) {
    const c1 = centersData[0];
    return {
      reply: `ສຳລັບສູນຮຽນເພີ່ມ ທີ່ໄດ້ຮັບການຢັ້ງຢືນໃນລະບົບ ຂົວອາຊີບ:\n\n• **${c1.name}** (${c1.loc} · ⭐ ${c1.rating})\n  - ສອນ: ${c1.subj} (Python, Web Dev, Mobile App)\n  - ຮູບແບບ: ${c1.mode}\n  - ຄ່າຮຽນ: ${c1.price}\n• **Bright English Center** (ພາສາອັງກິດ · ⭐ 4.8 · 300,000 LAK/ເດືອນ)\n• **ສູນຄະນິດສາດ ອານຸໄກ** (ຄະນິດສາດ · ⭐ 4.6 · 250,000 LAK/ເດືອນ)`,
      suggestedAction: {
        type: 'center',
        label: `ເບິ່ງລາຍລະອຽດ ${c1.name}`,
        targetId: c1.id,
        meta: {
          name: c1.name,
          loc: c1.loc,
          rating: c1.rating,
          init: c1.init
        }
      }
    };
  }

  // 4. RAG RETRIEVAL: TUTORS (ອາຈານ, ຄູ, tutor, ວັນນະລີ, ສົມພອນ, ບຸນມີ, ຮຽນພິເສດ)
  if (
    normalized.includes('ອາຈານ') ||
    normalized.includes('ຄູ') ||
    normalized.includes('tutor') ||
    normalized.includes('ວັນນະລີ') ||
    normalized.includes('ສົມພອນ') ||
    normalized.includes('ບຸນມີ') ||
    normalized.includes('ຮຽນພິເສດ') ||
    normalized.includes('ສອນເພີ່ມ')
  ) {
    const t1 = tutorsData[0];
    return {
      reply: `ອາຈານສອນເພີ່ມທີ່ແນະນຳໃນລະບົບ:\n\n• 👨‍🏫 **${t1.name}** (ໂປຣແກຣມມິ່ງ, Python, Web) · ⭐ ${t1.rating} · ນັກຮຽນ ${t1.students} ຄົນ · ${t1.price}\n• 👨‍🏫 **ອາຈານ ສົມພອນ** (ພາສາອັງກິດ IELTS/General) · ⭐ 4.9 · ນັກຮຽນ 88 ຄົນ · 50,000 LAK/ຊມ\n• 👨‍🏫 **ອາຈານ ບຸນມີ** (ຄະນິດສາດ ມ.ປາຍ/ສອບເສັງ) · ⭐ 4.7 · ນັກຮຽນ 120 ຄົນ · 60,000 LAK/ຊມ\n\nເຈົ້າສາມາດກົດເບິ່ງໂປຣໄຟລ໌ ແລະ ຈອງຮຽນໄດ້ທັນທີ:`,
      suggestedAction: {
        type: 'tutor',
        label: `ເບິ່ງໂປຣໄຟລ໌ ${t1.name}`,
        targetId: t1.id,
        meta: {
          name: t1.name,
          subj: t1.subj,
          rating: t1.rating,
          init: t1.init
        }
      }
    };
  }

  // 5. RAG RETRIEVAL: SPECIFIC CAREERS (Software, Data, Cyber, UI/UX, Designer)
  if (
    normalized.includes('software') ||
    normalized.includes('developer') ||
    normalized.includes('ໂປຣແກຣມ') ||
    normalized.includes('ຂຽນໂປຣແກຣມ') ||
    normalized.includes('sw')
  ) {
    const sw = careersData.find((c) => c.id === 'sw') || careersData[0];
    return {
      reply: `ອາຊີບ **${sw.title}** (${sw.tag}):\n\n• **ໜ້າທີ່**: ${sw.what}\n• **ເສັ້ນທາງການຮຽນ**: ${sw.edu}\n• **ເງິນເດືອນສະເລ່ຍ**: ${sw.salary} (${sw.demand})\n• **ທັກສະທີ່ຕ້ອງມີ**: ${sw.skills.join(', ')}\n\n💡 ຄຳແນະນຳຈາກ Mentor: ເລີ່ມຕົ້ນດ້ວຍການຝຶກຄິດຢ່າງເປັນເຫດຜົນ (Logic), ຮຽນພາສາອັງກິດ ແລະ ເລືອກພາສາຄອມພິວເຕີພື້ນຖານເຊັ່ນ Python ຫຼື HTML/CSS.`,
      recommendations: [
        '1. ຄະນິດສາດ ແລະ ຕັກກະ',
        '2. ພື້ນຖານ Python / JavaScript',
        '3. ພາສາອັງກິດດ້ານເຕັກນິກ',
        '4. Database & Web Development'
      ],
      suggestedAction: {
        type: 'career',
        label: `ເບິ່ງລາຍລະອຽດ ${sw.title}`,
        targetId: sw.id
      }
    };
  }

  if (
    normalized.includes('data') ||
    normalized.includes('ວິເຄາະ') ||
    normalized.includes('ຂໍ້ມູນ')
  ) {
    const da = careersData.find((c) => c.id === 'da') || careersData[1];
    return {
      reply: `ອາຊີບ **${da.title}** (${da.tag}):\n\n• **ໜ້າທີ່**: ${da.what}\n• **ເສັ້ນທາງການຮຽນ**: ${da.edu}\n• **ເງິນເດືອນສະເລ່ຍ**: ${da.salary} (${da.demand})\n• **ທັກສະທີ່ຕ້ອງມີ**: ${da.skills.join(', ')}\n\n💡 ຄຳແນະນຳ: ໃຫ້ເນັ້ນວິຊາສະຖິຕິ, Excel ຂັ້ນສູງ ແລະ ຝຶກໃຊ້ SQL ໃນການຈັດການຂໍ້ມູນ.`,
      suggestedAction: {
        type: 'career',
        label: `ເບິ່ງລາຍລະອຽດ ${da.title}`,
        targetId: da.id
      }
    };
  }

  if (
    normalized.includes('cyber') ||
    normalized.includes('ຄວາມປອດໄພ') ||
    normalized.includes('ໄຊເບີ') ||
    normalized.includes('security')
  ) {
    const cy = careersData.find((c) => c.id === 'cy') || careersData[2];
    return {
      reply: `ອາຊີບ **${cy.title}** (${cy.tag}):\n\n• **ໜ້າທີ່**: ${cy.what}\n• **ເສັ້ນທາງການຮຽນ**: ${cy.edu}\n• **ເງິນເດືອນສະເລ່ຍ**: ${cy.salary} (${cy.demand})\n• **ທັກສະທີ່ຕ້ອງມີ**: ${cy.skills.join(', ')}\n\n💡 ຄຳແນະນຳ: ສາຍນີ້ຕ້ອງການພື້ນຖານ Network (ເຄືອຂ່າຍຄອມພິວເຕີ) ທີ່ແໜ້ນແຟ້ນ ແລະ ໃບຢັ້ງຢືນສາກົນເຊັ່ນ CompTIA Security+.`,
      suggestedAction: {
        type: 'career',
        label: `ເບິ່ງລາຍລະອຽດ ${cy.title}`,
        targetId: cy.id
      }
    };
  }

  if (
    normalized.includes('ux') ||
    normalized.includes('ui') ||
    normalized.includes('design') ||
    normalized.includes('ອອກແບບ')
  ) {
    const ux = careersData.find((c) => c.id === 'ux') || careersData[3];
    return {
      reply: `ອາຊີບ **${ux.title}** (${ux.tag}):\n\n• **ໜ້າທີ່**: ${ux.what}\n• **ເສັ້ນທາງການຮຽນ**: ${ux.edu}\n• **ເງິນເດືອນສະເລ່ຍ**: ${ux.salary} (${ux.demand})\n• **ທັກສະທີ່ຕ້ອງມີ**: ${ux.skills.join(', ')}\n\n💡 ຄຳແນະນຳ: ຝຶກໃຊ້ Figma, ສຶກສາຈິດຕະວິທະຍາຜູ້ໃຊ້ (User Psychology), ແລະ ສ້າງ Portfolio ຜົນງານຕົວຈິງ.`,
      suggestedAction: {
        type: 'career',
        label: `ເບິ່ງລາຍລະອຽດ ${ux.title}`,
        targetId: ux.id
      }
    };
  }

  // 6. ROADMAP & GENERAL CAREER GUIDANCE ("ຄວນຮຽນຫຍັງ", "ເລີ່ມຕົ້ນ", "roadmap", "ເສັ້ນທາງ", "ສຳພາດ", "cv", "resume")
  if (
    normalized.includes('ຄວນຮຽນຫຍັງ') ||
    normalized.includes('ເລີ່ມຕົ້ນແນວໃດ') ||
    normalized.includes('ແຜນ') ||
    normalized.includes('roadmap') ||
    normalized.includes('ເສັ້ນທາງ')
  ) {
    return {
      reply: `ນີ້ແມ່ນແຜນເສັ້ນທາງການຮຽນ (Learning Roadmap) ທີ່ແນະນຳຕັ້ງແຕ່ປີ 2026 - 2030:\n\n• **2026**: ພື້ນຖານໂປຣແກຣມມິ່ງ (Python, Logic, Computer Concepts)\n• **2027**: Web Development (HTML, CSS, JavaScript & ໂປຣເຈັກທຳອິດ)\n• **2028**: Backend & Database (Node.js/SQL/APIs)\n• **2029**: Internship (ຝຶກງານກັບບໍລິສັດເທັກໂນໂລຊີ)\n• **2030**: ນັກພັດທະນາຊອບແວມືອາຊີບ\n\nເຈົ້າສາມາດກົດເບິ່ງເສັ້ນທາງການຮຽນລະອຽດໄດ້ເລີຍ 👇`,
      suggestedAction: {
        type: 'roadmap',
        label: 'ເບິ່ງເສັ້ນທາງການຮຽນ (Roadmap)'
      }
    };
  }

  if (
    normalized.includes('ສຳພາດ') ||
    normalized.includes('cv') ||
    normalized.includes('resume') ||
    normalized.includes('ສະໝັກວຽກ')
  ) {
    return {
      reply: `ຄຳແນະນຳໃນການກຽມຕົວສະໝັກວຽກ ແລະ ສຳພາດ:\n\n1. **CV / Resume**: ຂຽນໃຫ້ກະທັດຮັດ (ບໍ່ເກີນ 1-2 ໜ້າ), ເນັ້ນໂຄງການ ຫຼື ຜົນງານຕົວຈິງທີ່ເຄີຍເຮັດ, ໃສ່ລິ້ງ GitHub ຫຼື Portfolio ໃຫ້ຈະແຈ້ງ.\n2. **ການກຽມຕົວສຳພາດ**: ສຶກສາຂໍ້ມູນບໍລິສັດ, ກຽມແນະນຳຕົນເອງເປັນພາສາລາວ ແລະ ອັງກິດ, ຝຶກຕອບຄຳຖາມແກ້ໄຂບັນຫາ (Problem Solving).\n3. **Portfolio**: ສຳລັບສາຍເທັກໂນໂລຊີ ຫຼື ອອກແບບ, ຜົນງານຕົວຈິງສຳຄັນກວ່າໃບປະກາດ.`,
      recommendations: [
        'ແນະນຳວິທີຂຽນ Resume',
        'ທັກສະທີ່ບໍລິສັດຕ້ອງການ',
        'ແນະນຳອາຊີບເທັກໂນໂລຊີ'
      ]
    };
  }

  // 7. RIASEC & SELF-ASSESSMENT ("riasec", "ປະເມີນ", "ບຸກຄະລິກ", "ຕົວເອງ")
  if (
    normalized.includes('riasec') ||
    normalized.includes('ປະເມີນ') ||
    normalized.includes('ບຸກຄະລິກ') ||
    normalized.includes('ຕົວຕົນ')
  ) {
    return {
      reply: `ແບບປະເມີນ RIASEC ເປັນເຄື່ອງມືມາດຕະຖານສາກົນທີ່ຊ່ວຍວັດແທກ 6 ດ້ານບຸກຄະລິກອາຊີບ:\n\n• **R (Realistic)**: ນັກປະຕິບັດ, ມັກລົງມືເຮັດຕົວຈິງ\n• **I (Investigative)**: ນັກຄົ້ນຄວ້າ, ມັກວິເຄາະ ແລະ ແກ້ບັນຫາ\n• **A (Artistic)**: ນັກສ້າງສັນ, ມັກສິລະປະ ແລະ ຄວາມຄິດໃໝ່\n• **S (Social)**: ນັກຊ່ວຍເຫຼືອ, ມັກສອນ ແລະ ຊ່ວຍເຫຼືອສັງຄົມ\n• **E (Enterprising)**: ນັກບໍລິຫານ, ມັກເປັນຜູ້ນຳ ແລະ ທຸລະກິດ\n• **C (Conventional)**: ນັກລະບຽບ, ມັກຄວາມເປັນລະບຽບ ແລະ ຂໍ້ມູນ\n\nໃຊ້ເວລາພຽງ 5 ນາທີ (20 ຂໍ້) ກໍສາມາດຮູ້ຜົນ ແລະ ອາຊີບທີ່ກົງກັບເຈົ້າໄດ້ທັນທີ!`,
      recommendations: [
        'ເລີ່ມເຮັດແບບປະເມີນເລີຍ',
        'ອາຊີບທີ່ເໝາະກັບຂ້ອຍ'
      ]
    };
  }

  // Fallback friendly guidance response in Lao
  return {
    reply: `ສະບາຍດີ! ຂ້ອຍແມ່ນ **AI Mentor ຈາກ ຂົວອາຊີບ (Khua Achip)** 🧭\n\nຂ້ອຍພ້ອມແນະນຳເລື່ອງອາຊີບ, ວິຊາຮຽນ, ອາຈານສອນ, ສູນຮຽນ ແລະ ທຶນການສຶກສາ. ເຈົ້າສາມາດພິມຖາມເລື່ອງຕ່າງໆໄດ້ເລີຍ ເຊັ່ນ:\n• *"ແນະນຳອາຊີບນັກພັດທະນາຊອບແວ"*\n• *"ມີທຶນການສຶກສາຫຍັງແດ່?"*\n• *"ແນະນຳອາຈານສອນພາສາອັງກິດ"*\n• *"ຄວນກຽມຕົວສຳພາດແນວໃດ?"*`,
    recommendations: [
      'ຄວນຮຽນຫຍັງດີ?',
      'ແນະນຳອາຈານ',
      'ແນະນຳສູນຮຽນ',
      'ທຶນທີ່ເໝາະກັບຂ້ອຍ'
    ]
  };
}
