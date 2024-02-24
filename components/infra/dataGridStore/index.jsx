import { get, isEmpty, toString } from 'lodash';
import React from 'react'

class DataGridStore extends React.Component {
  constructor(props) {
    super()

    this.state = {
      loading: false,
      page: get(props, 'page', 1),
      pageSize: get(props, 'pageSize', 20),
      endpoint: get(props, 'endpoint', null),
      totalRegisters: 0,
      values: [],
      filters: get(props, 'filters', []),
      order: null,
      params: [],
      ...props
    }
  }

  fetch = async () => {
    if (this.state.endpoint === null) {
      return
    }

    let data = {
      pageSize: this.state.pageSize,
      page: this.state.page,
      filters: encodeURIComponent(JSON.stringify(this.state.filters.map((filter) => {
        return {
          operation: get(filter, 'operation'),
          field: get(filter, 'field'),
          value: get(filter, 'value'),
        }
      }))),
      orderBy: this.state.order === null ? '' : JSON.stringify(this.state.order),
    }

    if (!isEmpty(toString(this.state.params))) {
      data = {
        ...data,
        ...this.state.params
      }
    }

    this.setLoading(true)
    return await this.state.endpoint(data).then((response) => {
      if (get(response, 'success', false)) {
        window.snackbar.success(get(response, 'message', ''))
        this.setState({
          values: get(response, 'content.data', []),
          page: get(response, 'content.page', 1),
          pageSize: get(response, 'content.pageSize', 5),
          totalRegisters: get(response, 'content.totalRegisters', 0)
        })
      } else {
        window.snackbar.error(get(response, 'message', ''))
      }
      this.setLoading(false)
      return response;
    }).catch((e) => {
      if (get(e, 'response.status') === 401) {
        window.snackbar.warn('Parece que seu login expirou. Por favor considere recarregar a página!')
      } else if (get(e, 'response.status')) {
        window.snackbar.error('Você não tem autorização para isso')
      } else {
        window.snackbar.error(get(e, 'message', ''))
      }
      this.setLoading(false)
      return null
    })
  }

  onSubmit(e) {
    e.preventDefault()
  }

  isLoading = () => this.state.loading;

  setLoading = (val) => this.setState({ loading: val })
}

export default DataGridStore;