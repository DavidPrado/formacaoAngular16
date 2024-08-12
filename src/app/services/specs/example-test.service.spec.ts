import { TodoSignalsService } from 'src/app/services/todo-signals.service';
import { ExampleTestService } from "../example-test.service"
import { TestBed } from '@angular/core/testing';
import { Todo } from 'src/app/models/model/todo.model';

describe("ExampleTestService",()=>{
  let service: ExampleTestService;
  let todoService: TodoSignalsService;

  beforeEach(() =>{
    service = TestBed.inject(ExampleTestService);
    todoService = TestBed.inject(TodoSignalsService);
  });

  it("should return correct list", () =>{
    service.getTestNamesList()
    .subscribe({
      next: (list) =>{
        expect(list).toEqual([
          {
            id: 1,
            name: 'Test 1'
          },
          {
            id: 2,
            name: 'Test 2'
          }
        ]);
      },
    });
  });

  it("should return corret todo list", () =>{
    jest.spyOn(todoService, 'updateTodos');
    const newTodo: Todo = {
      id: 1,
      title: 'New Todo',
      description: 'Description for test',
      done: true
    };

    service.handleCreateTodo(newTodo).subscribe({
      next: (todoList) =>{
        expect(todoList).toEqual([newTodo]);
        expect(todoService.updateTodos).toHaveBeenCalledWith(newTodo);
      }
    })

  });

})
