import * as React from 'react';
import TodosInput from './TodosInput';
import axios from '../../config/axios';
import './Todos.scss';
import TodosItem from './TodosItem';

interface TTodosState {
  todos: any[]
}

class Todos extends React.Component<any, TTodosState> {
  constructor(props: any) {
    super(props);
    this.state = {
      todos: []
    };
  }

  addTodo = async (todoData: any) => {
    const {todos} = this.state;
    try {
      const response = await axios.post('todos', todoData);
      this.setState({todos: [response.data.resource, ...todos]});
    } catch (e) {
      throw new Error(e);
    }
  };

  componentDidMount() {
    this.getTodos();
  }

  getTodos = async () => {
    try {
      const response = await axios.get('todos');
      const todos = response.data.resources.map((todo: any) => Object.assign({}, todo, {editing: false}));
      this.setState({todos});
    } catch (e) {
      throw new Error(e);
    }
  };

  updateTodo = async (id: number, todoData: any) => {
    const {todos} = this.state;
    try {
      const response = await axios.put(`todos/${id}`, todoData);
      const newTodo = todos.map(todo => {
        if (todo.id === id) {
          return response.data.resource;
        } else {
          return todo;
        }
      });
      this.setState({todos: newTodo});
    } catch (e) {
      throw new Error(e);
    }
  };


  toEditing = (id: number) => {
    const {todos} = this.state;
    const newTodos = todos.map(todo => {
      if (id === todo.id) {
        return Object.assign({}, todo, {editing: true});
      } else {
        return Object.assign({}, todo, {editing: false});
      }
    });
    this.setState({todos: newTodos});
  };

  render() {
    return (
      <div className="Todos" id="Todos">
        <TodosInput addTodo={(todoData: any) => this.addTodo(todoData)}/>
        <main>
          {
            this.state.todos.map(todo =>
              <TodosItem key={todo.id}
                         {...todo}
                         toEditing={this.toEditing}
                         update={this.updateTodo}/>)
          }
        </main>
      </div>
    );
  }
}

export default Todos;