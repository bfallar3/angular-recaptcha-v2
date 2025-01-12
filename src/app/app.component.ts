import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'reCaptcha-demo v2';
  RECAPTCHA_SITE_KEY: string = '6Lc7vmIUAAAAAGvH82S5oxpTsGYIrlcVZZlnSKMB';
  token: string = '';
  message: string = '';
  canSubmit: boolean = false;

  resolved(captchaResponse: string) {
    this.token = captchaResponse;

    // Validate the token response
    try {
      fetch('http://localhost:3000/api/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `captchaResponse=${captchaResponse}`,
      }).then((data) => {
        console.log(data);
        if(data.status === 200) {
          this.canSubmit = true;
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  submit() {
    this.message = 'Form submitted successfully';
  }
}
