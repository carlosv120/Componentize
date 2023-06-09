USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[TechCompanies_Pagination]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[TechCompanies_Pagination]
											 @PageIndex	int
											,@PageSize	int


AS

/*
	DECLARE	@PageIndex	int	=	0
			,@PageSize	int	=	2

	EXECUTE dbo.TechCompanies_Pagination
											 @PageIndex
											,@PageSize

	SELECT	*
	FROM [dbo].[TechCompanies] AS tc inner join dbo.TechCompaniesImages AS ti
	  ON tc.PrimaryImageId = ti.Id
*/


BEGIN

	DECLARE	@Offset	int	=	@PageIndex*@PageSize

	SELECT	   tc.Id
			  ,tc.Name
			  ,tc.Profile
			  ,tc.Summary
			  ,tc.Headline
			  ,tc.ContactInformation
			  ,tc.Slug
			  ,tc.StatusId
			  ,ti.Id AS ImageId
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
			  ,TotalCount = COUNT(1) OVER()

		  FROM [dbo].[TechCompanies] AS tc inner join dbo.TechCompaniesImages AS ti
		  ON tc.PrimaryImageId = ti.Id

			ORDER BY	tc.Id
			  OFFSET	@Offset ROWS
		  FETCH NEXT	@PageSize ROWS ONLY


END
GO
