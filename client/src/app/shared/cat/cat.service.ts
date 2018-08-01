import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CatService {
  public API = '//localhost:8080';
  public CAT_API = this.API + '/cats';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.API + '/cool-cats');
  }

  get(id: string) {
    return this.http.get(this.CAT_API + '/' + id);
  }

  save(cat: any): Observable<any> {
    let result: Observable<Object>;
    if (cat['href']) {
      result = this.http.put(cat.href, cat);
    } else {
      result = this.http.post(this.CAT_API, cat);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}
