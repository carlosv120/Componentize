USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[People_Delete]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[People_Delete]
			@Id int
as


/*
	Declare @Id int = 13
	
		Select *
		From dbo.People
		WHERE Id =@Id;

	Execute dbo.People_Delete
								@Id
		Select *
		From dbo.People
		WHERE Id =@Id;

*/

Begin

		DELETE FROM [dbo].[People]
		WHERE Id =@Id;


end
GO
