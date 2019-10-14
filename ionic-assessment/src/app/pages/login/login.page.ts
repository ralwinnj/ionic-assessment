import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/shared/api-service.service';
import { Storage } from '@ionic/storage';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;

  public isLoading = false;

  constructor(
    public formBuilder: FormBuilder,
    private api: ApiServiceService,
    public storage: Storage,
    private router: Router
  ) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.maxLength(50), Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])],
      returnSecureToken: [true]
    });
  }

  ngOnInit() {
  }

  onFormSubmit() {
    this.isLoading = true;
    this.api.login(this.loginForm.value)
      .subscribe((res: any) => {
        this.isLoading = false;
        console.log('Success!');
        const data = {
          idToken: res.idToken,
          localId: res.localId
        };
        this.storage.set('data', data);
        this.router.navigate(['/accounts']);

      }, (err: any) => {
        console.log(err);
        this.isLoading = false;
      });

  }

}
