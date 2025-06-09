using Azure;

namespace SmartInterviewAPI.Models
{
    public class QuestionTag
    {
        public int QuestionId { get; set; }
        public Question? Question { get; set; }

        public int TagId { get; set; }
        public Tag Tag { get; set; }
    }
    public class Tag
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<QuestionTag> QuestionTags { get; set; }
    }

}
