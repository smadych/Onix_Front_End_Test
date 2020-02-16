import { Status } from '@/Interfaces';

export class ToDo {
    public id: number = 0;

    public status: Status = Status.todo;

    public title: string = '';

    public description: string = '';

    public time: string = '';

    public deadline: string = '';

    constructor(status: Status, title: string, description: string) {
        const currDate = new Date();

        this.status = status;
        this.time = currDate.toLocaleDateString();
        this.title = title;
        this.description = description;
        currDate.setDate(currDate.getDate() + Math.floor(Math.random() * Math.floor(5)));
        this.deadline = new Date(currDate).toLocaleDateString();
    }
}