using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SmartInterviewAPI.Models;

namespace SmartInterviewAPI.Data
{
    public class ApplicationDbContext : IdentityDbContext<AppUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Question> Questions { get; set; }
        public DbSet<UserAttempt> UserAttempts { get; set; }
        public DbSet<Tag> Tag { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<QuestionTag>()
                .HasKey(qt => new { qt.QuestionId, qt.TagId });

            builder.Entity<QuestionTag>()
                .HasOne(qt => qt.Question)
                .WithMany(q => q.QuestionTags)
                .HasForeignKey(qt => qt.QuestionId);

            builder.Entity<QuestionTag>()
                .HasOne(qt => qt.Tag)
                .WithMany(t => t.QuestionTags)
                .HasForeignKey(qt => qt.TagId);

            builder.Entity<UserAttempt>()
                 .HasKey(qt => new { qt.Id });

            builder.Entity<UserAttempt>()
       .HasOne(ua => ua.User)
       .WithMany(q => q.Attempts)
       .HasForeignKey(ua => ua.UserId);
        }



    }
}
