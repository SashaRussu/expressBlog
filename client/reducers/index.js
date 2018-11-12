import { combineReducers } from 'redux'
import todoList from './todoList'
import visibilityFilter from './visibilityFilter'

const todoApp = combineReducers({
  todoList,
  visibilityFilter
})

export default todoApp