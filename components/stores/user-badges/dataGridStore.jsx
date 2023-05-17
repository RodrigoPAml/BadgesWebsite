import React from 'react';
import { Typography } from '@mui/material';
import { get, isEmpty, toString } from 'lodash'

const DataGridStore = [
  {
    id: 'id',
    name: 'Identificador',
    width: 150,
    sortable: true,
  },
  {
    id: 'code',
    name: 'Código',
    sortable: true
  },
  {
    id: 'date',
    name: 'Data',
    render: ({ value }) => {
      var today = new Date(value);
      return <Typography>{today.toLocaleDateString("pt-BR")}</Typography>
    },
    width: 100,
    sortable: true,
  },
  {
    id: 'badgeId',
    name: 'Badge',
    render: ({ item }) => {
      return <Typography>{isEmpty(toString(get(item, 'badge'))) ? 'Sem badge' : get(item, 'badge.code', '-') + ' - ' + get(item, 'badge.description', '-')}</Typography>
    },
    sortable: true,
  },
  {
    id: 'userId',
    name: 'Usuário',
    render: ({ item }) => {
      return <Typography>{get(item, 'user.name', '-') + ' - ' + get(item, 'user.login', '-')}</Typography>
    },
    sortable: true,
  },
  {
    id: 'isExternal',
    name: 'Externo',
    sortable: false,
    width: 90,
    align: 'center',
    headerAlign: 'center',
    render: ({ value }) => {
      return <Typography>{value ? 'Sim' : "Não"}</Typography>
    },
  },
  {
    id: 'isUdemy',
    name: 'Emitido Udemy',
    sortable: false,
    width: 130,
    align: 'center',
    headerAlign: 'center',
    render: ({ value }) => {
      return <Typography>{value ? 'Sim' : "Não"}</Typography>
    },
  },
];

export default DataGridStore;