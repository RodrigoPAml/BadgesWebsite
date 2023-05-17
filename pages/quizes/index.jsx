import React from 'react';
import DataGrid from '../../components/infra/datagrid';
import { get, isEmpty, toString } from 'lodash'
import { GetPagedQuizes } from '../../services/Quizes';
import { GetPagedBadges } from '../../services/Badges';
import { Card, Typography, Avatar, Box } from '@mui/material';
import DataGridStore from '../../components/stores/quizes/dataGridStore'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import QuizIcon from '@mui/icons-material/Quiz';
import FormContainer from './form';
import DeleteContainer from './delete';
import BadgeDataGridStore from '../../components/selector/selectors/badgeDataGridStore';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

class Quizes extends React.Component {
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
            <QuizIcon sx={{ width: '35px', height: '35px' }} />
          </Avatar>
          <Typography sx={{ ml: '10px', mt: '10px' }} variant="h4">Quizes</Typography>
        </Box>
        <Box sx={{ display: 'flex', height: '20px', ml: '85px', mt: '-20px', mb: '15px' }}>
          <Typography sx={{ fontSize: 15, color: 'rgb(150, 150, 150)', }}>Área Administrativa</Typography>
        </Box>
      </>
    )
  }

  render() {
    return (
      <Box sx={{ backgroundColor: 'rgb(247, 247, 247)', minWidth: '60vw', minHeight: '60vh', pt: '10px' }}>
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
              field: 'description',
              name: 'Descrição'
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
              field: 'description',
              name: 'Descrição'
            },
            {
              operation: '=',
              type: 'ulong',
              disabled: !isEmpty(toString(get(this.props, 'badgeId', null))),
              field: 'badgeId',
              name: 'Badge',
              fkProps: {
                labelField: (fkRow) => { return get(fkRow, 'code') + ' - ' + get(fkRow, 'description') },
                icon: AutoStoriesIcon,
                store: BadgeDataGridStore,
                endpoint: GetPagedBadges,
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
                }
              }
            }
          ]}
          ref={this.grid}
          fixedFilters={get(this.props, 'fixedFilters', [])}
          store={DataGridStore}
          endpoint={GetPagedQuizes}
          initialFetch={true}
          sx={{ ml: '20px', mr: '20px', pb: '25px' }}
          headerActions={[
            {
              tooltip: 'Criar',
              icon: AddIcon,
              onClick: () => {
                const dialogId = window.openDialog({
                  title: 'Criar Novo Quiz',
                  container: FormContainer,
                  containerProps: { update: false, badgeId: get(this.props, 'badgeId', null) },
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
                  title: 'Editando Quiz "' + get(item, 'description') + '"',
                  container: FormContainer,
                  containerProps: { item, update: true, badgeId: get(this.props, 'badgeId', null) },
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
                  title: 'Deletar Quiz "' + get(item, 'description') + '"',
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

export default Quizes;