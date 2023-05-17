import React from 'react';
import DataGrid from '../infra/datagrid';
import { get } from 'lodash'
import { Card, Typography, Avatar, Box, Button, } from '@mui/material';

class GridSelector extends React.Component {
  constructor(props) {
    super()

    this.state = {
      id: get(props, 'id', ''),
      title: get(props, 'title', ''),
      subtitle: get(props, 'subtitle', ''),
      icon: get(props, 'icon', undefined),
      store: get(props, 'store', []),
      endpoint: get(props, 'endpoint', () => { }),
      onChange: get(props, 'onChange', () => { }),
      value: get(props, 'value', null),
    }

    this.onClose = get(props, 'onClose', () => { })
    this.dataGridProps = get(props, 'dataGridProps')
  }

  renderHeader() {
    return (
      <>
        <Box sx={{ display: 'flex', height: '70px' }}>
          <Avatar sx={{ width: '60px', height: '60px', ml: '10px', mt: '10px' }}>
            {
              this.state.icon !== undefined ? React.createElement(this.state.icon) : <></>
            }
          </Avatar>
          <Typography sx={{ ml: '10px', mt: '10px' }} variant="h4">{this.state.title}</Typography>
        </Box>
        <Box sx={{ display: 'flex', height: '20px', ml: '85px', mt: '-20px', mb: '15px' }}>
          <Typography sx={{ fontSize: 15, color: 'rgb(150, 150, 150)', }}>{this.state.subtitle}</Typography>
        </Box>
      </>
    )
  }

  render() {
    return (
      <Box sx={{ backgroundColor: 'rgb(247, 247, 247)', minWidth: '500px', width: '80vw', pt: '10px' }}>
        <Card sx={{ m: '20px' }}>
          {
            this.renderHeader()
          }
        </Card >
        <DataGrid
          onRowSelectedChanged={(row) => {
            this.setState({ value: row !== null ? row : null })
          }}
          sx={{ ml: '20px', mr: '20px', pb: '25px' }}
          store={this.state.store}
          enableSelection={true}
          endpoint={this.state.endpoint}
          initialFetch={true}
          headerActions={[]}
          rowActions={[]}
          {...this.dataGridProps}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: '10px' }}>
          <Button
            disabled={false}
            onClick={() => {
              this.state.onChange(this.state.value)
              this.onClose()
            }}
            variant='contained'>
            {'Confirmar'}
          </Button>
          <Button onClick={this.onClose} sx={{ ml: '2px' }} variant='outlined'>Cancelar</Button>
        </Box>
      </Box>
    );
  }
}

export default GridSelector;