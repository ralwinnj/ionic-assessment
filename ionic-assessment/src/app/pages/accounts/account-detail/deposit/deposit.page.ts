import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/shared/api-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.page.html',
  styleUrls: ['./deposit.page.scss'],
})
export class DepositPage implements OnInit {

  data;
  public depositForm: FormGroup;
  constructor(
    private api: ApiServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
    public alertController: AlertController,
    public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.storage.get('data').then(val => {
      this.api.getAccount(val.accNumber, val.idToken)
        .subscribe((res: any) => {
          this.data = res;
        }, (err: any) => {
          console.log(err);
        });
    });

    this.depositForm = this.formBuilder.group({
      amount: [0, Validators.compose([Validators.maxLength(50), Validators.required, Validators.email])],
    });
  }

  onFormSubmit() {
    console.log(this.data, this.depositForm);

    this.data.balance = this.data.balance + this.depositForm.value.amount;
    this.storage.get('data').then(val => {

      this.api.updateAccount(val.accNumber, this.data, val.idToken)
        .subscribe((res: any) => {
          // this.data = res;
          this.presentAlert('Success', 'Deposit', 'Deposit was successful.');
        }, (err: any) => {
          console.log(err);
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
