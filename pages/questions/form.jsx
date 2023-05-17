import React from 'react';
import { Card, TextField, Button, Box, MenuItem } from '@mui/material';
import Store from '../../components/stores/questions/formStore'
import FormStore from '../../components/infra/formStore'
import Selector from '../../components/selector'
import { GetPagedQuizes } from '../../services/Quizes';
import { get, toNumber } from 'lodash'
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { UpdateQuestion, CreateQuestion } from '../../services/Questions'
import QuizesDataGridStore from '../../components/selector/selectors/quizesDataGridStore';

class FormContainer extends FormStore {
  constructor(props) {
    super({
      ...props,
      endpoint: props.update ? UpdateQuestion : CreateQuestion,
      store: Store,
    })

    this.quizId = get(props, 'quizId', null)
    this.onClose = get(props, 'onClose', () => { })
  }

  componentDidMount() {
    if (this.quizId !== null) {
      this.setValue('quizId', this.quizId)
    }
  }

  componentWillUnmount() {
    this.resetStore()
  }

  render() {
    return (
      <Card sx={{ minHeight: '10px', minWidth: '600px', m: '10px' }}>
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
            id="question1"
            label={this.getField('question1', 'name')}
            value={this.getField('question1', 'value')}
            disabled={this.isLoading()}
            fullWidth={false}
            multiline
            required
            sx={{ ml: '10px', mr: '10px', minWidth: '400px' }}
            onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
            margin="normal"
          />
          <TextField
            id="question2"
            label={this.getField('question2', 'name')}
            value={this.getField('question2', 'value')}
            disabled={this.isLoading()}
            fullWidth={false}
            multiline
            required
            sx={{ ml: '10px', mr: '10px', minWidth: '400px' }}
            onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
            margin="normal"
          />
          <TextField
            id="question3"
            label={this.getField('question3', 'name')}
            value={this.getField('question3', 'value')}
            disabled={this.isLoading()}
            fullWidth={false}
            multiline
            required
            sx={{ ml: '10px', mr: '10px', minWidth: '400px' }}
            onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
            margin="normal"
          />
          <TextField
            id="question4"
            label={this.getField('question4', 'name')}
            value={this.getField('question4', 'value')}
            disabled={this.isLoading()}
            fullWidth={false}
            multiline
            required
            sx={{ ml: '10px', mr: '10px', minWidth: '400px' }}
            onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
            margin="normal"
          />
          <TextField
            id="question5"
            label={this.getField('question5', 'name')}
            value={this.getField('question5', 'value')}
            disabled={this.isLoading()}
            fullWidth={false}
            multiline
            required={false}
            sx={{ ml: '10px', mr: '10px', minWidth: '400px' }}
            onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
            margin="normal"
          />
          {
            this.quizId === null ?
              <Selector
                id="quizId"
                property="id"
                initialLabel={get(this.state, 'item.quiz.description', '')}
                onLabel={(fkRow) => { return get(fkRow, 'description', '-') }}
                icon={AutoStoriesIcon}
                label={this.getField('quizId', 'name')}
                value={this.getField('quizId', 'value')}
                required
                store={QuizesDataGridStore}
                endpoint={GetPagedQuizes}
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
                    }
                  ]
                }}
              />
              : <></>
          }
          <TextField
            select
            name="correct"
            label={this.getField('correct', 'name')}
            value={this.getField('correct', 'value')}
            sx={{ ml: '10px', mr: '10px', mt: '10px', minWidth: '400px' }}
            onChange={(e) => { this.setValue(e.target.name, toNumber(e.target.value)) }}
          >
            <MenuItem key={0} value="">
              Nenhum
            </MenuItem>
            <MenuItem key={1} value="1">
              1°
            </MenuItem>
            <MenuItem key={2} value="2">
              2°
            </MenuItem>
            <MenuItem key={3} value="3">
              3°
            </MenuItem>
            <MenuItem key={4} value="4">
              4°
            </MenuItem>
            <MenuItem key={5} value="5">
              5°
            </MenuItem>
          </TextField>
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