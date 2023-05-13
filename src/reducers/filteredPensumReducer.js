const initialState = [];

const filteredPensumReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTERED_PENSUM':
      return action.payload;
    default:
      return state;
  }
};

export default filteredPensumReducer;
