import { Todo } from "./class/todo.js";

class TodoApp {
    private todos : Todo[] = [];
    public constructor() {
        this.loadApp();
    }
    public loadApp(): void {
        this.renderData();
        this.renderUI();
    }
    public renderData(): void {
        const data = JSON.parse(localStorage.getItem("todos"));
        if(data != null) {
            data.forEach((element) => {
                this.addTodoToListView(element);
                this.addTodoToData(element);
            });
           
        this.saveToDo();
        //this.checkItemLeft();
        }
    }

    public addTodoToListView(todo: Todo): void {
        let todoList: HTMLElement = document.querySelector(".todo-list");
        let todoItem: HTMLElement = document.createElement("li");
        let inputCheck: HTMLElement = document.createElement("input");
        let todoItemName: HTMLElement = document.createElement("label");
        let btnRemove: HTMLElement = document.createElement("button");
        let divView: HTMLElement = document.createElement("div");

        divView.classList.add("view");
        inputCheck.classList.add("toggle");
        btnRemove.classList.add("destroy");
        inputCheck.setAttribute("type", "checkbox");
        inputCheck.setAttribute("id", "btnCheck");
        inputCheck.addEventListener('click', (event: MouseEvent): void => {
            this.changeStateToDo((event.target as HTMLTextAreaElement).closest('li'));
            this.setCount();
          });

        todoItemName.setAttribute("id", "text-label");
        todoItemName.textContent = todo["title"];
        if(todo["status"]){
            inputCheck.setAttribute("checked", "checked");
        }

        divView.appendChild(inputCheck);
        divView.appendChild(inputCheck);
        divView.appendChild(todoItemName);
        divView.appendChild(btnRemove);
        todoItem.appendChild(divView);
        todoList.appendChild(todoItem);

        btnRemove.addEventListener('click', (event: MouseEvent): void => {
            this.removeToDo((event.target as HTMLTextAreaElement).closest('li'));
            (event.target as HTMLTextAreaElement).closest('li').remove();
            this.setCount();
          });
    }
    public renderUI(): void {
        const input = document.getElementById("new-todo");
        input.addEventListener("keypress", (event) => {
          if (event.keyCode === 13) {
            var valueInput: string = input["value"];
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
    public addTodoToData(todo: Todo): void {
        this.todos.push(todo as Todo);
    }
    public clearInput(): void {
        document.getElementById("new-todo")["value"] = "";
    }
    public getIndexOfToDo(element: HTMLElement): number {
        var nodes: Element[] = Array.from(element.closest('ul').children);
        var index: number = nodes.indexOf(element);
        return index;
    }
    public getStateOfToDo(element: HTMLElement): boolean {
        return (<HTMLInputElement>element.querySelector("input[type='checkbox']")).checked;
    }
    public removeToDo(element: HTMLElement): void {
        for (let i: number = 0; i < this.todos.length; i++) {
        this.todos.splice(this.getIndexOfToDo(element), 1);
        break;
    }
    this.saveToDo();
    }
    public saveToDo(): void {
        localStorage.setItem('todos', JSON.stringify(this.todos));
      }
    public changeStateToDo(element: HTMLElement): void {
        var status: boolean = this.getStateOfToDo(element);
        var index: number = this.getIndexOfToDo(element);
        this.todos[index]["status"] = status ;
        this.saveToDo();
    }
    public checkItemLeft(): void {
        var checkAll: HTMLElement = document.getElementById('toggle-all');
        var element: HTMLElement = document.getElementById('footer');
        var checkNumber: number = document.querySelectorAll('ul[id="todo-list"] li').length;
        var itemLeftText: string = document.getElementById('todo-count').innerHTML;
        if (itemLeftText !== '0' || checkNumber !== 0) {
          element.classList.remove('hidden');
          checkAll.classList.remove('hidden');
        }
        if (itemLeftText === '0' && checkNumber === 0) {
          element.classList.add('hidden');
          checkAll.classList.add('hidden');
        }
      }

    public setCount(): void {
        var itemLeft: HTMLElement = document.getElementById('todo-count');
        var clearAll: HTMLElement = document.getElementById('clear-completed');
        var allItemView: NodeListOf<Element> = document.querySelectorAll("div[class='view']");
        var listLabel: string[]= [];
        allItemView.forEach((element) => {
          listLabel.push(element.textContent);
        });
        var checkNumber: number = document.querySelectorAll(
          'div input[type="checkbox"]:checked'
        ).length;
        var allCheckBox: number = document.getElementsByClassName('check').length;
        itemLeft.innerHTML = ( checkNumber - allCheckBox ).toString()+" item left";
        if (checkNumber != 0) {
          clearAll.classList.remove('hidden');
        } else {
          clearAll.classList.add('hidden');
        }
        this.checkItemLeft();
      }
}

const Todo_List = new TodoApp();