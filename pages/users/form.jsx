import React from 'react';
import { Card, TextField, Button, Box, Stepper, Step, StepButton, InputAdornment, Grid } from '@mui/material';
import Store from '../../components/stores/users/formStore'
import FormStore from '../../components/infra/formStore'
import { get, toString } from 'lodash'
import UserBadges from '../user-badges'
import ImageUpload from '../../components/imageUpload'
import { UpdateUser, GetImageFromId, ChangePassword, ChangeEmail } from '../../services/Users'

class FormContainer extends FormStore {
  constructor(props) {
    super({
      ...props,
      endpoint: props.update ? UpdateUser : null,
      store: Store,
    })

    this.badgeId = get(props, 'badgeId', null)
    this.onClose = get(props, 'onClose', () => { })

    this.state = {
      ...this.state,
      activeStep: 0,
    }
  }

  componentDidMount() {
    if (this.badgeId !== null) {
      this.setValue('badgeId', this.badgeId)
    }
  }

  componentWillUnmount() {
    this.resetStore()
  }

  renderForm() {
    return (<Card sx={{ minHeight: '10px', minWidth: '400px', m: '10px' }}>
      <Box sx={{ display: 'flex', m: '10px', flexDirection: 'column', alignItems: 'left' }}>
        <TextField
          id="name"
          label={this.getField('name', 'name')}
          value={this.getField('name', 'value')}
          disabled={this.isLoading()}
          fullWidth={false}
          required
          sx={{ ml: '10px', mr: '10px', minWidth: '400px' }}
          onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
          margin="normal"
        />
        <TextField
          id="login"
          label={this.getField('login', 'name')}
          value={this.getField('login', 'value')}
          disabled={true}
          fullWidth={false}
          required
          sx={{ ml: '10px', mr: '10px', minWidth: '400px' }}
          onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
          margin="normal"
        />
        <TextField
          id="email"
          label={this.getField('email', 'name')}
          value={this.getField('email', 'value')}
          disabled={true}
          fullWidth={false}
          required
          sx={{ ml: '10px', mr: '10px', minWidth: '400px' }}
          onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
          margin="normal"
        />
        <TextField
          id="url"
          label={this.getField('url', 'name')}
          value={this.getField('url', 'value')}
          disabled={this.isLoading()}
          fullWidth={false}
          required
          sx={{ ml: '10px', mr: '10px', minWidth: '400px' }}
          onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
          margin="normal"
        />
        <TextField
          id="profile"
          label={this.getField('profile', 'name')}
          value={this.getField('profile', 'value') === 1 ? 'Administrador' : 'Usuário'}
          disabled={this.isLoading()}
          fullWidth={false}
          required
          sx={{ ml: '10px', mr: '10px', minWidth: '400px' }}
          onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
          margin="normal"
        />
        <TextField
          id="bio"
          label={this.getField('bio', 'name')}
          value={this.getField('bio', 'value')}
          fullWidth={false}
          required={false}
          multiline={true}
          sx={{ ml: '10px', mr: '10px', minWidth: '400px' }}
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
            sx={{ ml: '10px', mr: '10px', minWidth: '400px' }}
            onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
            margin="normal"
            inputProps={{ maxLength: 256 }}
            helperText={"Até 256 caracteres"}
            InputProps={{
              startAdornment: <InputAdornment position="start">https://www.github.com/</InputAdornment>,
            }}
          />
          <TextField
            id="linkedin"
            label={this.getField('linkedin', 'name')}
            value={this.getField('linkedin', 'value')}
            fullWidth={false}
            required={false}
            sx={{ ml: '10px', mr: '10px', minWidth: '400px' }}
            onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
            margin="normal"
            inputProps={{ maxLength: 256 }}
            helperText={"Até 256 caracteres"}
            InputProps={{
              startAdornment: <InputAdornment position="start">https://www.linkedin.com/</InputAdornment>,
            }}
          />
          <TextField
            id="youtube"
            label={this.getField('youtube', 'name')}
            value={this.getField('youtube', 'value')}
            fullWidth={false}
            required={false}
            sx={{ ml: '10px', mr: '10px', minWidth: '400px' }}
            onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
            margin="normal"
            inputProps={{ maxLength: 256 }}
            helperText={"Até 256 caracteres"}
            InputProps={{
              startAdornment: <InputAdornment position="start">https://www.youtube.com/</InputAdornment>,
            }}
          />
          <TextField
            id="facebook"
            label={this.getField('facebook', 'name')}
            value={this.getField('facebook', 'value')}
            fullWidth={false}
            required={false}
            sx={{ ml: '10px', mr: '10px', minWidth: '400px' }}
            onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
            margin="normal"
            inputProps={{ maxLength: 256 }}
            helperText={"Até 256 caracteres"}
            InputProps={{
              startAdornment: <InputAdornment position="start">https://www.facebook.com/</InputAdornment>,
            }}
          />
          <Grid container direction={'row'} sx={{ ml: '10px', mr: '10px', }}>
            <Grid item >
              <TextField
                id="newPassword"
                label={this.getField('newPassword', 'name')}
                value={this.getField('newPassword', 'value')}
                fullWidth={false}
                required={false}
                sx={{ minWidth: '400px' }}
                onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
                margin="normal"
                inputProps={{ maxLength: 32 }}
                helperText={"Até 32 caracteres"}
              />
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                color='error'
                sx={{ ml: '10px', mt: '23px' }}
                onClick={() => {
                  ChangePassword(this.props.item.id, this.getField('newPassword', 'value'))
                    .then((request) => {
                      if (get(request, 'success', false) === true) {
                        window.snackbar.success(get(request, 'message'))
                      } else {
                        window.snackbar.error(get(request, 'message'))
                      }
                    }).catch(() => window.snackbar.error("Erro interno, por favor tente mais tarde"))
                }}
              >
                Trocar senha
              </Button>
            </Grid>
          </Grid>
          <Grid container direction={'row'} sx={{ ml: '10px', mr: '10px', }}>
            <Grid item >
              <TextField
                id="email"
                label={this.getField('email', 'name')}
                value={this.getField('email', 'value')}
                fullWidth={false}
                required={false}
                sx={{ minWidth: '400px' }}
                onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
                margin="normal"
                inputProps={{ maxLength: 360 }}
              />
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                color='error'
                sx={{ ml: '10px', mt: '23px' }}
                onClick={() => {
                  ChangeEmail(this.props.item.id, this.getField('email', 'value'))
                    .then((request) => {
                      if (get(request, 'success', false) === true) {
                        window.snackbar.success(get(request, 'message'))
                      } else {
                        window.snackbar.error(get(request, 'message'))
                      }
                    }).catch(() => window.snackbar.error("Erro interno, por favor tente mais tarde"))
                }}
              >
                Trocar Email
              </Button>
            </Grid>
          </Grid>
        </Card>
        <ImageUpload
          id="image"
          endpoint={GetImageFromId}
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
      </Box>
    </Card>)
  }

