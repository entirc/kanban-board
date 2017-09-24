import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './AddList.module.styl'
import * as actions from '../actions'

class AddList extends Component {
  addList = event => {
    event.preventDefault()
    const title = prompt('List title')
    if (title && title.length > 0) {
      this.props.addList(title)
    }
  }

  render() {
    return (
      <div className={styles.addList}>
        <a
          className={styles.link}
          role="button"
          onClick={this.addList}
        >
          Add a list...
        </a>
      </div>
    )
  }
}

export default connect(null, actions)(AddList)
