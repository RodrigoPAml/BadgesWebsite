import React from 'react';
import { Card, Typography, Box, Button } from '@mui/material';
import { get } from 'lodash'

function Result(props) {
  const message = get(props, 'message', '')
  const success = get(props, 'success', false)

  return <Card sx={{ m: '10px' }}>
    <Typography sx={{ fontSize: 18, m: '10px' }}>
      {message}
    </Typography>
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: '10px' }}>
      {
        success
          ? <Button onClick={() => { window.location.href = '/meus-badges' }} sx={{ ml: '2px' }} variant='contained'>Ver Meus Badges</Button>
          : <Button onClick={() => { window.location.reload(); }} sx={{ ml: '2px' }} variant='contained'>Tentar Novamente</Button>
      }
      <Button onClick={() => { window.location.href = '/meus-badges' }} sx={{ ml: '2px' }} variant='outlined'>Sair</Button>
    </Box>
  </Card>
}

export default Result;