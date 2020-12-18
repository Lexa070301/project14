import {Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import {MyWorker} from 'src/app/shared/worker.model';

@Component({
  selector: 'app-table-workers',
  templateUrl: './table-workers.component.html',
  styleUrls: ['./table-workers.component.css'],
})
export class TableWorkersComponent implements OnInit {
  @Input() title: string;
  @Input() workers: MyWorker[] = [];

  @Output() deleteWorker = new EventEmitter<number>();
  @Output() editWorker = new EventEmitter<number>();
  @Output() saveWorker = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onDeleteWorker(id: number) {
    this.deleteWorker.emit(id);
  }

  onEditWorker(id: number) {
    this.editWorker.emit(id);
  }

  onSaveWorker(id: number, name: string, surname: string, phone: string) {
    let arr = [id, name, surname, phone];
    this.saveWorker.emit(arr);
  }
}
