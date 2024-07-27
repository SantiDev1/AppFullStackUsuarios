import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Usuario } from '../models/Usuario.interface';
import { UsuarioService } from '../services/usuario.service';
import { environment } from '../environments/environment';


// esta session es de testdel servicio usuario
describe('UsuarioService', () => {
  let service: UsuarioService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsuarioService]
    });

    service = TestBed.inject(UsuarioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Debe de crear', () => {
    expect(service).toBeTruthy();
  });

  it('Debe hacer el fetch a la lista', () => {
    const dummyUsuarios: Usuario[] = [
      { id: 1, nombre: 'John Doe', email: 'john@example.com', edad: 30, fechanacimiento: '1991-01-01' },
      { id: 2, nombre: 'Jane Doe', email: 'jane@example.com', edad: 25, fechanacimiento: '1996-02-02' },
    ];

    service.getUsuarios().subscribe((usuarios: string | any[]) => {
      expect(usuarios.length).toBe(2);
      expect(usuarios).toEqual(dummyUsuarios);
    });

    const req = httpMock.expectOne(`${apiUrl}/Usuario`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsuarios);
  });

  it('Debe crear un usuario nuevo', () => {
    const newUser: Usuario = { id: 3, nombre: 'Alice', email: 'alice@example.com', edad: 22, fechanacimiento: '2000-03-03' };

    service.createUsuario(newUser).subscribe((user: any) => {
      expect(user).toEqual(newUser);
    });

    const req = httpMock.expectOne(`${apiUrl}/Usuario`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newUser);
    req.flush(newUser);
  });

  it('Debe actualizar un usuario ', () => {
    const updatedUser: Usuario = { id: 1, nombre: 'John Smith', email: 'johnsmith@example.com', edad: 31, fechanacimiento: '1990-01-01' };

    service.updateUsuario('1', updatedUser).subscribe((user: any) => {
      expect(user).toEqual(updatedUser);
    });

    const req = httpMock.expectOne(`${apiUrl}/Usuario/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedUser);
    req.flush(updatedUser);
  });

  it('Debe traer un usuario por el id', () => {
    const userId = '1';
    const dummyUser: Usuario = { id: 1, nombre: 'John Doe', email: 'john@example.com', edad: 30, fechanacimiento: '1991-01-01' };

    service.getUsuarioById(userId).subscribe((user: any) => {
      expect(user).toEqual(dummyUser);
    });

    const req = httpMock.expectOne(`${apiUrl}/Usuario/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUser);
  });

  it('debe elimianr un usuario', () => {
    const userId = 1;

    service.deleteUsuario(userId).subscribe((response: any) => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne(`${apiUrl}/Usuario/${userId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
