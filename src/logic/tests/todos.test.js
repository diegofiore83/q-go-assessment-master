import todos, { initialState, addItem, deleteItem, completeItem, filterCompleted } from '../todos';

describe('todos', () => {
  it('should return state for unknown action', () => {
    const mockState = { test: 'testItem' };
    const mockAction = { type: 'mystery-meat' };
    const result = todos(mockState, mockAction);
    expect(result).toEqual(mockState);
  });

  it('should use initial state if state not provided', () => {
    const mockAction = { type: 'mystery-meat' };
    const result = todos(undefined, mockAction);
    expect(result).toEqual(initialState);
  });

  it('should add new items on ADD_ITEM', () => {
    const state = {
      items: [
        { id: 1, content: 'first' },
        { id: 2, content: 'second' },
      ]
    }
    const mockAction = addItem('third');
    const result = todos(state, mockAction);
    expect(result.items).toHaveLength(3);
    expect(result.items[2].id).toEqual(3);
    expect(result.items[2].content).toEqual('third');
  });

  it('should delete an items on DELETE_ITEM', () => {
    const state = {
      items: [
        { id: 1, content: 'first' },
        { id: 2, content: 'second' },
        { id: 3, content: 'third' }
      ]
    }
    const mockAction = deleteItem(2);
    const result = todos(state, mockAction);
    expect(result.items).toHaveLength(2);
    expect(result.items[0].id).toEqual(1);
    expect(result.items[1].content).toEqual('third');
  });

  it('should complete an items on COMPLETE_ITEM with value true', () => {
    const state = {
      items: [
        { id: 1, content: 'first', completed: true },
        { id: 2, content: 'second', completed: false },
        { id: 3, content: 'third', completed: false }
      ]
    }
    const mockAction = completeItem(3, true);
    const result = todos(state, mockAction);
    expect(result.items[2].completed).toEqual(true);
  });

  it('should incomplete an items on COMPLETE_ITEM with value false', () => {
    const state = {
      items: [
        { id: 1, content: 'first', completed: true },
        { id: 2, content: 'second', completed: false },
        { id: 3, content: 'third', completed: true }
      ]
    }
    const mockAction = completeItem(3, false);
    const result = todos(state, mockAction);
    expect(result.items[2].completed).toEqual(false);
  });

  it('should update the completed filter on FILTER_COMPLETED', () => {
    const state = {
      filter: {
        completed: false
      }
    }
    const mockAction = filterCompleted(true);
    const result = todos(state, mockAction);
    expect(result.filters.completed).toEqual(true);
  });
});
