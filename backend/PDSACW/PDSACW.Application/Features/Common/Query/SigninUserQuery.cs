using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using PDSACW.Application.Common.Exceptions;
using PDSACW.Application.Common.Interfaces;
using PDSACW.Application.Common.Models;
using PDSACW.Application.ViewModels;
using PDSACW.Domain.Entities;

namespace PDSACW.Application.Features.Common.Query
{
    public class SigninUserQuery : IRequest<UserVM>
    {
        public string UserName { get; set; }
        public string Password { get; set; }

    }

    public class SigninUserQueryHandler : IRequestHandler<SigninUserQuery, UserVM>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public SigninUserQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<UserVM> Handle(SigninUserQuery request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.AsNoTracking().Where(res => res.UserName == request.UserName && res.Password == request.Password).FirstOrDefaultAsync();

            if (user != null)
            {
                var userVM = _mapper.Map<UserVM>(user);
                return userVM;
            }
            else
            {
                throw new InvalidUserException("username or password is incorrect");
            }
          

        }
    }
}
