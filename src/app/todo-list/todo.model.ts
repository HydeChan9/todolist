export class Todo {
    private title = '';
    private completed = false;
    private editMode = false;

    /**
 * Creates an instance of Todo.
 * 
 * param {string} title 
 * memberof Todo
 */
constructor(title: string) {
    this.title = title || ''; 
}

get done(): boolean {
    return this.completed;
  }
  
  getTitle(): string {
    return this.title;
  }

  toggleCompletion(): void {
    this.completed = !this.completed;
  }

  get editing(): boolean {
    return this.editMode;
  }
  
  set editable(bl: boolean) {
    this.editMode = bl;
  }

  setTitle(title: string): void {
    this.title = title;
  }

  setCompleted(completed: boolean): void {
    this.completed = completed;
  }
}
