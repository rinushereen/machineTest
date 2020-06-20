const initialState = require('../Assets/InitialState.json');
const todos = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_STORIES':
      return {...state, stories: action.payload.value};
    case 'SAVE_BOOKMARKS':
      return {...state, bookmarks: action.payload.value};

    default:
      return state;
  }
};

export default todos;
