import {Component, inject, signal} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  #authService = inject(AuthService);
  #formBuilder = inject(FormBuilder);
  #router = inject(Router);

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

    this.#authService.signIn(username, password).subscribe({
      next: (res) => {
        this.#authService.storeToken(res.access_token);
        // On successful sign-in, redirect to a protected route or dashboard
        this.#router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.message.set(`Error: ${error.error.message || 'Unable to sign in'}`);
      }}
    );
  }
}
