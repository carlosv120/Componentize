USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Jobs_SelectAll]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[Jobs_SelectAll]

AS

/*

	Execute dbo.Jobs_SelectAll

*/


BEGIN

		SELECT	 j.Id
				,j.Title
				,j.Description
				,j.Summary
				,j.Pay
				,j.Slug
				,j.StatusId
				,j.TechCompanyId
				,tc.Name
				,tc.Profile
				,tc.Summary
				,tc.Headline
				,tc.ContactInformation
				,tc.Slug
			    ,tc.StatusId
				,tc.PrimaryImageId
				,ti.TypeId
				,ti.Url
				,Tags =	( 
							SELECT	 tct.Id AS id
									,tct.Tag AS tag

							FROM	dbo.TechCompaniesTags AS tct inner join dbo.TechCompaniesBrigdeTags AS tb
							ON		tb.TagId = tct.Id  
							WHERE	tb.TechCompanyId = tc.Id

							FOR JSON AUTO
						)
			    ,tc.DateCreated
			    ,tc.DateModified
			    ,tc.UserId
				,Skills =	(
								SELECT	 js.Id as id
										,js.Skill as skill
								FROM	dbo.JobsSkills AS js inner join dbo.JobsBridgeSkills as jbs
								ON		jbs.SkillId = js.Id
								WHERE	jbs.JobId = j.Id

								FOR JSON AUTO
							)
				,j.DateCreated
				,j.DateModified
				,j.UserId

		FROM dbo.Jobs as j inner join dbo.TechCompanies AS tc
		ON j.TechCompanyId = tc.Id
		
		inner join dbo.TechCompaniesImages as ti
		ON tc.PrimaryImageId = ti.Id


END
GO
