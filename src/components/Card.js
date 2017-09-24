import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from './Card.module.styl'
import * as actions from '../actions'
import { getBoard, getCard } from '../selectors'

import { DragSource } from 'react-dnd'
import constants from '../constants'

const cardDragSpec = {
  beginDrag (props) {
    return {
      board: props.board,
      sourceListId: props.listId,
      cardId: props.card.id,
      moveCard: props.moveCard
    }
  }
}

const collectDrag = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class Card extends Component {
  static propTypes = {
    listId: PropTypes.string.isRequired,
    cardId: PropTypes.string.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  }

  canDelete = () => {
    return window.confirm(`The card '${this.props.card.title}' will be deleted. Confirm?`)
  }

  removeCard = event => {
    event.preventDefault()
    if (this.canDelete()) {
      this.props.removeCard(this.props.listId, this.props.cardId)
    }
  }

  render() {
    const { connectDragSource, isDragging } = this.props
    const className = isDragging ? styles.draggingCard : styles.card
    return connectDragSource(
      <div className={className}>
        <div className={styles.header}>
          {this.props.card.title}
        </div>
        <div className={styles.buttons}>
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

export default connect(mapStateToProps, actions)(DragSource(constants.CARD, cardDragSpec, collectDrag)(Card))
