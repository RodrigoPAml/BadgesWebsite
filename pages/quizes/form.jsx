import React from 'react';
import { Card, TextField, Button, Box, Stepper, Step, StepButton } from '@mui/material';
import Store from '../../components/stores/quizes/formStore'
import FormStore from '../../components/infra/formStore'
import Selector from '../../components/selector'
import { GetPagedBadges } from '../../services/Badges';
import { get, toString, toNumber } from 'lodash'
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { UpdateQuiz, CreateQuiz } from '../../services/Quizes'
import Questions from '../questions'
import BadgeDataGridStore from '../../components/selector/selectors/badgeDataGridStore';

class FormContainer extends FormStore {
  constructor(props) {
    super({
      ...props,
      endpoint: props.update ? UpdateQuiz : CreateQuiz,
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
        <TextField
          id="aswerNumber"
          label={this.getField('aswerNumber', 'name')}
          value={this.getField('aswerNumber', 'value')}
          disabled={this.isLoading()}
          fullWidth={false}
          required
          type={'number'}
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
              onLabel={(fkRow) => { return get(fkRow, 'code', '') + ' - ' + get(fkRow, 'description', '') }}
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
                    field: 'code',
                    name: 'Código'
                  },
                  {
                    operation: '=',
                    type: 'string',
                    field: 'description',
                    name: 'Descrição'
                  }
                ]
              }}
            />
            : <></>
        }
      </Box>
    </Card>)
  }

  renderQuestions() {
    return (
      <Questions
        quizId={this.getField('id', 'value')}
        fixedFilters={[
          {
            operation: "=",
            type: "ulong",
            value: toString(this.getField('id', 'value')),
            field: "quizId"
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
            <StepButton disabled={this.state.activeStep !== 0} color="inherit" onClick={() => { this.setState({ activeStep: 0 }) }}>Cadastro</StepButton>
          </Step>
          <Step>
            <StepButton disabled={!this.state.update} color="inherit" onClick={() => { this.setState({ activeStep: 1 }) }}>Questões</StepButton>
          </Step>
        </Stepper>
        {
          this.state.activeStep === 0 ? this.renderForm() : <></>
        }
        {
          this.state.activeStep === 1 ? this.renderQuestions() : <></>
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