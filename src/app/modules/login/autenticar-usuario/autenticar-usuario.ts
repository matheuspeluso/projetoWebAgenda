import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-autenticar-usuario',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
    RouterLink
  ],
  templateUrl: './autenticar-usuario.html',
  styleUrl: './autenticar-usuario.css'
})
export class AutenticarUsuario {

  //atributos
  mensagemError = signal('');
  mensagemSucesso = signal('');

  //injeções de dependência
  fb = inject(FormBuilder);
  htpp = inject(HttpClient)
  router = inject(Router);

  //estrutura do formulário
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(8)]]
  });

  //método para capturar o submit do formulário
  onSubmit() {
    this.mensagemError.set('');
    // this.mensagemSucesso.set('');

    this.htpp.post(`${environment.apiUsuarios}/usuarios/autenticar`,this.form.value).subscribe({
      next: (response: any)=>{
        sessionStorage.setItem('auth',JSON.stringify(response))
        this.router.navigate(['/admin/painel-principal'])
            .then(()=> {location.reload();
        });
      },
      error: (e)=>{
        console.log("Erro ao autenticar: ", e.error.value);
        this.mensagemError.set(e.error[0]);
      }
    })
  }

}
