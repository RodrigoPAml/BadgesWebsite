import React from 'react';
import DataGrid from '../../components/infra/datagrid';
import { get } from 'lodash'
import { GetPagedUsers } from '../../services/Users';
import { Card, Typography, Avatar, Box } from '@mui/material';
import DataGridStore from '../../components/stores/users/dataGridStore'
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteContainer from './delete';
import FormContainer from './form';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';

const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}

class Users extends React.Component {
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
            <AccountCircleIcon sx={{ width: '35px', height: '35px' }} />
          </Avatar>
          <Typography sx={{ ml: '10px', mt: '10px' }} variant="h4">Usuários</Typography>
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
          ]}
          ref={this.grid}
          fixedFilters={get(this.props, 'fixedFilters', [])}
          store={DataGridStore}
          endpoint={GetPagedUsers}
          initialFetch={true}
          sx={{ ml: '20px', mr: '20px', pb: '25px' }}
          headerActions={[]}
          rowActions={[
            {
              tooltip: 'Ver perfil',
              icon: RemoveRedEyeIcon,
              onClick: (item) => {
                openInNewTab('/perfil?key=' + get(item, 'url'))
              }
            },
            {
              tooltip: 'Editar',
              icon: EditIcon,
              onClick: (item) => {
                const dialogId = window.openDialog({
                  title: 'Visualizando Usuário "' + get(item, 'login') + '"',
                  container: FormContainer,
                  containerProps: { item, update: true },
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
                  title: 'Deletar Usuário "' + get(item, 'login') + '"',
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

export default Users;