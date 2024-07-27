using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using Backend.Data;
using Backend.Models;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly AplicattionDbContext _context;

        public UsuarioController(AplicattionDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Usuario>> ObtenerUsuarios()
        {
            return _context.Usuarios.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<Usuario> ObtenerUsuario(Guid id)
        {
            var user = _context.Usuarios.Find(id);
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }

        [HttpPost]
        public IActionResult CrearUsuario(AddUsuarioDTO addUsuarioDTO)
        {
            // Verificar si el email ya existe
            var existingUser = _context.Usuarios
                .FirstOrDefault(u => u.Email == addUsuarioDTO.Email);

            if (existingUser != null)
            {
                
                return Conflict(new { message = "El correo electrónico ya está en uso." });
            }

            var usuarioDto = new Usuario()
            {
                Nombre = addUsuarioDTO.Nombre,
                Email = addUsuarioDTO.Email,
                Edad = addUsuarioDTO.Edad,
                Fechanacimiento = addUsuarioDTO.Fechanacimiento,
            };

            _context.Usuarios.Add(usuarioDto);
            _context.SaveChanges();

            return Ok(usuarioDto);
        }


        [HttpPut("{id}")]
        public IActionResult ActualizarUsuario(Guid id, UpdateUsuarioDTO updateUsuarioDTO)
        {
            var usuario = _context.Usuarios.Find(id);
            if (usuario == null)
            {
                return NotFound();
            }

            usuario.Nombre = updateUsuarioDTO.Nombre;
            usuario.Email = updateUsuarioDTO.Email;
            usuario.Edad = updateUsuarioDTO.Edad;
            usuario.Fechanacimiento = updateUsuarioDTO.Fechanacimiento;

            _context.Usuarios.Update(usuario);
            _context.SaveChanges();

            return Ok(usuario);
        }

        [HttpDelete("{id}")]
        public IActionResult EliminarUsuario(Guid id)
        {
            var usuario = _context.Usuarios.Find(id);
            if (usuario == null)
            {
                return NotFound();
            }

            _context.Usuarios.Remove(usuario);
            _context.SaveChanges();

            return Ok(usuario);
        }
    }
}

