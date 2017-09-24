import React, { Component } from 'react'
import { connect } from 'react-redux'
import List from './List'
import AddList from './AddList'
import styles from './Board.module.styl'
import { getBoard, getLists } from '../selectors'

import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

class Board extends Component {
  render() {
    const { board, lists } = this.props
    const boardLists = lists.map(list => 
      <li key={list.id} >
        <List listId={list.id}/>
      </li>
    )
    return (
      <div className={styles.board}>
        <div className={styles.title}>
          {board.title}
        </div>
        <ul>
          {boardLists}
          <li><AddList /></li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  board: getBoard(state),
  lists: getLists(state)
})

export default connect(mapStateToProps)(DragDropContext(HTML5Backend)(Board))
