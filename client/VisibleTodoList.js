import React from 'react'
import { connect } from 'react-redux'

const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}

const getVisibleTodoList = (
  todoList,
  filter
) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todoList
    case 'SHOW_COMPLETED':
      return todoList.filter(
        t => t.completed
      )
    case 'SHOW_ACTIVE':
      return todoList.filter(
        t => !t.completed
      )
  }
}

const Todo = ({
  onClick,
  completed,
  text
}) => (
  <li
    onClick={onClick}
    style={{
      textDecoration:
        completed ?
          'line-through' :
          'none'
    }}
  >
    {text}
  </li>
)

const TodoList = ({
  todoList,
  onTodoClick
}) => (
  <ul>
    {todoList.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </ul>
)

const mapStateToTodoListProps = (state) => {
  return {
    todoList: getVisibleTodoList(
      state.todoList,
      state.visibilityFilter
    )
  }
}
const mapDispatchToTodoListProps = (dispatch) => {
  return {
    onTodoClick: id => {
      dispatch(toggleTodo(id))
    }
  }
}
const VisibleTodoList = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList)

export default VisibleTodoList