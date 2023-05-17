import React from 'react';
import { Typography } from '@mui/material';
import { get } from 'lodash'

const DataGridStore = [
  {
    id: 'id',
    name: 'Identificador',
    width: 150,
    sortable: true,
  },
  {
    id: 'name',
    name: 'Pergunta',
    sortable: true
  },
  {
    id: 'quizId',
    name: 'Quiz',
    render: ({ item }) => {
      return <Typography>{get(item, 'quiz.description', '-')}</Typography>
    },
    sortable: true,
  }
];

export default DataGridStore;