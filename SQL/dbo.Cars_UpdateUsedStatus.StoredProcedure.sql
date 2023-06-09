USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Cars_UpdateUsedStatus]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[Cars_UpdateUsedStatus]

										@Id		int

AS
/*
		Declare	 @Id		int		= 3

		Select *
			from	dbo.Cars
			Where Id =@Id
		
		Execute dbo.Cars_UpdateUsedStatus
											@Id

		Select *
			from	dbo.Cars
			Where Id =@Id

*/


BEGIN
		
		Declare @DateModified datetime2 = GETUTCDATE()

		UPDATE [dbo].[Cars]
		   SET [IsUsed]			= 1
			  ,[DateModified]	= @DateModified
		 WHERE Id = @Id


END


GO
