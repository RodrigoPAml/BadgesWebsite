import { Toolbar, Button, Grid, AppBar, IconButton, Avatar, MenuItem, Menu, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import logo from '../../public/logo.jpg';
import styles from './styles';
import { TestToken } from '../../services/Authentication'
import { GetImage, GetProfile } from '../../services/Users'
import { get } from 'lodash'
import { SetStorage, GetStorage } from '../infra/storage';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { GetMyUrl } from '../../services/Users';
import HomeIcon from '@mui/icons-material/Home';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import Head from 'next/head';

const TopBar = (props) => {
  const [img, setImg] = useState('');
  const [profile, setProfile] = useState('');
  const [size, setSize] = useState(null)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    (event)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;
    setSize({ height, width });

    if (get(props, 'authorize', false)) {
      TestToken().catch((response) => {
        if (get(response, 'response.status') == 401) {
          setImg('')
          SetStorage('USER_IMAGE', null);
          setProfile('')
          SetStorage('USER_PROFILE', null);
          SetStorage('TOKEN', null);

          if ((get(props, 'redirect', true))) {
            window.snackbar.warn('Você está deslogado, direcionando para a página de login', 5000)
            setTimeout(() => {
              SetStorage('REDIRECT_ON_LOGIN', window.location.href);
              window.location.href = '/';
            }, 4500)
          }
        }
      })
    }

    var currentImg = GetStorage('USER_IMAGE')
    var currentProfile = GetStorage('USER_PROFILE')

    if (currentImg === null) {
      GetImage().then((response) => {
        if (get(response, 'success', false) === true) {
          setImg(get(response, 'content', null))
          SetStorage('USER_IMAGE', get(response, 'content', null));
        }
      }).catch(() => { })
    } else {
      setImg(currentImg)
    }

    if (currentProfile === null) {
      GetProfile().then((response) => {
        if (get(response, 'success', false) === true) {
          setProfile(get(response, 'content', null))
          SetStorage('USER_PROFILE', get(response, 'content', null));
        }
      }).catch(() => { })
    } else {
      setProfile(currentProfile)
    }

    if (get(props, 'removeLogin', false)) {
      TestToken().then(() => {
        window.snackbar.warn('Você foi deslogado da sua sessão anterior')
        setImg('')
        setProfile('')
        SetStorage('USER_IMAGE', null);
        SetStorage('USER_PROFILE', null);
        SetStorage('TOKEN', null);
      }).catch(() => { })
    }
  }, []);

  const height = '75px'

  if (size === null) {
    return <>
      <AppBar position="fixed" sx={{ height: height }}>
        <div style={styles.topbar}>
        </div>
      </AppBar>
      <Toolbar sx={{ height: height, mb: '5px' }} />
    </>
  }

  return (
    <>
      <Head>
        <link rel="icon" type="image/x-icon" href="favicon.png" />
        <title>Certificados EIA</title>
      </Head>
      <AppBar position="fixed" sx={{ height: height }}>
        <div style={styles.topbar}>
          <div style={styles.containerLeft}>
            <a href='/'>
              <img src={logo.src} style={styles.photo} />
            </a>
          </div>
          {
            get(size, 'width', 780) < 780 ?
              <div style={styles.container}>
                <IconButton style={styles.iconButtons} onClick={() => { window.location.href = '/' }} variant='outlined'>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <HomeIcon></HomeIcon>
                    <Typography fontSize={'3vw'} textAlign={'center'}>Home</Typography>
                  </div>
                </IconButton>
                <IconButton style={styles.iconButtons} onClick={() => { window.location.href = 'https://www.eia.ai/contato' }} variant='outlined'>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <ContactPageIcon></ContactPageIcon>
                    <Typography fontSize={'3vw'} textAlign={'center'}>Contato</Typography>
                  </div>
                </IconButton>
              </div>
              : <Grid columnSpacing={2} container style={styles.container}>
                <Grid item>
                  <Button startIcon={<HomeIcon></HomeIcon>} style={styles.generalButtons} onClick={() => { window.location.href = '/' }} variant='outlined'>
                    Pagina principal
                  </Button>
                </Grid>
                <Grid item>
                  <Button startIcon={<ContactPageIcon></ContactPageIcon>} style={styles.generalButtons} onClick={() => { window.location.href = 'https://www.eia.ai/contato' }} variant='outlined'>Contato</Button>
                </Grid>
              </Grid>
          }
          <div style={styles.containerRight}>
            <Avatar src={img}>
            </Avatar>
            <IconButton sx={{ ml: '5px', backgroundColor: 'rgba(25, 120, 180, 0.08)' }} color='primary' disabled={profile !== 'Admin' && profile !== 'User'} onClick={handleClick}>
              <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
            </IconButton>
            <Menu
              id="basic-menu"
              disableScrollLock={true}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              {
                profile === 'Admin' || profile === 'User'
                  ? <MenuItem onClick={() => {
                    window.location.href = '/user'
                    handleClose()
                  }}>Editar perfil</MenuItem>
                  : <></>
              }
              {
                profile === 'Admin' || profile === 'User'
                  ? <MenuItem onClick={() => {

                    GetMyUrl().then((request) => {
                      if (get(request, 'success', false) === true) {
                        const url = get(request, 'content', '')

                        window.location.href = '/perfil?key=' + url
                      }
                    }).catch(() => { })

                    handleClose()
                  }}>Minha página</MenuItem>
                  : <></>
              }
              {
                profile === 'Admin' || profile === 'User'
                  ? <MenuItem onClick={() => {
                    window.location.href = '/meus-badges'
                    handleClose()
                  }}>Meus badges</MenuItem>
                  : <></>
              }
              {
                profile === 'Admin'
                  ? <MenuItem onClick={() => {
                    window.location.href = '/admin'
                    handleClose()
                  }}>Área Administrativa</MenuItem>
                  : <></>
              }
              {
                profile === 'Admin' || profile === 'User'
                  ? <MenuItem onClick={() => {
                    setImg('')
                    setProfile('')
                    SetStorage('USER_IMAGE', null);
                    SetStorage('USER_PROFILE', null);
                    SetStorage('TOKEN', null);
                    window.location.href = '/'
                    handleClose()
                  }}>Sair</MenuItem>
                  : <></>
              }
            </Menu>
          </div>
        </div>
      </AppBar>
      <Toolbar sx={{ height: height, mb: '5px' }} />
    </>
  )
}

export default TopBar;