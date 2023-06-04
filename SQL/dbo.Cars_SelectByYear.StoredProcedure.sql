USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Cars_SelectByYear]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[Cars_SelectByYear]
							  @Year int


AS

/*
		Select *
		from	dbo.Cars
	
		declare @Year int = 2023
		Execute Cars_SelectByYear
										@Year
		
*/


BEGIN


		SELECT [Id]
			  ,[Make]
			  ,[Year]
			  ,[DateCreated]
			  ,[DateModified]
		  FROM [dbo].[Cars]
		  WHERE Year = @Year


END
GO
