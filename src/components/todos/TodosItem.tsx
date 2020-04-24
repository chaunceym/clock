import * as React from 'react';
import {Checkbox} from 'antd';
import {DeleteOutlined, CheckOutlined} from '@ant-design/icons';

interface TTodosItemProps {
  id: number
  description: string
  completed: boolean
  editing: boolean
  update: (id: number, params: any) => void
  toEditing: (id: number) => void
}

interface TTodosItemState {
  editText: string
}

class TodosItem extends React.Component<TTodosItemProps, TTodosItemState> {
  constructor(props: TTodosItemProps) {
    super(props);
    this.state = {
      editText: this.props.description
    };
  }

  update = (todoOptions: any) => {
    this.props.update(this.props.id, todoOptions);
  };
  toEditing = () => {
    this.props.toEditing(this.props.id);
  };

  onKeyup = (e: any) => {
    if (e.keyCode === 13 && this.state.editText !== '') {
      this.update({description: this.state.editText});
    }
  };

  onClick = () => {
    if (this.state.editText !== '') {
      this.update({description: this.state.editText});
    }
  };

  render() {
    const Editing = (
      <div>
        <input value={this.state.editText}
               onKeyUp={this.onKeyup}
               onChange={e => this.setState({editText: e.target.value})}/>
        <div className="icon-wrapper">
          <CheckOutlined onClick={this.onClick}/>
          <DeleteOutlined onClick={e => this.update({deleted: true})}/>
        </div>
      </div>
    );

    const Text = <span onDoubleClick={this.toEditing}>{this.props.description}</span>;
    return (
      <div className="TodosItem" id="TodosItem">
        <Checkbox checked={this.props.completed}
                  onChange={e => this.update({completed: e.target.checked})}
        >
        </Checkbox>
        {
          this.props.editing ? Editing : Text
        }
      </div>
    );
  }
}

export default TodosItem;