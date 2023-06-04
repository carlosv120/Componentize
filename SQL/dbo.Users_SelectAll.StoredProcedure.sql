USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Users_SelectAll]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[Users_SelectAll]

AS

/*

	Execute dbo.Users_SelectAll

*/


BEGIN

		SELECT [Id]
			  ,[FirstName]
			  ,[LastName]
			  ,[Email]
			  ,[AvatarUrl]
			  ,[TenantId]
			  ,[DateCreated]
			  ,[DateModified]
		  FROM [dbo].[Users]




END
GO
