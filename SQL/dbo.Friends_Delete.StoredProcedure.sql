USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_Delete]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc	[dbo].[Friends_Delete]
			
			@Id int


AS

/*
	Declare @Id int = 7
	
		Select *
		From dbo.Friends
		WHERE Id =@Id;

	Execute dbo.Friends_Delete
								@Id
		Select *
		From dbo.Friends
		WHERE Id =@Id;

*/


BEGIN

		DELETE FROM [dbo].[Friends]
		WHERE Id = @Id;


END
GO
