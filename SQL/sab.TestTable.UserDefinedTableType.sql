USE [C127_carlosv.12044_gmail]
GO
/****** Object:  UserDefinedTableType [sab].[TestTable]    Script Date: 6/3/2023 9:49:21 PM ******/
CREATE TYPE [sab].[TestTable] AS TABLE(
	[Data] [int] NOT NULL,
	[TypeId] [int] NOT NULL,
	[Description] [nvarchar](100) NOT NULL,
	PRIMARY KEY CLUSTERED 
(
	[Data] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
GO
