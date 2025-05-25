namespace SistemaPenal.DTOs;

public class PrisioneiroDTO : PessoaDTO
{
    public DateTime DiaDeChegada { get; set; }
    public DateTime DiaDeSaidaOriginal { get; set; }
    public DateTime DiaDeSaidaAtualizado { get; set; }
    public int ContadorDeLivros { get; set; }
    public int AnoAtual { get; set; }

    public List<LivroDTO> Livros { get; set; } = [];
    public List<EstudoDTO> Estudos { get; set; } = [];
    public List<DiaDeTrabalhoDTO> DiasDeTrabalho { get; set; } = [];
}

public class PrisioneiroOnlyDTO : PessoaDTO
{
    public DateTime DiaDeChegada { get; set; }
    public DateTime DiaDeSaidaOriginal { get; set; }
    public DateTime DiaDeSaidaAtualizado { get; set; }
}

public class PrisioneiroCreateDTO : PessoaCreateDTO
{
    public int ContadorDeLivros { get; set; } = 0;
    public int AnoAtual { get; set; } = DateTime.Now.Year;
    public DateTime DiaDeChegada { get; set; }
    public DateTime DiaDeSaidaOriginal { get; set; }
}

public class PrisioneiroUpdateDTO : PessoaUpdateDTO
{
    public required string Nome { get; set; }
}

public class PrisionerDiaDeSaidaUpdate : PessoaUpdateDTO
{
    public DateTime DiaDeSaidaAtualizado { get; set; }
}