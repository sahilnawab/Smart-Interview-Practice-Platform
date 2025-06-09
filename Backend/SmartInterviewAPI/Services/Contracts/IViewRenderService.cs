namespace SmartInterviewAPI.Services.Contracts
{
    public interface IViewRenderService
    {
        public Task<string> RenderViewToStringAsync(string viewPath, object model);

    }
}
