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
      <div key={list.id} >
        <List listId={list.id}/>
      </div>
    )
    return (
      <div className={ styles.boardWrapper }>
        <div className={ styles.navtopWrapper }>
          <h1 className={ styles.navtop }>Navtop</h1>
        </div>
        <div className={ styles.titleWrapper }>
          <h2 className={ styles.title }>
            { board.title }
          </h2>
        </div>
        <div className={ styles.boardListsWrapper }>
          { boardLists }
          <div className={ styles.AddList }><AddList /></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  board: getBoard(state),
  lists: getLists(state)
})

export default connect(mapStateToProps)(DragDropContext(HTML5Backend)(Board))
