USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[People_Update]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[People_Update]			--Table name underscore parameter

	
		@PersonName nvarchar(50)		--parameters to be updated within people
		,@Age int
		,@UserId nvarchar(128)
		,@IsASmoker bit
		,@Id int


as 

/* ------ Test Code ------

	declare @Id int =9;

	declare @PersonName nvarchar(50) = 'Joe'
			,@Age int = 25
			,@UserId nvarchar(128) = 'Joe212'
			,@IsASmoker bit = null


	Select *
	from	dbo.People
	Where Id =@Id

execute dbo.People_Update 
							@PersonName
							,@Age
							,@UserId
							,@IsASmoker
							,@Id   
		Select *
		from	dbo.People
		Where Id =@Id


*/



BEGIN										  --here begins what actually does the update

	declare @DateNow datetime2 = GETUTCDATE()  --this value is system managed so It doesnt have to come from the outside.
	
	 UPDATE [dbo].[People]
		SET [Name] = @PersonName
		   ,[Age] = @Age
		   ,[IsSmoker] = @IsASmoker
		   ,[DateModified] = @DateNow
		   ,[UserId] = @UserId

	 WHERE Id = @Id
	
END
GO
