USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Cars_Update]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[Cars_Update]
						 @Make		nvarchar(50)
						,@Model		nvarchar(50)
						,@Year		int
						,@Id		int
						



AS
/*
		Declare	 @Make	nvarchar(50)	= 'Make Edited'
				,@Model	nvarchar(50)	= 'Model Edited'
				,@Year	int				= 2020
				,@Id	int				= 3

		Select *
			from	dbo.Cars
			Where Id =@Id
		
		Execute dbo.Cars_Update
								 @Make
								,@Model
								,@Year
								,@Id

		Select *
			from	dbo.Cars
			Where Id =@Id

*/


BEGIN
		
		Declare @DateModified datetime2 = GETUTCDATE()

		UPDATE [dbo].[Cars]
		   SET [Make]			= @Make
			  ,[Model]			= @Model
			  ,[Year]			= @Year
			  ,[DateModified]	= @DateModified
		 WHERE Id = @Id


END


GO
