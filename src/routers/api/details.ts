import axios from "axios";

import cheerio from 'cheerio';

import { Router } from "express";

import FlixHD from "../../crawlers/flixhd";

const router = Router();

router.get("/details/:id", async (req, res) => {

    try {
        const html = await axios.get(`https://flixhd.cc/movie/watch-${req.params.id}`)
            .then(res => res.data);

        const $ = cheerio.load(html);

        const description = $("div.description").text().replace(/\s+/g, ' ').trim();

        const id = req.params.id;
        const title = $(".dp-i-content > .dp-i-c-poster").find(".film-poster-img").attr("title")
        const posterPath = $(".dp-i-content > .dp-i-c-poster").find(".film-poster-img").attr("src")
        const backdropPath = $(".cover_follow-photo").attr("style")?.split("url(")[1].split(")")[0]

        const sources = await new FlixHD().getSources(req.params.id)

        // console.log($(".dp-i-c-right").find(".heading-name").text())
        // console.log($(".dp-i-c-right").find(".quality").text())
        // console.log($(".dp-i-c-right").find(".duration").text())

        return res.status(200).json({ id, description, title, posterPath, backdropPath, sources });
    } catch (e) {
        return res.status(404).json({ error: e });
    }

});

export default router;
