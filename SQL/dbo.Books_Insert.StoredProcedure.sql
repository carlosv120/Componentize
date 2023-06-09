USE [C127_carlosv.12044_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Books_Insert]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE PROC [dbo].[Books_Insert]
							 @Name		nvarchar(50)
							,@Year		int
							,@Quantity	int
							,@Id		int OUTPUT

AS

BEGIN

		Declare @InventoryId	int	=	0


		INSERT INTO [dbo].[Inventory]
				   ([Quantity])

			 VALUES
				   (@Quantity)

		SET @InventoryId = SCOPE_IDENTITY()


		INSERT INTO [dbo].[Books]
				   ([Name]
				   ,[Year]
				   ,[InventoryId])
			 VALUES
				   (@Name
				   ,@Year
				   ,@InventoryId)

		set @Id = SCOPE_IDENTITY()



END
GO
