import { Injectable } from '@angular/core';
import { Todo } from "./todo.model";
@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  

  private list: Todo[] = [];

  add(title: string): void {

    if (title || title.trim()) {
      this.list.push(new Todo(title));
    }
  
  }
  getList(): Todo[] {
    return this.list;
  }
  remove(index: number): void{
    this.list.splice(index,1);
  }

  getWithCompleted(completed: boolean): Todo[] {
    return this.list.filter(todo => todo.done === completed);
  }

  removeCompleted(): void {
    this.list = this.getWithCompleted(false);
  }

  


  constructor() { }

}
