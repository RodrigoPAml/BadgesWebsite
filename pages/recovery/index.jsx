import React from 'react';
import PasswordIcon from '@mui/icons-material/Password';
import FormStore from '../../components/infra/formStore';
import Store from '../../components/stores/recover/store'
import { Login } from '../../services/Authentication'
import { Avatar, Button, TextField, Grid, Box, Container, Typography, Card, Link, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { RequestChangePassword, PostChangePassword } from '../../services/Authentication';
import { get } from 'lodash'
import HelpContainer from './help'

class SignIn extends FormStore {
  constructor() {
    super({
      endpoint: Login,
      store: Store,
    })

    this.state = {
      ...this.state,
      loading: false,
      mounted: false,
      useMargin: false,
      sendedCode: false
    }
  }

  componentDidMount() {
    const { innerWidth: width, innerHeight: height } = window;
    this.setState({ mounted: true, useMargin: height > 880 })
  }

  render() {
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
            <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: '15px', mt: '20px', mb: '20px' }} >
              <Avatar sx={{ height: '60px', width: '60px', m: 1, bgcolor: 'red' }} >
                <PasswordIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Recuperar Senha
              </Typography>
              <Box component="form" sx={{ m: 2, pt: 3 }}>
                <TextField
                  margin="normal"
                  required
                  disabled={this.isLoading() || this.state.sendedCode}
                  fullWidth
                  onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
                  id="login"
                  label="Login ou Email"
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
                  label="Nova Senha"
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
                <TextField
                  margin="normal"
                  required
                  disabled={this.isLoading()}
                  fullWidth
                  type={this.state.showPassword ? 'text' : 'password'}
                  onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
                  label="Repetir Nova Senha"
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
                  id="repeat-password"
                  autoComplete="current-password"
                />
                {
                  this.state.sendedCode === true ?
                    <TextField
                      margin="normal"
                      required
                      disabled={this.isLoading()}
                      fullWidth
                      onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
                      id="emailCode"
                      label="Código de Verificação do Email"
                      inputProps={{ maxLength: 64 }}
                      autoFocus
                    />
                    : <></>
                }
                <Button
                  fullWidth
                  disabled={this.isLoading() || !this.validate(false)}
                  type="button"
                  onClick={() => {
                    if (!this.state.sendedCode) {
                      this.setLoading(true)
                      RequestChangePassword(this.getField('login', 'value')).then((response) => {
                        if (get(response, 'success') === true) {
                          window.snackbar.success(get(response, 'message'), 7000)
                          this.setState({
                            ...this.state,
                            sendedCode: true
                          }, () => {
                            this.setLoadingWithAction(false, () => { this.setField('emailCode', 'required', true) })
                          })
                        } else {
                          if( get(response, 'message') === 'Sem email cadastrado') {
                              const dialogId = window.openDialog({
                                title: 'Atenção',
                                container: HelpContainer,
                                onClose: () => {
                                  window.closeDialog(dialogId)
                                }
                              })
                          }

                          window.snackbar.error('Erro: ' + get(response, 'message'))
                          this.setLoading(false)
                        }
                      }).catch(() => {
                        this.setLoading(false)
                      })
                    } else {
                      if(this.getField('password', 'value') !== this.getField('repeat-password', 'value')) {
                        window.snackbar.error('Senhas não são iguais')
                        return
                      }
                      
                      this.setLoading(true)
                      PostChangePassword({
                        email: this.getField('login', 'value'), 
                        emailCode: this.getField('emailCode', 'value'), 
                        password: this.getField('password', 'value')}).then((response) => {
                          if (get(response, 'success') === true) {
                            window.snackbar.success(get(response, 'message'), 7000)
                            setTimeout(() => {
                              window.location.href = '/login'
                            }, 2500)
                          } else {
                            window.snackbar.error('Erro: ' + get(response, 'message'))
                            this.setLoading(false)
                          }   
                      })
                    }
                  }}
                  variant="contained"
                  sx={{ mt: 6, mb: 3 }}
                >
                  {this.state.sendedCode ? 'Modificar Senha' : 'Enviar código de verificação'}
                </Button>
              </Box>
            </Card>
          </Container>
        </Box>
      </>
    );
  }
}

export default SignIn;