import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario.interface';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // obtiene la lista de usuarios
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl + '/Usuario');
  }
// servicio para crear usuario
  createUsuario(user: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl + '/Usuario', user);
  }
// servicio para actualizar usuario
  updateUsuario(userId: string, user: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/Usuario/${userId}`, user);
  }
// servicio para obtener usuario especifico por el id
  getUsuarioById(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/Usuario/${id}`);
  }
// servicio para borrar usuario especifico por el id
  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Usuario/${id}`);
  }
}
