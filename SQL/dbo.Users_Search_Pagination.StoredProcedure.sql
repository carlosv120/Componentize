USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Users_Search_Pagination]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[Users_Search_Pagination]

											@PageIndex int 
											,@PageSize int
											,@Query nvarchar(100)

AS

/*
		
		Select *
		from	dbo.Users


		Declare  @PageIndex		int				= 1
				,@PageSize		int				= 6
				,@Query			nvarchar(100)	= 'Test'
		
		Execute dbo.Users_Search_Pagination		
												 @PageIndex
												,@PageSize
												,@Query												

 
*/


BEGIN
		Declare @offset int = @PageIndex * @PageSize

		SELECT [Id]
			  ,[FirstName]
			  ,[LastName]
			  ,[Email]
			  ,[AvatarUrl]
			  ,[TenantId]
			  ,[DateCreated]
			  ,[DateModified]
			  , TotalCount = COUNT(1) OVER()

		  FROM [dbo].[Users]
		  WHERE (FirstName LIKE '%' + @Query + '%')
		--WHERE (FirstName LIKE '%' + @Query + '%' OR LastName LIKE '%' + @Query + '%')

			ORDER BY Id
			OFFSET @offSet Rows
			Fetch Next @PageSize Rows ONLY
END
GO
