using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class AddUsuarioDTO
    {
        [Required]
        [StringLength(100, MinimumLength = 3)]
        public string? Nombre { get; set; }

        [Required]
        [EmailAddress]
        [RegularExpression(@".*\..*", ErrorMessage = "El email debe contener un punto (.) en cualquier parte.")]
        public string? Email { get; set; }

        [Required]
        public int? Edad { get; set; }

        [Required]
        public DateTime? Fechanacimiento { get; set; }
    }
}
