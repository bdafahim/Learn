import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Course} from '../model/course';
import {map, shareReplay} from 'rxjs/operators';
import {observableToBeFn} from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class CoursesServices {
  constructor(private httpClient: HttpClient) {
  }
  loadAllCourses(): Observable<Course[]> {
    return this.httpClient.get<Course[]>("/api/courses")
      .pipe(
        map(res => res['payload']),
        shareReplay()
      );
  }
  saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {
    return this.httpClient.put(`/api/courses/${courseId}`, changes)
      .pipe(
        shareReplay()
      );
  }
}
