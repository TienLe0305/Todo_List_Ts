
export class Todo {
    private title : string;
    private status : boolean;
    public constructor(title : string, status : boolean ) {
       this.title = title;
       this.status = status;
    }

    public getTitle() {
        return this.title;
    }

    public setTitle(value : string) {
        this.title = value;
    }

    public getStatus() {
        return this.status;
    }

    public setStatus(state : boolean) {
        this.status = state;
    }
}



