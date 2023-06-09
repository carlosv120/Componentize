USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Users_SelectById]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[Users_SelectById]

		   @Id int

AS

/*
	
		declare @Id int = 2
		Execute dbo.Users_SelectById
										@Id
		
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
	  Where Id = @Id

END

GO
