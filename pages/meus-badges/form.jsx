import React from 'react';
import { Card, TextField, Box, Button, Avatar } from '@mui/material';
import Store from '../../components/stores/meus-badges/formStore'
import FormStore from '../../components/infra/formStore'
import { get, isEmpty } from 'lodash'
import { GetExternalBadgeInfo } from '../../services/Badges'
import { CreateExternalBadge } from '../../services/UserBadge'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ImageUpload from '../../components/imageUpload'

class FormContainer extends FormStore {
  constructor(props) {
    super({
      ...props,
      endpoint: null,
      store: Store,
    })

    this.state = {
      ...this.state,
      haveBadge: false,
      useUpload: false
    }

    this.onClose = get(props, 'onClose', () => { })
  }

  componentWillUnmount() {
    this.resetStore()
  }

  renderForm() {
    return (
      <Card sx={{ minHeight: '10px', minWidth: '100px', m: '10px' }}>
        <Box sx={{ display: 'flex', m: '10px', flexDirection: 'column', alignItems: 'left' }}>
          {
            this.state.haveBadge === false ?
              <>
                <TextField
                  id="url"
                  multiline
                  label={this.getField('url', 'name')}
                  value={this.getField('url', 'value')}
                  disabled={this.state.haveBadge !== false || this.isLoading()}
                  fullWidth={false}
                  required
                  sx={{ minWidth: '100px' }}
                  onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
                  margin="normal"
                />
                <Box>
                  <Button
                    onClick={() => {
                      this.setLoading(true)
                      GetExternalBadgeInfo(encodeURIComponent(this.getField('url', 'value'))).then((request) => {
                        if (get(request, 'success', false) === true) {
                          window.snackbar.success("Badge carregado com sucesso")
                          const badge = get(request, 'content')

                          this.setValue('title', get(badge, 'title'))
                          this.setValue('url', get(badge, 'url'))
                          this.setValue('image', get(badge, 'image'))

                          this.setState({ haveBadge: true })
                        } else {
                          window.snackbar.error(get(request, 'message', '?'))
                        }
                        this.setLoading(false)
                      }).catch((e) => {
                        window.snackbar.error('Erro interno' + e)
                        this.setLoading(false)
                      })
                    }}
                    variant='contained'
                    disabled={this.state.haveBadge !== false || this.state.loading || isEmpty(this.getField('url', 'value'))}>
                    Carregar Badge
                  </Button>
                  <Button
                    variant='contained'
                    onClick={() => {
                      this.setState({
                        haveBadge: true
                      })
                    }}
                    sx={{ ml: '10px' }}
                  >
                    Inserir manualmente
                  </Button>
                </Box>
              </>
              :
              <></>
          }
          {
            this.state.haveBadge !== false ?
              <>
                <TextField
                  id="title"
                  label={this.getField('title', 'name')}
                  value={this.getField('title', 'value')}
                  fullWidth={false}
                  required
                  multiline
                  onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
                  sx={{ minWidth: '100px' }}
                  margin="normal"
                />
                <TextField
                  id="url"
                  multiline
                  label={this.getField('url', 'name')}
                  value={this.getField('url', 'value')}
                  disabled={this.isLoading()}
                  fullWidth={false}
                  required
                  sx={{ minWidth: '100px' }}
                  onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
                  margin="normal"
                />
                {
                  this.state.useUpload === false ?
                    <TextField
                      id="image"
                      multiline
                      label={this.getField('image', 'name')}
                      value={this.getField('image', 'value')}
                      disabled={this.isLoading()}
                      fullWidth={false}
                      required
                      sx={{ minWidth: '100px' }}
                      onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
                      margin="normal"
                    />
                    : <></>
                }
                <FormGroup sx={{ mb: '5px' }}>
                  <FormControlLabel control={<Checkbox onChange={(event) => {
                    this.setState({ useUpload: event.target.checked })
                    this.setValue('image', '')
                  }} checked={this.state.useUpload} defaultChecked />} label="Enviar imagem por upload" />
                </FormGroup>
                {
                  this.state.useUpload === false ?
                    <Card sx={{ mt: '5px', mb: '10px' }} variant='outlined'>
                      <Avatar
                        src={this.getField('image', 'value')}
                        sx={{ borderRadius: 0, width: '100%', height: '100%' }}
                      >
                      </Avatar>

                    </Card>
                    : <ImageUpload
                      id="image"
                      label={'Upload da imagem'}
                      centerMessage="Nenhuma imagem selecionada (JPG, PNG, JPEG)"
                      subMessage="Tamanho máximo: 3 MB"
                      extensions={'.jpg,.png,.jpeg'}
                      onChange={(id, value, hasChanged = true) => { this.setValue(id, value, hasChanged); }}
                      item={this.state.item}
                      required={true}
                      disabled={this.isLoading()}
                      sx={{ mb: '15px', minHeight: '130px' }}
                    />
                }
                <Button
                  variant='contained'
                  onClick={() => {
                    this.setLoading(true)
                    CreateExternalBadge({
                      isExternal: true,
                      code: '',
                      date: '',
                      title: this.getField('title', 'value'),
                      image: this.getField('image', 'value'),
                      url: this.getField('url', 'value'),
                    }).then((request) => {
                      if (get(request, 'success', false) === true) {
                        window.snackbar.success("Badge inserido com sucesso")
                        this.setState({ loading: false })
                        this.onClose()
                      } else {
                        window.snackbar.error(get(request, 'message', '?'))
                      }
                      this.setLoading(false)
                    }).catch((e) => {
                      window.snackbar.error('Erro interno' + e)
                      this.setLoading(false)
                    })
                  }}
                >
                  Adicionar
                </Button>
              </>
              :
              <></>
          }
          <Button
            variant='outlined'
            onClick={() => { this.onClose() }}
            sx={{ mt: '10px' }}
          >
            Fechar
          </Button>
        </Box >
      </Card >
    )
  }

  render() {
    return (
      <>
        {
          this.renderForm()
        }
      </>
    )
  }
}

export default FormContainer;