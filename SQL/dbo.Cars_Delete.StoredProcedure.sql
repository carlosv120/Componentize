USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Cars_Delete]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[Cars_Delete]
							@Id int

AS
/*
	Declare @Id int = 6

		Select *
			From dbo.Cars
			WHERE Id =@Id;

	Execute dbo.Cars_Delete
								@Id
		Select *
		From dbo.Cars
		WHERE Id =@Id;



*/


BEGIN

		DELETE FROM [dbo].[Cars]
			  WHERE Id = @Id

END
GO
