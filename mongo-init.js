db = db.getSiblingDB("nodeProject");
db.users.drop();
db.users.insertMany([
	{
		email: 'maxime.billette@gmail.com',
		password: 'maxou',
		metrics:
		 [  { value: 14, date: new Date("1995-12-17T02:24:00.000Z") },
		  	{ value: 30, date: new Date("2019-11-07T04:21:00.000Z") } ]
	},
	{
		email: 'sarah.lehuby@gmail.com',
		password: 'latiteSassa',
		metricas: [{value: 44}] 
	},
	{
		email: 'amir.missidi@yahoo.fr',
		password: 'Spartamir75',
		metrics:
		 [ { value: 18, date: new Date("2012-10-19T06:16:00.000Z") } ] 
	},
	{
		email: 'sergei.kudinov@adaltas.com',
		password: 'SergeiTheBest',
		metrics:
		 [ { value: 5, date: new Date("2002-10-09T02:21:00.000Z") },
		   { value: 18, date: new Date("2012-10-19T06:16:00.000Z") },
		   { value: 5, date: new Date("2018-01-22T06:39:00.000Z") } ] 
	},
	{
		email: 'gregor.jouet@adaltas.com',
		password: 'DevOpsForTheWin',
		metrics:
		 [ { value: 5, date: new Date("2002-10-09T02:21:00.000Z") },
		   { value: 30, date: new Date("2019-11-07T04:21:00.000Z") },
		   { value: 14, date: new Date("1995-12-17T02:24:00.000Z") } ] }

])