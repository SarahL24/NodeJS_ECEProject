db = db.getSiblingDB("nodeProject");
db.users.drop();
db.users.insertMany([
	{
		email: 'maxime.billette@gmail.com',
		password: 'maxou',
		metrics:
		 [  { _id: ObjectId("51e0373c6f35bd826f47e9a0"), value: 14, date: new Date("1995-12-17T02:24:00.000Z") },
		  	{ _id: ObjectId("51e0373c6f35bd826f47e9a1"), value: 30, date: new Date("2019-11-07T04:21:00.000Z") } ]
	},
	{
		email: 'sarah.lehuby@gmail.com',
		password: 'latiteSassa',
		metrics: [] 
	},
	{
		email: 'amir.missidi@yahoo.fr',
		password: 'Spartamir75',
		metrics:
		 [ { _id: ObjectId("51e0373c6f35bd826f47e9a2"), value: 18, date: new Date("2012-10-19T06:16:00.000Z") } ] 
	},
	{
		email: 'sergei.kudinov@adaltas.com',
		password: 'SergeiTheBest',
		metrics:
		 [ { _id: ObjectId("51e0373c6f35bd826f47e9a3"), value: 5, date: new Date("2002-10-09T02:21:00.000Z") },
		   { _id: ObjectId("51e0373c6f35bd826f47e9a4"), value: 18, date: new Date("2012-10-19T06:16:00.000Z") },
		   { _id: ObjectId("51e0373c6f35bd826f47e9a5"), value: 5, date: new Date("2018-01-22T06:39:00.000Z") } ] 
	},
	{
		email: 'gregor.jouet@adaltas.com',
		password: 'DevOpsForTheWin',
		metrics:
		 [ { _id: ObjectId("51e0373c6f35bd826f47e9a7"), value: 5, date: new Date("2002-10-09T02:21:00.000Z") },
		   { _id: ObjectId("51e0373c6f35bd826f47e9a8"), value: 30, date: new Date("2019-11-07T04:21:00.000Z") },
		   { _id: ObjectId("51e0373c6f35bd826f47e9a9"), value: 14, date: new Date("1995-12-17T02:24:00.000Z") } ] }

])