using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartInterview.AIWorker.Models
{
    public class GeminiResponse
    {
        public List<Candidate> candidates { get; set; }
    }

    public class Candidate
    {
        public Content content { get; set; }
    }

    public class Content
    {
        public string role { get; set; }
        public List<Part> parts { get; set; }
    }

    public class Part
    {
        public string text { get; set; }
    }

}
