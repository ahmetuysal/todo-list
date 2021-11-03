import { useCallback, useState, VFC, memo } from 'react';
import TodoHeader from './TodoHeader';
import type { TodoItem } from '../models/todo-item';
import TodoList from './TodoList';
import { nanoid } from 'nanoid/non-secure'
import { ok } from 'assert';
import CreateTodoItemForm from './CreateTodoItemForm';
import styled from 'styled-components';

const TodoContainer = styled.div`
  padding: 2rem 4rem;
`;


const Todo: VFC = () => {
  const [todos, setTodos] = useState<Array<TodoItem>>([]);

  const addTodoItem = useCallback(
    (item: Omit<TodoItem, 'id'>) => setTodos(
      (todos) => [...todos, {...item, id: nanoid()}]
    ),
    [],
  );

  const removeCompletedItems = useCallback(
    () => setTodos((todos) => todos.filter((todo) => !todo.completed)),
    [],
  );

  const toggleTodoItem = useCallback(
    (item: { id: string }) => setTodos(
        (prevTodos) => {
          const todoIndex = prevTodos.findIndex((t) => t.id === item.id);
          ok(todoIndex !== -1);
          const nextTodos = [...prevTodos];
          nextTodos.splice(todoIndex, 1, { ...prevTodos[todoIndex], completed: !prevTodos[todoIndex].completed })
          return nextTodos;
        }
      ), [],
  );

  return (
    <TodoContainer>
      <TodoHeader />
      <TodoList
        items={todos}
        onAddTodoItem={addTodoItem}
        onRemoveCompletedItems={removeCompletedItems}
        onToggleTodoItem={toggleTodoItem}
      />
      <CreateTodoItemForm onAddTodoItem={addTodoItem} />
    </TodoContainer>
  );
}

export default memo(Todo);
