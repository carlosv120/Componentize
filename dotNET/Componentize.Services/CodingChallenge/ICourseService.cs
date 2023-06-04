using Sabio.Models;
using Sabio.Models.CodingChallenge.Domain;
using Sabio.Models.CodingChallenge.Requests;

namespace Sabio.Services.CodingChallenge
{
    public interface ICourseService
    {
        int Add(CoursesAddRequest modelCourse);
        Course GetCourseById(int id);
        void UpdateCourse(CoursesUpdateRequest modelCourse);
        void Delete(int id);
        Paged<Course> GetCoursesByPage(int PageIndex, int PageSize);
    }
}