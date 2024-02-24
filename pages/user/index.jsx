import React from 'react';
import { Card, TextField, Button, Box, Avatar, Typography, CircularProgress, Grid, InputAdornment, Link, IconButton } from '@mui/material';
import Store from '../../components/stores/user/store'
import { SetStorage } from '../../components/infra/storage'
import FormStore from '../../components/infra/formStore'
import { get, isEmpty, trim } from 'lodash'
import ImageUpload from '../../components/imageUpload'
import { UpdateMyUser, GetMyUser, UpdateMyUserPassword, UpdateMyUserEmail } from '../../services/Users'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

class User extends FormStore {
  constructor(props) {
    super({
      ...props,
      endpoint: UpdateMyUser,
      store: Store,
      update: true,
      loading: true,
      mobile: false,
      mounted: false,
      linkedinClicked: false,
      youtubeClicked: false,
      githubClicked: false,
      facebookClicked: false,
      showPassword: false,
    })
  }

  componentDidMount() {
    const { innerWidth: width, innerHeight: height } = window;

    if (width < 1000) {
      this.setState({ mobile: true })
    }

    this.setState({ mounted: true })

    this.setState({ loading: true })
    GetMyUser().then((response) => {
      if (get(response, 'success', false) === true) {
        this.populateStore(get(response, 'content', null))
        this.setState({ loading: false })
      } else {
        window.snackbar.error(get(response, 'message', null))
      }
    }).catch(() => {
      window.snackbar.error('Erro interno, tente novamente mais tarde')
    })
  }

  componentWillUnmount() {
    this.resetStore()
  }

  renderHeader() {
    return (
      <>
        <Box sx={{ display: 'flex', height: '70px' }}>
          <Avatar sx={{ width: '60px', height: '60px', ml: '10px', mt: '10px' }}>
            <AccountCircleIcon sx={{ width: '35px', height: '35px' }} />
          </Avatar>
          <Typography sx={{ ml: '10px', mt: '10px' }} variant="h4">Meu Perfil</Typography>
        </Box>
        <Box sx={{ display: 'flex', height: '20px', ml: '85px', mt: '-20px', mb: '15px' }}>
          <Typography sx={{ fontSize: 15, color: 'rgb(150, 150, 150)', }}>Área do Usuário</Typography>
        </Box>
      </>
    )
  }

