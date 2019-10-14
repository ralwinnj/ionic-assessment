import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/shared/api-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { async } from 'q';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
})
export class AccountsPage implements OnInit {

  constructor(
    private api: ApiServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
    public alertController: AlertController
  ) {
  }

  public isLoading: boolean;

  public localId;
  public idToken;
  public data;

  ngOnInit() {
    this.loadData();
  }

  loadData() {

    this.storage.get('data').then((val) => {
      this.api.getAccounts(val.localId, val.idToken)
        .subscribe((res: any) => {
          this.isLoading = false;
          this.data = res;
        }, (err: any) => {
          console.log(err);
          this.isLoading = false;
        });
    });
    // this.data = d;
    console.log('My Accounts is: ', this.data);
    // console.log(this.storage.get('localId'));
    // console.log(this.storage.get('tokenId'));
  }

  getAccount(accountNumber) {
    console.log(accountNumber);
    this.storage.get('data').then(val => {
      const d = {
        localId: val.localId,
        idToken: val.idToken,
        accNumber: accountNumber
      };
      this.storage.set('data', d);
      this.router.navigate(['/account-detail']);
    });
  }

  addAccount() {
    // generate account number here.
    const accNumber = Math.floor(100000000 + Math.random() * 900000000);
    this.storage.get('data').then(val => {
      const body = {
        balance: 0,
        overdraft: 0
      };

      this.api.addAccount(accNumber, body, val.idToken)
        .subscribe((res: any) => {
          console.log(res);
          this.loadData();
          this.presentAlert('Account created', accNumber, 'Your account has been created successfully.');

        }, (err: any) => {
          console.log(err);
          this.isLoading = false;
        });
    });

  }



  async presentAlert(header, subHeader, message) {
    const alert = await this.alertController.create({
      header: header || 'Alert',
      subHeader: subHeader || 'Subtitle',
      message: message || 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
