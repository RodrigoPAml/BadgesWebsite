const Store = [
  {
    name: 'Identificador',
    id: 'id',
    required: true
  },
  {
    name: 'Código',
    id: 'code',
    required: true,
  },
  {
    name: 'Data',
    id: 'date',
    value: null,
    required: true,
  },
  {
    name: 'Badge',
    id: 'badgeId',
    required: true,
  },
  {
    name: 'Usuário',
    id: 'userId',
    required: true,
  },
  {
    name: 'Externo',
    id: 'isExtern',
    required: false,
  },
  {
    name: 'Título',
    id: 'title',
    required: false,
  },
  {
    name: 'Url',
    id: 'url',
    required: false,
  },
  {
    name: 'Emitido pela Udemy',
    id: 'isUdemy',
    required: true,
  },
]

export default Store;