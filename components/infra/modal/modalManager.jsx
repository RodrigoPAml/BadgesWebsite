
import { get } from 'lodash';
import React from 'react';
import FormModal from './index'

class ModalManager extends React.Component {
  constructor() {
    super()

    this.state = {
      modals: [],
      count: 0
    }
  }

  componentDidMount() {
    window.openDialog = (props) => {
      const id = this.state.count + 1;

      this.state.count = id
      const modal = {
        open: true,
        dialogId: id,
        ...props
      }

      this.setState({
        modals: [...this.state.modals, modal],
        count: id
      })

      return id
    }

    window.closeDialog = (dialogId) => {
      const index = this.state.modals.findIndex(x => get(x, 'dialogId', 0) === dialogId)
      if (index !== -1) {
        this.state.modals.splice(index, 1)
        this.setState({ modals: this.state.modals })
      }
    }
  }

  render() {
    return (
      this.state.modals.map((item, index) => {
        return <FormModal key={index} {...item} />
      })
    );
  }
}

export default ModalManager;