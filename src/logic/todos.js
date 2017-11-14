export const ADD_ITEM = 'qgo/assessment/ADD_ITEM';
export const DELETE_ITEM = 'qgo/assessment/DELETE_ITEM';
export const COMPLETE_ITEM = 'qgo/assessment/COMPLETE_ITEM';
export const FILTER_COMPLETED = 'qgo/assessment/FILTER_COMPLETED';

export const addItem = content => {
  return { type: ADD_ITEM, content };
};

export const deleteItem = id => {
  return { type: DELETE_ITEM, id };
};

export const completeItem = (id, completed) => {
  return { type: COMPLETE_ITEM, id, completed };
};

export const filterCompleted = filter_completed => {
  return { type: FILTER_COMPLETED, filter_completed };
};

export const initialState = {
  items: [
    { id: 1, content: 'Call mum' },
    { id: 2, content: 'Buy cat food' },
    { id: 3, content: 'Water the plants' },
  ],
  filters: {
    completed: true
  }
};

const todos = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const nextId = state.items.reduce((id, item) => Math.max(item.id, id), 0) + 1;
      const newItem = { id: nextId, content: action.content, };
      
      return {
        ...state,
        items: [...state.items, newItem],
      };
    case DELETE_ITEM: 
      const indexToDelete = state.items.findIndex((element) => element.id === action.id);
      
      return {
        ...state,
        items: [...state.items.slice(0, indexToDelete), ...state.items.slice(indexToDelete + 1)],
      };
    case COMPLETE_ITEM: 
      const indexToComplete = state.items.findIndex((element) => element.id === action.id);

      let itemToComplete = state.items[indexToComplete];
      itemToComplete.completed = action.completed;

      return {
        ...state,
        items: [...state.items.slice(0, indexToComplete), itemToComplete, ...state.items.slice(indexToComplete + 1)],
      };
    case FILTER_COMPLETED: 
      return {
        ...state,
        filters: {
          completed : action.filter_completed
        }
      };
    default:
      return state;
  }
};

export default todos;
