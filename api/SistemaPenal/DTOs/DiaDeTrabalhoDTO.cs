namespace SistemaPenal.DTOs;

public class WorkDayDTO
{
    public Guid Id { get; set; }
    public DateTime Date { get; set; }
    public string? Description { get; set; }

}

public class WorkDayCreateDTO
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime Date { get; set; } = DateTime.Today;
    public string? Description { get; set; }
}