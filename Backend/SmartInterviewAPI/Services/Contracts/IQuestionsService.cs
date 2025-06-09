using Microsoft.AspNetCore.Mvc;
using SmartInterviewAPI.DTOs;
using SmartInterviewAPI.Models;

namespace SmartInterviewAPI.Services.Contracts
{
    public interface IQuestionsService
    {
        IEnumerable<QuestionsDto> GetAll();
        QuestionsDto? GetById(int id);
        IEnumerable<QuestionsDto> GetByTag(string tag);
        QuestionsDto Create(QuestionCreateDto dto);
        bool Update(int id, QuestionCreateDto dto);
        bool Delete(int id);
        Task<IEnumerable<string>> GetAllTags();

        //Image Handling
        Task<string> UploadQuestionImageAsync(int questionId, Stream imageStream, string fileName);
        Task<bool> DeleteQuestionImageAsync(int questionId);
    }
}
