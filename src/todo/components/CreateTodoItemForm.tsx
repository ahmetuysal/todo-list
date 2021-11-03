import { FormEvent, useState, VFC } from 'react';
import type { TodoItem } from '../models/todo-item';
import styled from 'styled-components';
import Button from '../../common/components/Button';

const CreateItemForm = styled.form`
  
`;

const CreateItemInput = styled.input`
  font-size: 1em;
  padding: 0.75rem;
  margin: 10px;
  border-radius: 3px;
`;


const CreateItemButton = styled(Button)`
  
`;


interface TodoListProps {
  onAddTodoItem: (item: Omit<TodoItem, 'id'>) => void
}

const CreateTodoItemForm: VFC<TodoListProps> = ({
  onAddTodoItem,
}) => {
  const [title, setTitle] = useState<string>('');

  const onCreateItemSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title === '') return;
    onAddTodoItem({ title, completed: false})
  }

  return (
    <CreateItemForm onSubmit={onCreateItemSubmit}>
      <CreateItemInput
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
      />
      <CreateItemButton>
        Create
      </CreateItemButton>
    </CreateItemForm>
  );
}

export default CreateTodoItemForm;
