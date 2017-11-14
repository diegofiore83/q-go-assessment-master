import { combineReducers } from 'redux';
import todos from '../logic/todos';

export default function createReducer() {
  return combineReducers({
    todos: todos,
  });
}
