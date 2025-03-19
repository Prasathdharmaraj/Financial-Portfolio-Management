import { Component } from '@angular/core';
import { AppService } from './base-setup/services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  headerTitle = 'checkkapp'
  constructor(
  ) { 
  }
}
