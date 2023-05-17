import React from 'react';
import DataGrid from '../../components/infra/datagrid';
import { get, isEmpty, toString } from 'lodash'
import { GetPagedQuestions } from '../../services/Questions';
import { GetPagedQuizes } from '../../services/Quizes';
import { Card, Typography, Avatar, Box } from '@mui/material';
import DataGridStore from '../../components/stores/questions/dataGridStore'
import QuizesDataGridStore from '../../components/selector/selectors/quizesDataGridStore';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import FormContainer from './form';
import DeleteContainer from './delete';
import QuizIcon from '@mui/icons-material/Quiz';

class Questions extends React.Component {
  constructor(props) {
    super()

    this.grid = React.createRef();
    this.props = props;
  }

  renderHeader() {
    return (
      <>
        <Box sx={{ display: 'flex', height: '70px' }}>
          <Avatar sx={{ width: '60px', height: '60px', ml: '10px', mt: '10px' }}>
            <QuestionAnswerIcon sx={{ width: '35px', height: '35px' }} />
          </Avatar>
          <Typography sx={{ ml: '10px', mt: '10px' }} variant="h4">Questões</Typography>
        </Box>
        <Box sx={{ display: 'flex', height: '20px', ml: '85px', mt: '-20px', mb: '15px' }}>
          <Typography sx={{ fontSize: 15, color: 'rgb(150, 150, 150)', }}>Área Administrativa</Typography>
        </Box>
      </>
    )
  }

  render() {
    return (
      <Box sx={{ backgroundColor: 'rgb(247, 247, 247)', pt: '10px', minWidth: '60vw', minHeight: '60vh' }}>
        <Card sx={{ m: '20px', boxShadow: 2 }}>
          {
            this.renderHeader()
          }
        </Card >
        <DataGrid
          searchFilter={
            {
              operation: 'in',
              type: 'string',
              field: 'name',
              name: 'Pergunta'
            }}
          advancedFilters={[
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
              name: 'Pergunta'
            },
            {
              operation: '=',
              type: 'ulong',
              disabled: !isEmpty(toString(get(this.props, 'quizId', null))),
              field: 'quizId',
              name: 'Quiz',
              fkProps: {
                labelField: (fkRow) => { return get(fkRow, 'description') },
                icon: QuizIcon,
                store: QuizesDataGridStore,
                endpoint: GetPagedQuizes,
                dataGridProps: {
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
                }
              }
            }
          ]}
          ref={this.grid}
          fixedFilters={get(this.props, 'fixedFilters', [])}
          store={DataGridStore}
          endpoint={GetPagedQuestions}
          initialFetch={true}
          sx={{ ml: '20px', mr: '20px', pb: '25px' }}
          headerActions={[
            {
              tooltip: 'Criar',
              icon: AddIcon,
              onClick: () => {
                const dialogId = window.openDialog({
                  title: 'Criar Novas Questões',
                  container: FormContainer,
                  containerProps: { update: false, quizId: get(this.props, 'quizId', null) },
                  onClose: (reload = false) => {
                    window.closeDialog(dialogId)

                    if (reload === true) {
                      this.grid.current.fetch()
                    }
                  }
                })
              }
            }
          ]}
          rowActions={[
            {
              tooltip: 'Editar',
              icon: EditIcon,
              onClick: (item) => {
                const dialogId = window.openDialog({
                  title: 'Editando Questões "' + get(item, 'name') + '"',
                  container: FormContainer,
                  containerProps: { item, update: true, quizId: get(this.props, 'quizId', null) },
                  onClose: (reload = false) => {
                    window.closeDialog(dialogId)

                    if (reload === true) {
                      this.grid.current.fetch()
                    }
                  }
                })
              }
            },
            {
              tooltip: 'Deletar',
              icon: DeleteIcon,
              onClick: (item) => {
                const dialogId = window.openDialog({
                  title: 'Deletar Questões "' + get(item, 'name') + '"',
                  container: DeleteContainer,
                  containerProps: { item },
                  onClose: (reload = false) => {
                    window.closeDialog(dialogId)

                    if (reload === true) {
                      this.grid.current.fetch()
                    }
                  }
                })
              }
            }
          ]}
        />
      </Box>
    );
  }
}

export default Questions;