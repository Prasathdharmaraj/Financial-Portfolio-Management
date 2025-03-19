import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppService } from 'src/app/base-setup/services/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() headerTitle: any;
  constructor(private appService: AppService, private router: Router ) {  }

  ngOnInit() {
    this.appService.currentHeader.subscribe((val: string) =>
      this.headerTitle = val
    );
  }
  redirect(eve: string){
    this.router.navigate([eve])
  }
}
