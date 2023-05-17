import React from 'react';
import { Card, TextField, Button, Box, Stepper, Step, StepButton } from '@mui/material';
import { Store } from '../../components/stores/badges/formStore'
import FormStore from '../../components/infra/formStore'
import Selector from '../../components/selector'
import Competences from '../competences'
import Quizes from '../quizes'
import UserBadges from '../user-badges'
import CourseDataGridStore from '../../components/selector/selectors/courseDataGridStore'
import { GetPagedCourses } from '../../services/Courses';
import { get, toString, toNumber, isEmpty } from 'lodash'
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { UpdateBadge, CreateBadge, GetImage } from '../../services/Badges'
import ImageUpload from '../../components/imageUpload'

class FormContainer extends FormStore {
  constructor(props) {
    super({
      ...props,
      endpoint: props.update ? UpdateBadge : CreateBadge,
      store: Store,
    })

    this.state = {
      ...this.state,
      activeStep: 0,
    }

    this.courseId = get(props, 'courseId', null)
    this.onClose = get(props, 'onClose', () => { })
  }

  componentDidMount() {
    if (this.courseId !== null) {
      this.setValue('courseId', this.courseId)
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
            id="learningDescription"
            label={this.getField('learningDescription', 'name')}
            value={this.getField('learningDescription', 'value')}
            disabled={this.isLoading()}
            fullWidth={false}
            multiline
            required={false}
            sx={{ ml: '10px', mr: '10px', minWidth: '400px' }}
            onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
            margin="normal"
          />
          {
            this.courseId === null ?
              <Selector
                id="courseId"
                property="id"
                initialLabel={get(this.state, 'item.course.name', null)}
                onLabel={(fkRow) => { return get(fkRow, 'name', '-') }}
                icon={AutoStoriesIcon}
                label={this.getField('courseId', 'name')}
                value={this.getField('courseId', 'value')}
                required
                store={CourseDataGridStore}
                endpoint={GetPagedCourses}
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
                      field: 'name',
                      name: 'Nome'
                    }
                  ]
                }}
              />
              : <></>
          }
          <ImageUpload
            id="image"
            label={this.getField('image', 'name')}
            centerMessage="Nenhuma imagem selecionada (JPG, PNG, JPEG)"
            subMessage="Tamanho máximo: 3 MB"
            extensions={'.jpg,.png,.jpeg'}
            onChange={(id, value, hasChanged = true) => { this.setValue(id, value, hasChanged); }}
            item={this.state.item}
            endpoint={GetImage}
            required={true}
            disabled={this.isLoading()}
            sx={{ ml: '10px', minWidth: '383px', width: '500px' }}
          />
        </Box>
      </Card>
    )
  }

  renderCompetences() {
    return (
      <Competences
        badgeId={this.getField('id', 'value')}
        fixedFilters={[
          {
            operation: "=",
            type: "ulong?",
            value: toString(this.getField('id', 'value')),
            field: "badgeId"
          }
        ]}
      />
    )
  }

  renderQuizes() {
    return (
      <Quizes
        badgeId={this.getField('id', 'value')}
        fixedFilters={[
          {
            operation: "=",
            type: "ulong?",
            value: toString(this.getField('id', 'value')),
            field: "badgeId"
          }
        ]}
      />
    )
  }

  renderUserBadges() {
    return (
      <UserBadges
        badgeId={this.getField('id', 'value')}
        fixedFilters={[
          {
            operation: "=",
            type: "ulong?",
            value: toString(this.getField('id', 'value')),
            field: "badgeId"
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
            <StepButton disabled={isEmpty(toString(this.getField('id', 'value')))} color="inherit" onClick={() => { this.setState({ activeStep: 1 }) }}>Competências do Badge</StepButton>
          </Step>
          <Step>
            <StepButton disabled={isEmpty(toString(this.getField('id', 'value')))} color="inherit" onClick={() => { this.setState({ activeStep: 2 }) }}>Quizes do Badge</StepButton>
          </Step>
          <Step>
            <StepButton disabled={isEmpty(toString(this.getField('id', 'value')))} color="inherit" onClick={() => { this.setState({ activeStep: 3 }) }}>Usuários do Badge</StepButton>
          </Step>
        </Stepper>
        {
          this.state.activeStep === 0 ? this.renderForm() : <></>
        }
        {
          this.state.activeStep === 1 ? this.renderCompetences() : <></>
        }
        {
          this.state.activeStep === 2 ? this.renderQuizes() : <></>
        }
        {
          this.state.activeStep === 3 ? this.renderUserBadges() : <></>
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
          <Button onClick={() => { this.onClose(true) }} sx={{ ml: '2px' }} variant='outlined'>{this.state.activeStep === 0 ? 'Cancelar' : 'Concluir'}</Button>
        </Box>
      </Box>
    )
  }
}

export default FormContainer;