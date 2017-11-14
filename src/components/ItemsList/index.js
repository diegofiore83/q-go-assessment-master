import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteItem, completeItem } from '../../logic/todos';
import './styles.css';

export const ItemsList = ({ filters, items, onDelete, onComplete }) => {
  const filtered = items.filter(item => { 
    return !(filters.completed && item.completed)
  });

  return (
    <div>
      <ul className="itemsList-ul">
        {items.length < 1 && <p id="items-missing">Add some tasks above.</p>}
        {filtered.map(item => 
          <li key={item.id}>
            <input id={'itemComplete-checkbox-' + item.id} className="itemComplete-checkbox" type="checkbox" checked={item.completed} value="Complete" onChange={() => {onComplete(item.id, !item.completed);}} />
            {item.content}
            <input id={'itemDelete-button-' + item.id} className="itemDelete-button" type="button" value="Delete" onClick={() => {onDelete(item.id);}} />
          </li>
        )}
      </ul>
    </div>
  );
};

ItemsList.propTypes = {
  filters: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  onDelete: PropTypes.func,
  onComplete: PropTypes.func
};

const mapStateToProps = state => {
  return { 
    filters: state.todos.filters,
    items: state.todos.items 
  };
};

const mapDispatchToProps = dispatch => ({
  onDelete: id => dispatch(deleteItem(id)),
  onComplete: (id, completed)  => dispatch(completeItem(id, completed))
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);
