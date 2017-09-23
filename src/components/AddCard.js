import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './AddCard.module.styl'
import * as actions from '../actions'

class AddCard extends Component {
  addCard = event => {
    event.preventDefault()
    const title = prompt('Card title')
    if (title && title.length > 0) {
      this.props.addCard(this.props.listId, title)
    }
  }

  render() {
    return (
      <div className={styles.addCard}>
        <a
          className={styles.link}
          role="button"
          onClick={this.addCard}
        >
          Add a card...
        </a>
      </div>
    )
  }
}

export default connect(null, actions)(AddCard)
