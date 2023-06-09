USE [C127_carlosv.12044_gmail]
GO
/****** Object:  Table [dbo].[TechCompaniesBrigdeTags]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TechCompaniesBrigdeTags](
	[TechCompanyId] [int] NOT NULL,
	[TagId] [int] NOT NULL,
 CONSTRAINT [PK_TechCompaniesBrigdeTags] PRIMARY KEY CLUSTERED 
(
	[TechCompanyId] ASC,
	[TagId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[TechCompaniesBrigdeTags]  WITH CHECK ADD  CONSTRAINT [FK_TechCompaniesBrigdeTags_TechCompanies] FOREIGN KEY([TechCompanyId])
REFERENCES [dbo].[TechCompanies] ([Id])
GO
ALTER TABLE [dbo].[TechCompaniesBrigdeTags] CHECK CONSTRAINT [FK_TechCompaniesBrigdeTags_TechCompanies]
GO
ALTER TABLE [dbo].[TechCompaniesBrigdeTags]  WITH CHECK ADD  CONSTRAINT [FK_TechCompaniesBrigdeTags_TechCompaniesTags] FOREIGN KEY([TagId])
REFERENCES [dbo].[TechCompaniesTags] ([Id])
GO
ALTER TABLE [dbo].[TechCompaniesBrigdeTags] CHECK CONSTRAINT [FK_TechCompaniesBrigdeTags_TechCompaniesTags]
GO
