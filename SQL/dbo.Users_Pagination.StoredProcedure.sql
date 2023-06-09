USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Users_Pagination]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[Users_Pagination]
									 @PageIndex int 
                                    ,@PageSize int


AS

/*

	Declare  @PageIndex	int		= 1
			,@PageSize	int		= 2

	Execute dbo.Users_Pagination
									 @PageIndex
									,@PageSize


	Select *
	from	dbo.Users

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
		  FROM [dbo].[Users]

		ORDER BY Id
		OFFSET @offSet Rows
		Fetch Next @PageSize Rows ONLY

END
GO
