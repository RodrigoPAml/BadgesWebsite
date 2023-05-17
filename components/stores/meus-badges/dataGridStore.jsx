import React from 'react';
import { Typography, Avatar, Tooltip, Chip, Link } from '@mui/material';
import { get } from 'lodash'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}

const DataGridStore = [
  {
    id: 'image',
    name: 'Logo',
    render: ({ item }) => {
      if (get(item, 'isExternal', false) === true) {
        return <Tooltip title='Imagem'>
          <Avatar sx={{ borderRadius: 0, height: '50px', width: '50px', m: '10px' }} src={get(item, 'image', '')}></Avatar>
        </Tooltip>
      }

      return <Tooltip title='Imagem'>
        <Avatar sx={{ height: '50px', width: '50px', m: '10px' }} src={get(item, 'badge.image', '')}></Avatar>
      </Tooltip>
    },
    sortable: false,
    align: 'center',
    headerAlign: 'center',
    width: 80,
  },
  {
    id: 'date',
    name: 'Data de Emissão',
    render: ({ value }) => {
      var today = new Date(value);
      return <Typography fontSize={17}>{today.toLocaleDateString("pt-BR")}</Typography>
    },
    sortable: true,
    align: 'center',
    headerAlign: 'center',
    width: 140,
  },
  {
    id: 'badgeId2',
    name: 'Badge',
    render: ({ item }) => {
      if (get(item, 'isExternal', false) === true) {
        return <Tooltip title={get(item, 'title', '-')}>
          <Typography fontSize={17}>{get(item, 'title', '-')}</Typography>
        </Tooltip>
      }

      return <Tooltip title={get(item, 'badge.description', '-')}>
        <Typography fontSize={17}>{get(item, 'badge.description', '-')}</Typography>
      </Tooltip>
    },
    sortable: false,
    align: 'left',
    headerAlign: 'center',
    minWidth: 230,
  },
  {
    id: 'course',
    name: 'Curso',
    render: ({ item }) => {
      if (get(item, 'isExternal', false) === true) {
        return <Tooltip title={get(item, 'url', '-')}>
          <Typography onClick={() => {
            openInNewTab(get(item, 'url', '-'))
          }} component={Link} fontSize={17}>{get(item, 'url', '-')}</Typography>
        </Tooltip>
      }

      return <Tooltip title={get(item, 'badge.courseName', '-')}>
        <Typography fontSize={17}>{get(item, 'badge.courseName', '-')}</Typography>
      </Tooltip>
    },
    sortable: false,
    align: 'left',
    headerAlign: 'center',
    minWidth: 500,
  },
  {
    id: 'isExternal',
    name: 'Outros',
    render: ({ item }) => {
      if (get(item, 'isExternal', false) === true) {
        return <Tooltip title={''}>
          <CheckCircleIcon sx={{ color: 'green' }}></CheckCircleIcon>
        </Tooltip>
      } else {
        return <Tooltip title={''}>
          <CancelIcon sx={{ color: 'red' }}></CancelIcon>
        </Tooltip>
      }
    },
    sortable: false,
    align: 'center',
    headerAlign: 'center',
    width: 70,
  },
];

export default DataGridStore;