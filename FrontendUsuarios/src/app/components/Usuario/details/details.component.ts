// details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
 // Ajusta la ruta si es necesario
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/Usuario.interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  userId: string | null = null;
  user: Usuario = {
    id: 0,
    nombre: '',
    email: '',
    edad: 0,
    fechanacimiento: ''
  };
  
  constructor(
    private route: ActivatedRoute,
    private userService: UsuarioService
  ) { }


  // al iniciar el componente por medio de params obtiene el id y hace la consulta a la api para traer el usuario especifico

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
      if (this.userId) {
        this.userService.getUsuarioById(this.userId).subscribe(
          data => {
            this.user = data;
          },
          error => {
            console.error('Error al obtener detalles del usuario:', error);
          }
        );
      }
    });
  }
}

