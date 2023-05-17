import React from 'react';
import { Typography } from '@mui/material';
import { get } from 'lodash'

const BadgeDataGridStore = [
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
    id: 'description',
    name: 'Descrição',
    sortable: true
  },
  {
    id: 'courseId',
    name: 'Curso',
    render: ({ item }) => {
      return <Typography>{get(item, 'course.name', '-')}</Typography>
    },
    sortable: true,
  }
];

export default BadgeDataGridStore;