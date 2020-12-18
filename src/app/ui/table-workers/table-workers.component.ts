import {Component, OnInit, Input, Output, EventEmitter,} from '@angular/core';
import {MyWorker} from 'src/app/shared/worker.model';
import {HttpWorkersService} from '../../shared/services/http-workers.service';

@Component({
  selector: 'app-table-workers',
  templateUrl: './table-workers.component.html',
  styleUrls: ['./table-workers.component.css'],
})
export class TableWorkersComponent implements OnInit {
  @Input() title: string;
  @Input() workers: MyWorker[];

  @Output() deleteWorker = new EventEmitter<number>();
  @Output() editWorker = new EventEmitter<number>();
  @Output() saveWorker = new EventEmitter<any>();

  constructor(private HttpWorkersService: HttpWorkersService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    try {
      this.workers = await this.HttpWorkersService.getWorkers();
    } catch (err) {
      console.error(err);
    }
  }

  onDeleteWorker(id: number) {
    this.deleteWorker.emit(id);
  }

  onEditWorker(id: number) {
    this.editWorker.emit(id);
  }

  onSaveWorker(id: number, name: string, surname: string, phone: string, type: number) {
    const arr = [id, name, surname, phone, type];
    this.saveWorker.emit(arr);
  }
}
