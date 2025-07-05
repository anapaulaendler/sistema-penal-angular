using SistemaPenal.Entities.Abstractions;

namespace SistemaPenal.Entities;

public class Livro : Atividade
{
    public required string Isbn { get; set; }
}