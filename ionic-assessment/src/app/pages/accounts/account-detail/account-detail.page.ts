import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/shared/api-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.page.html',
  styleUrls: ['./account-detail.page.scss'],
})
export class AccountDetailPage implements OnInit {

  public data;

  constructor(
    private api: ApiServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.storage.get('data').then(val => {
      this.api.getAccount(val.accNumber, val.idToken)
        .subscribe((res: any) => {
          this.data = res;
        }, (err: any) => {
          console.log(err);
        });
    });
  }

  withdraw() {
    this.router.navigate(['/withdraw']);
    // this.api.updateAccount()
  }

  deposit() {
    this.router.navigate(['/deposit']);
  }
}
