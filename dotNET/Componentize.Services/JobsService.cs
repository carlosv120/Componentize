using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain.Jobs;
using Sabio.Models.Domain.TechCompanies;
using Sabio.Models.Requests.Jobs;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class JobsService : IJobsService
    {
        IDataProvider _data = null;
        public JobsService(IDataProvider data)
        {
            _data = data;
        }

        public List<Job> GetAll()
        {
            List<Job> jobsList = null;
            string procedureName = "dbo.Jobs_SelectAll";

            _data.ExecuteCmd(
                procedureName,
                inputParamMapper: null,
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    Job job = MapJob(reader);

                    if (jobsList == null)
                    {
                        jobsList = new List<Job>();
                    }

                    jobsList.Add(job);

                });

            return jobsList;
        }

        public Job Get(int id)
        {
            Job job = null;

            string procedureName = "dbo.Jobs_SelectById";

            _data.ExecuteCmd(
                procedureName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    collection.AddWithValue("@Id", id);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    job = MapJob(reader);
                });

            return job;

        }

        public Paged<Job> GetPage(int PageIndex,int PageSize)
        {
            Paged<Job> paginatedList = null;
            List<Job> jobsList = null;

            int totalCount = 0;
            string procedureName = "dbo.Jobs_Pagination";

            _data.ExecuteCmd(
                procedureName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    collection.AddWithValue("@PageIndex", PageIndex);
                    collection.AddWithValue("@PageSize", PageSize);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    Job singleJob = new Job();
                    singleJob = MapJob(reader);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(26);
                    }
                    if (jobsList == null)
                    {
                        jobsList = new List<Job>();
                    }

                    jobsList.Add(singleJob);
                });

            if (jobsList != null)
            {
                paginatedList = new Paged<Job>(jobsList,PageIndex,PageSize, totalCount);
            }

            return paginatedList;
        }

        public Paged<Job> SearchPage(int PageIndex,int PageSize, string Query) 
        {
            Paged<Job> paginatedList = null;
            List<Job> jobList = null;

            int totalCount = 0;
            string procedureName = "dbo.Jobs_Search";

            _data.ExecuteCmd(
                procedureName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    collection.AddWithValue("@PageIndex", PageIndex);
                    collection.AddWithValue("@PageSize", PageSize);
                    collection.AddWithValue("@Query", Query);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    Job singleJob = new Job();
                    singleJob = MapJob(reader);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(26);
                    }
                    if (jobList == null)
                    {
                        jobList = new List<Job>();
                    }
                    jobList.Add(singleJob);
                });

            if(jobList != null)
            {
                paginatedList = new Paged<Job>(jobList, PageIndex, PageSize, totalCount);
            }


            return paginatedList;
        }

        public int Add(JobsAddRequest modelJob, int userId)
        {
            int id = 0;
            string procedureName = "dbo.Jobs_Insert";

            DataTable mySkills = MapSkills(modelJob.Skills);

            _data.ExecuteNonQuery(
                procedureName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    AddCommonParams(modelJob, collection);
                    collection.AddWithValue("@UserId", userId);
                    collection.AddWithValue("@BatchJobSkills", mySkills);

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

        public void Update(JobsUpdateRequest modelJob, int userId)
        {
            string procedureName = "dbo.Jobs_Update";

            DataTable mySkills = MapSkills(modelJob.Skills);

            _data.ExecuteNonQuery(
                procedureName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    AddCommonParams(modelJob, collection);

                    collection.AddWithValue("@UserId", userId);
                    collection.AddWithValue("@BatchJobSkills", mySkills);
                    collection.AddWithValue("@Id", modelJob.Id);
                },
                returnParameters: null);


        }


        public void Delete(int id)
        {
            string procedureName = "dbo.Jobs_Delete";

            _data.ExecuteNonQuery(
                procedureName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    collection.AddWithValue("@Id", id);
                },
                returnParameters: null);

        }

        private static Job MapJob(IDataReader reader)
        {
            Job job = new Job();
            job.TechCompany = new TechCompany();
            job.TechCompany.PrimaryImage = new TechCompanyImage();

            int startingIndex = 0;

            job.Id = reader.GetSafeInt32(startingIndex++);
            job.Title = reader.GetSafeString(startingIndex++);
            job.Description = reader.GetSafeString(startingIndex++);
            job.Summary = reader.GetSafeString(startingIndex++);
            job.Pay = reader.GetSafeInt32(startingIndex++);
            job.Slug = reader.GetSafeString(startingIndex++);
            job.StatusId = reader.GetSafeInt32(startingIndex++);
            job.TechCompany.Id = reader.GetSafeInt32(startingIndex++);
            job.TechCompany.Name = reader.GetSafeString(startingIndex++);
            job.TechCompany.Profile = reader.GetSafeString(startingIndex++);
            job.TechCompany.Summary = reader.GetSafeString(startingIndex++);
            job.TechCompany.Headline = reader.GetSafeString(startingIndex++);
            job.TechCompany.ContactInformation = reader.GetSafeString(startingIndex++);
            job.TechCompany.Slug = reader.GetSafeString(startingIndex++);
            job.TechCompany.StatusId = reader.GetSafeInt32(startingIndex++);
            job.TechCompany.PrimaryImage.Id = reader.GetSafeInt32(startingIndex++);
            job.TechCompany.PrimaryImage.TypeId = reader.GetSafeInt32(startingIndex++);
            job.TechCompany.PrimaryImage.Url = reader.GetSafeString(startingIndex++);
            job.TechCompany.Tags = reader.DeserializeObject<List<TechCompanyTag>>(startingIndex++);
            job.TechCompany.DateCreated = reader.GetSafeDateTime(startingIndex++);
            job.TechCompany.DateModified = reader.GetSafeDateTime(startingIndex++);
            job.TechCompany.UserId = reader.GetSafeInt32(startingIndex++);
            job.Skills = reader.DeserializeObject<List<JobSkill>>(startingIndex++);
            job.DateCreated = reader.GetSafeDateTime(startingIndex++);
            job.DateModified = reader.GetSafeDateTime(startingIndex++);
            job.UserId = reader.GetSafeInt32(startingIndex++);
            

            return job;
        }


        private static void AddCommonParams(JobsAddRequest modelJob, SqlParameterCollection collection)
        {
            collection.AddWithValue("@Title", modelJob.Title);
            collection.AddWithValue("@Description", modelJob.Description);
            collection.AddWithValue("@Summary", modelJob.Summary);
            collection.AddWithValue("@Pay", modelJob.Pay);
            collection.AddWithValue("@Slug", modelJob.Slug);
            collection.AddWithValue("@StatusId", modelJob.StatusId);
            collection.AddWithValue("@TechCompanyId", modelJob.TechCompanyId);
           
        }

        private DataTable MapSkills(List<string> jobsToMap)
        {
            DataTable table = new DataTable();

            table.Columns.Add("Skills",typeof(string));

            foreach (string singleJob in jobsToMap)
            {
                DataRow dataRow = table.NewRow();
                int startingIndex = 0;

                dataRow.SetField(startingIndex++, singleJob);
                table.Rows.Add(dataRow);
            }

            return table;
        } 

    }
}
