USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Cars_SelectByMake]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[Cars_SelectByMake]
							  @Make nvarchar(50)


AS

/*
		Select *
		from	dbo.Cars
	
		declare @Make nvarchar(50) = 'Make1'
		Execute Cars_SelectByMake
										@Make
		
*/


BEGIN


		SELECT [Id]
			  ,[Make]
			  ,[Model]
			  ,[DateCreated]
			  ,[DateModified]
		  FROM [dbo].[Cars]
		  WHERE Make = @Make


END
GO
