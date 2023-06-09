USE [C127_carlosv.12044_gmail]
GO
/****** Object:  View [sab].[vInstructorsOffices]    Script Date: 6/3/2023 9:49:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




Create view [sab].[vInstructorsOffices]

	/*

		select *
		From sab.vAllInstructors

	*/
as


	select	p.*
			,s.HireDate
			,o.Name
			,o.Number
			,o.DateAssigned
		
	from	sab.Person p inner join sab.InstructorProfiles s
				on p.PersonId = s.InstructorId
			left outer join sab.OfficeAssignment o
					on o.InstructorId = p.PersonId
			
GO
