USE [C127_carlosv.12044_gmail]
GO
/****** Object:  UserDefinedTableType [dbo].[BatchTags]    Script Date: 6/3/2023 9:49:21 PM ******/
CREATE TYPE [dbo].[BatchTags] AS TABLE(
	[Tag] [nvarchar](100) NOT NULL
)
GO
