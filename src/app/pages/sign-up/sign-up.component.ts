import {Component, inject, signal} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  #authService = inject(AuthService);
  #formBuilder = inject(FormBuilder);

  form = this.#formBuilder.group({
    username: '',
    password: ''
  })
  message = signal('');

  onSubmit() {
    const username = this.form.controls.username.value
    const password = this.form.controls.password.value

    if (!username || !password) {
      this.message.set('Please fill in all fields');
      return;
    }

    this.#authService.signUp(username, password).subscribe({
      next: () => {
        this.message.set('User created. You can now sign in.');
      },
      error: (error: any) => {
        this.message.set(`Error: ${error.error.message || 'Unable to sign up'}`);
      }
    }
    );
  }
}
