USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[TechCompanies_SelectById]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE PROC [dbo].[TechCompanies_SelectById]
										@Id	int

AS

/*

		DECLARE		@Id int = 1
		
		
		EXECUTE		dbo.TechCompanies_SelectById
											@Id

		SELECT		*
		FROM		dbo.TechCompanies
*/




BEGIN

		SELECT tc.Id
			  ,tc.Name
			  ,tc.Profile
			  ,tc.Summary
			  ,tc.Headline
			  ,tc.ContactInformation
			  ,tc.Slug
			  ,tc.StatusId
			  ,ti.Id AS imageId
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
		  FROM [dbo].[TechCompanies] AS tc inner join dbo.TechCompaniesImages AS ti
		  ON tc.PrimaryImageId = ti.Id
		  WHERE tc.Id = @Id

END
GO
