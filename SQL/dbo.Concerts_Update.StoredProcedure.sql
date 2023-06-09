USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Concerts_Update]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

	CREATE PROC [dbo].[Concerts_Update]
									@Name nvarchar(500)
									,@Description nvarchar(500)
									,@IsFree bit
									,@Address nvarchar(500)
									,@Cost int
									,@DateOfEvent datetime2(7)
									,@Id int			
	AS

	BEGIN

		UPDATE [dbo].[Concerts]
		   SET [Name] = @Name
			  ,[Description] = @Description
			  ,[IsFree] = @IsFree
			  ,[Address] = @Address
			  ,[Cost] = @Cost
			  ,[DateOfEvent] = @DateOfEvent
		 WHERE Id = @Id

	END
GO
