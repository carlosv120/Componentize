using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.CodingChallenge.Domain;
using Sabio.Models.CodingChallenge.Requests;
using Sabio.Models.Domain.Jobs;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.CodingChallenge
{
    public class CourseService : ICourseService
    {
        IDataProvider _data = null;
        public CourseService(IDataProvider data)
        {
            _data = data;
        }


        public int Add(CoursesAddRequest modelCourse)
        {
            int id = 0;
            string procedureName = "dbo.Courses_Insert";

            _data.ExecuteNonQuery(
                procedureName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    AddCommonParams(modelCourse, collection);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;

                    collection.Add(idOut);
                },
                returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object objectId = returnCollection["@Id"].Value;
                    int.TryParse(objectId.ToString(), out id);
                });


            return id;
        }

        public Course GetCourseById(int id)
        {
            Course singleCourse = null;

            string procedureName = "dbo.Courses_SelectById";

            _data.ExecuteCmd(
                procedureName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    collection.AddWithValue("@Id", id);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    singleCourse = MapCourse(reader);
                });

            return singleCourse;

        }

        public void UpdateCourse(CoursesUpdateRequest modelCourse)
        {
            string procedureName = "dbo.Courses_Update";

            _data.ExecuteNonQuery(
                procedureName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    AddCommonParams(modelCourse, collection);

                    collection.AddWithValue("@Id", modelCourse.Id);

                },
                returnParameters: null);


        }

        public void Delete(int id)
        {
            string procedureName = "dbo.Students_Delete";

            _data.ExecuteNonQuery(
                procedureName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    collection.AddWithValue("@Id", id);
                },
                returnParameters: null);

        }

        public Paged<Course> GetCoursesByPage(int PageIndex, int PageSize)
        {
            Paged<Course> paginatedList = null;
            List<Course> courseList = null;

            int totalCount = 0;
            string procedureName = "dbo.Courses_Pagination";

            _data.ExecuteCmd(
                procedureName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    collection.AddWithValue("@PageIndex", PageIndex);
                    collection.AddWithValue("@PageSize", PageSize);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    Course singleCourse = new Course();
                    singleCourse = MapCourse(reader);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(6);
                    }
                    if (courseList == null)
                    {
                        courseList = new List<Course>();
                    }

                    courseList.Add(singleCourse);
                });

            if (courseList != null)
            {
                paginatedList = new Paged<Course>(courseList, PageIndex, PageSize, totalCount);
            }


            return paginatedList;
        }




        private static void AddCommonParams(CoursesAddRequest modelCourse, SqlParameterCollection collection)
        {
            collection.AddWithValue("@Name", modelCourse.Name);
            collection.AddWithValue("@Description", modelCourse.Description);
            collection.AddWithValue("@SeasonTermId", modelCourse.SeasonTermId);
            collection.AddWithValue("@TeacherId", modelCourse.TeacherId);

        }

        private static Course MapCourse(IDataReader reader)
        {
            Course course = new Course();

            int startingIndex = 0;

            course.Id = reader.GetSafeInt32(startingIndex++);
            course.Name = reader.GetSafeString(startingIndex++);
            course.Description = reader.GetSafeString(startingIndex++);
            course.SeasonTerm = reader.GetSafeString(startingIndex++);
            course.Teacher = reader.GetSafeString(startingIndex++);
            course.Students = reader.DeserializeObject<List<Students>>(startingIndex++);


            return course;
        }

    }
}
