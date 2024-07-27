import { Component, OnDestroy, OnInit } from '@angular/core';
import { Usuario } from '../../../models/Usuario.interface';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ExportService } from '../../../services/export.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-listusuarios',
  templateUrl: './listusuarios.component.html',
  styleUrls: ['./listusuarios.component.css']
})
export class ListusuariosComponent implements OnInit, OnDestroy {
  usuarios: Usuario[] = [];
  usuariosFiltrados: Usuario[] = [];
  terminoBusqueda = '';
  loading: boolean = true;
  page: number = 1; 
  itemsPerPage: number = 4; 
  private destroy$ = new Subject<void>();

  constructor(
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    private router: Router,
    private exportService: ExportService
  ) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  exportToExcel(): void {
    this.exportService.exportToExcel(this.usuarios, 'usuarios.xlsx');
  }

  exportToPDF(): void {
    const doc = new jsPDF();
    doc.text('Lista de Usuarios', 10, 10);

    const columns = ['ID', 'Nombre', 'Email', 'Fecha Nacimiento'];
    const data = this.usuarios.map(usuario => [
      usuario.id,
      usuario.nombre,
      usuario.email,
      usuario.fechanacimiento
    ]);

    (doc as any).autoTable({
      head: [columns],
      body: data
    });

    doc.save('usuarios.pdf');
  }

  obtenerUsuarios(): void {
    this.usuarioService.getUsuarios().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        this.loading = false;
      },
      error: (error) => {
        console.log('Error al obtener usuarios', error);
        this.loading = false; 
      }
    });
  }

  onButtonClick(userId: string) {
    this.router.navigate(['/details', userId]);
  }

  onEditClick(userId: string) {
    this.router.navigate(['/edit', userId]);
  }

  deleteUsuario(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.deleteUsuario(id).pipe(
          takeUntil(this.destroy$)
        ).subscribe({
          next: () => {
            this.toastr.success('Registro eliminado con éxito');
            this.obtenerUsuarios();
          },
          error: (error) => {
            this.toastr.error('Error al eliminar el registro');
            console.error('Error al eliminar el usuario', error);
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
