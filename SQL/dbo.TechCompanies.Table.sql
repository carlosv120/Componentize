USE [C127_carlosv.12044_gmail]
GO
/****** Object:  Table [dbo].[TechCompanies]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TechCompanies](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Profile] [nvarchar](1000) NOT NULL,
	[Summary] [nvarchar](255) NOT NULL,
	[Headline] [nvarchar](100) NOT NULL,
	[ContactInformation] [nvarchar](1000) NOT NULL,
	[Slug] [nvarchar](100) NOT NULL,
	[StatusId] [int] NOT NULL,
	[PrimaryImageId] [int] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
	[UserId] [int] NOT NULL,
 CONSTRAINT [PK_TechCompanies] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[TechCompanies] ADD  CONSTRAINT [DF_TechCompanies_Name]  DEFAULT (N'noName') FOR [Name]
GO
ALTER TABLE [dbo].[TechCompanies] ADD  CONSTRAINT [DF_TechCompanies_Profile]  DEFAULT (N'noProfile') FOR [Profile]
GO
ALTER TABLE [dbo].[TechCompanies] ADD  CONSTRAINT [DF_TechCompanies_Summary]  DEFAULT (N'noSummary') FOR [Summary]
GO
ALTER TABLE [dbo].[TechCompanies] ADD  CONSTRAINT [DF_TechCompanies_Headline]  DEFAULT (N'noHeadline') FOR [Headline]
GO
ALTER TABLE [dbo].[TechCompanies] ADD  CONSTRAINT [DF_TechCompanies_ContactInformation]  DEFAULT (N'noContactInformation') FOR [ContactInformation]
GO
ALTER TABLE [dbo].[TechCompanies] ADD  CONSTRAINT [DF_TechCompanies_Slug]  DEFAULT (N'noSlug') FOR [Slug]
GO
ALTER TABLE [dbo].[TechCompanies] ADD  CONSTRAINT [DF_TechCompanies_StatusId]  DEFAULT ((0)) FOR [StatusId]
GO
ALTER TABLE [dbo].[TechCompanies] ADD  CONSTRAINT [DF_TechCompanies_PrimaryImageId]  DEFAULT ((0)) FOR [PrimaryImageId]
GO
ALTER TABLE [dbo].[TechCompanies] ADD  CONSTRAINT [DF_TechCompanies_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[TechCompanies] ADD  CONSTRAINT [DF_TechCompanies_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[TechCompanies] ADD  CONSTRAINT [DF_TechCompanies_UserId]  DEFAULT ((0)) FOR [UserId]
GO
ALTER TABLE [dbo].[TechCompanies]  WITH CHECK ADD  CONSTRAINT [FK_TechCompanies_TechCompaniesImages] FOREIGN KEY([PrimaryImageId])
REFERENCES [dbo].[TechCompaniesImages] ([Id])
GO
ALTER TABLE [dbo].[TechCompanies] CHECK CONSTRAINT [FK_TechCompanies_TechCompaniesImages]
GO
