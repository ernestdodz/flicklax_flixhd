import * as Express from 'express';

import home from "./api/home";
import streaming from "./api/streaming";
import details from "./api/details"

export const initRoutes = (app: Express.Application) => {
	// app.get('/', (req, res) => {
	// 	res.redirect('back')
	// });

	app.use("/api", home);
	app.use("/api", streaming);
	app.use("/api", details)
};

