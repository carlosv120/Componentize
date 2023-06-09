USE [C127_carlosv.12044_gmail]
GO
/****** Object:  Table [dbo].[Friends]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Friends](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](120) NOT NULL,
	[Bio] [nvarchar](700) NOT NULL,
	[Summary] [nvarchar](255) NOT NULL,
	[Headline] [nvarchar](80) NOT NULL,
	[Slug] [nvarchar](100) NOT NULL,
	[StatusId] [int] NOT NULL,
	[PrimaryImageUrl] [nvarchar](500) NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
	[UserId] [int] NOT NULL,
 CONSTRAINT [PK_Friends] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Friends] ADD  CONSTRAINT [DF_Friends_Title]  DEFAULT (N'noTitle') FOR [Title]
GO
ALTER TABLE [dbo].[Friends] ADD  CONSTRAINT [DF_Friends_Bio]  DEFAULT (N'noBio') FOR [Bio]
GO
ALTER TABLE [dbo].[Friends] ADD  CONSTRAINT [DF_Friends_Summary]  DEFAULT (N'noSummary') FOR [Summary]
GO
ALTER TABLE [dbo].[Friends] ADD  CONSTRAINT [DF_Friends_Headline]  DEFAULT (N'noHeadline') FOR [Headline]
GO
ALTER TABLE [dbo].[Friends] ADD  CONSTRAINT [DF_Friends_Slug]  DEFAULT (N'noSlug') FOR [Slug]
GO
ALTER TABLE [dbo].[Friends] ADD  CONSTRAINT [DF_Friends_StatusId]  DEFAULT ((0)) FOR [StatusId]
GO
ALTER TABLE [dbo].[Friends] ADD  CONSTRAINT [DF_Friends_PrimaryImageUrl]  DEFAULT (N'noImage') FOR [PrimaryImageUrl]
GO
ALTER TABLE [dbo].[Friends] ADD  CONSTRAINT [DF_Friends_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[Friends] ADD  CONSTRAINT [DF_Friends_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[Friends] ADD  CONSTRAINT [DF_Friends_UserId]  DEFAULT ((0)) FOR [UserId]
GO
