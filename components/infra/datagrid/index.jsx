import { Box, Card, TablePagination, IconButton, Tooltip, Typography, TextField, Grid } from '@mui/material';
import { ptBR } from '@mui/x-data-grid';
import StyledDataGrid from './styles';
import DataGridStore from '../dataGridStore';
import React from 'react';
import { get, size, isFunction, isNumber, isEmpty, toString, omit } from 'lodash';
import RefreshIcon from '@mui/icons-material/Refresh';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AdvancedFilter from '../advancedFilter'
import CircularProgress from '@mui/material/CircularProgress';

class DataGrid extends DataGridStore {
  constructor(props) {
    super({
      endpoint: get(props, 'endpoint', null),
      pageSize: get(props, 'pageSize', 10),
      page: get(props, 'page', 1),
      shouldFetch: false,
      selecteds: [],
      filters: get(props, 'fixedFilters', []),
      initialAdvancedFilters: get(props, 'advancedFilters', null),
      advancedFilters: get(props, 'advancedFilters', null),
      searchFilter: get(props, 'searchFilter', null),
      isMounted: false,
      ...props
    })

    this.initialFetch = get(props, 'initialFetch', false);
    this.headerActions = get(props, 'headerActions', [])
    this.store = get(props, 'store', []);
    this.enableSelection = get(props, 'enableSelection', false)
    this.onRowSelectedChanged = get(props, 'onRowSelectedChanged', () => { })
    this.searchCounter = 0;

    this.bindColumnsAndRowsActions(props);
  }

  mountFilters() {
    let fixedFilters = get(this.props, 'fixedFilter', [])
    let advancedFilters = get(this.state, 'advancedFilters', [])

    if (fixedFilters === null) {
      fixedFilters = []
    }

    if (advancedFilters === null || !(advancedFilters instanceof Array)) {
      advancedFilters = []
    } else {
      advancedFilters = advancedFilters.filter(function (i) { return !isEmpty(toString(get(i, 'value', ''))) })
    }

    let filters = []

    if (size(fixedFilters) > 0) {
      filters = [
        ...filters,
        ...fixedFilters
      ]
    }

    if (size(advancedFilters) > 0) {
      filters = [
        ...filters,
        ...advancedFilters
      ]
    }

    if (this.state.searchFilter !== null) {
      const isParam = get(this.state.searchFilter, 'param', false)

      if (isParam === true) {
        this.state.params = {
          [this.state.searchFilter.field]: this.state.searchFilter.value
        }
      } else if (!isEmpty(toString(get(this.state.searchFilter, 'value', '')))) {
        filters = [
          ...filters,
          omit(this.state.searchFilter, ['name'])
        ]
      }
    }

    this.state.filters = filters;
  }

  bindColumnsAndRowsActions(props) {
    const store = get(props, 'store', []);
    const actions = get(props, 'rowActions', []);

    const mountedStore = []

    store.forEach((item) => {
      const obj = {};

      obj['headerName'] = get(item, 'name', '')
      obj['field'] = get(item, 'id', '')
      obj['sortable'] = get(item, 'sortable', false)
      obj['align'] = get(item, 'align', 'left')
      obj['headerAlign'] = get(item, 'headerAlign', 'left')

      const width = get(item, 'width', 0);
      const minWidth = get(item, 'minWidth', 0);

      if (isNumber(width) && width !== 0) {
        obj['width'] = width
      } else if (isNumber(minWidth) && minWidth !== 0) {
        obj['minWidth'] = minWidth
        obj['flex'] = 1
      }
      else {
        obj['flex'] = 1
      }

      const render = get(item, 'render', null);
      if (isFunction(render) && render !== null) {
        obj['renderCell'] = (params) => {
          const row = get(params, 'row')
          return render({
            value: get(row, get(obj, 'field', ''), ''),
            item: row
          })
        }
      }

      mountedStore.push(obj)
    })

    const mountedRowActions = {
      field: 'actions',
      headerName: 'Ações',
      sortable: false,
      headerAlign: 'center',
      width: size(actions) * 50 > 70 ? size(actions) * 50 : 70,
      renderCell: (params) => {
        const row = get(params, 'row')
        return <Box sx={{ display: 'flex' }}>
          {
            actions.map(function (item, index) {
              return <Tooltip key={index} title={get(item, 'tooltip', '')}>
                <IconButton onClick={() => { get(item, 'onClick')(row) }}>
                  {
                    React.createElement(get(item, 'icon'))
                  }
                </IconButton>
              </Tooltip >
            })
          }
        </Box>
      }
    }

    this.state.store = [
      ...mountedStore,
    ]

    if (size(actions) > 0) {
      this.state.store = [
        ...this.state.store,
        mountedRowActions
      ]
    }
  }

  componentDidMount() {
    this.setState({ isMounted: true })
    if (this.initialFetch) {
      this.fetch()
    }
  }

