<script setup>
import { ref, computed } from 'vue'
import { useCoffeesStore } from '../store/coffees.js'

const { adicionarAvaliacao, cafeComMaiorNota } = useCoffeesStore()


const nome = ref('')
const produtor = ref('')
const aroma = ref(0)
const sabor = ref(0)
const acidez = ref(0)
const corpo = ref(0)
const finalizacao = ref(0)
const observacoes = ref('')

const mensagemSucesso = ref('')
const mensagemLider = ref(false)
const erro = ref('')

const mediaCalculada = computed(() => {
  const soma =
    Number(aroma.value || 0) +
    Number(sabor.value || 0) +
    Number(acidez.value || 0) +
    Number(corpo.value || 0) +
    Number(finalizacao.value || 0)
  return soma / 5
})

function limparFormulario() {
  nome.value = ''
  produtor.value = ''
  aroma.value = 0
  sabor.value = 0
  acidez.value = 0
  corpo.value = 0
  finalizacao.value = 0
  observacoes.value = ''
  erro.value = ''
}

function salvarAvaliacao() {
  mensagemSucesso.value = ''
  mensagemLider.value = false

  if (!nome.value.trim() || !produtor.value.trim()) {
    erro.value = 'Preencha o nome do café e o produtor.'
    return
  }
  erro.value = ''

  const maiorNotaAtual = cafeComMaiorNota.value ? cafeComMaiorNota.value.media : 0

  adicionarAvaliacao({
    nome: nome.value.trim(),
    produtor: produtor.value.trim(),
    aroma: Number(aroma.value),
    sabor: Number(sabor.value),
    acidez: Number(acidez.value),
    corpo: Number(corpo.value),
    finalizacao: Number(finalizacao.value),
    observacoes: observacoes.value.trim()
  })

  mensagemSucesso.value = `Avaliação de "${nome.value.trim()}" salva com sucesso!`
  if (mediaCalculada.value > maiorNotaAtual) {
    mensagemLider.value = true
  }

  limparFormulario()
}
</script>

<template>
  <div class="rating-form card">
    <h3> Nova Avaliação</h3>

    <div class="form-row">
      <div class="form-field">
        <label>Nome do Café</label>
        <input type="text" v-model="nome" />
      </div>
      <div class="form-field">
        <label>Produtor</label>
        <input type="text" v-model="produtor"  />
      </div>
    </div>

    <h4 class="section-title">Notas (0 a 10)</h4>
    <div class="scores-grid">
      <div class="score-field">
        <label> Aroma</label>
        <input type="number" v-model.number="aroma" min="0" max="10" step="0.5" />
      </div>
      <div class="score-field">
        <label> Sabor</label>
        <input type="number" v-model.number="sabor" min="0" max="10" step="0.5" />
      </div>
      <div class="score-field">
        <label> Acidez</label>
        <input type="number" v-model.number="acidez" min="0" max="10" step="0.5" />
      </div>
      <div class="score-field">
        <label> Corpo</label>
        <input type="number" v-model.number="corpo" min="0" max="10" step="0.5" />
      </div>
      <div class="score-field">
        <label> Finalização</label>
        <input type="number" v-model.number="finalizacao" min="0" max="10" step="0.5" />
      </div>
    </div>

    <div class="form-field observacoes-field">
      <label>Observações</label>
      <textarea
        v-model="observacoes"
        maxlength="300"
        rows="3"
        placeholder="Digite suas observações sobre o café..."
      ></textarea>
      <span class="char-counter">{{ observacoes.length }}/300</span>
    </div>

    <div class="media-box">
      <div>
        <strong>Média calculada</strong>
        <p class="media-hint">A média é calculada com base na soma das 5 notas dividida por 5</p>
      </div>
      <span class="media-value">{{ mediaCalculada.toFixed(1) }}</span>
    </div>

    <p v-if="erro" class="mensagem-erro"> {{ erro }}</p>
    <p v-if="mensagemSucesso" class="mensagem-sucesso"> {{ mensagemSucesso }}</p>
    <p v-if="mensagemLider" class="mensagem-lider"> Parabéns! Novo líder do campeonato!</p>

    <div class="form-actions">
      <button class="btn btn-secondary" @click="limparFormulario"> Limpar</button>
      <button class="btn btn-primary" @click="salvarAvaliacao"> Salvar Avaliação</button>
    </div>
  </div>
</template>

<style scoped>
.rating-form h3 {
  margin-bottom: 1rem;
}

.section-title {
  font-size: 0.9rem;
  color: var(--coffee-muted);
  margin: 1.2rem 0 0.6rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 0.4rem;
}

.scores-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.6rem;
}

.score-field label {
  font-size: 0.78rem;
  text-align: center;
}

.score-field input {
  text-align: center;
}

.observacoes-field {
  margin-top: 1rem;
  position: relative;
}

.char-counter {
  position: absolute;
  right: 0.4rem;
  bottom: -1.1rem;
  font-size: 0.72rem;
  color: var(--coffee-muted);
}

.media-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f7f1ea;
  border: 1px solid var(--coffee-border);
  border-radius: 10px;
  padding: 0.9rem 1.1rem;
  margin-top: 1.6rem;
}

.media-hint {
  margin: 0.15rem 0 0;
  font-size: 0.75rem;
  color: var(--coffee-muted);
  font-weight: 400;
}

.media-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--coffee-brown);
}

.mensagem-erro {
  color: #a33;
  font-size: 0.85rem;
  margin-top: 0.8rem;
}

.mensagem-sucesso {
  color: var(--coffee-success);
  font-size: 0.88rem;
  margin-top: 0.8rem;
  font-weight: 600;
}

.mensagem-lider {
  color: var(--coffee-gold);
  font-size: 0.9rem;
  margin-top: 0.4rem;
  font-weight: 700;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.7rem;
  margin-top: 1.4rem;
}

@media (max-width: 720px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  .scores-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
