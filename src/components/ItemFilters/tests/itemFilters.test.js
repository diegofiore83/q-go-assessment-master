import React from 'react';
import { shallow, mount } from 'enzyme';
import { ItemFilters } from '../index';

const defaultProps = {
  filters: {
      completed: false
  },
  onFilterCompleted: f => f
};

describe('ItemCreator', () => {
  it('renders without crashing', () => {
    shallow(<ItemFilters {...defaultProps} />);
  });

  it('should render a checkbox to filter completed task', () => {
    const renderedItem = shallow(<ItemFilters {...defaultProps} />);
    expect(renderedItem.find('#itemFilterCompleted-checkbox')).toHaveLength(1);
  });

  it('should call onFilterCompleted on the checkbox click', () => {
    const onFilterCompletedMock = jest.fn();
    const filters = { completed: false };
    const renderedItem = mount(<ItemFilters {...defaultProps} filters={filters} onFilterCompleted={onFilterCompletedMock} />);
    renderedItem.find('#itemFilterCompleted-checkbox').simulate('change');
    expect(onFilterCompletedMock.mock.calls.length).toBe(1);
  });

  it('should have a checkbox with a default value', () => {
    const filters = { completed: true };
    const renderedItem = mount(<ItemFilters {...defaultProps} filters={filters} />);
    expect(renderedItem.find('#itemFilterCompleted-checkbox').props().checked).toBe(true);
  });
});