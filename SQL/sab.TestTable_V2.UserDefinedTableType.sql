USE [C127_carlosv.12044_gmail]
GO
/****** Object:  UserDefinedTableType [sab].[TestTable_V2]    Script Date: 6/3/2023 9:49:21 PM ******/
CREATE TYPE [sab].[TestTable_V2] AS TABLE(
	[Data] [int] NOT NULL,
	[TypeId] [int] NOT NULL,
	[Description] [nvarchar](255) NULL,
	PRIMARY KEY CLUSTERED 
(
	[Data] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
GO
