import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  length: number = 0;
  password = '';
  passwordForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.passwordForm = this.formBuilder.group({
      useLetters: [false],
      useNumbers: [false],
      useSymbols: [false],
      passwordLength: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[1-9]\d*$/),
        ]),
      ],
    });
  }

  onButtonClick() {
    const numbers = '1234567890';
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const symbols = '!@#$%^&*()*+-';

    let validChars = '';
    if (this.passwordForm.get('useLetters')?.value) {
      validChars += letters;
    }
    if (this.passwordForm.get('useNumbers')?.value) {
      validChars += numbers;
    }
    if (this.passwordForm.get('useSymbols')?.value) {
      validChars += symbols;
    }
    if (!validChars) {
      this.password = 'Please select a checkbox';
      return;
    }

    const passwordLength = this.passwordForm.get('passwordLength')?.value;
    let generatedPassword = '';
    for (let i = 0; i < passwordLength; i++) {
      const index = Math.floor(Math.random() * validChars.length);
      generatedPassword += validChars[index];
    }
    this.password = generatedPassword;
  }

  getPassword() {
    return this.password;
  }
}
