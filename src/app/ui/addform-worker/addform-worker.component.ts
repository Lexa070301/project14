import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {MyWorkerType, MyWorker} from 'src/app/shared/worker.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-addform-worker',
  templateUrl: './addform-worker.component.html',
  styleUrls: ['./addform-worker.component.css'],
})
export class AddformWorkerComponent implements OnInit {
  myWorkerType = MyWorkerType;
  // name: string;
  // surname: string;
  // phone: string;
  type = 0;
  myForm: FormGroup = new FormGroup({
    'name': new FormControl('', [
      Validators.required
    ]),
    'surname': new FormControl('', [
      Validators.required,
    ]),
    'phone': new FormControl('', Validators.pattern('[0-9]{10}')),
    'type': new FormControl('', [
      Validators.required,
    ]),
  });
  @Output() addWorker = new EventEmitter<MyWorker>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onAddWorker() {
    let name = this.myForm.value.name;
    let surname = this.myForm.value.surname;
    let phone = this.myForm.value.phone;
    let type = this.myForm.value.type;
    console.log(this.myForm);
    if (this.myForm.status == "VALID") {
      this.addWorker.emit({
        name: name,
        surname: surname,
        type: type,
        phone: phone,
        bool: true,
      });
    } else {
      alert('Заполните все поля!');
    }
  }
}
