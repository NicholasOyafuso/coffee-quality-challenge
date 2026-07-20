<script setup>

defineProps({
  coffee: {
    type: Object,
    required: true
  }
})

function formatarData(dataIso) {
  const d = new Date(dataIso)
  return d.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<template>
  <div class="coffee-card">
    <div class="coffee-card-info">
      <h4>{{ coffee.nome }}</h4>
      <p class="coffee-card-producer">Produtor: {{ coffee.produtor }}</p>
      <p class="coffee-card-date">Avaliado em {{ formatarData(coffee.data) }}</p>
    </div>
    <div class="coffee-card-score">
      <span class="score-label">Média SCA</span>
      <span class="score-value">{{ coffee.media.toFixed(1) }}</span>
    </div>
  </div>
</template>

<style scoped>
.coffee-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #fff;
  border: 1px solid var(--coffee-border);
  border-radius: 12px;
  padding: 1rem 1.2rem;
  margin-bottom: 0.9rem;
}

.coffee-card-info {
  flex: 1;
}

.coffee-card-info h4 {
  font-size: 1rem;
  margin-bottom: 0.15rem;
}

.coffee-card-producer,
.coffee-card-date {
  margin: 0;
  font-size: 0.82rem;
  color: var(--coffee-muted);
}

.coffee-card-score {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.score-label {
  font-size: 0.72rem;
  color: var(--coffee-muted);
}

.score-value {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--coffee-brown);
}
</style>
