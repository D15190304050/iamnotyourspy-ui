// store.js
import { legacy_createStore as createStore} from '@reduxjs/toolkit'
import globalStateReducer from './globalStateReducer.ts';

const store = createStore(globalStateReducer);

export default store;