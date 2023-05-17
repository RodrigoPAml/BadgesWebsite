import React from 'react';
import DataGrid from '../../components/infra/datagrid';
import { get, isEmpty, toString } from 'lodash'
import { GetPagedBadges } from '../../services/Badges';
import { Card, Typography, Avatar, Box } from '@mui/material';
import { DataGridStore } from '../../components/stores/badges/dataGridStore'
import CourseDataGridStore from '../../components/selector/selectors/courseDataGridStore';
import { GetPagedCourses } from '../../services/Courses';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BadgeIcon from '@mui/icons-material/Badge';
import FormContainer from './form';
import DeleteContainer from './delete';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

class Badges extends React.Component {
  constructor(props) {
    super()

    this.grid = React.createRef();
    this.props = props;
  }

  renderHeader() {
    return (
      <>
        <Box sx={{ display: 'flex', height: '70px' }}>
          <Avatar sx={{ width: '67px', height: '67px', ml: '10px', mt: '10px' }}>
            <BadgeIcon sx={{ width: '35px', height: '35px' }} />
          </Avatar>
          <Typography sx={{ ml: '10px', mt: '10px' }} variant="h4">Badges</Typography>
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
              field: 'code',
              name: 'Código'
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
              disabled: !isEmpty(toString(get(this.props, 'courseId', null))),
              field: 'courseId',
              name: 'Curso',
              fkProps: {
                labelField: (fkRow) => { return get(fkRow, 'name') },
                icon: AutoStoriesIcon,
                store: CourseDataGridStore,
                endpoint: GetPagedCourses,
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
                      field: 'name',
                      name: 'Nome'
                    }
                  ]
                }
              }
            }
          ]}
          ref={this.grid}
          sx={{ ml: '20px', mr: '20px', pb: '25px' }}
          fixedFilters={get(this.props, 'fixedFilters', [])}
          store={DataGridStore}
          endpoint={GetPagedBadges}
          initialFetch={true}
          headerActions={[
            {
              tooltip: 'Criar',
              icon: AddIcon,
              onClick: () => {
                const dialogId = window.openDialog({
                  title: 'Criar Novo Badge',
                  container: FormContainer,
                  containerProps: { update: false, courseId: get(this.props, 'courseId', null) },
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
                  title: 'Editando Badge "' + get(item, 'description') + '"',
                  container: FormContainer,
                  containerProps: { item, update: true, courseId: get(this.props, 'courseId', null) },
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
                  title: 'Deletar Badge "' + get(item, 'description') + '"',
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

export default Badges;