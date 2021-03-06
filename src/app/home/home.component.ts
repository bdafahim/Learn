import {Component, OnInit} from '@angular/core';
import {Course, sortCoursesBySeqNo} from '../model/course';
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delay, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CourseDialogComponent} from '../course-dialog/course-dialog.component';
import {CoursesServices} from '../services/courses.services';
import {LoadingService} from '../loading/loading.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;


  constructor(private courseService: CoursesServices, private loadingService: LoadingService) {

  }

  ngOnInit() {
    this.reloadCourses();
  }
  reloadCourses() {
    // this.loadingService.showLoadingScreen();
    const courses$ = this.courseService.loadAllCourses()
      .pipe(
        map(courses => courses.sort(sortCoursesBySeqNo)),
       // finalize(() => this.loadingService.hideLoadingScreen())
      );
    const loadCourses$ = this.loadingService.showLoaderUntilCompleted(courses$);
    this.beginnerCourses$ = loadCourses$
      .pipe(
        map(courses => {
          return courses.filter(course => course.category === 'BEGINNER');
        })
      );
    this.advancedCourses$ = loadCourses$
      .pipe(
        map(courses => {
          return courses.filter(course => course.category === 'ADVANCED');
        })
      );
  }



}




