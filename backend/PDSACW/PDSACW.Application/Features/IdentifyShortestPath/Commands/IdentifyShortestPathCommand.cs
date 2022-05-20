
using AutoMapper;
using MediatR;
using Microsoft.Extensions.Logging;
using PDSACW.Application.Common.Interfaces;
using PDSACW.Application.DTO;
using PDSACW.Application.Services;
using PDSACW.Application.ViewModels;

namespace PDSACW.Application.Features.IdentifyShortestPath.Commands
{
    public class IdentifyShortestPathCommand : IRequest<bool>
    {
        public int sourceVertex { get; set; }
        public List<IdentifyShortestPathGraphData> graphData { get; set; }
        public List<IdentifyShortestPathAnswer> answer { get; set; }
    }

    public class IdentifyShortestPathCommandHandler : IRequestHandler<IdentifyShortestPathCommand, bool>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private const int vertices = 6;

        private readonly ILogger<IdentifyShortestPathCommandHandler> _logger;

        public IdentifyShortestPathCommandHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public Task<bool> Handle(IdentifyShortestPathCommand request, CancellationToken cancellationToken)
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
