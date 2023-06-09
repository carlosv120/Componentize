USE [C127_carlosv.12044_gmail]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](100) NOT NULL,
	[LastName] [nvarchar](100) NOT NULL,
	[Email] [nvarchar](100) NOT NULL,
	[AvatarUrl] [nvarchar](500) NOT NULL,
	[TenantId] [nvarchar](30) NOT NULL,
	[Password] [nvarchar](64) NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_User_FirstName]  DEFAULT (N'noFirstName') FOR [FirstName]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_User_LastName]  DEFAULT (N'noLastName') FOR [LastName]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_User_Email]  DEFAULT (N'noEmail') FOR [Email]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_User_AvatarUrl]  DEFAULT (N'noAvatarUrl') FOR [AvatarUrl]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_User_TenantId]  DEFAULT (N'noTenantId') FOR [TenantId]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_User_Password]  DEFAULT (N'noPassword') FOR [Password]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_User_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_User_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
