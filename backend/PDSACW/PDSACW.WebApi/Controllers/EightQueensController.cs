using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PDSACW.Application.Features.EightQueensGame.Commands;
using PDSACW.Application.Features.EightQueensGame.Queries;

namespace PDSACW.WebApi.Controllers
{
   
    public class EightQueensController : BaseApiController
    {
        [HttpPost("EightQueens", Name = "SaveEightQueensAnswer")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<OkObjectResult> SaveEightQueensAnswer([FromBody] EightQueensCommand command)
        {
            return Ok(await Mediator.Send(command));
        }

        [HttpGet("EightQueens", Name = "GetAllEightQueensSolution")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetAllEightQueensSolution()
        {
            var result = await Mediator.Send(new GetAllEightQueensDetailQuery());
            return Ok(result);
        }

    }
}
