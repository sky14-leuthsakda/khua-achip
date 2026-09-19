<script lang="ts">
  import TopBar from '../../components/TopBar.svelte';
  import type { RoadmapStep } from './types';

  const roadmapSteps: RoadmapStep[] = [
    {
      year: '2026',
      title: 'ພື້ນຖານໂປຣແກຣມມິ່ງ',
      desc: 'ຮຽນ Python ພື້ນຖານ ແລະ ຕັກກະການຄິດແບບໂປຣແກຣມເມີ',
      status: 'done'
    },
    {
      year: '2027',
      title: 'ການພັດທະນາເວັບໄຊ (Web Development)',
      desc: 'HTML, CSS, JavaScript ແລະ ສ້າງເວັບໄຊທຳອິດຂອງຕົນເອງ',
      status: 'current'
    },
    {
      year: '2028',
      title: 'Backend + Database',
      desc: 'ຮຽນການສ້າງລະບົບຫຼັງບ້ານ ແລະ ຈັດການຖານຂໍ້ມູນ',
      status: 'upcoming'
    },
    {
      year: '2029',
      title: 'ຝຶກງານ (Internship)',
      desc: 'ຝຶກງານກັບບໍລິສັດເທັກໂນໂລຊີ ເພື່ອສະສົມປະສົບການຕົວຈິງ',
      status: 'upcoming'
    },
    {
      year: '2030',
      title: 'ນັກພັດທະນາຊອບແວ',
      desc: 'ເລີ່ມຕົ້ນອາຊີບເປັນນັກພັດທະນາຊອບແວເຕັມຕົວ',
      status: 'upcoming'
    }
  ];

  function getStatusLabel(status: 'done' | 'current' | 'upcoming'): string {
    if (status === 'done') return 'ສຳເລັດແລ້ວ';
    if (status === 'current') return 'ກຳລັງຮຽນ';
    return 'ຍັງບໍ່ເຖິງ';
  }
</script>

<div class="screen active">
  <div class="status-space"></div>
  <TopBar title="ເສັ້ນທາງການຮຽນຂອງຂ້ອຍ" />

  <div class="pad">
    <div
      class="card"
      style="display:flex; gap:14px; align-items:center; background:linear-gradient(135deg,var(--navy-900),var(--navy-700)); color:#fff; border:none;"
    >
      <div style="font-size:26px;">💻</div>
      <div>
        <div style="font-size:11px; color:rgba(255,255,255,0.7);">ເປົ້າໝາຍຂອງຂ້ອຍ</div>
        <div style="font-weight:700; font-size:15px;">ນັກພັດທະນາຊອບແວ</div>
      </div>
    </div>

    <div class="roadmap-line">
      {#each roadmapSteps as step}
        <div class="rm-step">
          <div class="rm-dot {step.status}">
            {step.status === 'done' ? '✓' : ''}
          </div>
          <div class="rm-year">{step.year}</div>
          <div class="rm-title">{step.title}</div>
          <div class="rm-desc">{step.desc}</div>
          <div class="rm-status {step.status}">{getStatusLabel(step.status)}</div>
        </div>
      {/each}
    </div>
  </div>
</div>
