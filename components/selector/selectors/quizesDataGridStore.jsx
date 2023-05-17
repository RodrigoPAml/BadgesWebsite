import React from 'react';
import { Typography } from '@mui/material';
import { get } from 'lodash'

const QuizesDataGridStore = [
  {
    id: 'id',
    name: 'Identificador',
    width: 150,
    sortable: true,
  },
  {
    id: 'description',
    name: 'Descrição',
    sortable: true
  },
  {
    id: 'badgeId',
    name: 'Badge',
    render: ({ item }) => {
      return <Typography>{get(item, 'badge.code', '-') + ' - ' + get(item, 'badge.description', '-')}</Typography>
    },
    sortable: true,
  }
];

export default QuizesDataGridStore;