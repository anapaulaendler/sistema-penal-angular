using System.Data.Common;
using Microsoft.EntityFrameworkCore;
using SistemaPenal.Interfaces;

namespace SistemaPenal.Context;

/// <summary>
/// A UnitOfWork *só* deve ser chamada quando há transações no banco (ou seja, se afeta o objeto da entidade de alguma forma!) 
/// </summary>
public class AppUnitOfWork : IUnitOfWork
{
    private readonly AppDbContext _context;
    private DbTransaction? _currentTransaction;

    public AppUnitOfWork(AppDbContext context)
    {
        _context = context;
    }

    // ana: assim como o nome indica, a função abaixo COMEÇA UMA TRANSAÇÃO.
    // se a CurrentTransaction é nula, ele abre uma dbConnection
    public async Task BeginTransactionAsync()
    {
        if (_context.Database.CurrentTransaction is null)
        {
            var dbConnection = _context.Database.GetDbConnection();

            if (dbConnection.State == System.Data.ConnectionState.Closed)
            {
                await dbConnection.OpenAsync();
            }

            _currentTransaction = await dbConnection.BeginTransactionAsync();
            await _context.Database.UseTransactionAsync(_currentTransaction);
        }
    }

    // ana: COMMITAR = Salvar. uma bela UOW geralmente tem mais coisas, mas
    // eu prefiro deixar super simples.
    public async Task CommitTransactionAsync()
    {
        try
        {
            if (_currentTransaction is not null)
            {
                await _context.SaveChangesAsync(); // viu? salva aqui!
                await _currentTransaction.CommitAsync();
            }
        }
        finally
        {
            await DisposeTransactionAsync(); // função abaixo!
        }
    }

    // transforma a transação atual em nula. abre ela de novo.
    private async Task DisposeTransactionAsync()
    {
        if (_currentTransaction is not null)
        {
            await _currentTransaction.DisposeAsync();
            _currentTransaction = null;
        }
    }

    // se deu merda, ao invés de salvar você pode dar um rollback!
    public async Task RollbackTransactionAsync()
    {
        if (_currentTransaction is not null)
        {
            await _currentTransaction.DisposeAsync();
            _currentTransaction = null;
        }
    }
}