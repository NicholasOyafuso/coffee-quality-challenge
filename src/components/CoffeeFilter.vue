<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['filtrar'])

const notaMinima = ref(0)
const nomeBusca = ref('')

watch([notaMinima, nomeBusca], () => {
  emit('filtrar', { notaMinima: notaMinima.value, nome: nomeBusca.value })
})

function limparFiltros() {
  notaMinima.value = 0
  nomeBusca.value = ''
}
</script>

<template>
  <div class="coffee-filter card">
    <h4> Filtrar Cafés</h4>
    <div class="filter-row">
      <div class="form-field">
        <label>Nome do Café</label>
        <input type="text" v-model="nomeBusca" placeholder="Buscar por nome..." />
      </div>
      <div class="form-field">
        <label>Nota mínima ({{ notaMinima }})</label>
        <input type="range" v-model.number="notaMinima" min="0" max="10" step="0.5" />
      </div>
      <button class="btn btn-secondary" @click="limparFiltros">Limpar filtros</button>
    </div>
  </div>
</template>

<style scoped>
.filter-row {
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  flex-wrap: wrap;
}

.filter-row .form-field {
  flex: 1;
  min-width: 160px;
}
</style>
