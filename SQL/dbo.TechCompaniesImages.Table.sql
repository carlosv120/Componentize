USE [C127_carlosv.12044_gmail]
GO
/****** Object:  Table [dbo].[TechCompaniesImages]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TechCompaniesImages](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TypeId] [int] NOT NULL,
	[Url] [nvarchar](500) NOT NULL,
 CONSTRAINT [PK_TechCompaniesImages] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[TechCompaniesImages] ADD  CONSTRAINT [DF_TechCompaniesImages_TypeId]  DEFAULT ((0)) FOR [TypeId]
GO
ALTER TABLE [dbo].[TechCompaniesImages] ADD  CONSTRAINT [DF_TechCompaniesImages_Url]  DEFAULT (N'noUrl') FOR [Url]
GO
