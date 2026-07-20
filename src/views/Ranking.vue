<script setup>
import { useCoffeesStore } from '../store/coffees.js'
import LeaderboardTable from '../components/LeaderboardTable.vue'

const { ranking, totalAvaliados } = useCoffeesStore()
</script>

<template>
  <div class="ranking-page">
    <div class="ranking-header">
      <div>
        <h2 class="page-title"> Ranking Geral</h2>
        <p class="page-subtitle">Classificação dos melhores cafés do campeonato.</p>
      </div>
      <div class="total-badge card">

        <div>
          <p class="total-label">Total de Cafés Avaliados</p>
          <p class="total-value">{{ totalAvaliados }}</p>
        </div>
      </div>
    </div>

    <LeaderboardTable :cafes="ranking" />

  </div>
</template>

<style scoped>
.ranking-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.page-title {
  margin-bottom: 0.3rem;
}

.page-subtitle {
  color: var(--coffee-muted);
  margin: 0;
}

.total-badge {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.9rem 1.3rem;
}



.total-label {
  margin: 0;
  font-size: 0.78rem;
  color: var(--coffee-muted);
}

.total-value {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--coffee-brown);
}

</style>
