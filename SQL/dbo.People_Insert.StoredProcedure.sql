USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[People_Insert]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[People_Insert]


		@PersonName nvarchar(50)
		,@Age int
		,@UserId nvarchar(128)
		,@IsASmoker bit
		, @Id int OUTPUT

/* ------ Test Code ------

	declare @Id int =0;

	declare @PersonName nvarchar(50) = 'Test'
			,@Age int = 23
			,@UserId nvarchar(128) = 'robetest'
			,@IsASmoker bit = null


execute dbo.People_Insert 
							@PersonName
							,@Age
							,@UserId
							,@IsASmoker
							,@Id OUTPUT   --put output in two places to get that value returned

			Select @Id --this is like a console.log

Select *
	from	dbo.People
	Where Id =@Id


*/


as

begin


	INSERT INTO [dbo].[People]
				([Name]
				,[Age]
				,[IsSmoker]
				,[UserId])
			VALUES
				(@PersonName
				,@Age
				,@IsASmoker
				,@UserId)

	set @Id = SCOPE_IDENTITY();

end
GO
