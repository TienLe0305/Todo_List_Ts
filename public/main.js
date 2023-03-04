import { Todo } from "./class/todo.js";
class TodoApp {
    constructor() {
        this.todos = [];
        this.loadApp();
    }
    loadApp() {
        this.renderData();
        this.renderUI();
    }
    renderData() {
        const data = JSON.parse(localStorage.getItem("todos"));
        if (data != null) {
            data.forEach((element) => {
                this.addTodoToListView(element);
                this.addTodoToData(element);
            });
            this.saveToDo();
            //this.checkItemLeft();
        }
    }
    addTodoToListView(todo) {
        let todoList = document.querySelector(".todo-list");
        let todoItem = document.createElement("li");
        let inputCheck = document.createElement("input");
        let todoItemName = document.createElement("label");
        let btnRemove = document.createElement("button");
        let divView = document.createElement("div");
        divView.classList.add("view");
        inputCheck.classList.add("toggle");
        btnRemove.classList.add("destroy");
        inputCheck.setAttribute("type", "checkbox");
        inputCheck.setAttribute("id", "btnCheck");
        inputCheck.addEventListener('click', (event) => {
            this.changeStateToDo(event.target.closest('li'));
            this.setCount();
        });
        todoItemName.setAttribute("id", "text-label");
        todoItemName.textContent = todo["title"];
        if (todo["status"]) {
            inputCheck.setAttribute("checked", "checked");
        }
        divView.appendChild(inputCheck);
        divView.appendChild(inputCheck);
        divView.appendChild(todoItemName);
        divView.appendChild(btnRemove);
        todoItem.appendChild(divView);
        todoList.appendChild(todoItem);
        btnRemove.addEventListener('click', (event) => {
            this.removeToDo(event.target.closest('li'));
            event.target.closest('li').remove();
            this.setCount();
        });
    }
    renderUI() {
        const input = document.getElementById("new-todo");
        input.addEventListener("keypress", (event) => {
            if (event.keyCode === 13) {
                var valueInput = input["value"];
                if (valueInput.length != 0) {
                    const newTodo = new Todo(valueInput, false);
                    this.addTodoToListView(newTodo);
                    document.querySelector('input').value = '';
                    this.changeStateToDo;
                    this.addTodoToData(newTodo);
                    this.setCount();
                    this.saveToDo();
                    this.clearInput();
                }
            }
        });
    }
    addTodoToData(todo) {
        this.todos.push(todo);
    }
    clearInput() {
        document.getElementById("new-todo")["value"] = "";
    }
    getIndexOfToDo(element) {
        var nodes = Array.from(element.closest('ul').children);
        var index = nodes.indexOf(element);
        return index;
    }
    getStateOfToDo(element) {
        return element.querySelector("input[type='checkbox']").checked;
    }
    removeToDo(element) {
        for (let i = 0; i < this.todos.length; i++) {
            this.todos.splice(this.getIndexOfToDo(element), 1);
            break;
        }
        this.saveToDo();
    }
    saveToDo() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
    changeStateToDo(element) {
        var status = this.getStateOfToDo(element);
        var index = this.getIndexOfToDo(element);
        this.todos[index]["status"] = status;
        this.saveToDo();
    }
    checkItemLeft() {
        var checkAll = document.getElementById('toggle-all');
        var element = document.getElementById('footer');
        var checkNumber = document.querySelectorAll('ul[id="todo-list"] li').length;
        var itemLeftText = document.getElementById('todo-count').innerHTML;
        if (itemLeftText !== '0' || checkNumber !== 0) {
            element.classList.remove('hidden');
            checkAll.classList.remove('hidden');
        }
        if (itemLeftText === '0' && checkNumber === 0) {
            element.classList.add('hidden');
            checkAll.classList.add('hidden');
        }
    }
    setCount() {
        var itemLeft = document.getElementById('todo-count');
        var clearAll = document.getElementById('clear-completed');
        var allItemView = document.querySelectorAll("div[class='view']");
        var listLabel = [];
        allItemView.forEach((element) => {
            listLabel.push(element.textContent);
        });
        var checkNumber = document.querySelectorAll('div input[type="checkbox"]:checked').length;
        var allCheckBox = document.getElementsByClassName('check').length;
        itemLeft.innerHTML = (checkNumber - allCheckBox).toString() + " item left";
        if (checkNumber != 0) {
            clearAll.classList.remove('hidden');
        }
        else {
            clearAll.classList.add('hidden');
        }
        this.checkItemLeft();
    }
}
const Todo_List = new TodoApp();
