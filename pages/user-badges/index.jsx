import React from 'react';
import DataGrid from '../../components/infra/datagrid';
import { get, toString, isEmpty } from 'lodash'
import BadgeIcon from '@mui/icons-material/Badge';
import BadgeDataGridStore from '../../components/selector/selectors/badgeDataGridStore';
import UserDataGridStore from '../../components/selector/selectors/userDataGridStore';
import { GetPagedUserBadges } from '../../services/UserBadge';
import { GetPagedBadges } from '../../services/Badges';
import { GetPagedUsers } from '../../services/Users';
import { Card, Typography, Avatar, Box } from '@mui/material';
import DataGridStore from '../../components/stores/user-badges/dataGridStore'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import FormContainer from './form';
import DeleteContainer from './delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}

class UserBadges extends React.Component {
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
            <MilitaryTechIcon sx={{ width: '55px', height: '55px' }} />
          </Avatar>
          <Typography sx={{ ml: '10px', mt: '10px' }} variant="h4">Badges dos Usuários</Typography>
        </Box>
        <Box sx={{ display: 'flex', height: '20px', ml: '89px', mt: '-20px', mb: '15px' }}>
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
              field: 'code',
              name: 'Código'
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
              type: 'ulong',
              disabled: !isEmpty(toString(get(this.props, 'badgeId', null))),
              field: 'badgeId',
              name: 'Badge',
              fkProps: {
                labelField: (fkRow) => { return get(fkRow, 'code') + ' - ' + get(fkRow, 'description') },
                icon: BadgeIcon,
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
                }
              }
            },
            {
              operation: '=',
              type: 'ulong',
              disabled: !isEmpty(toString(get(this.props, 'userId', null))),
              field: 'userId',
              name: 'Usuário',
              fkProps: {
                labelField: (fkRow) => { return get(fkRow, 'name') + ' - ' + get(fkRow, 'login') },
                icon: RemoveRedEyeIcon,
                store: UserDataGridStore,
                endpoint: GetPagedUsers,
                dataGridProps: {
                  searchFilter: {
                    operation: 'in',
                    type: 'string',
                    field: 'name',
                    name: 'Nome'
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
                  ]
                }
              }
            }
          ]}
          ref={this.grid}
          sx={{ ml: '20px', mr: '20px', pb: '25px' }}
          fixedFilters={get(this.props, 'fixedFilters', [])}
          store={DataGridStore}
          endpoint={GetPagedUserBadges}
          initialFetch={true}
          headerActions={[
            {
              tooltip: 'Criar',
              icon: AddIcon,
              onClick: () => {
                const dialogId = window.openDialog({
                  title: 'Criar Novo Badge do Usuário',
                  container: FormContainer,
                  containerProps: {
                    update: false,
                    badgeId: get(this.props, 'badgeId', null),
                    userId: get(this.props, 'userId', null)
                  },
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
              tooltip: 'Ver certificado',
              icon: RemoveRedEyeIcon,
              onClick: (item) => {
                if (get(item, 'isExternal', false) === true) {
                  openInNewTab(get(item, 'url'))
                } else {
                  openInNewTab('/certificado?code=' + get(item, 'code'))
                }
              }
            },
            {
              tooltip: 'Editar',
              icon: EditIcon,
              onClick: (item) => {
                const dialogId = window.openDialog({
                  title: 'Editando Badge do Usuário "' + get(item, 'code') + '"',
                  container: FormContainer,
                  containerProps: {
                    item,
                    update: true,
                    badgeId: get(this.props, 'badgeId', null),
                    userId: get(this.props, 'userId', null)
                  },
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
                  title: 'Deletar Badge do Usuário "' + get(item, 'code') + '"',
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

export default UserBadges;