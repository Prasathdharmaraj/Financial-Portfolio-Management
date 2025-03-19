import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/base-setup/services/api-setup.service';
import { AppService } from 'src/app/base-setup/services/app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  headerTitle: string = "Dashboard"

  constructor(private router: Router, private appservice: AppService, public apiService: ApiService) {

  }

  ngOnInit() {
    this.appservice.updateHeader(this.headerTitle)
  }
}
