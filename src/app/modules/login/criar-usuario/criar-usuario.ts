import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-criar-usuario',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './criar-usuario.html',
  styleUrl: './criar-usuario.css'
})
export class CriarUsuario {
  //atributos
  mensagemSucesso  = signal('');
  mensagemErro = signal('');

  //injeções de dependencias
  http = inject(HttpClient);
  fb = inject(FormBuilder);

  form = this.fb.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
    senhaConfirmacao: ['', Validators.required],
    });

    onSubmit() {
      this.mensagemSucesso.set('');
      this.mensagemErro.set('');

      if(this.form.value.senha != this.form.value.senhaConfirmacao){
        this.mensagemErro.set('As senhas não coincidem');
        return;
      }

      this.http.post(`${environment.apiUsuarios}/usuarios/criar`, this.form.value).subscribe({
        next: (res : any) => {
          this.mensagemSucesso.set(res.mensagem);
          this.form.reset();
        },
        error: (err) => {
          this.mensagemErro.set(err.error[0]);
        }
      });

    }

}