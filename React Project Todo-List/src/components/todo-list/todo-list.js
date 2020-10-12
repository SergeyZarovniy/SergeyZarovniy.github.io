import React from "react";
import TodoListItem from "../todo-list-item/todo-list-item";
import './todo-list.css';

/* В компоненту TodoList приходит дата как пропс,с помощу функции мар создаем масив с данными с списком дел */
// В пропс приходи ивент лиснр онДелейт с индекса джс
const TodoList = ({todos,onDeleted,onToggleImportant,onToggleDone}) => {

   const elements = todos.map((item) => {
       const {id,...itemProps} = item;
      return (
          <li key={id} className='list-group-item'>

              <TodoListItem
       {...itemProps}
              onDeleted = {() => onDeleted (id)}
              onToggleImportant={() => onToggleImportant (id)}
              onToggleDone={() => onToggleDone (id)}
              /></li>
      ) ;
   });

    return (
        <ul className='list-group todo-list'>
            {elements}
        </ul>
    );
};

export default TodoList;