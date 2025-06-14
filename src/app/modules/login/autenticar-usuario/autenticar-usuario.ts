import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-autenticar-usuario',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './autenticar-usuario.html',
  styleUrl: './autenticar-usuario.css'
})
export class AutenticarUsuario {

  //injeções de dependência
  fb = inject(FormBuilder);
  htpp = inject(HttpClient)

  //estrutura do formulário
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(8)]]
  });

  //método para capturar o submit do formulário
  onSubmit() {
    this.htpp.post('http://localhost:8081/api/usuarios/autenticar',this.form.value).subscribe({
      next: (response)=>{
        console.log("resposta da api: ", response)
      },
      error: (e)=>{
        console.log("Erro ao autenticar: ", e.error.value);
      }
    })
  }

}
