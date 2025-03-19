import { Component } from '@angular/core';
import { AppService } from 'src/app/base-setup/services/app.service';

@Component({
  selector: 'app-common-loader',
  templateUrl: './common-loader.component.html',
  styleUrls: ['./common-loader.component.scss']
})
export class CommonLoaderComponent {
  constructor(public appService: AppService,){
  
  }
}
