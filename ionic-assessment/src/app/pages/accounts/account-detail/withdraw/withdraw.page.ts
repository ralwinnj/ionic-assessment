import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/shared/api-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.page.html',
  styleUrls: ['./withdraw.page.scss'],
})
export class WithdrawPage implements OnInit {

  data;
  public withdrawForm: FormGroup;
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

    this.withdrawForm = this.formBuilder.group({
      amount: [0, Validators.compose([Validators.maxLength(50), Validators.required, Validators.email])],
    });
  }

  onFormSubmit() {
    console.log(this.data, this.withdrawForm);
    if (this.data.balance >= this.withdrawForm.value.amount) {
      this.data.balance = this.data.balance - this.withdrawForm.value.amount;
      this.storage.get('data').then(val => {

        this.api.updateAccount(val.accNumber, this.data, val.idToken)
          .subscribe((res: any) => {
            // this.data = res;
            this.presentAlert('Success', 'Withdrawal', 'Withdrawal was successful.');
          }, (err: any) => {
            console.log(err);
          });
      });
    } else {
      this.presentAlert('Failure', '', 'Withdrawal was unsuccessful. Insufficient funds');
    }
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
