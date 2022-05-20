using MediatR;
using Microsoft.Extensions.Logging;
using PDSACW.Application.DTO;
using PDSACW.Application.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PDSACW.Application.Features.IdentifyShortestPath.Queries
{
    public class IdentifyShortestPathQuery:IRequest<bool>
    {
        public int sourceVertex { get; set; }
        public List<IdentifyShortestPathGraphData> graphData;
        public List<IdentifyShortestPathAnswer> answer;

    }

    public class IdentifyShortestPathQueryHandler : IRequestHandler<IdentifyShortestPathQuery, bool>
    {
        private const int vertices = 6;

        private readonly ILogger<IdentifyShortestPathQueryHandler> _logger;

        public IdentifyShortestPathQueryHandler()

        {

        }

        public Task<bool> Handle(IdentifyShortestPathQuery request, CancellationToken cancellationToken)
        {
          
            Graph graph = new Graph(vertices);
            int sourceVertex = request.sourceVertex;

            request.graphData.ForEach(el =>
            {
                graph.addEdge(el.StartNode, el.EndNode, el.Weight);
            });

            var answer = graph.dijkstra_GetMinDistances(sourceVertex);

            for (int i = 0; i < vertices; i++)
            {
                _logger.LogInformation($"{request.answer[i].Distance}  --  {answer[i].distance} ");
                request.answer[i].Distance = answer[i].distance;
            }

            return Task.FromResult(true);
        }
    }
}
