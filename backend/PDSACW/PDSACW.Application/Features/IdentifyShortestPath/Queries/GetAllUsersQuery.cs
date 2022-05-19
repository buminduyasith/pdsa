using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using Microsoft.Extensions.Logging;
using PDSACW.Application.ViewModels;

namespace PDSACW.Application.Features.IdentifyShortestPath.Queries
{
    public class GetAllUsersQuery:IRequest<List<UserVM>>
    {

    }

    public class GetAllUsersQueryQueryHandler : IRequestHandler<GetAllUsersQuery, List<UserVM>>
    {
       

        private readonly ILogger<GetAllUsersQueryQueryHandler> _logger;

        public GetAllUsersQueryQueryHandler()

        {

        }

        public Task<List<UserVM>> Handle(GetAllUsersQuery request, CancellationToken cancellationToken)
        {
            return Task.FromResult(new List<UserVM>());
        }
    }
}
