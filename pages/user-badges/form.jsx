import React from 'react';
import { Card, TextField, Button, Box, Typography, Switch } from '@mui/material';
import Store from '../../components/stores/user-badges/formStore'
import FormStore from '../../components/infra/formStore'
import Selector from '../../components/selector'
import { get, toNumber } from 'lodash'
import { CreateUserBadge, UpdateUserBadge } from '../../services/UserBadge'
import BadgeDataGridStore from '../../components/selector/selectors/badgeDataGridStore';
import UserDataGridStore from '../../components/selector/selectors/userDataGridStore';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { GetPagedBadges } from '../../services/Badges';
import { GetPagedUsers } from '../../services/Users';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

class FormContainer extends FormStore {
  constructor(props) {
    super({
      ...props,
      endpoint: props.update ? UpdateUserBadge : CreateUserBadge,
      store: Store,
    })

    this.badgeId = get(props, 'badgeId', null)
    this.userId = get(props, 'userId', null)

    this.onClose = get(props, 'onClose', () => { })
  }

  componentDidMount() {
    if (this.badgeId !== null) {
      this.setValue('badgeId', this.badgeId)
    }
    if (this.userId !== null) {
      this.setValue('userId', this.userId)
    }
  }

  componentWillUnmount() {
    this.resetStore()
  }

