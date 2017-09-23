import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './List.module.styl'
import { getList, getCards } from '../selectors'
import Card from './Card'
import AddCard from './AddCard'

class List extends Component {
  render() {
    const { list, cards } = this.props
    const listCards = cards.map(card => 
      <li key={card.id}>
        <Card 
          listId={list.id}
          cardId={card.id}
        />
      </li>
    )
    return (
      <div className={styles.list}>
        <div className={styles.header}>
          {list.title}
        </div>
        <ul>
          {listCards}
        </ul>
        <AddCard listId={list.id}/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  list: getList(state, ownProps.listId),
  cards: getCards(state, ownProps.listId)
})

export default connect(mapStateToProps)(List)
