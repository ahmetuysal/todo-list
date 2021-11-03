import { render, within, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Todo from './Todo';

describe('Todo', () => {
  test('should include header', () => {
    render(<Todo/>);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('To Do List');
  });

  test('should include create todo item form with input and button', () => {
    render(<Todo/>);

    const createItemForm = screen.getByTestId('create-todo-item-form');
    expect(createItemForm).toBeInTheDocument();

    const createItemInput = within(createItemForm).getByRole('textbox');
    expect(createItemInput).toHaveProperty('placeholder', 'What needs to be done?');

    const createItemButton = within(createItemForm).getByRole('button');
    expect(createItemButton).toHaveAttribute('type', 'submit');
  });

  test('list should be empty on start', () => {
    render(<Todo/>);

    expect(screen.getByRole('list')).toBeEmptyDOMElement();
  });

  test('should create list item', async () => {
    render(<Todo/>);

    const createItemForm = screen.getByTestId('create-todo-item-form');
    const createItemInput = within(createItemForm).getByRole('textbox');
    const createItemButton = within(createItemForm).getByRole('button');

    await userEvent.type(createItemInput, 'Write unit tests');
    expect(createItemInput).toHaveAttribute('value', 'Write unit tests');
    await userEvent.click(createItemButton);
    expect(createItemInput).toHaveAttribute('value', '');

    const itemList = screen.getByRole('list');
    expect(itemList.children.length).toBe(1);
    expect(within(itemList).getByText('Write unit tests')).toBeInTheDocument();

    await userEvent.type(createItemInput, 'Write unit tests');
    await userEvent.click(createItemButton);
    expect(itemList.children.length).toBe(2);

    await userEvent.type(createItemInput, 'Deploy to Heroku');
    await userEvent.click(createItemButton);
    expect(itemList.children.length).toBe(3);
  });

  test('should toggle list item', async () => {
    render(<Todo/>);

    const createItemForm = screen.getByTestId('create-todo-item-form');
    const createItemInput = within(createItemForm).getByRole('textbox');
    const createItemButton = within(createItemForm).getByRole('button');

    await userEvent.type(createItemInput, 'Write unit tests');
    await userEvent.click(createItemButton);

    await userEvent.type(createItemInput, 'Deploy to Heroku');
    await userEvent.click(createItemButton);

    const itemList = screen.getByRole('list');

    const listItem = within(itemList).getByText('Write unit tests');
    expect(listItem).toHaveAttribute('aria-checked', 'false');

    await userEvent.click(listItem);
    expect(listItem).toHaveAttribute('aria-checked', 'true');

    await userEvent.click(listItem);
    expect(listItem).toHaveAttribute('aria-checked', 'false');
  });

  test('should remove completed list items on button click', async () => {
    render(<Todo/>);

    const createItemForm = screen.getByTestId('create-todo-item-form');
    const createItemInput = within(createItemForm).getByRole('textbox');
    const createItemButton = within(createItemForm).getByRole('button');

    await userEvent.type(createItemInput, 'Write unit tests');
    await userEvent.click(createItemButton);

    await userEvent.type(createItemInput, 'Deploy to Heroku');
    await userEvent.click(createItemButton);

    const itemList = screen.getByRole('list');

    const listItem = within(itemList).getByText('Write unit tests');

    expect(screen.queryByText('Clear Completed')).toBeNull();

    await userEvent.click(listItem);

    expect(screen.getByText('Clear Completed')).toHaveAttribute('type', 'button');
    await userEvent.click(screen.getByText('Clear Completed'));

    expect(screen.queryByText('Write unit tests')).toBeNull();
    expect(screen.getByText('Deploy to Heroku')).toBeInTheDocument();
    expect(screen.queryByText('Clear Completed')).toBeNull();
  });
});
