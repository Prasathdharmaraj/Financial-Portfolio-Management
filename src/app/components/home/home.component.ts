import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/base-setup/services/api-setup.service';
import { AppService } from 'src/app/base-setup/services/app.service';

interface Provider {
  id: number,
  img: string,
  title: string,
  navigate: string
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  headerTitle: any = 'Financial Portfolio Management System';
  menuList: Array<Provider> = [
    {
      id: 1,
      img: "assets/images/dashboard.jpg",
      title: "Dashboard",
      navigate: '/dashboard',
    },
    {
      id: 2,
      img: "assets/images/create_form.jpg",
      title: "User Data",
      navigate: '/userdata',
    }    
  ]

  constructor(private router: Router, private appservice: AppService, public apiService: ApiService) {
   
  }

  ngOnInit() {
    this.appservice.updateHeader(this.headerTitle)
  }
  navigateTo(eve: string) {
    this.router.navigate([eve])
  }

}
