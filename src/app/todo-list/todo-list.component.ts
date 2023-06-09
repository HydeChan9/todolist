import { Component } from '@angular/core';
import { TodoListService } from "./todo-list.service";
import { Todo } from "./todo.model";
import { TodoStatusType } from './todo-status-type';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  constructor(private todoListService: TodoListService){
  }
  addTodo(event: KeyboardEvent): void
{
const todoThing = event.target as HTMLInputElement;
if (!todoThing)
{
return;
}
if (event.key === 'Enter')
{
const todo = todoThing.value.trim();
this.todoListService.add(todo);
todoThing.value='';
}
}
getList(): Todo[] {

  let list: Todo[] = [];

  switch (this.status) {

    case TodoStatusType.Active:
      list = this.getRemainingList();
      break;

    case TodoStatusType.Completed:
      list = this.getCompletedList();
      break;

    default:
      list = this.todoListService.getList();
      break;

  }

  return list;

}
  remove(index:number): void{
    this.todoListService.remove(index);
  }

  edit(todo: Todo): void {
    todo.editable = true;
  }
  
  update(todo: Todo, newTitle: string): void {
  
    if (!todo.editing) {
      return;
    }
  
    const title = newTitle.trim();
  
    if (title) {
      todo.setTitle(title);
      todo.editable = false;
  
    } else {
      const index = this.getList().indexOf(todo);
      if (index !== -1) {
        this.remove(index);
      }
    }
  
  }
  
  
  cancelEditing(todo: Todo): void {
    todo.editable = false;
  }

  getRemainingList(): Todo[] {
    return this.todoListService.getWithCompleted(false);
  }

  todoStatusType = TodoStatusType;

  private status = TodoStatusType.All

  getCompletedList(): Todo[] {
    return this.todoListService.getWithCompleted(true);
  }
  
  setStatus(status: number): void {
    this.status = status;
  }
  
  
  checkStatus(status: number): boolean {
    return this.status === status;
  }

  removeCompleted(): void {
    this.todoListService.removeCompleted();
  }

  getAllList(): Todo[] {
    return this.todoListService.getList();
  }
  
  allCompleted(): boolean {
    return this.getAllList().length === this.getCompletedList().length;
  }
  
  
  setAllTo(completed: boolean): void {
  
    this.getAllList().forEach((todo) => {
      todo.setCompleted(completed);
    });
  
  }
}
