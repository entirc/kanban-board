import uuid from 'uuid-v4'

const ids = Array.from(new Array(8).keys()).map(i => uuid())

const data = {
  title: 'Kanban Board Project',
  lists: {
    [ids[0]]: {
      id: ids[0],
      order: 0,
      title: 'To Do',
      description: 'This is what is pending for you to do',
      cards: {
        [ids[1]]: {
          id: ids[1],
          order: 0,
          title: 'Create GitHub issues',
          description: 'We gotta create some issues to track everything'
        },
        [ids[2]]: {
          id: ids[2],
          order: 1,
          title: 'Choose all the tools',
          description: 'Not all the tools has been defined yet'
        }
      }
    },
    [ids[3]]: {
      id: ids[3],
      order: 1,
      title: 'In Progress',
      description: 'This is what you are working on',
      cards: {
        [ids[4]]: {
          id: ids[4],
          order: 0,
          title: 'Mockup - MVP',
          description: 'Create some mocks/wireframes'
        },
        [ids[5]]: {
          id: ids[5],
          order: 1,
          title: 'Basic funcionality',
          description: 'Create, edit and delete lists and cards'
        }
      }
    },
    [ids[6]]: {
      id: ids[6],
      order: 2,
      title: 'Done',
      description: 'This is what you have accomplished so far. Keep up the good work!',
      cards: {
        [ids[7]]: {
          id: ids[7],
          order: 0,
          title: 'Brainstorm',
          description: 'Having nice ideas!'
        }
      }
    }
  }
}

export default data