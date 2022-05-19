using Microsoft.EntityFrameworkCore;
using PDSACW.Domain.Entities;

namespace PDSACW.Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<User> Users { get; }

        DbSet<ShortestPathGame> ShortestPathGame { get; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
