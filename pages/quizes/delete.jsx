import React from 'react';
import { Card, Typography, Box, Button } from '@mui/material';
import { get } from 'lodash'
import { DeleteQuiz } from '../../services/Quizes';

function DeleteContainer(props) {
  const onClose = get(props, 'onClose', () => { })

  return <Card sx={{ m: '10px' }}>
    <Typography sx={{ color: 'rgba(0, 0, 0, 0.5)', m: '10px' }}>
      Você tem certeza que deseja deletar o quiz "{get(props, 'item.description')}". Essa ação é irreversível.
    </Typography>
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: '10px' }}>
      <Button
        onClick={() => {
          DeleteQuiz(get(props, 'item.id')).then((response) => {
            if (get(response, 'success', false)) {
              onClose(true)
              window.snackbar.success(get(response, 'message', ''))
            } else {
              window.snackbar.error(get(response, 'message', 'Erro desconhecido'))
            }
          }).catch(() => {
            window.snackbar.error('Erro interno ao excluir')
          });
        }}
        variant='contained'>
        Excluir
      </Button>
      <Button onClick={onClose} sx={{ ml: '2px' }} variant='outlined'>Cancelar</Button>
    </Box>
  </Card>
}

export default DeleteContainer;