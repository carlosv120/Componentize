USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_Pagination]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[Friends_Pagination]
									 @PageIndex int 
                                    ,@PageSize int

AS

/*

	Declare  @PageIndex	int		= 1
			,@PageSize	int		= 2

	Execute dbo.Friends_Pagination
									 @PageIndex
									,@PageSize


	Select *
	from	dbo.Friends

	

*/



BEGIN

		Declare @offset int = @PageIndex * @PageSize

		SELECT [Id]
			  ,[Title]
			  ,[Bio]
			  ,[Summary]
			  ,[Headline]
			  ,[Slug]
			  ,[StatusId]
			  ,[PrimaryImageUrl]
			  ,[UserId]
			  ,[DateCreated]
			  ,[DateModified]
			  , TotalCount = COUNT(1) OVER()
		  FROM [dbo].[Friends]
	
		ORDER BY Id
		OFFSET @offSet Rows
		Fetch Next @PageSize Rows ONLY

END
GO
