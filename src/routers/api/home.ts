import { Router } from "express";

import FlixHD from "../../crawlers/flixhd";


const router = Router();
router.get("/home", async (req, res) => {

  const home = await new FlixHD().crawlHome()


  return res.status(200).json(home);
});

export default router;
