<script lang="ts">
  import { onMount } from 'svelte';
  import AppLayout from '$lib/components/AppLayout.svelte';
  import LandingPage from '$lib/features/landing/LandingPage.svelte';
  import { navStore } from '$lib/stores/navStore';

  // Feature screen components
  import HomeView from '$lib/features/home/HomeView.svelte';
  import ExploreHub from '$lib/features/explore/ExploreHub.svelte';
  import MentorChat from '$lib/features/mentor/MentorChat.svelte';
  import SavedView from '$lib/features/saved/SavedView.svelte';
  import ProfileView from '$lib/features/profile/ProfileView.svelte';
  import CareerList from '$lib/features/careers/CareerList.svelte';
  import CareerDetail from '$lib/features/careers/CareerDetail.svelte';
  import UniDetail from '$lib/features/uni/UniDetail.svelte';
  import TutorList from '$lib/features/tutors/TutorList.svelte';
  import TutorDetail from '$lib/features/tutors/TutorDetail.svelte';
  import CenterList from '$lib/features/centers/CenterList.svelte';
  import CenterDetail from '$lib/features/centers/CenterDetail.svelte';
  import ScholList from '$lib/features/scholarships/ScholList.svelte';
  import ScholDetail from '$lib/features/scholarships/ScholDetail.svelte';
  import RiasecWelcome from '$lib/features/riasec/RiasecWelcome.svelte';
  import RiasecQuestions from '$lib/features/riasec/RiasecQuestions.svelte';
  import RiasecResult from '$lib/features/riasec/RiasecResult.svelte';
  import RoadmapTimeline from '$lib/features/roadmap/RoadmapTimeline.svelte';

  onMount(() => {
    // Check if URL specifies a hash or path to open directly
    const path = window.location.pathname;
    const hash = window.location.hash.replace('#', '');
    if (path === '/home' || hash === 'home') {
      navStore.go('home');
    } else if (path === '/mentor' || hash === 'mentor') {
      navStore.go('mentor');
    } else if (path === '/profile' || hash === 'profile') {
      navStore.go('profile');
    }
  });
</script>

<svelte:head>
  <title>ຂົວອາຊີບ — Khua Achip (Compass Youth)</title>
  <meta name="description" content="ເວທີແນະນຳອາຊີບ, ຫຼັກສູດ, ອາຈານສອນເພີ່ມ, ສູນຮຽນ ແລະ ທຶນການສຶກສາ ສຳລັບໄວໜຸ່ມລາວ" />
</svelte:head>

{#if $navStore.currentScreen === 'landing'}
  <LandingPage />
{:else}
  <AppLayout isChatMode={$navStore.currentScreen === 'mentor'}>
    {#if $navStore.currentScreen === 'home'}
      <HomeView />
    {:else if $navStore.currentScreen === 'explore'}
      <ExploreHub />
    {:else if $navStore.currentScreen === 'mentor'}
      <MentorChat />
    {:else if $navStore.currentScreen === 'saved'}
      <SavedView />
    {:else if $navStore.currentScreen === 'profile'}
      <ProfileView />
    {:else if $navStore.currentScreen === 'careerList'}
      <CareerList />
    {:else if $navStore.currentScreen === 'careerDetail'}
      <CareerDetail careerId={$navStore.params.careerId || 'sw'} />
    {:else if $navStore.currentScreen === 'uniDetail'}
      <UniDetail />
    {:else if $navStore.currentScreen === 'tutorList'}
      <TutorList />
    {:else if $navStore.currentScreen === 'tutorDetail'}
      <TutorDetail tutorId={$navStore.params.tutorId || 't1'} />
    {:else if $navStore.currentScreen === 'centerList'}
      <CenterList />
    {:else if $navStore.currentScreen === 'centerDetail'}
      <CenterDetail centerId={$navStore.params.centerId || 'c1'} />
    {:else if $navStore.currentScreen === 'scholList'}
      <ScholList />
    {:else if $navStore.currentScreen === 'scholDetail'}
      <ScholDetail scholId={$navStore.params.scholId || 's1'} />
    {:else if $navStore.currentScreen === 'riasecWelcome'}
      <RiasecWelcome />
    {:else if $navStore.currentScreen === 'riasecQ'}
      <RiasecQuestions />
    {:else if $navStore.currentScreen === 'riasecResult'}
      <RiasecResult />
    {:else if $navStore.currentScreen === 'roadmap'}
      <RoadmapTimeline />
    {/if}
  </AppLayout>
{/if}
