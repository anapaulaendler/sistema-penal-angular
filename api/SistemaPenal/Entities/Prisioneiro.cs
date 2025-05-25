using SistemaPenal.Entities.Abstractions;

namespace SistemaPenal.Entities;

public class Prisioneiro : Pessoa
{
    public DateTime DiaDeChegada { get; set; }
    public DateTime DiaDeSaidaOriginal { get; set; }
    public DateTime DiaDeSaidaAtualizado { get; set; }
    public int ContadorDeLivros { get; set; }
    public int AnoAtual { get; set; }

    public List<Livro> Livros { get; set; } = [];
    public List<Estudo> Estudos { get; set; } = [];
    public List<DiaDeTrabalho> DiasDeTrabalho { get; set; } = [];
}