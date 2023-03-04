export class Todo {
    constructor(title, status) {
        this.title = title;
        this.status = status;
    }
    getTitle() {
        return this.title;
    }
    setTitle(value) {
        this.title = value;
    }
    getStatus() {
        return this.status;
    }
    setStatus(state) {
        this.status = state;
    }
}
