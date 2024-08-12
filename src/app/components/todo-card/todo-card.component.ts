import { TodoSignalsService } from 'src/app/services/todo-signals.service';
import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { TodoKeyLocalStorage } from 'src/app/models/enum/todoKeyLocalStorage';
import { Todo } from 'src/app/models/model/todo.model';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    NgIf,
    NgTemplateOutlet,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
  ],
  templateUrl: './todo-card.component.html',
  styleUrls: []
})

export class TodoCardComponent implements OnInit{

  private todoSignalsService = inject(TodoSignalsService);
  private todoSignals = this.todoSignalsService.todosState;
  public todosList = computed(() => this.todoSignals());

  ngOnInit(): void {
    this.getTodosInLocalStorage();
  }

  private getTodosInLocalStorage() {
    const todosDatas = localStorage.getItem(TodoKeyLocalStorage.TODO_LIST) as string;
    todosDatas && (this.todoSignals.set(JSON.parse(todosDatas)));
  }

  public handleDoneTodo(todoId: number): void{
    if(todoId){
      this.todoSignals.mutate((todos)=>{
        const todoSelected = todos.find((todo) => todo?.id === todoId) as Todo;
        todoSelected && (todoSelected.done = true);
      })
    }
  }

  public handleDeleteTodo(todo: Todo): void{
    if(todo){
      const index = this.todosList().indexOf(todo);
      if(index !== -1){
        this.todoSignals.mutate((todos) =>{
          todos.splice(index, 1);
          this.saveToosInLocalStorage();
        })
      }
    }
  }

  private saveToosInLocalStorage(): void{
    this.todoSignalsService.saveTodosInLocalStorage();
  }

}
