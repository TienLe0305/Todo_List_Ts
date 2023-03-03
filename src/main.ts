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
        if(data!= null) {
            data.forEach((element) => {
                this.addTodoToListView(element);
                this.addTodoToData(element);
            });
        }
    }

    public addTodoToListView(newTodo: Todo): void {
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
        todoItemName.setAttribute("id", "text-label");
        todoItemName.textContent = newTodo.getTitle;
        if(newTodo.setStatus){
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
          });
    }
    public renderUI(): void {
        const input = document.getElementById("new-todo");
        input.addEventListener("keypress", (event) => {
          if (event.keyCode === 13) {
            var valueInput: string = input["value"];
            if (valueInput.length != 0) {
                const todoNew = new Todo (valueInput,true);
              this.addTodoToListView(todoNew);
                this.clearInput();
              this.addTodoToData(todoNew);
              console.log(this.todos);
            }
          }
        });
    }
    public addTodoToData(todo: Todo): void {
        this.todos.push(todo);
        this.saveToDo();
    }
    public clearInput(): void {
        document.getElementById("new-todo")["value"] = "";
    }
    public getIndexOfToDo(element: HTMLElement): number {
      var nodes: Element[] = Array.from(element.closest('ul').children);
      var index: number = nodes.indexOf(element);
      return index;
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
}

const Todo_List = new TodoApp();