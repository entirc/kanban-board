import * as types from '../actions/types'
import uuid from 'uuid-v4'
import mapValues from 'lodash/mapValues'

const card = (state = {}, action) => {
  switch (action.type) {
    case types.ADD_CARD:
      const newCard = {
        id: uuid(),
        order: Object.keys(state).length,
        title: action.title,
        description: ''
      }
      return newCard
    case types.CLONE_CARD:
      return { 
        ...action.card,
        order: state.length
      }
    default:
      return state
  }  
}

const cards = (state = {}, action) => {
  switch (action.type) {
    case types.ADD_CARD:
    case types.CLONE_CARD:
      const currentCard = card(state, action)
      return {
        ...state,
        [currentCard.id]: currentCard
      }
    case types.REMOVE_CARD:
      const nextState = { ...state }
      delete nextState[action.cardId]
      return nextState
    case types.REORDER_CARDS:
      let i = 0
      return mapValues(state, card => ({ ...card, order: i++ }))
    default:
      return state
  }
}

const list = (state = {}, action) => {
  switch (action.type) {
    case types.ADD_LIST:
      const newList = {
        id: uuid(),
        order: Object.keys(state).length,
        title: action.title,
        cards: {}
      }
      return newList
    case types.ADD_CARD:
    case types.REMOVE_CARD:
    case types.CLONE_CARD:
    case types.REORDER_CARDS:
      return {
        ...state,
        cards: cards(state.cards, action)
      }
    default:
      return state
  }
}

const lists = (state = {}, action) => {
  switch (action.type) {
    case types.ADD_LIST:
      const newList = list(state, action)
      return {
        ...state,
        [newList.id]: newList
      }
    case types.ADD_CARD:
    case types.REMOVE_CARD:
    case types.CLONE_CARD:
    case types.REORDER_CARDS:
      return {
        ...state,
        [action.listId]: list(state[action.listId], action)
      }
    default:
      return state
  }
}

const board = (state = {}, action) => {
  switch (action.type) {
    case types.ADD_LIST:
    case types.REORDER_CARDS:
    case types.ADD_CARD:
    case types.REMOVE_CARD:
    case types.CLONE_CARD:
      return { 
        ...state,
        lists: lists(state.lists, action)
      }
    default:
      return state
  }
}

export default board
