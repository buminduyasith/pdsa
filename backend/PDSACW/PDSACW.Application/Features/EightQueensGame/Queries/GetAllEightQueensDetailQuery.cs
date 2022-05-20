using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using PDSACW.Application.Common.Interfaces;
using PDSACW.Application.Common.Models;
using PDSACW.Application.ViewModels;
using PDSACW.Domain.Entities;


namespace PDSACW.Application.Features.EightQueensGame.Queries
{
    
    public class GetAllEightQueensDetailQuery : IRequest<List<EightQueens>>
    {
    }

    public class GetAllEightQueensDetailHandler : IRequestHandler<GetAllEightQueensDetailQuery, List<EightQueens>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetAllEightQueensDetailHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public  async Task<List<EightQueens>> Handle(GetAllEightQueensDetailQuery request, CancellationToken cancellationToken)
        {

            var data = await  _context.EightQueens.AsNoTracking().ToListAsync();

            return data;
        }
    }
}
