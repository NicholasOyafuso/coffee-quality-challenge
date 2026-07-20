import { reactive, computed } from 'vue'

const coffees = reactive([
  {
    id: 1,
    nome: 'Bourbon Amarelo',
    produtor: 'Fazenda Boa Vista',
    aroma: 9,
    sabor: 9.5,
    acidez: 9,
    corpo: 9.5,
    finalizacao: 9.5,
    observacoes: 'Notas florais e doçura de mel, finalização longa e limpa.',
    data: '2024-05-25T14:32:00'
  },
  {
    id: 2,
    nome: 'Arara',
    produtor: 'Sítio das Flores',
    aroma: 9,
    sabor: 8.5,
    acidez: 8.5,
    corpo: 9,
    finalizacao: 8.5,
    observacoes: 'Corpo aveludado, boa acidez cítrica.',
    data: '2024-05-23T10:15:00'
  },
  {
    id: 3,
    nome: 'Catuaí Vermelho',
    produtor: 'Café do Vale',
    aroma: 8,
    sabor: 8,
    acidez: 8,
    corpo: 8.5,
    finalizacao: 8,
    observacoes: 'Equilibrado, notas de caramelo e nozes.',
    data: '2024-05-24T16:45:00'
  },
  {
    id: 4,
    nome: 'Mundo Novo',
    produtor: 'Santa Clara',
    aroma: 7,
    sabor: 7.5,
    acidez: 7,
    corpo: 7.5,
    finalizacao: 8,
    observacoes: 'Perfil tradicional, corpo encorpado.',
    data: '2024-05-24T09:30:00'
  },
  {
    id: 5,
    nome: 'Icatu',
    produtor: 'Fazenda Recanto',
    aroma: 7,
    sabor: 7,
    acidez: 7,
    corpo: 7.5,
    finalizacao: 7,
    observacoes: 'Suave, baixa acidez, bom para blends.',
    data: '2024-05-22T11:00:00'
  }
])

function calcularMedia({ aroma, sabor, acidez, corpo, finalizacao }) {
  const soma =
    Number(aroma || 0) +
    Number(sabor || 0) +
    Number(acidez || 0) +
    Number(corpo || 0) +
    Number(finalizacao || 0)
  return soma / 5
}

function adicionarAvaliacao(novoCafe) {
  const id = coffees.length ? Math.max(...coffees.map((c) => c.id)) + 1 : 1
  coffees.push({
    id,
    data: new Date().toISOString(),
    ...novoCafe
  })
}

const ranking = computed(() => {
  return [...coffees]
    .map((c) => ({ ...c, media: calcularMedia(c) }))
    .sort((a, b) => b.media - a.media)
})

const totalAvaliados = computed(() => coffees.length)

const cafeComMaiorNota = computed(() => {
  if (!coffees.length) return null
  return ranking.value[0]
})

const ultimaAvaliacao = computed(() => {
  if (!coffees.length) return null
  return [...coffees].sort((a, b) => new Date(b.data) - new Date(a.data))[0]
})

export function useCoffeesStore() {
  return {
    coffees,
    ranking,
    totalAvaliados,
    cafeComMaiorNota,
    ultimaAvaliacao,
    calcularMedia,
    adicionarAvaliacao
  }
}
