import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  userForm: FormGroup;
 

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private userService: UsuarioService,
    private router: Router
  ) {

    // el form valida que todos los campos esten llenos requeridosy que cumplan con los requisitos
    this.userForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      edad: ['', [Validators.required]],
      fechanacimiento: ['', [Validators.required]]
    });

   
  }


  // al enviar el formulario valida
  onSubmit() {
    if (this.userForm.status == "INVALID") {
      const nameControl = this.userForm.get('nombre');
      const emailControl = this.userForm.get('email');
      const ageControl = this.userForm.get('edad');
      const dobControl = this.userForm.get('fechanacimiento');

   

      if (nameControl?.status == "INVALID") {
        this.toastr.error('El nombre es obligatorio y debe tener al menos 3 caracteres.');
      }
      if (emailControl?.status == "INVALID") {
        this.toastr.error('El email es obligatorio y debe ser válido.');
      }
      if (ageControl ?.status == "INVALID") {
        this.toastr.error('La edad es obligatoria.');
      }
      if (dobControl ?.status == "INVALID") {
        this.toastr.error('La fecha de nacimiento es obligatoria.');
      }
      return;
    }

    //hace el llamado a la api y crea el usuario si cumple con los requisitos

    this.userService.createUsuario(this.userForm.value).subscribe({
      next: (user) => {
        this.toastr.success('Usuario añadido con éxito.');
        this.router.navigate(['/listusuarios']);
      },
      error: (err) => {
        if (err.status === 409) {
          this.toastr.error('El correo electrónico ya está en uso.');
        } else if(err.error.errors.Email[0]){
          this.toastr.error(err.error.errors.Email[0])
        }
      }
    });
  }

}