  renderForm() {
    return (
      <Card sx={{ minHeight: '10px', minWidth: '400px', m: '10px' }}>
        <Box sx={{ display: 'flex', m: '10px', flexDirection: 'column', alignItems: 'left' }}>
          <TextField
            id="code"
            label={this.getField('code', 'name')}
            value={this.getField('code', 'value')}
            disabled={this.isLoading()}
            fullWidth={false}
            sx={{ ml: '10px', mr: '10px', minWidth: '400px' }}
            onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
            autoFocus
            required
            margin="normal"
          />
          <LocalizationProvider dateAdapter={AdapterMoment} >
            <DesktopDatePicker
              label={this.getField('date', 'name')}
              inputFormat="DD/MM/YYYY"
              required
              value={this.getField('date', 'value')}
              disabled={this.isLoading()}
              onChange={(newValue) => { this.setValue("date", get(newValue, '_d', null).toDateString()) }}
              renderInput={(params) => <TextField onKeyDown={(e) => { e.preventDefault(); }} sx={{ ml: '10px', mr: '10px', minWidth: '300px' }} {...params} />}
            />
          </LocalizationProvider>
          <Card variant='outlined'
            sx={{ display: 'flex', ml: '10px', mr: '10px', mt: '5px', minWidth: '400px' }}
          >
            <Typography sx={{mt:'7px', ml: '10px'}}>
              {
                this.getField('isUdemy', 'name')
              }
            </Typography>
            <Switch
              label={this.getField('isUdemy', 'name')}
              value={this.getField('isUdemy', 'value')}
              checked={this.getField('isUdemy', 'value')}
              onChange={(event) => {
                this.setValue('isUdemy', event.target.checked)
              }}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Card>
          {
            this.badgeId === null && get(this.props.item, 'isExternal', false) === false ?
              <Selector
                id="badgeId"
                property="id"
                initialLabel={get(this.state, 'item.badge.code', '') + ' - ' + get(this.state, 'item.badge.description', '')}
                onLabel={(fkRow) => { return (get(fkRow, 'code', '') + ' - ' + get(fkRow, 'description', '')) }}
                icon={AutoStoriesIcon}
                label={this.getField('badgeId', 'name')}
                value={this.getField('badgeId', 'value')}
                required
                store={BadgeDataGridStore}
                endpoint={GetPagedBadges}
                disabled={this.isLoading()}
                onChange={(id, value) => { this.setValue(id, value) }}
                fullWidth={false}
                sx={{ ml: '10px', mr: '10px', minWidth: '400px' }}
                margin="normal"
                dataGridProps={{
                  searchFilter: {
                    operation: 'in',
                    type: 'string',
                    field: 'description',
                    name: 'Descrição'
                  },
                  advancedFilters: [
                    {
                      operation: '=',
                      type: 'ulong',
                      field: 'id',
                      name: 'Identificador'
                    },
                    {
                      operation: '=',
                      type: 'string',
                      field: 'description',
                      name: 'Descrição'
                    },
                    {
                      operation: '=',
                      type: 'string',
                      field: 'code',
                      name: 'Código'
                    }
                  ]
                }}
              />
              : <></>
          }
          {
            this.userId === null ?
              <Selector
                id="userId"
                property="id"
                initialLabel={get(this.state, 'item.user.name', '') + ' - ' + get(this.state, 'item.user.login', '')}
                onLabel={(fkRow) => { return (get(fkRow, 'name', '') + ' - ' + get(fkRow, 'login', '')) }}
                icon={AccountCircleIcon}
                label={this.getField('userId', 'name')}
                value={this.getField('userId', 'value')}
                required
                store={UserDataGridStore}
                endpoint={GetPagedUsers}
                disabled={this.isLoading()}
                onChange={(id, value) => { this.setValue(id, value) }}
                fullWidth={false}
                sx={{ ml: '10px', mr: '10px', minWidth: '400px' }}
                margin="normal"
                dataGridProps={{
                  searchFilter: {
                    operation: 'in',
                    type: 'string',
                    field: 'name',
                    name: 'Nome'
                  },
                  advancedFilters: [
                    {
                      operation: '=',
                      type: 'ulong',
                      field: 'id',
                      name: 'Identificador'
                    },
                    {
                      operation: '=',
                      type: 'string',
                      field: 'name',
                      name: 'Nome'
                    },
                    {
                      operation: '=',
                      type: 'string',
                      field: 'login',
                      name: 'Login'
                    },
                    {
                      operation: '=',
                      type: 'string',
                      field: 'url',
                      name: 'URL'
                    }
                  ]
                }}
              />
              : <></>
          }
          {
            get(this.props.item, 'isExternal', false) === true ?
              <Card sx={{ display: 'flex', flexDirection: 'column' }} variant='outlined'>
                <Typography sx={{ ml: '15px', mt: '10px' }}>Informações Badge Externo (Constante)</Typography>
                <TextField
                  id="title"
                  label={this.getField('title', 'name')}
                  value={this.getField('title', 'value')}
                  disabled={this.isLoading()}
                  fullWidth={false}
                  sx={{ ml: '10px', mr: '10px', minWidth: '400px' }}
                  autoFocus
                  required
                  margin="normal"
                />
                <TextField
                  id="url"
                  label={this.getField('url', 'name')}
                  value={this.getField('url', 'value')}
                  disabled={this.isLoading()}
                  fullWidth={false}
                  sx={{ ml: '10px', mr: '10px', minWidth: '400px' }}
                  autoFocus
                  required
                  margin="normal"
                />
              </Card>
              : <></>
          }
        </Box>
      </Card>
    )
  }

  render() {
    return (
      <Box sx={{ minHeight: '20vh', m: 2, minWidth: '70vw' }}>
        {
          this.renderForm()
        }
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: '10px' }}>
          <Button
            disabled={!this.isValid() || this.isLoading()}
            onClick={() => {
              this.submit().then((response) => {
                if (get(response, 'success', false)) {
                  if (!this.state.update) {
                    this.setValue('id', toNumber(get(response, 'content', 0)))
                  }
                  this.onClose(true)
                }
              });
            }}
            variant='contained'>
            {this.state.update ? 'Atualizar' : 'Criar'}
          </Button>
          <Button onClick={() => { this.onClose() }} sx={{ ml: '2px' }} variant='outlined'>{'Cancelar'}</Button>
        </Box>
      </Box>
    )
  }
}

export default FormContainer;