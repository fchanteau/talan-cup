namespace TalanCup.Application.Common;
public interface IDateTimeProvider
{
    DateTime Now { get; }
    DateTime UtcNow { get; }
}
