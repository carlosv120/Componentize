USE [C127_carlosv.12044_gmail]
GO
/****** Object:  View [sab].[vInstructors]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




Create view [sab].[vInstructors]

	/*

		select *
		From sab.vAllInstructors

	*/
as


	select	p.*
			,s.HireDate
			
		
	from	sab.Person p inner join sab.InstructorProfiles s
				on p.PersonId = s.InstructorId
		
			
GO
