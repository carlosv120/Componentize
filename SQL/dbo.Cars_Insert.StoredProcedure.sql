USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Cars_Insert]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE proc [dbo].[Cars_Insert]
							@Make				nvarchar(50)
						   ,@Model				nvarchar(50)
						   ,@Year				int
						   ,@IsUsed				bit
						   ,@ManufacturerId		int
						   ,@Id					int				OUTPUT

AS
/*
	Declare	 @Id int				=	0;

	Declare	 @Make				nvarchar(50)	=	'Make4'
			,@Model				nvarchar(50)	=	'Model4'	 
			,@Year				int				=	2023
			,@IsUsed			bit				=	0
			,@ManufacturerId	int				=	2

	Execute	dbo.Cars_Insert	
									@Make				
								   ,@Model				
								   ,@Year				
								   ,@IsUsed				
								   ,@ManufacturerId
								   ,@Id OUTPUT


	Select @Id

	Select *
		from	dbo.Cars
		Where Id =@Id



*/


BEGIN

		INSERT INTO [dbo].[Cars]
				   ([Make]
				   ,[Model]
				   ,[Year]
				   ,[IsUsed]
				   ,[ManufacturerId])
			 VALUES
				   (@Make
				   ,@Model
				   ,@Year
				   ,@IsUsed
				   ,@ManufacturerId)

				SET @Id = SCOPE_IDENTITY();

END
GO
