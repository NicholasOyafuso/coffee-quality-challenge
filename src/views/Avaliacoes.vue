<script setup>
import { ref, computed } from 'vue'
import { useCoffeesStore } from '../store/coffees.js'
import CoffeeCard from '../components/CoffeeCard.vue'
import RatingForm from '../components/RatingForm.vue'
import CoffeeFilter from '../components/CoffeeFilter.vue'

const { coffees, calcularMedia } = useCoffeesStore()

const filtro = ref({ notaMinima: 0, nome: '' })

function aoFiltrar(novoFiltro) {
  filtro.value = novoFiltro
}

const cafesFiltrados = computed(() => {
  return [...coffees]
    .map((c) => ({ ...c, media: calcularMedia(c) }))
    .sort((a, b) => new Date(b.data) - new Date(a.data))
    .filter((c) => c.media >= filtro.value.notaMinima)
    .filter((c) => c.nome.toLowerCase().includes(filtro.value.nome.toLowerCase()))
})
</script>

<template>
  <div class="avaliacoes-page">
    <h2 class="page-title"> Avaliações de Cafés</h2>
    <p class="page-subtitle">Veja os cafés já avaliados e adicione uma nova avaliação.</p>

    <div class="avaliacoes-grid">
      <section class="lista-cafes">
        <CoffeeFilter @filtrar="aoFiltrar" />

        <h3 class="lista-titulo">Cafés Avaliados ({{ cafesFiltrados.length }})</h3>

        <CoffeeCard v-for="cafe in cafesFiltrados" :key="cafe.id" :coffee="cafe" />

        <p v-if="!coffees.length" class="empty-message">
          Nenhum café avaliado ainda. Adicione sua primeira avaliação ao lado
        </p>
        <p v-else-if="!cafesFiltrados.length" class="empty-message">
          Nenhum café encontrado para este filtro
        </p>
      </section>

      <section class="form-coluna">
        <RatingForm />
      </section>
    </div>
  </div>
</template>

<style scoped>
.page-title {
  margin-bottom: 0.3rem;
}

.page-subtitle {
  color: var(--coffee-muted);
  margin: 0 0 1.5rem;
}

.avaliacoes-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 1.5rem;
  align-items: start;
}

.lista-titulo {
  font-size: 1rem;
  margin: 1rem 0 0.8rem;
}

.empty-message {
  text-align: center;
  color: var(--coffee-muted);
  padding: 1.5rem;
}


@media (max-width: 900px) {
  .avaliacoes-grid {
    grid-template-columns: 1fr;
  }
}
</style>
