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
                this.addTodoToListView(element.title, element.status);
                this.todos.push(new Todo(element.title, element.status));
            }); 
        this.setCount();
        this.checkItemLeft();
        }
    }

    public addTodoToListView(title: string, status: boolean): void {
        let todoList: HTMLElement = document.querySelector("ul");
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
        todoItemName.setAttribute('contenteditable', 'true');
        todoItemName.textContent = title;
        if(status){
            inputCheck.setAttribute("checked", "checked");
        }

        todoItemName.addEventListener('keypress', (event: KeyboardEvent): void => {
          if (event.keyCode === 13) {
            todoItemName.contentEditable = 'false';
            this.changeItemToDo((event.target as HTMLTextAreaElement).closest('li'));
            todoItem.contentEditable = 'true';
          }
        });

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
        const input = document.getElementById("input");
        input.addEventListener("keypress", (event) => {
          if (event.keyCode === 13) {
            var valueInput: string = input["value"];
            if (valueInput.length != 0) {
                // const newTodo = new Todo(valueInput, false);
                this.addTodoToListView(valueInput,false);
                document.querySelector('input').value = '';
                this.addTodoToData(valueInput,false);
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
    public addTodoToData(title:string, status:boolean): void {
        this.todos.push(new Todo(title,status));
        this.saveToDo();
    }
    public clearInput(): void {
        document.getElementById("input")["value"] = "";
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

    public changeItemToDo(ele: HTMLElement): void {
      var valueChange: string = ele.querySelector('label').innerHTML;
      var index: number = this.getIndexOfToDo(ele);
      this.todos[index].setTitle(valueChange);
      this.saveToDo();
    }
    public checkItemLeft(): void {
        var checkAll: HTMLElement = document.getElementById('label-toggle-all');
        var element: HTMLElement = document.getElementById('footer');
        var checkNumber: number = document.querySelectorAll('ul[id="todo-list"] li').length;
        var itemLeftText: string = document.getElementById('item-left').innerHTML;
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
        var itemLeft: HTMLElement = document.getElementById('item-left');
        var clearAll: HTMLElement = document.getElementById('clear-completed');
        var allItemView: NodeListOf<Element> = document.querySelectorAll("div[class='view']");
        var listLabel: string[]= [];
        allItemView.forEach((element) => {
          listLabel.push(element.textContent);
        });
        var checkNumber: number = document.querySelectorAll(
          'div input[type="checkbox"]:checked'
        ).length;
        var allCheckBox: number = document.getElementsByClassName('toggle').length;
        itemLeft.innerHTML = ( allCheckBox- checkNumber ).toString();
        if (checkNumber != 0) {
          clearAll.classList.remove('hidden');
        } else {
          clearAll.classList.add('hidden');
        }
        this.checkItemLeft();
      }
      public changeSelectFilter(choose: String): void {
        var active: HTMLElement = document.getElementById('find-active');
        var complete: HTMLElement = document.getElementById('find-complete');
        var all: HTMLElement = document.getElementById('find-all');
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
      public findAllToDo(): void {
        const findAll: HTMLElement = document.getElementById('find-all');
        findAll.addEventListener('click', () => {
          var allItems: NodeListOf<HTMLLIElement> = document.querySelectorAll('ul[id="todo-list"] li');
          allItems.forEach((item) => {
            item.classList.remove('hidden');
          });
          this.changeSelectFilter('find-all');
        });
      }
    
      public findActiveToDo(): void {
        const findActive: HTMLElement = document.getElementById('find-active');
        findActive.addEventListener('click', (): void => {
          var allItems: NodeListOf<HTMLLIElement> = document.querySelectorAll('ul[id="todo-list"] li');
          allItems.forEach((item) => {
            item.querySelector(':checked')
              ? item.classList.add('hidden')
              : item.classList.remove('hidden');
          });
          this.changeSelectFilter('find-active');
        });
      }
    
      public findCompleteToDo(): void {
        var allComplete: HTMLElement = document.getElementById('find-complete');
        allComplete.addEventListener('click', (): void => {
          var allItems: NodeListOf<HTMLLIElement> = document.querySelectorAll('ul[id="todo-list"] li');
          allItems.forEach((item) => {
            item.querySelector(':checked')
              ? item.classList.remove('hidden')
              : item.classList.add('hidden');
          });
          this.changeSelectFilter('find-complete');
        });
      }
      
      public clearAllComplete(): void {
        var clearAllComplete: HTMLElement = document.getElementById('clear-completed');
        clearAllComplete.addEventListener('click', (): void => {
          document.querySelectorAll('div input[type="checkbox"]:checked').forEach((item) => {
            this.removeToDo(item.closest('li'));
            item.closest('li').remove();
          });
          this.setCount();
          this.checkItemLeft();
        });
      }
      public changeAllStateToDo(state: boolean): void {
        this.todos.forEach((element) => {
          element.setStatus(state);
        });
        this.saveToDo();
      }
      public checkAllToDo(): void {
        var checkAllItem: HTMLElement = document.getElementById('label-toggle-all');
        checkAllItem.addEventListener('click', (): void => {
          var allCheckbox: NodeListOf<Element> = document.querySelectorAll('input[type=checkbox]');
          if (this.checkIfToDoIsComplete()) {
            allCheckbox.forEach((element) => {
              (element as HTMLInputElement).checked = false;
              this.changeAllStateToDo(false);
            });
          } else {
            allCheckbox.forEach((element) => {
              (element as HTMLInputElement).checked = true;
              this.changeAllStateToDo(true);
            });
          }
          this.setCount();
        });
      }
      public checkIfToDoIsComplete(): boolean {
        var allCheckbox: NodeListOf<Element> = document.querySelectorAll('div input[type=checkbox]');
        for (let element of allCheckbox) {
          if ((element as HTMLInputElement).checked == false) {
            return false;
          }
        }
        return true;
      }
    
}

const Todo_List = new TodoApp();