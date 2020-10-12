import React, {Component} from "react";
import ReactDOM from "react-dom";
import "../src/components/index.css"

import AppHeader from "./components/app-header/app-header";
import SearchPanel from "./components/search-panel/search-panel";
import TodoList from "./components/todo-list/todo-list";
import ItemStatusFilter from "./components/item-status-filter/item-status-filter";
import ItemAddForm from "./components/item-add-form/item-add-form";


export default class App extends Component {
    maxId = 50;
    state = {
        todoData: [
            this.createTodoItem('Drink Tea'),
            this.createTodoItem('Create React App'),
            this.createTodoItem('Running')
        ],
        term:'',
        filter:'all'

    };

    // Function witch create Item
    createTodoItem(label) {
        return {
            label,
            important: false,
            id: this.maxId++,
            done: false
        }
    };

// Создали функцию которая изменяет состояния стейта (наш массив  теперь в стейте) на вход как аргумент он принемает айди элемента массива
    deleteItem = (id) => {
        this.setState(({todoData}) => {
            // С помощу метода массива файнд индекс определили переменную индекс как индекс элемента
            const indx = todoData.findIndex((el) => el.id === id);
// С помощу спрэд оператора и метода массива Слайс создаем новый массив и переопределяем его
            const newArray = [
                ...todoData.slice(0, indx),
                ...todoData.slice(indx + 1)
            ];
            return {
                todoData: newArray
            }
        })
    };
// Функия которая добавляет новый елемент списка при нажатии на кнопку Add Item
    addElement = (text) => {
        const newItem = this.createTodoItem(text);

// В сет стейт используем массив дата и при помощи спред оператора добвлем к стейту новый айтем и возвращаем НОВЫЙ МАССИВ
        this.setState(({todoData}) => {
            const newArr = [
                ...todoData,
                newItem
            ];
            return {
                todoData: newArr
            }
        })
    };

    toggleProperty(arr, id, propName) {

        const indx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[indx];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};

        return [
            ...arr.slice(0, indx),
            newItem,
            ...arr.slice(indx + 1)
        ];
    };

// Функция которая изменяет элемент на Important.
    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        })

    };
// Функция которая изменяет элемент на DONE.
    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        });
    };
//Функция которая находит элемент с буквы//
search (items,term) {
    if (term.length===0){
        return items;
    }
    return  items.filter((item) => {
        return item.label.
            toLowerCase()
            .indexOf(term.toLowerCase()) > -1;
    })
}

onSearchChange = (term) => {
this.setState({term})
};

onFilterChange = (filter) => {
    this.setState({filter})
};

filter (items,filter) {
    switch (filter) {
        case 'all':
            return items;
        case 'active':
            return items.filter((item) => !item.done);
        case 'done':
            return items.filter((item) => item.done);
        default:
           return  items;
    }
}
    render() {
        // Создаем счетчик
        const {todoData,term,filter} = this.state;
        const visibleItems = this.filter(this.search(todoData,term),filter);
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader todo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter filter={filter}
                    onFilterChange={this.onFilterChange}/>
                </div>

                <TodoList todos={visibleItems}
                          onDeleted={this.deleteItem}
                          onToggleImportant={this.onToggleImportant}
                          onToggleDone={this.onToggleDone}/>
                <ItemAddForm onAddElement={this.addElement}/>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById("root"));