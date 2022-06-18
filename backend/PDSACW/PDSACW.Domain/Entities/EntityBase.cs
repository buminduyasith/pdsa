using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PDSACW.Domain.Entities
{
    public abstract class EntityBase
    {
        public int Id { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime? LastModifiedDate { get; set; }
        public bool Active { get; set; }


    }
}
