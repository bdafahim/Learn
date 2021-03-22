import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Course} from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesServices {
  constructor(private httpClient: HttpClient) {
  }
  loadAllCourses(): Observable<Course[]> {
    return this.httpClient.get<Course[]>("/api/courses")
      .pipe(
        map( )
      );
  }
}