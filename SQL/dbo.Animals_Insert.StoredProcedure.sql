USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Animals_Insert]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Animals_Insert]

			@Name nvarchar(50)
			,@Id int OUTPUT

as

/* TEST CODE

	declare @Id int = 0;

	declare @Name nvarchar(50) = 'Milan6'

execute dbo.Animals_Insert 
								@Name
								,@Id OUTPUT


			Select @Id

Select *
	from	dbo.Animals
	Where Id =@Id
*/


BEGIN

	INSERT INTO [dbo].[Animals]
           ([Name])
     VALUES
           (@Name)

set @Id = SCOPE_IDENTITY();

END
GO
