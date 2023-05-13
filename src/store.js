import { configureStore, createReducer } from '@reduxjs/toolkit';
import setFilteredPensum from './reducers/filteredPensumReducer';

const rootReducer = createReducer({}, (builder) => {
  builder.addCase('courses', setFilteredPensum);
});

const store = configureStore({
  reducer: rootReducer
});

export default store;
