import React from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormStore from '../../components/infra/formStore';
import SignInStore from '../../components/stores/login/formStore'
import { get } from 'lodash'
import { Login } from '../../services/Authentication'
import { GetStorage, SetStorage } from '../../components/infra/storage';
import { Avatar, Button, TextField, Grid, Box, Container, Typography, Card, Link, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import HelpContainer from './help';
import WarningIcon from '@mui/icons-material/Warning';

class SignIn extends FormStore {
  constructor() {
    super({
      endpoint: Login,
      store: SignInStore,
    })

    this.state = {
      ...this.state,
      navigate: false,
      showPassword: false,
      mounted: false,
      useMargin: false,
    }
  }

  componentDidMount() {
    const { innerWidth: width, innerHeight: height } = window;
    this.setState({ mounted: true, useMargin: height > 880 })
  }

  changePageWhenTokenPersist = (token, counter = 0) => {
    if (counter === 20) {
      window.snackbar.warn('Falha ao completar operação')
      return;
    }

    setTimeout(() => {
      if (GetStorage('TOKEN') === token) {
        this.setState({ navigate: true })
      } else {
        changePageWhenTokenPersist(token, counter + 1)
      }
    }, 100)
  }

  render() {
    if (this.state.navigate) {
      const redirect = GetStorage('REDIRECT_ON_LOGIN', window.location.href);
      if (redirect !== null) {
        window.location.href = redirect
        SetStorage('REDIRECT_ON_LOGIN', null);
      } else {
        window.location.href = '/meus-badges'
      }
    }

    if (!this.state.mounted) {
      return <Box sx={{ minHeight: '500px', height: '100%', width: '100%', bgcolor: 'rgb(247, 247, 247)' }}>
        <Container component="main" sx={{ justifyItems: 'center', alignItems: 'center' }} onSubmit={this.onSubmit}>
          <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', pt: '240px' }}>
            <CircularProgress sx={{ height: '100%', width: '100%' }} />
          </Box>
        </Container>
      </Box>
    }

    return (
      <>
        <Box sx={{ pt: this.state.useMargin ? 13 : 2, pb: this.state.useMargin ? 13 : 2, height: '100%', width: '100%', bgcolor: 'rgb(247, 247, 247)' }}>
          <Container sx={{ maxWidth: '600px' }} component="main" maxWidth="sm" onSubmit={this.onSubmit}>
            <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: '10px' }} >
              <Avatar sx={{ height: '60px', width: '60px', m: 1, bgcolor: 'secondary.main' }} >
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <Box component="form" sx={{ m: 2, pt: 3 }}>
              <Box sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignContent: "center",
                  justifyContent: "center"
                }}>
                  <WarningIcon  sx={{ mr: '5px', height: '20px' }} color='warning'></WarningIcon>
                  <Typography color={"gray"} textAlign={"left"} component="h1" fontSize={15}>
                    Este é um login exclusivo para a área de Badges
                  </Typography>
                </Box>
                <TextField
                  margin="normal"
                  required
                  disabled={this.isLoading()}
                  fullWidth
                  onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
                  id="login"
                  label="Login"
                  inputProps={{ maxLength: 64 }}
                  autoComplete="login"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  disabled={this.isLoading()}
                  fullWidth
                  type={this.state.showPassword ? 'text' : 'password'}
                  onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
                  label="Senha"
                  inputProps={{ maxLength: 32 }}
                  InputProps={{
                    endAdornment: (
                      !this.state.showPassword
                        ? <InputAdornment position='end'>
                          <IconButton onClick={() => { this.setState({ showPassword: true }) }} sx={{ color: 'rgba(1, 1, 1, 0.3)', bgcolor: 'transparent' }}>
                            <VisibilityIcon></VisibilityIcon>
                          </IconButton>
                        </InputAdornment>
                        : <InputAdornment position='end'>
                          <IconButton onClick={() => { this.setState({ showPassword: false }) }} sx={{ color: 'rgba(1, 1, 1, 0.3)', bgcolor: 'transparent' }}>
                            <VisibilityOffIcon></VisibilityOffIcon>
                          </IconButton>
                        </InputAdornment>
                    )
                  }}
                  id="password"
                  autoComplete="current-password"
                />
                <Button
                  fullWidth
                  disabled={this.isLoading()}
                  type="button"
                  onClick={() => {
                    if(GetStorage('TOKEN') !== null) {
                      window.snackbar.warn("Parece que você já esta logado. Por favor deslogue usando a opção no canto superior direito!");
                      return;
                    }

                    this.setLoading(true)
                    this.submit().then((response) => {
                      if (get(response, 'success', false)) {
                        const token = get(response, 'content')
                        SetStorage('TOKEN', token)
                        this.setLoading(true)
                        this.changePageWhenTokenPersist(token)
                      } else {
                        this.setLoading(false)
                      }
                    })
                  }}
                  variant="contained"
                  sx={{ mt: 6, mb: 3 }}
                >
                  Entrar
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link onClick={() => {
                      const dialogId = window.openDialog({
                        title: 'Esqueceu a senha?',
                        container: HelpContainer,
                        onClose: () => {
                          window.closeDialog(dialogId)
                        }
                      })
                    }
                    }
                    >
                      Esqueceu a senha?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href='/signup'>
                      Criar uma conta
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Container>
        </Box>
      </>
    );
  }
}

export default SignIn;