import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  nomeUsuario = signal('');
  emailUsuario = signal('');

router = inject(Router);

ngOnInit(): void {
  const auth = sessionStorage.getItem('auth') as string;
  const usuario = JSON.parse(auth);//convertendo para json novamente

  this.nomeUsuario.set(usuario.nome);
  this.emailUsuario.set(usuario.email);
}

//função para deslogar do sistema
  logout(): void {
    if (confirm('Deseja realmente sair do sistemaw')) {
      sessionStorage.removeItem('auth');
      this.router.navigate(['/login/autenticar-usuario']).then(() => {location.reload()});
    }
  }
}