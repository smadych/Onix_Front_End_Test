import ax from '@/service/api';
import { ToDo } from '@/store/todo';

export class TaskService {
  axs = ax;

  // Make a request for a user with a given ID
  public getToDos(succes: (todos: ToDo[]) => void, err: (error: any) => void) {
    this.axs.get('/todo')
      .then((response) => {
        // handle success
        const result: ToDo[] = response.data;
        succes(result);
      })
      .catch((error) => {
        // handle error
        err(error);
      });
  }

  public addToDos(todo: ToDo, succes: (todos: ToDo) => void, err: (error: any) => void) {
    this.axs.post('/todo', todo).then((response) => {
      console.log(response);
      const td: ToDo = response.data;
      succes(td);
    }).catch((error) => {
      err(error);
      console.log(error);
    });
  }

  public updateToDos(todo: ToDo, succes: (todos: ToDo) => void, err: (error: any) => void) {
    this.axs.put('/todo', todo).then((response) => {
      console.log(response);
      const td: ToDo = response.data;
      console.log(td);
      succes(td);
    }).catch((error) => {
      err(error);
      console.log(error);
    });
  }

  public changeStatusToDo(todo: ToDo, statusTodo: string, err: (error: any) => void) {
    this.axs.put('/todo', todo, {
      params: {
        status: statusTodo,
      },
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      err(error);
      console.log(error);
    });
  }

  public deleteToDos(idTodo: number, succes: (todo: ToDo) => void, err: (error: any) => void) {
    this.axs.delete('/todo', {
      params: {
        id: idTodo,
      },
    })
      .then((response) => {
        const td: ToDo = response.data;
        console.log(td);
        succes(td);
      })
      .catch((error) => {
        err(error);
        console.log(error);
      });
  }
}

export default { TaskService };
