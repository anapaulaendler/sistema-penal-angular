using SistemaPenal.Entities.Abstractions;

namespace SistemaPenal.Entities;

public class Estudo : Atividade
{
   public required string Materia { get; set; }
}
