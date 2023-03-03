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
        }
    }
    addTodoToListView(newTodo) {
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
        todoItemName.setAttribute("id", "text-label");
        todoItemName.textContent = newTodo.getTitle;
        if (newTodo.setStatus) {
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
        });
    }
    renderUI() {
        const input = document.getElementById("new-todo");
        input.addEventListener("keypress", (event) => {
            if (event.keyCode === 13) {
                var valueInput = input["value"];
                if (valueInput.length != 0) {
                    const todoNew = new Todo(valueInput, true);
                    this.addTodoToListView(todoNew);
                    this.clearInput();
                    this.addTodoToData(todoNew);
                    console.log(this.todos);
                }
            }
        });
    }
    addTodoToData(todo) {
        this.todos.push(todo);
        this.saveToDo();
    }
    clearInput() {
        document.getElementById("new-todo")["value"] = "";
    }
    getIndexOfToDo(element) {
        var nodes = Array.from(element.closest('ul').children);
        var index = nodes.indexOf(element);
        return index;
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
}
const Todo_List = new TodoApp();
//# sourceMappingURL=main.js.map