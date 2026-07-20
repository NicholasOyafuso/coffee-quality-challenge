<script setup>
import { ref } from 'vue'

const props = defineProps({
  cafes: {
    type: Array,
    required: true
  }
})


const detalheAbertoId = ref(null)

function alternarDetalhe(id) {
  detalheAbertoId.value = detalheAbertoId.value === id ? null : id
}

function medalha(posicao) {
  if (posicao === 1) return '🥇'
  if (posicao === 2) return '🥈'
  if (posicao === 3) return '🥉'
  return null
}

function estrelas(media) {
  return Math.round(media / 2) 
}

function formatarData(dataIso) {
  return new Date(dataIso).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<template>
  <div class="leaderboard card">
    <table class="leaderboard-table">
      <thead>
        <tr>
          <th>Posição</th>
          <th>Café</th>
          <th>Produtor</th>
          <th>Nota Final</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(cafe, index) in cafes" :key="cafe.id">
          <tr :class="{ 'top-row': index < 3 }">
            <td class="posicao-cell">
              <span v-if="medalha(index + 1)" class="medalha">{{ medalha(index + 1) }}</span>
              <span v-else class="posicao-numero">{{ index + 1 }}</span>
            </td>
            <td class="cafe-cell">
              <span class="cafe-nome">{{ cafe.nome }}</span>
            </td>
            <td>{{ cafe.produtor }}</td>
            <td class="nota-cell">
              <strong>{{ cafe.media.toFixed(1) }}</strong>
              <span class="stars">
                <span v-for="n in 5" :key="n" :class="{ filled: n <= estrelas(cafe.media) }">★</span>
              </span>
            </td>
            <td>
              <button class="btn btn-secondary btn-sm" @click="alternarDetalhe(cafe.id)">
                {{ detalheAbertoId === cafe.id ? 'Ocultar' : 'Ver Detalhes' }}
              </button>
            </td>
          </tr>
          <tr v-if="detalheAbertoId === cafe.id" class="detalhe-row">
            <td colspan="5">
              <div class="detalhe-content">
                <p><strong>Avaliado em:</strong> {{ formatarData(cafe.data) }}</p>
                <div class="detalhe-notas">
                  <span>Aroma: {{ cafe.aroma }}</span>
                  <span>Sabor: {{ cafe.sabor }}</span>
                  <span>Acidez: {{ cafe.acidez }}</span>
                  <span>Corpo: {{ cafe.corpo }}</span>
                  <span>Finalização: {{ cafe.finalizacao }}</span>
                </div>
                <p v-if="cafe.observacoes" class="detalhe-obs">"{{ cafe.observacoes }}"</p>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>

    <p v-if="!cafes.length" class="empty-message">Nenhum café avaliado ainda.</p>
  </div>
</template>

<style scoped>
.leaderboard-table {
  width: 100%;
  border-collapse: collapse;
}

.leaderboard-table th {
  text-align: left;
  font-size: 0.78rem;
  color: var(--coffee-muted);
  text-transform: uppercase;
  letter-spacing: 0.03em;
  padding: 0.6rem 0.5rem;
  border-bottom: 1px solid var(--coffee-border);
}

.leaderboard-table td {
  padding: 0.85rem 0.5rem;
  border-bottom: 1px solid var(--coffee-border);
  font-size: 0.92rem;
}

.top-row {
  background: #fdf7ec;
}

.posicao-cell {
  width: 60px;
}

.medalha {
  font-size: 1.3rem;
}

.posicao-numero {
  color: var(--coffee-muted);
  font-weight: 600;
  padding-left: 0.4rem;
}

.cafe-cell {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
}

.nota-cell strong {
  color: var(--coffee-brown);
  font-size: 1.05rem;
  margin-right: 0.4rem;
}

.stars {
  color: #ddd;
  font-size: 0.85rem;
}

.stars .filled {
  color: var(--coffee-gold);
}

.btn-sm {
  padding: 0.4rem 0.8rem;
  font-size: 0.82rem;
}

.detalhe-row td {
  background: #faf6f0;
}

.detalhe-content {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 0.85rem;
  color: var(--coffee-dark);
}

.detalhe-notas {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  color: var(--coffee-muted);
}

.detalhe-obs {
  font-style: italic;
  color: var(--coffee-muted);
}

.empty-message {
  text-align: center;
  color: var(--coffee-muted);
  padding: 1.5rem 0 0;
}

@media (max-width: 720px) {
  .leaderboard-table {
    font-size: 0.8rem;
  }
}
</style>
