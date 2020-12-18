import {Component} from '@angular/core';
import {
  MyWorker,
  MyWorkersDatabase,
  MyWorkerType,
} from './shared/worker.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'Список сотрудников';
  workers: MyWorker[] = MyWorkersDatabase;
  myWorkerType = MyWorkerType;

  getByType(type: number) {
    return this.workers.filter((worker) => worker.type === type);
  }

  onDeleteById(id: number) {
    let index = this.workers.findIndex((worker) => worker.id === id);
    if (index !== -1) {
      this.workers.splice(index, 1);
    }
  }

  onEditById(id: number) {
    let index = this.workers.findIndex((worker) => worker.id === id);
    if (index !== -1) {
      this.workers[index].bool = false;
    }
  }

  onSaveById(arr: any) {
    let index = this.workers.findIndex((worker) => worker.id === arr[0]);
    if (this.workers[index].name.trim() == '') {
      this.workers[index].name = 'Default name';
    }
    if (this.workers[index].surname.trim() == '') {
      this.workers[index].surname = 'Default surname';
    }
    if (this.workers[index].phone.trim() == '') {
      this.workers[index].phone = 'Default +7(999)999-99-99';
    }
    if (index !== -1) {
      this.workers[index].bool = true;
    }
  }

  onAddWorker(worker) {
    let id =
      this.workers.length > 0
        ? this.workers[this.workers.length - 1].id + 1
        : 0;
    worker.id = id;
    this.workers.push(worker);
  }
}
