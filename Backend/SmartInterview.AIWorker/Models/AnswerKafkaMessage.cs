using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartInterview.AIWorker.Models
{
    public class AnswerKafkaMessage
    {
        public int AttemptId { get; set; }
        public int QuestionId { get; set; }

        public string Question{ get; set; }
        public string UserId { get; set; }
        public string SubmittedAnswer { get; set; }
    }
}
