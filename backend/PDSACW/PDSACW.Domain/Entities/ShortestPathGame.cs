using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PDSACW.Domain.Entities
{
    public class ShortestPathGame : EntityBase
    {
        public string StartNode { get; set; }
        public string Distance { get; set; }
        public string ShortestPath { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
