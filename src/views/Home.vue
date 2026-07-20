<script setup>
import { useRouter } from 'vue-router'
import { useCoffeesStore } from '../store/coffees.js'

const router = useRouter()
const { totalAvaliados, cafeComMaiorNota, ultimaAvaliacao } = useCoffeesStore()

function irParaAvaliacoes() {
  router.push('/avaliacoes')
}

function formatarData(dataIso) {
  if (!dataIso) return '-'
  return new Date(dataIso).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function mediaDe(cafe) {
  return (cafe.aroma + cafe.sabor + cafe.acidez + cafe.corpo + cafe.finalizacao) / 5
}
</script>

<template>
  <div class="home">
    <section class="hero card">
      <h1>Campeonato de Avaliação<br />de Qualidade de Café</h1>
      <p class="hero-subtitle">Avalie, compare e descubra os melhores cafés especiais.</p>
    </section>

    <section class="stats-grid">
      <div class="stat-card card">
        <p class="stat-label">Total de Cafés Avaliados</p>
        <p class="stat-value">{{ totalAvaliados }}</p>
        <p class="stat-suffix">cafés</p>
      </div>

      <div class="stat-card card">
        <p class="stat-label">Café com Maior Nota</p>
        <template v-if="cafeComMaiorNota">
          <p class="stat-value stat-value-gold">{{ cafeComMaiorNota.media.toFixed(1) }}</p>
          <p class="stat-suffix">{{ cafeComMaiorNota.nome }}</p>
          <p class="stat-suffix-small">{{ cafeComMaiorNota.produtor }}</p>
        </template>
        <p v-else class="stat-suffix">Nenhum café avaliado ainda</p>
      </div>

      <div class="stat-card card">
        <p class="stat-label">Última Avaliação</p>
        <template v-if="ultimaAvaliacao">
          <p class="stat-value stat-value-blue">{{ mediaDe(ultimaAvaliacao).toFixed(1) }}</p>
          <p class="stat-suffix">{{ ultimaAvaliacao.nome }}</p>
          <p class="stat-suffix-small">{{ formatarData(ultimaAvaliacao.data) }}</p>
        </template>
        <p v-else class="stat-suffix">Nenhum café avaliado ainda</p>
      </div>
    </section>

    <div class="cta-wrapper">
      <button class="btn btn-primary" @click="irParaAvaliacoes"> Ver Avaliações</button>
    </div>

    <section class="banner card">
      <div>
        <h4>Participe e faça a diferença</h4>
        <p>Cada avaliação ajuda a reconhecer o trabalho dos produtores e a valorizar o café de qualidade</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  text-align: center;
  padding: 2.5rem 1.5rem;
  margin-bottom: 1.5rem;
}

.hero h1 {
  font-size: 1.7rem;
  line-height: 1.3;
}

.hero-subtitle {
  color: var(--coffee-muted);
  margin-top: 0.7rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
  margin-bottom: 1.5rem;
}

.stat-card {
  text-align: center;
}

.stat-label {
  color: var(--coffee-muted);
  font-size: 0.85rem;
  margin: 0 0 0.3rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--coffee-brown);
  margin: 0;
}

.stat-value-gold {
  color: var(--coffee-gold);
}

.stat-value-blue {
  color: #3a6ea5;
}

.stat-suffix {
  margin: 0.2rem 0 0;
  color: var(--coffee-dark);
  font-weight: 600;
  font-size: 0.9rem;
}

.stat-suffix-small {
  margin: 0.1rem 0 0;
  color: var(--coffee-muted);
  font-size: 0.78rem;
}

.cta-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.banner {
  display: flex;
  gap: 1rem;
  align-items: center;
  background: #fdf7ec;
}


.banner h4 {
  margin-bottom: 0.3rem;
}

.banner p {
  margin: 0;
  color: var(--coffee-muted);
  font-size: 0.88rem;
}

@media (max-width: 720px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
