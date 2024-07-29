import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../../services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  userForm: FormGroup;
  userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private userService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute 
  ) {

     // el form valida que todos los campos esten llenos requeridosy que cumplan con los requisitos
    this.userForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      edad: ['', [Validators.required]],
      fechanacimiento: ['', [Validators.required]]
    });
  }

  // al iniciar el componente trae el id por params par a devolverlo a  la api para hacer el update
  ngOnInit() {
 
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
      
      if (this.userId) {
   
        this.loadUserData(this.userId);
      } else {
        this.toastr.error('No se encontró el ID del usuario.');
      }
    });
  }

   // al enviar el formulario si el fomr es valido hace el put  en la api
  onSubmit() {
    if (this.userForm.invalid) {
      this.displayFormErrors();
      return;
    }

    if (!this.userId) {
      this.toastr.error('Usuario no encontrado.');
      return;
    }

    this.userService.updateUsuario(this.userId, this.userForm.value).subscribe({
      next: (user) => {
        this.toastr.success('Usuario actualizado con éxito.');
        this.router.navigate(['/listusuarios']);
      },
      error: (err) => {
         if(err.error.errors.Email[0]){
          this.toastr.error(err.error.errors.Email[0]);
        } else {
          console.error('Error actualizar Usuario')
        }
      }
    });
  }

  // carga la informacion del usuario por id
  private loadUserData(userId: string) {

    this.userService.getUsuarioById(userId).subscribe(user => {
      if (user.fechanacimiento) {
        const date = new Date(user.fechanacimiento);
        user.fechanacimiento = date.toISOString().split('T')[0]; 
      }
      this.userForm.patchValue(user);
    }, error => {
      this.toastr.error('No se pudo cargar la información del usuario.');
    });
  }
// Manejo de errores
  private displayFormErrors() {
    const controls = this.userForm.controls;
    if (controls['nombre'].invalid) {
      this.toastr.error('El nombre es obligatorio y debe tener al menos 3 caracteres.');
    }
    if (controls['email'].invalid) {
      this.toastr.error('El email es obligatorio y debe ser válido.');
    }
    if (controls['edad'].invalid) {
      this.toastr.error('La edad es obligatoria.');
    }
    if (controls['fechanacimiento'].invalid) {
      this.toastr.error('La fecha de nacimiento es obligatoria.');
    }
  }
}
