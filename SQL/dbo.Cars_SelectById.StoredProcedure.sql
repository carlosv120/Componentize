USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Cars_SelectById]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[Cars_SelectById]
							  @Id int


AS

/*
		Select *
		from	dbo.Cars
	
		declare @Id int = 2
		Execute dbo.Cars_SelectById
										@Id
		
*/


BEGIN


		SELECT [Id]
			  ,[Make]
			  ,[Model]
			  ,[Year]
			  ,[IsUsed]
			  ,[DateCreated]
			  ,[DateModified]
		  FROM [dbo].[Cars]
		  WHERE Id = @Id


END
GO
