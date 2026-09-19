<script lang="ts">
  import { onMount } from 'svelte';
  import TopBar from '../../components/TopBar.svelte';
  import { navStore } from '../../stores/navStore';
  import { fetchQuestions, submitAnswers } from './riasecApi';
  import type { RiasecQuestionItem, RiasecEvaluationResult } from './types';
  import { riasecResultStore } from './riasecStore';

  let questions: RiasecQuestionItem[] = [];
  let currentIndex = 0;
  let answers: (number | null)[] = [];
  let loading = true;
  let submitting = false;
  let error = '';

  onMount(async () => {
    try {
      questions = await fetchQuestions();
      answers = new Array(questions.length).fill(null);
    } catch (err: any) {
      error = err.message || 'Error loading questions';
    } finally {
      loading = false;
    }
  });

  $: currentQuestion = questions[currentIndex] || null;
  $: progressPct = questions.length > 0 ? Math.round(((currentIndex + 1) / questions.length) * 100) : 0;
  $: isLastQuestion = currentIndex === questions.length - 1;

  function selectScore(score: number) {
    answers[currentIndex] = score;
    answers = [...answers];
  }

  function handlePrev() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      navStore.back();
    }
  }

  async function handleNext() {
    if (!answers[currentIndex]) {
      answers[currentIndex] = 3; // default neutral if unselected
    }

    if (!isLastQuestion) {
      currentIndex++;
    } else {
      // Submit 20 answers to backend
      submitting = true;
      try {
        const cleanAnswers = answers.map((a) => (a !== null ? a : 3));
        const result = await submitAnswers(cleanAnswers);
        riasecResultStore.set(result);
        navStore.go('riasecResult');
      } catch (err: any) {
        error = err.message || 'Error submitting assessment';
      } finally {
        submitting = false;
      }
    }
  }
</script>

<div class="screen active">
  <div class="status-space"></div>
  <TopBar title="ແບບປະເມີນຕົນເອງ" onBack={handlePrev} />

  <div class="pad">
    {#if loading}
      <div style="text-align:center; padding:50px; color:var(--ink-400);">ກຳລັງໂຫລດຄຳຖາມ...</div>
    {:else if error}
      <div style="text-align:center; padding:30px; color:var(--coral-500);">{error}</div>
    {:else if currentQuestion}
      <div class="progress-track">
        <div class="progress-fill" style="width: {progressPct}%;"></div>
      </div>

      <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--ink-400);">
        <span>ຄຳຖາມ {currentIndex + 1} / {questions.length}</span>
        <span>{progressPct}%</span>
      </div>

      <div class="q-card">
        <div class="q-num">ດ້ານ: {currentQuestion.dimension}</div>
        <h3>{currentQuestion.text}</h3>

        <div class="likert">
          {#each [1, 2, 3, 4, 5] as val}
            <button
              type="button"
              class="{answers[currentIndex] === val ? 'sel' : ''}"
              on:click={() => selectScore(val)}
            >
              {val}
            </button>
          {/each}
        </div>

        <div class="likert-labels">
          <span>ບໍ່ເຫັນດີ</span>
          <span>ເຫັນດີຫຼາຍ</span>
        </div>
      </div>

      <div class="qnav">
        <button
          type="button"
          class="btn-secondary"
          style="width:auto; flex:1;"
          on:click={handlePrev}
          disabled={submitting}
        >
          ກັບຄືນ
        </button>
        <button
          type="button"
          class="btn-primary"
          style="width:auto; flex:2;"
          on:click={handleNext}
          disabled={submitting}
        >
          {#if submitting}
            ກຳລັງຄິດໄລ່...
          {:else}
            {isLastQuestion ? 'ເບິ່ງຜົນ' : 'ຕໍ່ໄປ'}
          {/if}
        </button>
      </div>
    {/if}
  </div>
</div>
