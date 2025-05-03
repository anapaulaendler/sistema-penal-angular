using SistemaPenal.Enums;
using SistemaPenal.Interfaces;

namespace SistemaPenal.Extensions;

public class OperationResult<TEntity> where TEntity : class, IEntity
{
    public OperationResult()
    {
        Messages = [];
    }

    public OperationResult(params ResultMessage[] messages)
    {
        Messages = [.. messages];
    }

    public TEntity? Value { get; init; }
    public bool HasErrors() => Messages.Count > 0;
    public bool Success => !HasErrors();
    public IReadOnlyCollection<ResultMessage> Messages { get; init; }
    public IEnumerable<ResultMessage> SearchForErrors() 
        => Messages.Where(message => message.ResultType == ResultTypes.Error);
}