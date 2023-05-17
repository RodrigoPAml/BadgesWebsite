import React from 'react';
import { Card, TextField, Button, Box, Stepper, Step, StepButton } from '@mui/material';
import Store from '../../components/stores/courses/formStore'
import FormStore from '../../components/infra/formStore'
import { get, toString, toNumber, isEmpty } from 'lodash'
import { UpdateCourse, CreateCourse } from '../../services/Courses'
import Badges from '../badges'

class FormContainer extends FormStore {
  constructor(props) {
    super({
      ...props,
      endpoint: props.update ? UpdateCourse : CreateCourse,
      store: Store,
    })

    this.onClose = get(props, 'onClose', () => { })

    this.state = {
      ...this.state,
      activeStep: 0,
    }
  }

  componentWillUnmount() {
    this.resetStore()
  }

  renderForm() {
    return (
      <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
        <TextField
          id="name"
          label={this.getField('name', 'name')}
          required
          value={this.getField('name', 'value')}
          disabled={this.isLoading()}
          fullWidth={false}
          sx={{ ml: '10px', mr: '10px', minWidth: '400px' }}
          onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
          autoFocus
          margin="normal"
        />
        <TextField
          id="link"
          label={this.getField('link', 'name')}
          required={false}
          value={this.getField('link', 'value')}
          disabled={this.isLoading()}
          fullWidth={false}
          sx={{ ml: '10px', mr: '10px', minWidth: '400px' }}
          onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
          autoFocus
          margin="normal"
        />
        <TextField
          id="udemyLink"
          label={this.getField('udemyLink', 'name')}
          required={false}
          value={this.getField('udemyLink', 'value')}
          disabled={this.isLoading()}
          fullWidth={false}
          sx={{ ml: '10px', mr: '10px', minWidth: '400px' }}
          onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
          autoFocus
          margin="normal"
        />
      </Card>
    )
  }

  renderBadges() {
    return (
      <Badges
        courseId={this.getField('id', 'value')}
        fixedFilters={[
          {
            operation: "=",
            type: "ulong",
            value: toString(this.getField('id', 'value')),
            field: "courseId"
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
            <StepButton disabled={isEmpty(toString(this.getField('id', 'value')))} color="inherit" onClick={() => { this.setState({ activeStep: 1 }) }}>Badges do Curso</StepButton>
          </Step>
        </Stepper>
        {
          this.state.activeStep === 0 ? this.renderForm() : <></>
        }
        {
          this.state.activeStep === 1 ? this.renderBadges() : <></>
        }
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: '10px' }}>
          <Button
            disabled={!this.isValid() || this.isLoading() || this.state.activeStep !== 0}
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
          <Button onClick={() => { this.onClose(true) }} sx={{ ml: '2px' }} variant='outlined'>{this.state.activeStep !== 2 ? 'Sair' : 'Concluir'}</Button>
        </Box>
      </Box >
    )
  }
}

export default FormContainer;