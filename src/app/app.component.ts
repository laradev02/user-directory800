import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { LoadingBarComponent } from './components/loading-bar/loading-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, LoadingBarComponent],
  template: `
    <app-header></app-header>
    <app-loading-bar></app-loading-bar>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    main {
      flex: 1;
      overflow-y: auto;
      padding: 20px 0;
    }
  `]
})
export class AppComponent {}
