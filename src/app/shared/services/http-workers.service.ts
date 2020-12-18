import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MyWorker} from '../worker.model';

@Injectable({
  providedIn: 'root'
})
export class HttpWorkersService {
  routeApi = 'http://localhost:3000/MyWorkersDatabase';

  constructor(private http: HttpClient) {
  }

  getWorkers(): Promise<any> {
    return this.http.get(this.routeApi).toPromise();
  }

  postWorker(data: MyWorker) {
    return this.http.post(this.routeApi, data).toPromise();
  }

  deleteWorker(id) {
    return this.http.delete(this.routeApi + '/' + id).toPromise();
  }

  saveWorker(id, arr) {
    let data = {
      id: arr[0],
      name: arr[1],
      surname: arr[2],
      type: arr[4],
      phone: arr[3],
      bool: true
    };
    return this.http.put(this.routeApi + '/' + id, data).toPromise();
  }
}
