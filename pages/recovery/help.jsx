import React from 'react';
import { Card, Typography, Box, Link, Button } from '@mui/material';
import { get } from 'lodash'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function HelpContainer(props) {
  const onClose = get(props, 'onClose', () => { })

  return (
    <>
      <Card sx={{ m: '10px', p: '3px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{
            ml: '10px', mb: '5px', display: 'flex', flexDirection: 'row',
            alignContent: 'center',
            justifyItems: 'center',
            alignItems: 'center',
          }}
          >
            <ErrorOutlineIcon color='info'></ErrorOutlineIcon>
            <Typography fontSize={{ lg: 14, md: 14, sm: 13, xs: 10 }} sx={{ ml: '10px' }} variant="h4">
              Parece que sua conta não tem um email cadastrado para que possamos recuperar sua conta, sendo assim
              para recuperar sua senha contate o administrador do site
              em <Link href='https://www.eia.ai/contato'>https://www.eia.ai/contato</Link> e informe
              o ocorrido para que cadastremos um novo endereço de email na sua conta.
            </Typography>
          </Box>
        </Box>
      </Card>
      <Button onClick={onClose} sx={{ float:'right', m: '10px', mt: '5px' }} variant='contained'>OK</Button>
    </>
  )
}

export default HelpContainer;