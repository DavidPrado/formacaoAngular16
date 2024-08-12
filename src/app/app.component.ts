import { TodoSignalsService } from './services/todo-signals.service';
import { Component, EventEmitter, Input, OnInit, Output, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { SchoolData, SchoolService } from './services/school.service';
import { filter, from, map, Observable, of, switchAll, switchMap, timeout, zip } from 'rxjs';
import { Todo } from './models/model/todo.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, TodoCardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  @Input() public projetcName!: string;
  @Output() public outputEvent = new EventEmitter<string>();
  public todoSignal!: WritableSignal<Array<Todo>>
  public renderTestMessage = false;
  public isDoned = false;


  title = 'todo-list-16';
  students: Array<SchoolData> = [];
  teachers: Array<SchoolData> = [];
  private zipSchoolResponses$ = zip(
    this.getSudentsDatas(),
    this.getTeachersDatas()
  );

  private ages = of(20, 30, 40, 50, 60, 70);
  private peopleDatas = from([
    {name: 'Marcos Junior', age: 20, profession: 'Software Developer'},
    {name: 'Julia', age: 25, profession: 'UX Designer'},
    {name: 'Sebastião', age: 35, profession: 'Software Developer'},
    {name: 'Carla', age: 35, profession: 'Software Developer'},
  ]);

  private studentUserId = '2';

  constructor(private schoolService: SchoolService,
    private todoSignalsService: TodoSignalsService
  ){}

  ngOnInit(): void {
    this.handleFindStudentsById();
    //this.getSoftwareDeveloperNames();
    //this.getPeopleProfession();
    //this.getMultipliedAges();
    //this.getSchoolDatas();
  }

  public handleCheckIsDone(): void{
    setTimeout(() =>{
      this.isDoned = true;
    }, 200);
  }


  public handleCreateTodo(todo: Todo): void{
    if (todo){
      this.todoSignalsService.updateTodos(todo);
      this.todoSignal = this.todoSignalsService.todosState;
    }
  }

  public handleEmitEvent(): void{
    this.outputEvent.emit(this.projetcName);
  }

  public handleFindStudentsById(): void{
    this.getSudentsDatas()
    .pipe(
      switchMap((students) =>
        this.findStudentsById(students, this.studentUserId)
      )
    ).subscribe({
      next: (response) =>{
        console.log('RETORNO ESTUDANTE FILTRADO', response)
      }
    })
  }

  public findStudentsById(students: Array<SchoolData>, userId: string): Observable<(SchoolData | undefined)[]>{
    return of([students.find((student) => student.id === userId)]);
  }

  public getSoftwareDeveloperNames(): void{
    this.peopleDatas
    .pipe(
      filter((people) => people.profession === 'Software Developer'),
      map((people) => people.name)
    )
    .subscribe({
      next: (response) => console.log('NOME DO DESENVOLVEDOR', response),
    });
  }

  public getPeopleProfession(): void{
    this.peopleDatas
    .pipe(
      map((people) => people.profession)
    )
    .subscribe({
      next: (response) => console.log('PROFISSÃO', response),
    });
  }

  public getMultipliedAges(): void{
    this.ages
    .pipe(
      map((age) => age * 2)
    )
    .subscribe({
      next: (response) => console.log('IDADES MULTIPLICADA', response),
    })
  }

  private getSudentsDatas():  Observable<Array<SchoolData>>{
    return this.schoolService.getStudents();
  }

  private getTeachersDatas():  Observable<Array<SchoolData>>{
    return this.schoolService.getTeachers();
  }

  public getSchoolDatas(): void{
    this.zipSchoolResponses$
      .subscribe({
      next: (response) => {
        console.log('STUDENTS', response[0]);
        console.log('TEACHERS', response[1]);
      }
    })
  }

}