  render() {
    if (this.state.isMounted === false || this.state.isMounted === undefined) {
      return <Box sx={{ height: '600px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CircularProgress sx={{ height: '100%', width: '100%', mt: '270px' }} />
      </Box>
    }

    if (this.state.shouldFetch) {
      this.fetch()
      this.state.shouldFetch = false
    }

    return (
      <Box sx={{ ...get(this.props, 'sx', undefined), display: 'flex', flexDirection: 'column' }}>
        <Card sx={{ boxShadow: 3 }} >
          <Box sx={{ width: '100%', mt: '10px', mb: '10px' }}>
            <Grid container wrap='nowrap'>
              <Grid item xs={7} sx={{ display: 'flex', alignItems: 'center' }}>
                {
                  this.headerActions.map(function (item, index) {
                    return <Tooltip key={index} title={get(item, 'tooltip', '')}>
                      <IconButton sx={{ ml: '10px' }} onClick={() => { get(item, 'onClick')() }}>
                        {
                          React.createElement(get(item, 'icon'))
                        }
                      </IconButton>
                    </Tooltip >
                  })
                }
              </Grid>
              <Grid item xs={5} sx={{ minWidth: '220px', maxWidth: '400px' }}>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'right', alignItems: 'right', mr: '10px' }}>
                  {
                    this.state.searchFilter !== null ?
                      <TextField
                        fullWidth
                        sx={{ ml: '10px', mr: '10px', maxWidth: '400px', height: '50px' }}
                        placeholder={'Pesquisa rápida por "' + get(this.state.searchFilter, 'name', '-') + '"'}
                        onChange={(e) => {
                          this.state.searchFilter.value = get(e.target, 'value', '')

                          this.mountFilters()

                          this.searchCounter = this.searchCounter + 1
                          let id = this.searchCounter;

                          setTimeout(() => {
                            if (id == this.searchCounter) {
                              this.fetch();
                              this.searchCounter = 0;
                            }
                          }, 500)
                        }} /> :
                      <></>
                  }
                  {
                    this.state.advancedFilters !== null ?
                      <Tooltip title={'Filtros'}>
                        <IconButton sx={{ m: 0 }} onClick={() => {
                          const dialogId = window.openDialog({
                            title: 'Filtro Avançado',
                            sxContent: { minHeight: '100px' },
                            container: AdvancedFilter,
                            containerProps: {
                              filters: this.state.initialAdvancedFilters,
                            },
                            onClose: (reload = false, newFilters) => {
                              this.state.advancedFilters = newFilters;
                              this.mountFilters()

                              window.closeDialog(dialogId)

                              if (reload === true) {
                                this.fetch()
                              }
                            }
                          })
                        }}>
                          <FilterAltIcon></FilterAltIcon>
                        </IconButton>
                      </Tooltip >
                      : <></>
                  }
                  <Tooltip title={'Atualizar'}>
                    <IconButton sx={{ m: 0 }} onClick={() => { this.fetch() }}>
                      <RefreshIcon></RefreshIcon>
                    </IconButton>
                  </Tooltip >
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ m: 0, minHeight: 400, width: '100%' }}>
            <StyledDataGrid
              localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
              sx={{ minHeight: 400 }}
              autoHeight={true}
              getRowClassName={(params) => params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'}
              loading={this.state.loading}
              rows={this.state.values}
              columns={this.state.store}
              pagination
              pageSize={this.state.pageSize}
              rowCount={this.state.totalRegisters}
              paginationMode="server"
              checkboxSelection={this.enableSelection}
              selectionModel={this.state.selecteds}
              onSelectionModelChange={(selecteds, teste) => {
                if (size(selecteds) > 0) {
                  const selectionSet = new Set(this.state.selecteds);
                  const result = selecteds.filter((s) => !selectionSet.has(s));

                  this.setState({ selecteds: result })
                  this.onRowSelectedChanged(this.state.values.find(x => get(x, 'id') == result))
                } else {
                  this.setState({ selecteds: [] })
                  this.onRowSelectedChanged(null)
                }
              }}
              onSortModelChange={(model) => {
                if (size(model) == 0) {
                  this.setState({ order: null, shouldFetch: true })
                } else {
                  const field = get(model[0], 'field', '')
                  const ascending = get(model[0], 'sort', 'asc') === 'asc'
                  const order = { field, ascending }
                  this.setState({ order, shouldFetch: true })
                }
              }}
              sortingMode="server"
              disableColumnFilter
              disableSelectionOnClick
              components={{ Pagination: TablePagination }}
              componentsProps={{
                pagination: {
                  component: "div",
                  disabled: size(this.state.values) > 0,
                  count: this.state.totalRegisters,
                  page: this.state.page - 1,
                  rowsPerPage: this.state.pageSize,
                  onPageChange: (_, page) => { this.setState({ page: page + 1, shouldFetch: true, loading: true }) },
                  rowsPerPageOptions: [10, 25, 50, 100],
                  onRowsPerPageChange: (e) => { this.setState({ page: 1, pageSize: e.target.value, shouldFetch: true, loading: true }) },
                  labelRowsPerPage: "Tamanho da Página",
                  labelDisplayedRows: () => `Página ${this.state.page} de ${Math.max(Math.ceil(parseFloat(this.state.totalRegisters / this.state.pageSize)), 1)}`,
                }
              }}
            />
          </Box>
        </Card>
      </Box>
    );
  }
}

export default DataGrid;