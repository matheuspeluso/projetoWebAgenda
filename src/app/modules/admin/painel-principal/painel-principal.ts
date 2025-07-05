import { Component } from '@angular/core';
import { Navbar } from "../../shared/navbar/navbar";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-painel-principal',
  imports: [Navbar,RouterLink],
  templateUrl: './painel-principal.html',
  styleUrl: './painel-principal.css'
})
export class PainelPrincipal {

}
