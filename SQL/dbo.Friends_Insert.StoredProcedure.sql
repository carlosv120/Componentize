USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_Insert]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[Friends_Insert]

									 @Title nvarchar(120)
									,@Bio nvarchar(700)
									,@Summary nvarchar(255)
									,@Headline nvarchar(80)
									,@Slug nvarchar(100)
									,@StatusId int
									,@PrimaryImageUrl nvarchar(500)
									,@UserId int
									,@Id int OUTPUT
	


as

/*


	Declare	 @Id int				=	0;

	Declare	 @Title nvarchar(120)	=	'Title Test5'
			,@Bio nvarchar(700)		=	'Bio Test5'	 
			,@Summary nvarchar(255)	=	'Summary Test5'
			,@Headline nvarchar(80)	=	'Headline Test5'
			,@Slug nvarchar(100)	=	'Slug Test5'
			,@StatusId int			=	5
			,@PrimaryImageUrl nvarchar(500)	=	'Primary Image Test5'
			,@UserId int			=	5

	Execute	dbo.Friends_Insert	
							     @Title 
								,@Bio 
								,@Summary
								,@Headline
								,@Slug 
								,@StatusId 
								,@PrimaryImageUrl
								,@UserId
								,@Id OUTPUT

	Select @Id

	Select *
		from	dbo.Friends
		Where Id =@Id

*/
	




begin
	
	INSERT INTO [dbo].[Friends]
           ([Title]
           ,[Bio]
           ,[Summary]
           ,[Headline]
           ,[Slug]
           ,[StatusId]
           ,[PrimaryImageUrl]
           ,[UserId])
     VALUES
           (@Title
           ,@Bio
           ,@Summary
		   ,@Headline 
		   ,@Slug 
		   ,@StatusId
		   ,@PrimaryImageUrl 
		   ,@UserId)

		set @Id = SCOPE_IDENTITY();
end
GO
