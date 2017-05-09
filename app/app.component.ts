import { Component } from '@angular/core';

@Component({
    selector: 'bl-app',
    template: `
        <h1>{{ pageTitle }}</h1>
    `
})
export class AppComponent { 
    pageTitle: string = "The Bucket List"
}