  renderUserBadges() {
    return (
      <UserBadges
        userId={this.getField('id', 'value')}
        fixedFilters={[
          {
            operation: "=",
            type: "ulong",
            value: toString(this.getField('id', 'value')),
            field: "userId"
          }
        ]}
      />
    )
  }

  render() {
    return (
      <Box sx={{ minHeight: '20vh', m: 2, minWidth: '70vw' }}>
        <Stepper nonLinear sx={{ mb: '30px' }} activeStep={this.state.activeStep} orientation="horizontal">
          <Step>
            <StepButton disabled={this.state.activeStep !== 0} color="inherit" onClick={() => { this.setState({ activeStep: 0 }) }}>Dados</StepButton>
          </Step>
          <Step>
            <StepButton disabled={!this.state.update} color="inherit" onClick={() => { this.setState({ activeStep: 1 }) }}>Badges deste Usuário</StepButton>
          </Step>
        </Stepper>
        {
          this.state.activeStep === 0 ? this.renderForm() : <></>
        }
        {
          this.state.activeStep === 1 ? this.renderUserBadges() : <></>
        }
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: '10px' }}>
          <Button
            disabled={!this.isValid() || this.isLoading() || this.state.activeStep === 1}
            onClick={() => {
              this.submit().then((response) => {
                if (get(response, 'success', false)) {
                  this.setState({ activeStep: 1 })
                  if (!this.state.update) {
                    this.setValue('id', toNumber(get(response, 'content', 0)))
                  }
                }
              });
            }}
            variant='contained'>
            {this.state.update ? 'Atualizar' : 'Criar'}
          </Button>
          <Button onClick={() => { this.onClose(true) }} sx={{ ml: '2px' }} variant='outlined'>{this.state.activeStep === 0 ? 'Cancelar' : 'Concluir'}</Button>
        </Box>
      </Box>
    )
  }
}

export default FormContainer;