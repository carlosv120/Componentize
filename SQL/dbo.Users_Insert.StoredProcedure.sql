USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Users_Insert]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[Users_Insert]

	 @FirstName nvarchar(100)
    ,@LastName nvarchar(100)
    ,@Email nvarchar(100)
	,@Password nvarchar(64)
    ,@AvatarUrl nvarchar(500)
    ,@TenantId nvarchar(30)
	,@Id int OUTPUT
    


AS

/*

	Declare	 @Id int					=	0;

	Declare	 @FirstName nvarchar(100)	= 'TestFirstName'
			,@LastName nvarchar(100)	= 'TestLastName'
			,@Email nvarchar(100)		= 'TestEmail'
			,@Password nvarchar(64)		= 'TestPassword'
			,@AvatarUrl nvarchar(500)	= 'TestAvatarUrl'
			,@TenantId nvarchar(30)		= 'TestTenantId'

	Execute dbo.Users_Insert

			 @FirstName 
			,@LastName
			,@Email
			,@Password
			,@AvatarUrl
			,@TenantId
			,@Id OUTPUT

	Select @Id

	Select *
		from	dbo.Users
		Where Id =@Id

*/


BEGIN

INSERT INTO [dbo].[Users]
           ([FirstName]
           ,[LastName]
           ,[Email]
		   ,[Password]
           ,[AvatarUrl]
           ,[TenantId])
     VALUES
           (@FirstName
		   ,@LastName 
           ,@Email
	       ,@Password 
           ,@AvatarUrl 
           ,@TenantId)

	SET @Id = SCOPE_IDENTITY();



END
GO
