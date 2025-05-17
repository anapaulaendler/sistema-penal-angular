namespace SistemaPenal.DTOs;

public class EstudoDTO
{
    public Guid Id { get; set; }
    public DateTime Date { get; set; }
    public required string Subject { get; set; }
}

public class CriarEstudoDTO
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime Date { get; set; } = DateTime.Today;
    public required string Subject { get; set; }
}
