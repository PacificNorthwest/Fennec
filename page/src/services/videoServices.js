class VideoService {
    videoPatterns = {
        'youtube': {
            pattern: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/,
            videoIdExtractor: (url) => url.split('v=')[1]
        }
    }

    getVideoType(link) {
        for (let videoType in this.videoPatterns) {
            if (this.videoPatterns[videoType].pattern.test(link)) {
                return videoType;
            }
        }

        return 'unknown';
    }

    getEmbedIdentifier(link, type) {
        const videoIdExtractor = this.videoPatterns[type].videoIdExtractor;

        if (videoIdExtractor) {
            return videoIdExtractor(link);
        } else {
            return new Error('Unable to extract video identifier');
        }
    }
}

export default new VideoService();