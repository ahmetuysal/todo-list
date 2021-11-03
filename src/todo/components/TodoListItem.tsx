import { VFC, memo } from 'react';
import type { TodoItem } from '../models/todo-item';
import styled from 'styled-components';

interface TodoListItemProps {
  item: TodoItem
  onToggleTodoItem: (item: TodoItem) => void
  className?: string
}

const TodoListItem: VFC<TodoListItemProps> = ({
  item,
  onToggleTodoItem,
  className
}) => (
    <li
      className={className}
      onClick={() => {
      onToggleTodoItem(item);
    }}>
      {item.title}
    </li>
);

const StyledTodoListItem = styled(TodoListItem)`
  text-decoration: ${(props) => props.item.completed ? 'line-through' : 'none'};
  color: ${(props) => props.item.completed ? 'gray' : 'black'};
  font-size: 1.25em;
  cursor: pointer;
`;

export default memo(
  StyledTodoListItem,
  (
    prevProps,
    nextProps,
  ) =>
    prevProps.item.title === nextProps.item.title
      && prevProps.item.completed === nextProps.item.completed
      && prevProps.onToggleTodoItem === nextProps.onToggleTodoItem);