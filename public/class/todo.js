export class Todo {
    constructor(title, status) {
        this.title = title;
        this.status = status;
    }
    get getTitle() {
        return this.title;
    }
    set setTitle(value) {
        this.title = value;
    }
    get getStatus() {
        return this.status;
    }
    set setStatus(state) {
        this.status = state;
    }
}
//# sourceMappingURL=todo.js.map