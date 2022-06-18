using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using PDSACW.Application.Common.Interfaces;
using PDSACW.Application.Common.Models;
using PDSACW.Application.ViewModels;
using PDSACW.Domain.Entities;

namespace PDSACW.Application.Features.Common.Commands
{
    public class CreateUserCommand : IRequest<UserVM>
    {
        public string UserName { get; set; }
        public string Password { get; set; }

    }

    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, UserVM>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CreateUserCommandHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<UserVM> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            var user = new User();

            user.UserName = request.UserName;
            user.Password = request.Password;

            _context.Users.Add(user);

            await _context.SaveChangesAsync(cancellationToken);
            
            var userVM = _mapper.Map<UserVM>(user);

            return userVM;


        }
    }
}
