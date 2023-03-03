
export class Todo {
    private title : string;
    private status : boolean;
    public constructor(title : string, status : boolean ) {
       this.title = title;
       this.status = status;
    }

    public get getTitle() {
        return this.title;
    }

    public set setTitle(value : string) {
        this.title = value;
    }

    public get getStatus() {
        return this.status;
    }

    public set setStatus(state : boolean) {
        this.status = state;
    }
}



