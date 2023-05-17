import React from 'react';
import DataGrid from '../../components/infra/datagrid';
import { get } from 'lodash'
import { GetPagedMyUserBadges } from '../../services/UserBadge';
import { Card, Typography, Avatar, Box } from '@mui/material';
import DataGridStore from '../../components/stores/meus-badges/dataGridStore'
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShareIcon from '@mui/icons-material/Share';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteContainer from './delete'
import HelpContainer from './help'
import FormContainer from './form'
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}

class MyBadges extends React.Component {
  constructor(props) {
    super()

    this.state = {
      ...this.state,
      url: null,
    }

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
          <Typography fontSize={{ lg: 30, md: 30, sm: 30, xs: 25 }} sx={{ ml: '10px', mt: '10px' }} variant="h4">Meus Badges</Typography>
        </Box>
        <Box sx={{ display: 'flex', height: '20px', ml: '89px', mt: { lg: '-20px', md: '-20px', sm: '-20px', xs: '-25px' }, mb: '15px' }}>
          <Typography sx={{ fontSize: 14, color: 'rgb(150, 150, 150)', }}>Área do Usuário</Typography>
        </Box>
      </>
    )
  }

  render() {
    return (
      <Box sx={{ backgroundColor: 'rgb(247, 247, 247)', minWidth: '60vw', minHeight: '60vh', pt: '10px', pb: '10px' }}>
        <Card sx={{ ml: '20px', mr: '20px', mt: '10px', mb: '15px', boxShadow: 2 }}>
          {
            this.renderHeader()
          }
        </Card >
        <DataGrid
          searchFilter={
            {
              operation: 'in',
              type: 'string',
              field: 'badgeDescription',
              name: 'Descrição do Badge',
              param: true,
            }}
          ref={this.grid}
          sx={{ minHeight: '400px', ml: '20px', mr: '20px', pb: '15px' }}
          fixedFilters={get(this.props, 'fixedFilters', [])}
          store={DataGridStore}
          endpoint={GetPagedMyUserBadges}
          initialFetch={true}
          headerActions={[
            {
              tooltip: 'Adicionar Badge de Terceiros',
              icon: AddIcon,
              onClick: () => {
                const dialogId = window.openDialog({
                  title: 'Adicionar Badge de Terceiros',
                  container: FormContainer,
                  onClose: () => {
                    window.closeDialog(dialogId)
                    this.grid.current.fetch()
                  }
                })
              }
            },
            {
              tooltip: 'Ajuda',
              icon: ContactSupportIcon,
              onClick: () => {
                const dialogId = window.openDialog({
                  title: 'Ajuda',
                  container: HelpContainer,
                  onClose: () => {
                    window.closeDialog(dialogId)
                    this.grid.current.fetch()
                  }
                })
              }
            },
          ]}
          rowActions={[
            {
              tooltip: 'Ver meu badge',
              icon: VisibilityIcon,
              onClick: (item) => {
                if (get(item, 'isExternal', false) === true) {
                  openInNewTab(get(item, 'url'))
                } else {
                  openInNewTab('/certificado?code=' + get(item, 'code'))
                }
              }
            },
            {
              tooltip: 'Copiar Link de Compartilhamento',
              icon: ShareIcon,
              onClick: (item) => {
                let url = ''

                if (get(item, 'isExternal', false) === true) {
                  url = get(item, 'url', '')
                } else {
                  url = 'localhost/certificado?code=' + get(item, 'code')
                }

                navigator.clipboard.writeText(url);
                window.snackbar.warn("Link de compartilhamento copiado")
              }
            },
            {
              tooltip: 'Excluir',
              icon: DeleteIcon,
              onClick: (item) => {
                const dialogId = window.openDialog({
                  title: 'Deletar Badge',
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

export default MyBadges;