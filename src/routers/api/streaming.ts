import axios from "axios";
import VidCloud from "../../extractors/vidcloud";

import { Router } from "express";

const router = Router();

router.get("/streaming/:id", async (req, res) => {

    try {
        const data = await axios.get(`https://flixhq.to/ajax/sources/${req.params.id}`).then(res => res.data);

        const serverUrl = new URL(data.link);

        const streamingSource = await new VidCloud().extract(serverUrl)

        return res.status(200).json({ streaming: streamingSource });

    } catch (e) {

        return res.status(404).json({ error: e });

    }



});

export default router;
