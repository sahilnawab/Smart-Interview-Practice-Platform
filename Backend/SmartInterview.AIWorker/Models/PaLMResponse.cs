using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartInterview.AIWorker.Models
{
    public class PaLMResponse
    {
        public List<PaLMCandidate> candidates { get; set; }
    }

    public class PaLMCandidate
    {
        public string output { get; set; }
    }

}
