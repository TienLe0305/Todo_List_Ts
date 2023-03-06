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
                this.addTodoToListView(element.title, element.status);
                this.todos.push(new Todo(element.title, element.status));
            });
            this.setCount();
            this.checkItemLeft();
        }
    }
    addTodoToListView(title, status) {
        let todoList = document.querySelector("ul");
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
        todoItemName.setAttribute('contenteditable', 'true');
        todoItemName.textContent = title;
        if (status) {
            inputCheck.setAttribute("checked", "checked");
        }
        todoItemName.addEventListener('keypress', (event) => {
            if (event.keyCode === 13) {
                todoItemName.contentEditable = 'false';
                this.changeItemToDo(event.target.closest('li'));
                todoItem.contentEditable = 'true';
            }
        });
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
        const input = document.getElementById("input");
        input.addEventListener("keypress", (event) => {
            if (event.keyCode === 13) {
                var valueInput = input["value"];
                if (valueInput.length != 0) {
                    // const newTodo = new Todo(valueInput, false);
                    this.addTodoToListView(valueInput, false);
                    document.querySelector('input').value = '';
                    this.addTodoToData(valueInput, false);
                    this.setCount();
                }
            }
        });
        this.findCompleteToDo();
        this.findAllToDo();
        this.findActiveToDo();
        this.clearAllComplete();
        this.checkAllToDo();
    }
    addTodoToData(title, status) {
        this.todos.push(new Todo(title, status));
        this.saveToDo();
    }
    clearInput() {
        document.getElementById("input")["value"] = "";
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
    changeItemToDo(ele) {
        var valueChange = ele.querySelector('label').innerHTML;
        var index = this.getIndexOfToDo(ele);
        this.todos[index].setTitle(valueChange);
        this.saveToDo();
    }
    checkItemLeft() {
        var checkAll = document.getElementById('label-toggle-all');
        var element = document.getElementById('footer');
        var checkNumber = document.querySelectorAll('ul[id="todo-list"] li').length;
        var itemLeftText = document.getElementById('item-left').innerHTML;
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
        var itemLeft = document.getElementById('item-left');
        var clearAll = document.getElementById('clear-completed');
        var allItemView = document.querySelectorAll("div[class='view']");
        var listLabel = [];
        allItemView.forEach((element) => {
            listLabel.push(element.textContent);
        });
        var checkNumber = document.querySelectorAll('div input[type="checkbox"]:checked').length;
        var allCheckBox = document.getElementsByClassName('toggle').length;
        itemLeft.innerHTML = (allCheckBox - checkNumber).toString();
        if (checkNumber != 0) {
            clearAll.classList.remove('hidden');
        }
        else {
            clearAll.classList.add('hidden');
        }
        this.checkItemLeft();
    }
    changeSelectFilter(choose) {
        var active = document.getElementById('find-active');
        var complete = document.getElementById('find-complete');
        var all = document.getElementById('find-all');
        if (choose == 'find-active') {
            active.classList.add('selected');
            complete.classList.remove('selected');
            all.classList.remove('selected');
        }
        if (choose == 'find-all') {
            active.classList.remove('selected');
            complete.classList.remove('selected');
            all.classList.add('selected');
        }
        if (choose == 'find-complete') {
            active.classList.remove('selected');
            complete.classList.add('selected');
            all.classList.remove('selected');
        }
    }
    findAllToDo() {
        const findAll = document.getElementById('find-all');
        findAll.addEventListener('click', () => {
            var allItems = document.querySelectorAll('ul[id="todo-list"] li');
            allItems.forEach((item) => {
                item.classList.remove('hidden');
            });
            this.changeSelectFilter('find-all');
        });
    }
    findActiveToDo() {
        const findActive = document.getElementById('find-active');
        findActive.addEventListener('click', () => {
            var allItems = document.querySelectorAll('ul[id="todo-list"] li');
            allItems.forEach((item) => {
                item.querySelector(':checked')
                    ? item.classList.add('hidden')
                    : item.classList.remove('hidden');
            });
            this.changeSelectFilter('find-active');
        });
    }
    findCompleteToDo() {
        var allComplete = document.getElementById('find-complete');
        allComplete.addEventListener('click', () => {
            var allItems = document.querySelectorAll('ul[id="todo-list"] li');
            allItems.forEach((item) => {
                item.querySelector(':checked')
                    ? item.classList.remove('hidden')
                    : item.classList.add('hidden');
            });
            this.changeSelectFilter('find-complete');
        });
    }
    clearAllComplete() {
        var clearAllComplete = document.getElementById('clear-completed');
        clearAllComplete.addEventListener('click', () => {
            document.querySelectorAll('div input[type="checkbox"]:checked').forEach((item) => {
                this.removeToDo(item.closest('li'));
                item.closest('li').remove();
            });
            this.setCount();
            this.checkItemLeft();
        });
    }
    changeAllStateToDo(state) {
        this.todos.forEach((element) => {
            element.setStatus(state);
        });
        this.saveToDo();
    }
    checkAllToDo() {
        var checkAllItem = document.getElementById('label-toggle-all');
        checkAllItem.addEventListener('click', () => {
            var allCheckbox = document.querySelectorAll('input[type=checkbox]');
            if (this.checkIfToDoIsComplete()) {
                allCheckbox.forEach((element) => {
                    element.checked = false;
                    this.changeAllStateToDo(false);
                });
            }
            else {
                allCheckbox.forEach((element) => {
                    element.checked = true;
                    this.changeAllStateToDo(true);
                });
            }
            this.setCount();
        });
    }
    checkIfToDoIsComplete() {
        var allCheckbox = document.querySelectorAll('div input[type=checkbox]');
        for (let element of allCheckbox) {
            if (element.checked == false) {
                return false;
            }
        }
        return true;
    }
}
const Todo_List = new TodoApp();
