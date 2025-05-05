using TalanCup.Application.Common;

namespace TalanCup.Infrastructure.Providers;
public class DateTimeProvider : IDateTimeProvider
{
    public DateTime Now => DateTime.Now;

    public DateTime UtcNow => DateTime.UtcNow;
}
