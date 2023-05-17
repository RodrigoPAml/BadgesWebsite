import React from 'react';
import { Grid, Button, TextField, Box, Container, Typography, Card, Avatar, InputAdornment, Tooltip, IconButton, CircularProgress } from '@mui/material';
import FormStore from '../../components/infra/formStore';
import GetStore from '../../components/stores/signup/store'
import { CreateUser } from '../../services/Users'
import { get } from 'lodash'
import ImageUpload from '../../components/imageUpload'
import HelpIcon from '@mui/icons-material/Help';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import WarningIcon from '@mui/icons-material/Warning';

class SignUp extends FormStore {
  constructor() {
    super({
      endpoint: CreateUser,
      store: GetStore
    })

    this.state = {
      ...this.state,
      redirect: false,
      showPassword: false,
      showRepeatPassword: false,
      mounted: false,
      useMargin: false,
    }
  }

  componentDidMount() {
    const { innerWidth: width, innerHeight: height } = window;
    this.setState({ mounted: true, useMargin: height > 880 })
  }

  handleChange = (e) => {
    this.setValue(e.target.id, e.target.value)
  }

  validatePassword = () => {
    const password = this.getField('password', 'value')
    const repeatPassword = this.getField('repeat-password', 'value')

    if (password !== repeatPassword) {
      return false
    }

    return true
  }

  submitUser = async (event) => {
    event.preventDefault()
    const thePasswordsMatch = this.validatePassword()

    if (thePasswordsMatch) {
      this.setLoading(true)
      this.submit().then((response) => {
        if (get(response, 'success', false) === true) {
          this.setLoading(false)
          this.setState({
            redirect: true
          })
        } else {
          this.setLoading(false)
        }
      })
    } else {
      this.setLoading(false)
      window.snackbar.warn("As senhas não são iguais")
    }
  }

  render() {
    const {
      redirect
    } = this.state

    if (redirect) {
      window.location.href = `/`
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
      <Box sx={{ pt: this.state.useMargin ? 13 : 2, pb: this.state.useMargin ? 13 : 2, height: '100%', width: '100%', bgcolor: 'rgb(247, 247, 247)' }}>
        <Container sx={{ maxWidth: '600px' }} component="main" maxWidth="sm" onSubmit={this.submitUser}>
          <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: '10px' }} >
            <Avatar sx={{ height: '60px', width: '60px', m: 1, bgcolor: 'green' }}>
            </Avatar>
            <Typography textAlign={'center'} component="h1" variant="h5">
              Cadastre uma nova conta
            </Typography>
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', m: 2, pt: 3 }} >
              <Box component="form" sx={{ mt: 1 }}>
                <Box sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignContent: "center",
                  justifyContent: "center"
                }}>
                  <WarningIcon sx={{ mr: '10px' }} color='warning'></WarningIcon>
                  <Typography color={"gray"} textAlign={"left"} component="h1" fontSize={17}>
                    Não utilize seu email como login
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
                  autoComplete="login"
                  autoFocus
                  helperText="No mínimo 8 caracteres"
                  inputProps={{ maxLength: 64 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Tooltip title="Usado para a realização de Login. Use algo que seja fácil de lembrar!" >
                          <Avatar sx={{ color: 'rgba(1, 1, 1, 0.3)', bgcolor: 'transparent' }}>
                            <HelpIcon ></HelpIcon>
                          </Avatar>
                        </Tooltip>
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
                  id="name"
                  label="Nome completo"
                  disabled={this.isLoading()}
                  autoFocus
                  inputProps={{ maxLength: 32 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Tooltip title="Seu nome usado apenas para exibição" >
                          <Avatar sx={{ color: 'rgba(1, 1, 1, 0.3)', bgcolor: 'transparent' }}>
                            <HelpIcon ></HelpIcon>
                          </Avatar>
                        </Tooltip>
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
                  id="password"
                  helperText="No mínimo 10 caracteres"
                  type={this.state.showPassword ? 'text' : 'password'}
                  label="Senha"
                  disabled={this.isLoading()}
                  autoFocus
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
                />
                <TextField
                  margin="normal"
                  required
                  sx={{ m: 0, mb: '15px', mt: '5px', p: 0 }}
                  fullWidth
                  type={this.state.showRepeatPassword ? 'text' : 'password'}
                  onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
                  id="repeat-password"
                  label="Repetir Senha"
                  disabled={this.isLoading()}
                  autoFocus
                  inputProps={{ maxLength: 32 }}
                  InputProps={{
                    endAdornment: (
                      !this.state.showRepeatPassword
                        ? <InputAdornment position='end'>
                          <IconButton onClick={() => { this.setState({ showRepeatPassword: true }) }} sx={{ color: 'rgba(1, 1, 1, 0.3)', bgcolor: 'transparent' }}>
                            <VisibilityIcon></VisibilityIcon>
                          </IconButton>
                        </InputAdornment>
                        : <InputAdornment position='end'>
                          <IconButton onClick={() => { this.setState({ showRepeatPassword: false }) }} sx={{ color: 'rgba(1, 1, 1, 0.3)', bgcolor: 'transparent' }}>
                            <VisibilityOffIcon></VisibilityOffIcon>
                          </IconButton>
                        </InputAdornment>
                    )
                  }}
                />
                <ImageUpload
                  id="image"
                  centerMessage="Nenhuma imagem selecionada (JPG, PNG, JPEG)"
                  subMessage="Tamanho máximo: 3 MB"
                  extensions={'.jpg,.png,.jpeg'}
                  label={this.getField('image', 'name')}
                  onChange={(id, value, hasChanged = true) => { this.setValue(id, value, hasChanged); }}
                  item={this.state.item}
                  required={true}
                  disabled={this.isLoading()}
                  sx={{ m: 0 }}
                />
                <Button
                  fullWidth
                  type="submit"
                  disabled={this.isLoading()}
                  variant="contained"
                  sx={{ mt: 3, mb: 1 }}
                >
                  Cadastrar
                </Button>
              </Box>
            </Box>
          </Card>
        </Container >
      </Box>
    );
  }
}

export default SignUp;