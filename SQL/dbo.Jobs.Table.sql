USE [C127_carlosv.12044_gmail]
GO
/****** Object:  Table [dbo].[Jobs]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Jobs](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](120) NOT NULL,
	[Description] [nvarchar](1000) NOT NULL,
	[Summary] [nvarchar](255) NOT NULL,
	[Pay] [int] NOT NULL,
	[Slug] [nvarchar](100) NOT NULL,
	[StatusId] [int] NOT NULL,
	[TechCompanyId] [int] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
	[UserId] [int] NOT NULL,
 CONSTRAINT [PK_Jobs] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Jobs] ADD  CONSTRAINT [DF_Jobs_Title]  DEFAULT (N'NoTitle') FOR [Title]
GO
ALTER TABLE [dbo].[Jobs] ADD  CONSTRAINT [DF_Jobs_Description]  DEFAULT (N'NoDescription') FOR [Description]
GO
ALTER TABLE [dbo].[Jobs] ADD  CONSTRAINT [DF_Jobs_Summary]  DEFAULT (N'NoSummary') FOR [Summary]
GO
ALTER TABLE [dbo].[Jobs] ADD  CONSTRAINT [DF_Jobs_Pay]  DEFAULT ((0)) FOR [Pay]
GO
ALTER TABLE [dbo].[Jobs] ADD  CONSTRAINT [DF_Jobs_Slug]  DEFAULT (N'NoSlug') FOR [Slug]
GO
ALTER TABLE [dbo].[Jobs] ADD  CONSTRAINT [DF_Jobs_StatusId]  DEFAULT ((0)) FOR [StatusId]
GO
ALTER TABLE [dbo].[Jobs] ADD  CONSTRAINT [DF_Jobs_TechCompanyId]  DEFAULT ((0)) FOR [TechCompanyId]
GO
ALTER TABLE [dbo].[Jobs] ADD  CONSTRAINT [DF_Jobs_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[Jobs] ADD  CONSTRAINT [DF_Jobs_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[Jobs] ADD  CONSTRAINT [DF_Jobs_UserId]  DEFAULT ((0)) FOR [UserId]
GO
ALTER TABLE [dbo].[Jobs]  WITH CHECK ADD  CONSTRAINT [FK_Jobs_TechCompanies1] FOREIGN KEY([TechCompanyId])
REFERENCES [dbo].[TechCompanies] ([Id])
GO
ALTER TABLE [dbo].[Jobs] CHECK CONSTRAINT [FK_Jobs_TechCompanies1]
GO
