import React from 'react';
import { Card, TextField, Button, Box } from '@mui/material';
import Store from '../../components/stores/competences/formStore'
import FormStore from '../../components/infra/formStore'
import Selector from '../../components/selector'
import { GetPagedBadges } from '../../services/Badges';
import { get } from 'lodash'
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { UpdateCompetence, CreateCompetence } from '../../services/Competences'
import BadgeDataGridStore from '../../components/selector/selectors/badgeDataGridStore';

class FormContainer extends FormStore {
  constructor(props) {
    super({
      ...props,
      endpoint: props.update ? UpdateCompetence : CreateCompetence,
      store: Store,
    })

    this.badgeId = get(props, 'badgeId', null)
    this.onClose = get(props, 'onClose', () => { })
  }

  componentDidMount() {
    if (this.badgeId !== null) {
      this.setValue('badgeId', this.badgeId)
    }
  }

  componentWillUnmount() {
    this.resetStore()
  }

  render() {
    return (
      <Card sx={{ minHeight: '10px', minWidth: '400px', m: '10px' }}>
        <Box sx={{ display: 'flex', m: '10px', flexDirection: 'column', alignItems: 'left' }}>
          <TextField
            id="description"
            label={this.getField('description', 'name')}
            value={this.getField('description', 'value')}
            disabled={this.isLoading()}
            fullWidth={false}
            required
            sx={{ ml: '10px', mr: '10px', minWidth: '400px' }}
            onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
            margin="normal"
          />
          {
            this.badgeId === null ?
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
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: '10px' }}>
          <Button
            disabled={!this.isValid() || this.isLoading()}
            onClick={() => {
              this.submit().then((response) => {
                if (get(response, 'success', false)) {
                  this.onClose(true)
                }
              });
            }}
            variant='contained'>
            {this.state.update ? 'Atualizar' : 'Criar'}
          </Button>
          <Button onClick={this.onClose} sx={{ ml: '2px' }} variant='outlined'>Cancelar</Button>
        </Box>
      </Card>
    )
  }
}

export default FormContainer;