USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Users_Delete]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[Users_Delete]
			
		   @Id int

AS

BEGIN

	DELETE FROM [dbo].[Users]
    WHERE Id = @Id;

END





GO
