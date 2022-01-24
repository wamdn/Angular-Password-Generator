import { Component } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public passLen = 0;
  public useLetters = false;
  public useNumbers = false;
  public useSymbols = false;
  public password = '';

  public faCopy = faCopy;

  constructor(private clipboard: Clipboard) {}

  copyText(textToCopy: string) {
    this.clipboard.copy(textToCopy);
  }

  public onInputLength(e: Event): void {
    const len = parseInt((<HTMLInputElement>e.target).value, 10);
    const maxLen = 255;
    this.passLen = isNaN(len) ? 0 : len > maxLen ? maxLen : len;
  }

  public onGeneratePassword(): void {
    const letters = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz';
    const numbers = '0123456789';
    const symbols = '~`! @#$%^&*()_-+={[}]|\\:;"\'<,>.?/';
    const charArray: string[] = [];
    let allCharaters = '';

    if (this.useLetters) allCharaters += letters;
    if (this.useNumbers) allCharaters += numbers;
    if (this.useSymbols) allCharaters += symbols;

    for (let i = 0; i < this.passLen; i++) {
      const charIdx = Math.floor(Math.random() * allCharaters.length);
      charArray.push(allCharaters[charIdx]);
    }
    this.password = charArray.join('');
  }
}
