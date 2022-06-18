using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PDSACW.Application.DTO
{
    public class IdentifyShortestPathAnswer
    {
        public string StartNode { get; set; }
        public string ShortestPath { get; set; }
        public int Distance { get; set; }
    }
}
