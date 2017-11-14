import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { filterCompleted } from '../../logic/todos';
import './styles.css';

export const ItemFilters = ({ filters, onFilterCompleted }) => {

  return (
    <div className="itemFilters">
        <label>
          <input id="itemFilterCompleted-checkbox" className="itemFilterCompleted-checkbox" type="checkbox" checked={filters.completed} value="Filter Completed" onChange={() => {onFilterCompleted(!filters.completed);}} />
          Filter Completed
        </label>
    </div>
  );
};

ItemFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onFilterCompleted: PropTypes.func,
};

const mapStateToProps = state => {
  return { filters: state.todos.filters };
};

const mapDispatchToProps = dispatch => ({
  onFilterCompleted: filter_completed => dispatch(filterCompleted(filter_completed))
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemFilters);
