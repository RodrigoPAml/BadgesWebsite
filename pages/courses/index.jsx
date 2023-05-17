import React from 'react';
import DataGrid from '../../components/infra/datagrid';
import { get } from 'lodash'
import { GetPagedCourses } from '../../services/Courses';
import { Card, Typography, Avatar, Box } from '@mui/material';
import DataGridStore from '../../components/stores/courses/dataGridStore'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import FormContainer from './form';
import DeleteContainer from './delete';

class Courses extends React.Component {
  constructor() {
    super()

    this.grid = React.createRef();
  }

  renderHeader() {
    return (
      <>
        <Box sx={{ display: 'flex', height: '70px' }}>
          <Avatar sx={{ width: '60px', height: '60px', ml: '10px', mt: '10px' }}>
            <AutoStoriesIcon sx={{ width: '37px', height: '37px' }}></AutoStoriesIcon>
          </Avatar>
          <Typography sx={{ ml: '10px', mt: '10px' }} variant="h4">Cursos</Typography>
        </Box>
        <Box sx={{ display: 'flex', height: '20px', ml: '85px', mt: '-20px', mb: '15px' }}>
          <Typography sx={{ fontSize: 15, color: 'rgb(150, 150, 150)', }}>Área Administrativa</Typography>
        </Box>
      </>
    )
  }

  render() {
    return (
      <Box sx={{ backgroundColor: 'rgb(247, 247, 247)', height: '100%', pt: '10px' }}>
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
              name: 'Nome'
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
              name: 'Nome'
            }
          ]}
          sx={{ ml: '20px', mr: '20px', pb: '25px' }}
          ref={this.grid}
          store={DataGridStore}
          endpoint={GetPagedCourses}
          initialFetch={true}
          headerActions={[
            {
              tooltip: 'Criar',
              icon: AddIcon,
              onClick: () => {
                const dialogId = window.openDialog({
                  title: 'Criar Novo Curso',
                  sxContent: { minHeight: '200px' },
                  container: FormContainer,
                  containerProps: { update: false },
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
                  title: 'Editando Curso "' + get(item, 'name') + '"',
                  container: FormContainer,
                  containerProps: { item, update: true },
                  sxContent: { minHeight: '200px' },
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
                  title: 'Deletar Curso "' + get(item, 'name') + '"',
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

export default Courses;