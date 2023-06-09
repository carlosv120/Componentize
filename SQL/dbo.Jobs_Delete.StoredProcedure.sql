USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Jobs_Delete]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[Jobs_Delete]
							@Id int

AS

/*
	DECLARE @Id int = 19

		SELECT *
		FROM dbo.Jobs

	EXECUTE	dbo.Jobs_Delete
							@Id

		SELECT *
		FROM dbo.Jobs

*/


BEGIN
	
	DELETE FROM [dbo].[JobsBridgeSkills]
		  WHERE JobId = @Id

	DELETE FROM [dbo].[Jobs]
		  WHERE Id = @Id

END
GO
