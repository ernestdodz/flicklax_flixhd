import axios from 'axios';
import CryptoJS from 'crypto-js';

import { ISources, IStreamingResult } from '../types/types';
import { isJson } from '../utils/utils';

import VideoExtractor from '../models/video-extractor';


class VidCloud extends VideoExtractor {
    protected override serverName = 'VidCloud';

    private readonly host = 'https://dokicloud.one';
    private readonly host2 = 'https://rabbitstream.net';

    extract = async (videoUrl: URL): Promise<IStreamingResult> => {

        try {
            const id = videoUrl.href.split('/').pop()?.split('?')[0];
            const options = {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Referer': videoUrl.href,
                },
            };

            const res = await axios.get(`${videoUrl.protocol}//${videoUrl.hostname}/ajax/embed-4/getSources?id=${id}`, options);

            if (!isJson(res.data.sources)) {
                const key = await (await axios.get('https://e4.tvembed.cc/e4')).data;

                const sourcesArray = res.data.sources.split("");

                let extractedKey = "";

                for (const index of key) {
                    for (let i = index[0]; i < index[1]; i++) {
                        extractedKey += res.data.sources[i];
                        sourcesArray[i] = "";
                    }
                }

                res.data.sources = sourcesArray.join("");

                const decryptedVal = CryptoJS.AES.decrypt(res.data.sources, extractedKey).toString(CryptoJS.enc.Utf8);
                const sources = isJson(decryptedVal) ? JSON.parse(decryptedVal) : res.data.sources;

                res.data.sources = sources.map((s: ISources) => ({
                    url: s.file,
                }));

                //res.data.sources = sources[0].file;


            }

            //return videoResult;
            return res.data;
        } catch (err) {
            throw new Error((err as Error).message);
        }
    }
}

export default VidCloud;
