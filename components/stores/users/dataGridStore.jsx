import React from 'react';
import { Typography } from '@mui/material';

const DataGridStore = [
  {
    id: 'id',
    name: 'Identificador',
    width: 150,
    sortable: true,
  },
  {
    id: 'name',
    name: 'Nome',
    sortable: true
  },
  {
    id: 'login',
    name: 'Login',
    sortable: true
  },
  {
    id: 'email',
    name: 'Email',
    sortable: true
  },
  {
    id: 'url',
    name: 'URL',
    sortable: true
  },
  {
    id: 'profile',
    name: 'Perfil',
    render: ({ value }) => {
      if(value == 0) {
        return <Typography>Usuário</Typography> 
      } else {
        return <Typography>Administrador</Typography> 
      }
    },
    sortable: true,
  }
];

export default DataGridStore;