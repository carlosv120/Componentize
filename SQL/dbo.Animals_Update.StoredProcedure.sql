USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Animals_Update]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[Animals_Update]
	

	@Name nvarchar(50)
	,@Id int

as

/* TEST CODE

	declare @Id int =9
		   ,@Name nvarchar(50) = 'updated'

	Select *
	from dbo.Animals
	Where Id = @Id

	execute dbo.Animals_Update

				@Name
				,@Id
	
	Select *
	from dbo.Animals
	Where Id = @Id

*/

begin
	



		UPDATE [dbo].[Animals]
		   SET [Name] = @Name

		 WHERE Id = @Id




end
GO
