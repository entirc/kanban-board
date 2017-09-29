import React, { Component } from "react";
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import styles from "./List.module.styl";
import { getList, getCards } from "../selectors";
import Card from "./Card";
import AddCard from "./AddCard";

import { DropTarget } from "react-dnd"
import constants from "../constants"

const listTargetSpec = {
  drop (props, monitor) {
    const targetListId = props.listId
    const { board, sourceListId, cardId, moveCard } = monitor.getItem()
    if (sourceListId !== targetListId) {
      moveCard(board, sourceListId, targetListId, cardId)
    }
  }
}

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

class List extends Component {
  static propTypes = {
    listId: PropTypes.string.isRequired,
    connectDragTarget: PropTypes.func,
    isOver: PropTypes.bool.isRequired
  }

  render() {
    const { connectDropTarget, isOver, list, cards } = this.props
    const className = isOver ? styles.droppingIn : styles.list
    const listCards = cards.map(card => (
      <li key={card.id}>
        <Card listId={list.id} cardId={card.id} />
      </li>
    ))
    return connectDropTarget(
      <div className={className}>
        <div className={styles.header}>{list.title}</div>
        <div className={styles.listCards}>{listCards}</div>
        <div><AddCard listId={list.id} /></div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  list: getList(state, ownProps.listId),
  cards: getCards(state, ownProps.listId)
})

export default connect(mapStateToProps)(DropTarget(constants.CARD, listTargetSpec, collect)(List))
