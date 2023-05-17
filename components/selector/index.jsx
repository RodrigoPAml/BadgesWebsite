import React from 'react';
import { get, isEmpty, toString } from 'lodash'
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import GridSelector from './gridSelector'

class Selector extends React.Component {
  constructor(props) {
    super()

    this.state = {
      id: get(props, 'id', ''),
      name: get(props, 'label', ''),
      icon: get(props, 'icon', undefined),
      store: get(props, 'store', []),
      endpoint: get(props, 'endpoint', () => { }),
      onChange: get(props, 'onChange', () => { }),
      onLabel: get(props, 'onLabel', () => { }),
      value: get(props, 'value', null),
      property: get(props, 'property', ''),
      label: get(props, 'initialLabel', null),
      dataGridProps: get(props, 'dataGridProps', {})
    }

    this.props = props;
  }

  render() {
    if (!isEmpty(toString(get(this.state.value, this.state.property))) && get(this.state.value, this.state.property) !== this.props.value) {
      this.state.value[this.state.property] = this.props.value;
      this.setState({ value: this.state.value, label: isEmpty(toString(this.props.value)) ? '-' : this.state.onLabel(this.state.value) })
    }

    return (
      <TextField {...this.props}
        value={this.state.label !== null ? this.state.label : '-'}
        InputProps={{
          endAdornment: (
            <>
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  color="primary"
                  disabled={get(this.props, 'disabled', false)}
                  onClick={() => {
                    const dialogId = window.openDialog({
                      title: `Selecionar um ${this.state.name}`,
                      container: GridSelector,
                      sx: { minWidth: '80%', minHeight: '80%' },
                      containerProps: {
                        dataGridProps: this.state.dataGridProps,
                        title: `Lista de ${this.state.name}s`,
                        subtitle: 'Ambiente de seleção',
                        icon: this.state.icon,
                        store: this.state.store,
                        onChange: (value) => {
                          this.setState({ value, label: this.state.onLabel(value) })
                          this.state.onChange(this.state.id, get(value, this.state.property))
                        },
                        value: this.state.value,
                        id: this.state.id,
                        endpoint: this.state.endpoint,
                      },
                      onClose: () => {
                        window.closeDialog(dialogId)
                      }
                    })
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  color="primary"
                  disabled={get(this.props, 'disabled', false)}
                  onClick={() => {
                    this.setState({ value: null, label: '-' })
                    this.state.onChange(this.state.id, null)
                  }}
                >
                  <CleaningServicesIcon />
                </IconButton>
              </InputAdornment>
            </>
          )
        }}
      >
      </TextField >
    );
  }
}

export default Selector;