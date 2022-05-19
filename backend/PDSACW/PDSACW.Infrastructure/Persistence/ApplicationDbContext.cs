using Microsoft.EntityFrameworkCore;
using PDSACW.Application.Common.Interfaces;
using PDSACW.Domain.Entities;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace PDSACW.Infrastructure.Persistence
{
    public class ApplicationDbContext : DbContext, IApplicationDbContext
    {
        public DbSet<User> Users { get; set; }

        public DbSet<ShortestPathGame> ShortestPathGame { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

     
        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken)
        {
            foreach (var entry in ChangeTracker.Entries<EntityBase>())
            {

                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.Entity.CreateDate = DateTime.Now;


                        break;
                    case EntityState.Modified:
                        entry.Entity.LastModifiedDate = DateTime.Now;

                        break;
                }
            }

            return base.SaveChangesAsync(cancellationToken);
        }
    }
}
