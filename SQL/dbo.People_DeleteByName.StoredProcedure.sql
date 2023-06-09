USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[People_DeleteByName]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[People_DeleteByName]
			@Name nvarchar(50)
as


/*
	Declare @Name nvarchar(50) = 'Joe'
	
		Select *
		From dbo.People
		WHERE Name = @Name;

	Execute dbo.People_DeleteByName
								@Name
		Select *
		From dbo.People
		WHERE Name = @Name;

*/

Begin

		DELETE FROM [dbo].[People]
		WHERE [Name] =@Name
			  OR
			  (@Name IS NULL AND [Name] IS NULL)


end
GO
