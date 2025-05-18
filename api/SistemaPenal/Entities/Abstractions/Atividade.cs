using SistemaPenal.Interfaces;

namespace SistemaPenal.Entities.Abstractions;

public abstract class Atividade : IEntity
{
    public Guid Id { get; set; }
    public DateTime Data { get; set; }
    public Guid PrisioneiroId { get; set; }

    public Prisioneiro Prisioneiro { get; set; } = null!;
}