using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PDSACW.Domain.Entities
{
    public class User:EntityBase
    {
        public string UserName { get; set; }
        public string Password { get; set; }

    }
}
