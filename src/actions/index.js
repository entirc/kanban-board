import * as types from './types'
import { getCard } from '../selectors'

const addList = title => ({ 
  type: types.ADD_LIST,
  title
})

const addCard = (listId, title) => ({ 
  type: types.ADD_CARD,
  listId,
  title
})

const removeCard = (listId, cardId) => dispatch => {
  dispatch({ 
    type: types.REMOVE_CARD,
    listId,
    cardId
  })
  dispatch({ 
    type: types.REORDER_CARDS,
    listId
  })
}

const moveCard = (board, fromListId, toListId, cardId) => dispatch => {
  const card = getCard(board, fromListId, cardId)
  dispatch({ 
    type: types.CLONE_CARD,
    listId: toListId,
    card
  })
  dispatch({ 
    type: types.REMOVE_CARD,
    listId: fromListId,
    cardId
  })
}

export { addList, addCard, removeCard, moveCard }
