import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false,
      }
    case 'TOGGLE_TODO':
      if (state.id !== action.id) return state

      return {
        ...state,
        completed: !state.completed
      }
    default:
      return state
  }
}

const todoList = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ]
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action))
    default:
      return state
  }
}

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

const todoApp = combineReducers({ todoList, visibilityFilter })
const store = createStore(todoApp)

const FilterLink = ({
  filter,
  currentFilter,
  children,
  onClick
}) => {
  if (filter === currentFilter) {
    return <span>{children}</span>
  }

  return (
    <a href="#"
       onClick={e => {
         e.preventDefault()
         onClick(filter)
       }}
    >
      {children}
    </a>
  )
}

const Footer = ({
  visibilityFilter,
  onFilterClick
}) => (
  <p>
    Show:
    {' '}
    <FilterLink
      filter="SHOW_ALL"
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    >
      All
    </FilterLink>
    {', '}
    <FilterLink
      filter="SHOW_ACTIVE"
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    >
      Active
    </FilterLink>
    {', '}
    <FilterLink
      filter="SHOW_COMPLETED"
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    >
      Completed
    </FilterLink>
  </p>
)

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

const AddTodo = ({
  onAddClick
}) => {
  let input

  return (
    <div>
      <input ref={node => {
        input = node
      }} />
      <button onClick={() => {
        onAddClick(input.value)
        input.value = ''
      }}>
        Add Todo
      </button>
    </div>
  )
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

let nextTodoId = 0
const TodoApp = ({
  todoList,
  visibilityFilter
}) => (
  <div>
    <AddTodo
      onAddClick={text =>
        store.dispatch({
          type: 'ADD_TODO',
          text,
          id: nextTodoId++
        })
      }
    />
    <TodoList
      todoList={
        getVisibleTodoList(
          todoList,
          visibilityFilter
        )
      }
      onTodoClick={id =>
        store.dispatch({
          type: 'TOGGLE_TODO',
          id
        })
      }
    />
    <Footer
      visibilityFilter={visibilityFilter}
      onFilterClick={filter =>
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter
        })
      }
    />
  </div>
)

const render = () => {
  ReactDOM.render(
    <TodoApp
      {...store.getState()}
    />,
    document.getElementById('root')
  )
}

store.subscribe(render)

document.addEventListener('DOMContentLoaded', render)