  renderForm() {
    if (this.state.loading === true || this.state.mounted === false || this.state.mounted === undefined) {
      return <Box sx={{
        minHeight: '600px', pt: 1, backgroundColor: 'rgb(247, 247, 247)', display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <CircularProgress color="primary" />
      </Box>
    }

    return (<Card sx={{ minHeight: '400px', minWidth: '200px', m: '10px' }}>
      <Box sx={{ display: 'flex', m: '10px', flexDirection: 'column', alignItems: 'left' }}>
        <Grid direction={'row'} container>
          {
            this.state.mobile ? <></>
              : <Grid item xs={4}>
                <ImageUpload
                  id="image"
                  initialValue={this.getField('image', 'value')}
                  label={this.getField('image', 'name')}
                  centerMessage="Nenhuma imagem selecionada (JPG, PNG, JPEG)"
                  subMessage="Tamanho máximo: 3 MB"
                  extensions={'.jpg,.png,.jpeg'}
                  onChange={(id, value, hasChanged = true) => {
                    SetStorage('USER_IMAGE', null);
                    this.setValue(id, value, hasChanged);
                  }}
                  item={this.state.item}
                  required={true}
                  disabled={this.isLoading()}
                  sx={{ ml: '10px', maxWidth: '100%', minHeight: '225px' }}
                />
              </Grid>
          }
          <Grid direction={'column'} item xs={this.state.mobile ? 12 : 8}>
            <Box sx={{ display: 'flex', m: '10px', flexDirection: 'column', alignItems: 'left' }}>
              <TextField
                id="name"
                inputProps={{ maxLength: 32 }}
                label={this.getField('name', 'name')}
                value={this.getField('name', 'value')}
                disabled={this.isLoading()}
                fullWidth={false}
                required
                sx={{ ml: '10px', mr: '10px', minWidth: '200px', maxWidth: '600px' }}
                onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
                margin="normal"
              />
              <TextField
                id="login"
                inputProps={{ maxLength: 64 }}
                label={this.getField('login', 'name')}
                value={this.getField('login', 'value')}
                disabled={true}
                fullWidth={false}
                required
                sx={{ ml: '10px', mr: '10px', minWidth: '200px', maxWidth: '600px' }}
                onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
                margin="normal"
              />
              <TextField
                id="email"
                label={this.getField('email', 'name')}
                value={this.getField('email', 'value')}
                fullWidth={false}
                required={false}
                type={'text'}
                onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
                margin="normal"
                sx={{ ml: '10px', mr: '10px', minWidth: '200px', maxWidth: '600px' }}
                helperText={"Até 360 caracteres"}
                InputProps={{
                  endAdornment: (
                    <>
                      <Button
                        variant='contained'
                        color='warning'
                        sx={{ m: '5px', height: '34px', minWidth: '83px', borderRadius: 20 }}
                        onClick={() => {
                          if (isEmpty(trim(this.getField('email', 'value')))) {
                            window.snackbar.error("Informe o email")
                            return
                          }

                          UpdateMyUserEmail(this.getField('email', 'value'))
                            .then((request) => {
                              if (get(request, 'success', false) === true) {
                                window.snackbar.success(get(request, 'message'))
                              } else {
                                window.snackbar.error(get(request, 'message'))
                              }
                            }).catch(() => window.snackbar.error("Erro interno, por favor tente mais tarde"))
                        }}
                      >
                        APLICAR
                      </Button>
                    </>
                  )
                }}
              />
              <TextField
                id="newPassword"
                label={this.getField('newPassword', 'name')}
                value={this.getField('newPassword', 'value')}
                fullWidth={false}
                required={false}
                type={this.state.showPassword ? 'text' : 'password'}
                onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
                margin="normal"
                sx={{ ml: '10px', mr: '10px', minWidth: '200px', maxWidth: '600px' }}
                inputProps={{ maxLength: 32 }}
                helperText={"Até 32 caracteres"}
                InputProps={{
                  endAdornment: (
                    <>
                      {
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
                      }
                      <Button
                        variant='contained'
                        color='warning'
                        sx={{ m: '5px', height: '34px', minWidth: '83px', borderRadius: 20 }}
                        onClick={() => {
                          if (isEmpty(trim(this.getField('newPassword', 'value')))) {
                            window.snackbar.error("Informe a senha")
                            return
                          }

                          UpdateMyUserPassword(this.getField('newPassword', 'value'))
                            .then((request) => {
                              if (get(request, 'success', false) === true) {
                                window.snackbar.success(get(request, 'message'))
                              } else {
                                window.snackbar.error(get(request, 'message'))
                              }
                            }).catch(() => window.snackbar.error("Erro interno, por favor tente mais tarde"))
                        }}
                      >
                        Aplicar
                      </Button>
                    </>
                  )
                }}
              />
              <TextField
                id="url"
                label={this.getField('url', 'name')}
                value={this.getField('url', 'value')}
                disabled={this.isLoading()}
                fullWidth={false}
                required
                sx={{ ml: '10px', mr: '10px', minWidth: '200px', maxWidth: '700px' }}
                onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
                margin="normal"
                inputProps={{ maxLength: 128 }}
                helperText={
                  <Typography fontSize={12}>
                    Seu perfil público ficará disponível em&nbsp;
                    <Link
                      target={'_blank'}
                      rel="noopener noreferrer"
                      href={'/perfil?key=' + this.getField('url', 'value')}
                    >
                      {"http://localhost/perfil?key=" + this.getField('url', 'value')}
                    </Link>
                  </Typography>
                }
              />
              <TextField
                id="bio"
                label={this.getField('bio', 'name')}
                value={this.getField('bio', 'value')}
                fullWidth={false}
                required={false}
                multiline={true}
                sx={{ ml: '10px', mr: '10px', minWidth: '200px' }}
                onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
                margin="normal"
                inputProps={{ maxLength: 1024 }}
                helperText={"Até 1024 caracteres"}
              />
              <Card sx={{ m: '10px', display: 'flex', flexDirection: 'column' }} variant='outlined'>
                <TextField
                  id="github"
                  label={this.getField('github', 'name')}
                  value={this.getField('github', 'value')}
                  fullWidth={false}
                  required={false}
                  sx={{ ml: '10px', mr: '10px', minWidth: '200px', maxWidth: '800px' }}
                  onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
                  margin="normal"
                  onClick={() => {
                    this.setState({ githubClicked: true })
                  }}
                  onBlur={() => {
                    this.setState({ githubClicked: false })
                  }}
                  onMouseLeave={() => {
                    this.setState({ githubClicked: false })
                  }}
                  onDragOverCapture={() => {
                    this.setState({ githubClicked: false })
                  }}
                  inputProps={{ maxLength: 256 }}
                  helperText={"Até 256 caracteres"}
                  InputProps={{
                    startAdornment: this.state.githubClicked && this.state.mobile ? <></> : <InputAdornment position="start">https://www.github.com/</InputAdornment>,
                  }}
                />
                <TextField
                  id="linkedin"
                  label={this.getField('linkedin', 'name')}
                  value={this.getField('linkedin', 'value')}
                  fullWidth={false}
                  required={false}
                  onClick={() => {
                    this.setState({ linkedinClicked: true })
                  }}
                  onBlur={() => {
                    this.setState({ linkedinClicked: false })
                  }}
                  onMouseLeave={() => {
                    this.setState({ linkedinClicked: false })
                  }}
                  onDragOverCapture={() => {
                    this.setState({ linkedinClicked: false })
                  }}
                  sx={{ ml: '10px', mr: '10px', minWidth: '200px', maxWidth: '800px' }}
                  onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
                  margin="normal"
                  inputProps={{ maxLength: 256 }}
                  helperText={"Até 256 caracteres"}
                  InputProps={{
                    startAdornment: this.state.linkedinClicked && this.state.mobile ? <></> : <InputAdornment position="start">https://www.linkedin.com/</InputAdornment>,
                  }}
                />
                <TextField
                  id="youtube"
                  label={this.getField('youtube', 'name')}
                  value={this.getField('youtube', 'value')}
                  fullWidth={false}
                  required={false}
                  sx={{ ml: '10px', mr: '10px', minWidth: '200px', maxWidth: '800px' }}
                  onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
                  margin="normal"
                  onClick={() => {
                    this.setState({ youtubeClicked: true })
                  }}
                  onBlur={() => {
                    this.setState({ youtubeClicked: false })
                  }}
                  onMouseLeave={() => {
                    this.setState({ youtubeClicked: false })
                  }}
                  onDragOverCapture={() => {
                    this.setState({ youtubeClicked: false })
                  }}
                  inputProps={{ maxLength: 256 }}
                  helperText={"Até 256 caracteres"}
                  InputProps={{
                    startAdornment: this.state.youtubeClicked && this.state.mobile ? <></> : <InputAdornment position="start">https://www.youtube.com/</InputAdornment>,
                  }}
                />
                <TextField
                  id="facebook"
                  label={this.getField('facebook', 'name')}
                  value={this.getField('facebook', 'value')}
                  fullWidth={false}
                  required={false}
                  sx={{ ml: '10px', mr: '10px', minWidth: '200px', maxWidth: '800px' }}
                  onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
                  margin="normal"
                  inputProps={{ maxLength: 256 }}
                  helperText={"Até 256 caracteres"}
                  onClick={() => {
                    this.setState({ facebookClicked: true })
                  }}
                  onBlur={() => {
                    this.setState({ facebookClicked: false })
                  }}
                  onMouseLeave={() => {
                    this.setState({ facebookClicked: false })
                  }}
                  onDragOverCapture={() => {
                    this.setState({ facebookClicked: false })
                  }}
                  InputProps={{
                    startAdornment: this.state.facebookClicked && this.state.mobile ? <></> : <InputAdornment position="start">https://www.facebook.com/</InputAdornment>,
                  }}
                />
                {
                  !this.state.mobile ? <></>
                    :
                    <ImageUpload
                      id="image"
                      initialValue={this.getField('image', 'value')}
                      label={this.getField('image', 'name')}
                      centerMessage="Nenhuma imagem selecionada (JPG, PNG, JPEG)"
                      subMessage="Tamanho máximo: 3 MB"
                      extensions={'.jpg,.png,.jpeg'}
                      onChange={(id, value, hasChanged = true) => {
                        SetStorage('USER_IMAGE', null);
                        this.setValue(id, value, hasChanged);
                      }}
                      item={this.state.item}
                      required={true}
                      disabled={this.isLoading()}
                      sx={{ ml: '10px', mr: '10px', mb: '10px', maxWidth: '100%', minHeight: '225px' }}
                    />
                }
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Card>)
  }

  render() {
    return (
      <Box sx={{ minHeight: '600px', pt: 1, pb: '10px', backgroundColor: 'rgb(247, 247, 247)' }}>
        {
          this.renderHeader()
        }
        {
          this.renderForm()
        }
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: '10px' }}>
          <Button
            disabled={!this.isValid() || this.isLoading()}
            onClick={() => {
              this.submit()
            }}
            variant='contained'>
            {'Atualizar'}
          </Button>
        </Box>
      </Box>
    )
  }
}

export default User;