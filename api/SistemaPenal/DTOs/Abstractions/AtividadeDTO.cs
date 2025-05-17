using SistemaPenal.DTOs;

namespace SistemaPenal.DTOs;

public abstract class AtividadeDTO : IDTO
{
    public DateTime Data { get; set; }
    public Guid PrisioneiroId { get; set; }
}

public abstract class CriarAtividadeDTO : IDTO
{
    public override Guid Id { get; set; } = Guid.NewGuid();
    public DateTime Data { get; set; } = DateTime.Today;
    public Guid PrisioneiroId { get; set; }
}