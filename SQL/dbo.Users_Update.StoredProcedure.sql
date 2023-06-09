USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Users_Update]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[Users_Update]

			 @FirstName		nvarchar(100)
			,@LastName		nvarchar(100)
			,@Email			nvarchar(100)
			,@Password		nvarchar(64)
			,@AvatarUrl		nvarchar(500)
			,@TenantId		nvarchar(30)
			,@Id			int

AS

/*
	Declare  @FirstName		nvarchar(100)	= 'FirstName Edited'
			,@LastName		nvarchar(100)	= 'LastName Edited'
			,@Email			nvarchar(100)	= 'Email Edited'
			,@Password		nvarchar(64)	= 'Password Edited'
			,@AvatarUrl		nvarchar(500)	= 'AvararUrl Edited'
			,@TenantId		nvarchar(30)	= 'TenantId Edited'
			,@Id			int				= 2
		
	Select *
	from	dbo.Users
	Where Id = @Id

	Execute dbo.Friends_Update
								 @FirstName	
								,@LastName		
								,@Email			
								,@Password		
								,@AvatarUrl		
								,@TenantId		
								,@Id	


	Select *
	from	dbo.Users
	Where Id =@Id
*/


BEGIN

	Declare @DateModified datetime2 = GETUTCDATE()

	UPDATE [dbo].[Users]
	   SET [FirstName]		= @FirstName
		  ,[LastName]		= @LastName	
		  ,[Email]			= @Email	
		  ,[AvatarUrl]		= @AvatarUrl	
		  ,[TenantId]		= @TenantId
		  ,[Password]		= @Password
		  ,[DateModified]	= @DateModified

	 WHERE Id = @Id




END
GO
