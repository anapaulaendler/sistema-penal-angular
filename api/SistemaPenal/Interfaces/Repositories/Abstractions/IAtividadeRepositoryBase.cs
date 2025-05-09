using SistemaPenal.Interfaces.Repositories.Abstractions;
using Atividade = SistemaPenal.Entities.Abstractions.Atividade;

namespace SistemaPenal.Interfaces;

public interface IAtividadeRepositoryBase<TEntity> : IRepositoryBase<TEntity> where TEntity : Atividade
{
}