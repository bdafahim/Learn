import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {concatMap, finalize, tap} from 'rxjs/operators';

@Injectable()
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of(null)
      .pipe(
        tap(() => this.showLoadingScreen()),
        concatMap(() => obs$),
        finalize(() => this.hideLoadingScreen())
      );
  }

  showLoadingScreen() {
    this.loadingSubject.next(true);
  }
  hideLoadingScreen() {
    this.loadingSubject.next(false);
  }
}
