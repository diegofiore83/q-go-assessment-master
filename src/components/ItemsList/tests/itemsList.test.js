import React from 'react';
import { shallow, mount } from 'enzyme';
import { ItemsList } from '../index';

const defaultProps = {
  items: [],
  filters: {
    completed: false
  }
};

describe('ItemsList', () => {
  it('renders without crashing', () => {
    shallow(<ItemsList {...defaultProps} />);
  });

  it('should display warning message if no items', () => {
    const renderedItem = shallow(<ItemsList {...defaultProps} items={[]} />);
    expect(renderedItem.find('#items-missing')).toHaveLength(1);
  });

  it('should not display warning message if items are present', () => {
    const items = [{ id: 1, content: 'Test 1' }];
    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} />);
    expect(renderedItem.find('#items-missing')).toHaveLength(0);
  });

  it('should render items as list items', () => {
    const items = [{ id: 1, content: 'Test 1' }, { id: 2, content: 'Test 2' }];
    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} />);
    expect(renderedItem.find('li')).toHaveLength(2);
  });

  it('should render a delete button for each item', () => {
    const items = [{ id: 1, content: 'Test 1'}, { id: 2, content: 'Test 2'}];
    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} />);
    expect(renderedItem.find('.itemDelete-button')).toHaveLength(2);
  });

  it('should call onDelete on the selected item click', () => {
    const onDeleteMock = jest.fn();
    const items = [{ id: 1, content: 'Test 1' }, { id: 2, content: 'Test 2' }];
    const renderedItem = mount(<ItemsList {...defaultProps} items={items} onDelete={onDeleteMock} />);
    renderedItem.find('#itemDelete-button-1').simulate('click');
    expect(onDeleteMock.mock.calls.length).toBe(1);
  });

  it('should render a checkbox for each item', () => {
    const items = [{ id: 1, content: 'Test 1', completed: true}, { id: 2, content: 'Test 2', completed: false}];
    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} />);
    expect(renderedItem.find('.itemComplete-checkbox')).toHaveLength(2);
  });

  it('should call onComplete on the selected item click', () => {
    const onCompleteMock = jest.fn();
    const items = [{ id: 1, content: 'Test 1', completed: true}, { id: 2, content: 'Test 2', completed: false}];
    const renderedItem = mount(<ItemsList {...defaultProps} items={items} onComplete={onCompleteMock} />);
    renderedItem.find('#itemComplete-checkbox-1').simulate('change');
    expect(onCompleteMock.mock.calls.length).toBe(1);
  });

  it('should have a checkbox with a default value', () => {
    const items = [{ id: 1, content: 'Test 1', completed: true}, { id: 2, content: 'Test 2', completed: false}];
    const renderedItem = mount(<ItemsList {...defaultProps} items={items} />);
    expect(renderedItem.find('#itemComplete-checkbox-1').props().checked).toBe(true);
    expect(renderedItem.find('#itemComplete-checkbox-2').props().checked).toBe(false);
  });

  it('should render only items not completed', () => {
    const items = [{ id: 1, content: 'Test 1', completed: true}, { id: 2, content: 'Test 2', completed: true}, { id: 3, content: 'Test 3', completed: false}];
    const filters = {completed : true};
    const renderedItem = shallow(<ItemsList {...defaultProps} filters={filters} items={items} />);
    expect(renderedItem.find('li')).toHaveLength(1);
  });
});
