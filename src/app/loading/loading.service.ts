import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable()
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return undefined;
  }

  showLoadingScreen() {
    this.loadingSubject.next(true);
  }
  hideLoadingScreen() {
    this.loadingSubject.next(false);
  }
}
