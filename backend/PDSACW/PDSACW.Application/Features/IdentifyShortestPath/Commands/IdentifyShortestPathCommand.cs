
using AutoMapper;
using MediatR;
using Microsoft.Extensions.Logging;
using PDSACW.Application.Common.Interfaces;
using PDSACW.Application.DTO;
using PDSACW.Application.Services;
using PDSACW.Application.ViewModels;
using PDSACW.Domain.Entities;

namespace PDSACW.Application.Features.IdentifyShortestPath.Commands
{
    public class IdentifyShortestPathCommand : IRequest<bool>
    {
        public int UserId { get; set; }
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

        public async Task<bool> Handle(IdentifyShortestPathCommand request, CancellationToken cancellationToken)
        {
            foreach (var el in request.answer)
            {
                var shortestPathGame = new ShortestPathGame { ShortestPath = el.ShortestPath, Distance = el.Distance.ToString(), StartNode = el.StartNode, UserId = request.UserId };
                _context.ShortestPathGame.Add(shortestPathGame);

              
            }
            await _context.SaveChangesAsync(cancellationToken);

            return true;

        }
    }
}
