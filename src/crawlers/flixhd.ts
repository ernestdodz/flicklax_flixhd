import axios from "axios";
import cheerio from 'cheerio';


type Media = {
    id: string | undefined;
    title: string | undefined;
    posterPath: string | undefined
    href: string | undefined
}

class FlixHD {
    readonly name = 'FlixHD';
    protected baseUrl = 'https://flixhd.cc';


    async crawlHome() {
        const html = await axios.get(this.baseUrl).then(res => res.data);

        const $ = cheerio.load(html);

        const trendingMovies: Media[] = []
        const trendingTVShows: Media[] = []

        const latestMovies: Media[] = []

        $("h2:contains('Latest Movies')").closest(".block_area-header-tabs")
            .next().find('.flw-item > .film-poster > img').each((index, elem) => {

                const title = $(elem).attr('title')
                const posterPath = $(elem).attr("data-src")

                latestMovies[index] = { id: "", title, posterPath, href: "" }
            });

        $("#trending-movies").find('.flw-item > .film-poster > img').each((index, elem) => {
            const title = $(elem).attr('title')
            const posterPath = $(elem).attr("data-src")

            const href = $(elem).next().attr("href")
            const id = href?.split('-').pop();

            trendingMovies[index] = { id, title, posterPath, href }
        });

        $("#trending-tv").find('.flw-item > .film-poster > img').each((index, elem) => {
            const title = $(elem).attr('title')
            const posterPath = $(elem).attr("data-src")

            const href = $(elem).next().attr("href")

            const id = href?.split('-').pop();

            trendingTVShows[index] = { id, title, posterPath, href }
        });

        return { trendingMovies, trendingTVShows, latestMovies };
    }

    async getSources(source_id: string) {
        const html = await axios.get(`https://flixhd.cc/ajax/episode/list/${source_id}`)
            .then(res => res.data);

        const $ = cheerio.load(html);

        const sources: { linkId: string | undefined; serverName: string | undefined; }[] = [];

        $(".fss-list > li").each(function (index, element) {
            const linkId = $(element).attr("data-linkid")
            const serverName = $(element).find("a").attr("title")


            sources.push({ linkId, serverName });
        })

        return sources;
    }

    async crawlLatestMovies() {

    }


}


export default FlixHD;