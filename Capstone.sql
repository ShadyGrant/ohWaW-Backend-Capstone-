USE [master]
GO

IF db_id('Capstone') IS NULL
  CREATE DATABASE Capstone
GO

USE [Capstone]
GO

DROP TABLE IF EXISTS [Ratng];
DROP TABLE IF EXISTS [Comment];
DROP TABLE IF EXISTS [Department];
DROP TABLE IF EXISTS [Product];
DROP TABLE IF EXISTS [UserProfile];
GO 

CREATE TABLE [UserProfile] (
  [Id] INTEGER NOT NULL IDENTITY(1, 1),
  [FirebaseUserId] NVARCHAR(28) NOT NULL IDENTITY(1, 1),
  [DisplayName] NVARCHAR(50) NOT NULL,
  [FirstName] NVARCHAR(50) NOT NULL,
  [LastName] NVARCHAR(50) NOT NULL,
  [Email] NVARCHAR(555) NOT NULL,
  [CreateDateTime] datetime NOT NULL,
  [ImageLocation] NVARCHAR(255),
  PRIMARY KEY ([Id], [FirebaseUserId])
)
GO

CREATE TABLE [Product] (
  [Id] INTEGER PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [Title] NVARCHAR(55) NOT NULL,
  [Description] TEXT NOT NULL,
  [WebsiteURL] NVARCHAR(2000) NOT NULL,
  [ImageLocation] NVARCHAR(2000) NOT NULL,
  [Price] FLOAT NOT NULL,
  [CreateDateTime] DATETIME NOT NULL,
  [DepartmentId] INTEGER NOT NULL,
  [UserProfileId] INTEGER NOT NULL
)
GO

CREATE TABLE [Department] (
  [Id] INTEGER PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [Name] NVARCHAR(55) NOT NULL
)
GO

CREATE TABLE [Comment] (
  [Id] INTEGER PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [ProductId] INTEGER NOT NULL,
  [UserProfileId] INTEGER NOT NULL,
  [Content] TEXT NOT NULL,
  [CreateDateTime] DATETIME NOT NULL
)
GO

CREATE TABLE [Rating] (
  [Id] INTEGER PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [Rate] INTEGER NOT NULL,
  [ProductId] INTEGER NOT NULL,
  [UserProfileId] INTEGER NOT NULL
)
GO

ALTER TABLE [Product] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Department] ADD FOREIGN KEY ([Id]) REFERENCES [Product] ([DepartmentId])
GO

ALTER TABLE [Product] ADD FOREIGN KEY ([Id]) REFERENCES [Comment] ([ProductId])
GO

ALTER TABLE [UserProfile] ADD FOREIGN KEY ([Id]) REFERENCES [Comment] ([UserProfileId])
GO

ALTER TABLE [Product] ADD FOREIGN KEY ([Id]) REFERENCES [Rating] ([ProductId])
GO

ALTER TABLE [UserProfile] ADD FOREIGN KEY ([Id]) REFERENCES [Rating] ([UserProfileId])
GO

