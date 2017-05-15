import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

/**
 * Service helps communicate between the ToastComponent and AppComponent.
 */
@Injectable()
export class ToastService {
    // Observable string sources
    private positionSource = new Subject<string>();

    // Observable string streams
    position$ = this.positionSource.asObservable();

    setPosition(position: string) {
        this.positionSource.next(position);
    }

    success(options: object) {

    }
}