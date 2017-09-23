const compareByOrder = (left, right) => left.order - right.order

const getBoard = state => state

const getLists = state => {
  const lists = getBoard(state).lists
  return Object.keys(lists).map(key => lists[key]).sort(compareByOrder)
}

const getList = (state, listId) => getLists(state).find(list => list.id === listId)

const getCards = (state, listId) => {
  const cards = getList(state, listId).cards
  return Object.keys(cards).map(key => cards[key]).sort(compareByOrder)
}

const getCard = (state, listId, cardId) => getCards(state, listId).find(card => card.id === cardId)

const getListByTitle = (state, title) => getLists(state).find(list => list.title === title)

export { getBoard, getLists, getList, getCards, getCard, getListByTitle }
