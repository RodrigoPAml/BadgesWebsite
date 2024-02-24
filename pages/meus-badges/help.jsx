import React, { useEffect, useState } from 'react';
import { Card, Typography, Box, Link, Button } from '@mui/material';
import { get } from 'lodash'
import { GetMyUrl } from '../../services/Users';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShareIcon from '@mui/icons-material/Share';
import AddIcon from '@mui/icons-material/Add';

function HelpContainer(props) {
  const onClose = get(props, 'onClose', () => { })
  const [url, setUrl] = useState(null);

  useEffect(() => {
    GetMyUrl().then((request) => {
      if (get(request, 'success', false) === true) {
        const val = get(request, 'content', '')
        setUrl(val)
      }
    }).catch(() => { })
  }, []);

  return (
    <>
      <Card sx={{ m: '10px', p: '3px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {
            url !== null ?
              <Box sx={{
                mt: '5px', mb: '5px', ml: '10px', display: 'flex',
                flexDirection: 'row',
                alignContent: 'center', justifyItems: 'center', alignItems: 'center',
              }}>
                <ErrorOutlineIcon color='info'></ErrorOutlineIcon>
                <Typography fontSize={{ lg: 14, md: 14, sm: 13, xs: 10 }} sx={{ ml: '10px' }} variant="h4">
                  Sua página pessoal fica em&nbsp;
                  <Link
                    font={{ lg: 13, md: 12, sm: 11, xs: 10 }}
                    target={'_blank'}
                    rel="noopener noreferrer"
                    href={'/perfil?key=' + url}
                  >
                    {"http://localhost/perfil?key=" + url}
                  </Link>
                </Typography>
              </Box>
              :
              <></>
          }
          <Box sx={{
            ml: '10px', mb: '5px', display: 'flex', flexDirection: 'row',
            alignContent: 'center',
            justifyItems: 'center',
            alignItems: 'center',
          }}
          >
            <ErrorOutlineIcon color='info'></ErrorOutlineIcon>
            <Typography fontSize={{ lg: 14, md: 14, sm: 13, xs: 10 }} sx={{ ml: '10px' }} variant="h4">
              Para Copiar e Compartilhar seu Badge nas Redes Sociais Clique em "COPIAR LINK DE COMPARTILHAMENTO"
            </Typography>
          </Box>
          <Box sx={{ ml: '10px', mb: '5px', display: 'flex', flexDirection: 'row', alignContent: 'center', justifyItems: 'center', alignItems: 'center' }}>
            <ErrorOutlineIcon color='info'></ErrorOutlineIcon>
            <Typography fontSize={{ lg: 15, md: 14, sm: 13, xs: 10 }} sx={{ ml: '10px' }} variant="h4">
              Para vizualizar seu Badge Clique em&nbsp;&nbsp;
              <VisibilityIcon sx={{ fontSize: { lg: 15, md: 14, sm: 13, xs: 10 } }}></VisibilityIcon>
            </Typography>
          </Box>
          <Box sx={{ mb: '5px', ml: '10px', display: 'flex', flexDirection: 'row', alignContent: 'center', justifyItems: 'center', alignItems: 'center' }}>
            <ErrorOutlineIcon color='info'></ErrorOutlineIcon>
            <Typography fontSize={{ lg: 14, md: 14, sm: 13, xs: 10 }} sx={{ ml: '10px' }} variant="h4">
              Para adicionar um Badge de Terceiros clique em &nbsp;
              <AddIcon sx={{ fontSize: { lg: 15, md: 14, sm: 13, xs: 10 } }}></AddIcon>
            </Typography>
          </Box>
        </Box>
      </Card>
      <Button onClick={onClose} sx={{ float: 'right', m: '10px', mt: '5px' }} variant='contained'>OK</Button>
    </>
  )
}

export default HelpContainer;