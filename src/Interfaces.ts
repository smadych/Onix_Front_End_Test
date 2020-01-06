// Describes data content which includes in each task
export interface TasksInterface {
    status: string
    title: string
    description: any
    time: string
}

export enum Status {
    todo = 'todo',
    inProgress = 'in progress',
    done = 'done'
}

// Created just for exporting enum object. Current const variable doesn't use.
const space = '';
export default space;
