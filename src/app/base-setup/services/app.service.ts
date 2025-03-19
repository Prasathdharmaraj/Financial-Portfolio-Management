import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  decrypted: string;

  constructor(private snackBar: MatSnackBar) { }

  public loading = new BehaviorSubject<any>(false);
  public isLoading = this.loading.asObservable();
  headerTitle = new BehaviorSubject("Home");
  currentHeader = this.headerTitle.asObservable();

  set setLoading(name: any) {
    this.loading.next(name);
  }


  openSnackBar(message: string, action?: string) {
    return this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
  updateHeader(newHeader: any) {
    this.headerTitle.next(newHeader)
  }
}
