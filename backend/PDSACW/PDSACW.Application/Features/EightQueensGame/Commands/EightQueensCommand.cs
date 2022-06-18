using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using PDSACW.Application.Common.Interfaces;
using PDSACW.Application.Common.Models;
using PDSACW.Application.ViewModels;
using PDSACW.Domain.Entities;

namespace PDSACW.Application.Features.EightQueensGame.Commands
{
    public class EightQueensCommand : IRequest<bool>
    {
        public string UserName { get; set; }
        public string Solution { get; set; }

    }

    public class EightQueensCommandHandler : IRequestHandler<EightQueensCommand, bool>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public EightQueensCommandHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<bool> Handle(EightQueensCommand request, CancellationToken cancellationToken)
        {
            var eightQueens = new EightQueens();

            eightQueens.UserName = request.UserName;
            eightQueens.Soloution = request.Solution;

            _context.EightQueens.Add(eightQueens);

            await _context.SaveChangesAsync(cancellationToken);

            return true;


        }
    }
}
