import {Component, OnInit} from '@angular/core';
import {
  MyWorker,
  MyWorkerType,
} from './shared/worker.model';
import {HttpWorkersService} from './shared/services/http-workers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  title = 'Список сотрудников';
  workers: MyWorker[] = [];
  myWorkerType = MyWorkerType;

  constructor(private HttpWorkersService: HttpWorkersService) {
  }

  async getData() {
    try {
      this.workers = await this.HttpWorkersService.getWorkers();
    } catch (err) {
      console.error(err);
    }
  }

  ngOnInit(): void {
    this.getData();
  }

  getByType(type: number) {
    return this.workers.filter((worker) => worker.type === type);
  }

  async onDeleteById(id: number) {
    try {
      // const index = this.workers.findIndex((worker) => worker.id === id);
      // if (index !== -1) {
      await this.HttpWorkersService.deleteWorker(id);
      // }
    } catch (err) {
      console.error(err);
    } finally {
      this.getData();
    }

    // if (index !== -1) {
    //   this.workers.splice(index, 1);
    // }
  }

  onEditById(id: number) {
    const index = this.workers.findIndex((worker) => worker.id === id);
    if (index !== -1) {
      this.workers[index].bool = false;
    }
  }

  async onSaveById(arr: any) {
    try {
      const index = this.workers.findIndex((worker) => worker.id === arr[0]);
      if ((this.workers[index].name.trim() == '') || (this.workers[index].surname.trim() == '') || (this.workers[index].phone.trim() == '')) {
        alert('Заполните все поля!');
      } else {
        if (index !== -1) {
          this.workers[index].bool = true;
        }
        await this.HttpWorkersService.saveWorker(arr[0], arr);
      }
    } catch (err) {
      console.error(err);
    } finally {
      this.getData();
    }
  }

  async onAddWorker(worker) {
    try {
      const id =
        this.workers.length > 0
          ? this.workers[this.workers.length - 1].id + 1
          : 0;
      worker.id = id;
      await this.HttpWorkersService.postWorker(worker);
    } catch (err) {
      console.error(err);
    } finally {
      this.getData();
    }
    //
    // const id =
    //   this.workers.length > 0
    //     ? this.workers[this.workers.length - 1].id + 1
    //     : 0;
    // worker.id = id;
    // this.workers.push(worker);
  }
}
