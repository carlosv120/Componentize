USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Cars_SelectAll]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[Cars_SelectAll]



AS

/*

		Execute dbo.Cars_SelectAll

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


END
GO
