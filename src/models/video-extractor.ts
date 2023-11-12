import { ISources, IStreamingResult } from '../types/types';

abstract class VideoExtractor {

    protected abstract serverName: string;

    protected abstract extract(videoUrl: URL, ...args: any): Promise<IStreamingResult | ISources>;
}

export default VideoExtractor;