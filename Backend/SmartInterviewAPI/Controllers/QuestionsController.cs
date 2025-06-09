using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartInterviewAPI.DTOs;
using SmartInterviewAPI.Models;
using SmartInterviewAPI.Services.Contracts;
using SmartInterviewAPI.Services.Implementation;

namespace SmartInterviewAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuestionsController : ControllerBase
    {
        private readonly IQuestionsService _questionsService;

        public QuestionsController(IQuestionsService questionsService)
        {
            _questionsService = questionsService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<QuestionsDto>> GetAll()
        {
            var questions = _questionsService.GetAll();
            return Ok(questions);
        }

        [HttpGet("{id}")]
        public ActionResult<QuestionsDto> GetById(int id)
        {
            var question = _questionsService.GetById(id);
            if (question == null)
                return NotFound();

            return Ok(question);
        }

        [HttpGet("tag/{tag}")]
        public ActionResult<IEnumerable<QuestionsDto>> GetByTag(string tag)
        {
            var questions = _questionsService.GetByTag(tag);
            return Ok(questions);
        }

        [HttpGet("search")]
        public ActionResult<IEnumerable<QuestionsDto>> Search([FromQuery] string keyword)
        {
            if (string.IsNullOrEmpty(keyword))
                return BadRequest("Search keyword is required");

            var service = _questionsService as QuestionsService;
            var questions = service.SearchByKeyword(keyword);
            return Ok(questions);
        }

        [HttpGet("difficulty/{difficulty}")]
        public ActionResult<IEnumerable<QuestionsDto>> FilterByDifficulty(DifficultyLevel difficulty)
        {
            var service = _questionsService as QuestionsService;
            var questions = service.FilterByDifficulty(difficulty);
            return Ok(questions);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public ActionResult<QuestionsDto> Create(QuestionCreateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var question = _questionsService.Create(dto);
            return Ok(question);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult Update(int id, QuestionCreateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var success = _questionsService.Update(id, dto);
            if (!success)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult Delete(int id)
        {
            var success = _questionsService.Delete(id);
            if (!success)
                return NotFound();

            return NoContent();
        }
        [HttpGet("tags")]
        public async Task<ActionResult<IEnumerable<string>>> GetAllTags()
        {
            try
            {
                var question= await _questionsService.GetAllTags();
                return Ok(question);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving tags: {ex.Message}");
            }
        }

        [HttpGet("export")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ExportToPdf()
        {
            try
            {
                var service = _questionsService as QuestionsService;
                var pdfBytes = await service.ExportQuestionsToPdfAsync();
                return File(pdfBytes, "application/pdf", "questions.pdf");
            }
            catch (NotImplementedException)
            {
                return StatusCode(501, "PDF export not yet implemented");
            }
        }
    }
}
