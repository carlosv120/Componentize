USE [C127_carlosv.12044_gmail]
GO
/****** Object:  Table [sab].[OnlineCourse]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [sab].[OnlineCourse](
	[CourseId] [int] NOT NULL,
	[URL] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_OnlineCourse] PRIMARY KEY CLUSTERED 
(
	[CourseId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
