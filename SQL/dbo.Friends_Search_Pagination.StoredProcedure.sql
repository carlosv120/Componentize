USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_Search_Pagination]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[Friends_Search_Pagination]
											 @PageIndex int 
											,@PageSize int
											,@Query nvarchar(100)

AS

/*
		
		Select *
		from	dbo.Friends

		Declare  @PageIndex		int				= 0
				,@PageSize		int				= 6
				,@Query			nvarchar(100)	= 'Title Edited'
		
		Execute dbo.Friends_Search_Pagination	
												
												 @PageIndex
												,@PageSize
												,@Query												

 
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
		  WHERE (Title LIKE '%' + @Query + '%')

			ORDER BY Id
			OFFSET @offSet Rows
			Fetch Next @PageSize Rows ONLY

		  
END
GO
