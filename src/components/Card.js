import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './Card.module.styl'
import * as actions from '../actions'
import { getBoard, getCard, getListByTitle } from '../selectors'

class Card extends Component {
  canDelete = () => {
    return window.confirm(`The card '${this.props.card.title}' will be deleted. Confirm?`)
  }

  removeCard = event => {
    event.preventDefault()
    if (this.canDelete()) {
      this.props.removeCard(this.props.listId, this.props.cardId)
    }
  }

  moveCard = event => {
    event.preventDefault()
    const targetList = window.prompt(`Where do you want to move the card '${this.props.card.title}'?`)
    if (targetList) {
      const to = getListByTitle(this.props.board, targetList)
      if (to) {
        this.props.moveCard(this.props.board, this.props.listId, to.id, this.props.cardId)
      } else {
        window.alert(`The target list '${targetList}' specified does not exist.`)
      }
    }
  }

  render() {
    return (
      <div className={styles.card}>
        <div className={styles.header}>
          {this.props.card.title}
        </div>
        <div className={styles.buttons}>
          <a className={styles.moveCard} role="button" onClick={this.moveCard}>✣</a>
          <a className={styles.removeCard} role="button" onClick={this.removeCard}>✖</a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  board: getBoard(state),
  card: getCard(state, ownProps.listId, ownProps.cardId)
})

export default connect(mapStateToProps, actions)(Card)
