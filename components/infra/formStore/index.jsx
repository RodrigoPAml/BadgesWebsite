import { get, toString, isEmpty } from 'lodash';
import React from 'react'

class FormStore extends React.Component {
  constructor(props) {
    super()

    this.state = {
      loading: get('loading', false),
      endpoint: get(props, 'endpoint', null),
      store: get(props, 'store', []),
      item: get(props, 'item', {}),
      update: get(props, 'update', false)
    }

    if (this.state.update) {
      this.populateStore(this.state.item)
    }

    this.setState({ store: this.state.store })
  }

  resetStore() {
    this.state.store.forEach(function (item) {
      item.value = ''
    })

    this.setState({ store: this.state.store })
  }

  populateStore(item) {
    if (item === null) {
      return
    }

    for (const key in item) {
      const index = this.state.store.findIndex(x => get(x, 'id') === key)

      if (index !== -1) {
        this.state.store[index] = {
          ...this.state.store[index],
          value: item[key]
        }
      }
    }
  }

  onSubmit(e) {
    e.preventDefault()
  }

  isLoading = () => this.state.loading;

  setLoading = (val) => this.setState({ loading: val })

  async submit() {
    if (get(this.state, 'endpoint', null) === null) {
      return null
    }

    if (this.validate()) {
      let data = {}
      let update = this.state.update;

      this.state.store.forEach(function (item) {
        if (!update && get(item, 'id') !== 'id' || (update && (get(item, 'hasChanged', false) === true) || get(item, 'id') === 'id')) {
          data[get(item, 'id')] = get(item, 'value')
        }

        if (update && get(item, 'id') !== 'id') {
          data['update' + get(item, 'id')] = get(item, 'hasChanged', false)
        }
      })

      this.setLoading(true)
      return await this.state.endpoint(data).then((response) => {
        if (get(response, 'success', false)) {
          window.snackbar.success(get(response, 'message', ''))

          this.state.store.forEach((item) => {
            item.hasChanged = false
          })

          this.setState({ store: this.state.store })
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

    this.setLoading(false)
    return null
  }

  validate() {
    const item = this.state.store.find(x => isEmpty(toString(get(x, 'value', ''))) && get(x, 'required', false) === true && get(x, 'id') !== 'id');

    if (item) {
      window.snackbar.warn('Campo "' + get(item, 'name', '?') + '" é obrigátorio')
      return false;
    }

    return true
  }

  isValid() {
    const item = this.state.store.find(x => isEmpty(toString(get(x, 'value', ''))) && get(x, 'required', false) === true && get(x, 'id') !== 'id');

    if (item) {
      return false
    }

    const itemChanged = this.state.store.find(x => get(x, 'hasChanged', false) === true);
    if (itemChanged === undefined) {
      return false
    }

    return true
  }

  getField = (id, field) => {
    const index = this.state.store.findIndex(x => x.id === id)

    if (index !== -1) {
      return get(this.state.store[index], field)
    }

    return null
  }

  setValue = (id, value, hasChanged = true) => {
    const obj = { 'id': id, 'value': value }
    const index = this.state.store.findIndex(x => x.id === id)

    if (index !== -1) {
      let store = this.state.store;

      store[index] = {
        ...store[index],
        'value': value,
        'hasChanged': hasChanged,
      };

      this.setState({ store })
    }
    else {
      this.setState({
        store: [
          ...this.state.store,
          obj
        ]
      })
    }
  }
}

export default FormStore;