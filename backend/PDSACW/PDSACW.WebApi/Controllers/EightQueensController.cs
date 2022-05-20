using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PDSACW.Application.Features.EightQueensGame.Commands;

namespace PDSACW.WebApi.Controllers
{
   
    public class EightQueensController : BaseApiController
    {
        public class ShortestPathController : BaseApiController
        {
            [HttpPost("EightQueens", Name = "SaveEightQueensAnswer")]
            [ProducesResponseType(StatusCodes.Status201Created)]
            [ProducesResponseType(StatusCodes.Status400BadRequest)]
            public async Task<OkObjectResult> SaveEightQueensAnswer([FromBody] EightQueensCommand command)
            {
                return Ok(await Mediator.Send(command));
            }

        }
    }
}
