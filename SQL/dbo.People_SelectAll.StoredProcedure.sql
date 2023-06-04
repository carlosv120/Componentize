USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[People_SelectAll]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[People_SelectAll]


as


/*
		
		Execute dbo.People_SelectAll

*/


begin 

	
SELECT [Id]
      ,[Name]
      ,[Age]
      ,[IsSmoker]
      ,[DateAdded]
      ,[DateModified]
      ,[UserId]
  FROM [dbo].[People]


end
GO
