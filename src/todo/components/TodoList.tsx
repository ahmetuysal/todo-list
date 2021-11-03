import { VFC } from 'react';
import type { TodoItem } from '../models/todo-item';
import TodoListItem from './TodoListItem';
import styled from 'styled-components';
import Button from '../../common/components/Button';

interface TodoListProps {
  items: Array<TodoItem>
  onAddTodoItem: (item: TodoItem) => void
  onRemoveCompletedItems: () => void
  onToggleTodoItem: (item: TodoItem) => void
}

const StyledOrderedList = styled.ol`
  list-style-type: none;
  padding: 0;
  margin: 0;
  
  > li {
    margin-top: 0.5rem;
  }
`;

const StyledRemoveCompletedItemsButton = styled(Button)`
  margin-top: 1rem;
  margin-left: 2rem;
`;

const TodoListContainer = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const TodoList: VFC<TodoListProps> = ({
  items,
  onRemoveCompletedItems,
  onToggleTodoItem,
}) => {
  const hasCompletedItems = items.some((i) => i.completed);

  return (
    <TodoListContainer>
      <StyledOrderedList>
        {items.map((item) => (
          <TodoListItem
            key={item.id}
            item={item}
            onToggleTodoItem={onToggleTodoItem}
          />
        ))}
      </StyledOrderedList>
      {hasCompletedItems ? (
        <StyledRemoveCompletedItemsButton onClick={onRemoveCompletedItems}>
          Clear Completed
        </StyledRemoveCompletedItemsButton>
      ) : null}
    </TodoListContainer>
  );
}

export default TodoList;
