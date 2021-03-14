import React from 'react'
import YouTube from 'react-youtube-embed'

import VideoService from './videoServices'

class VideoComponentsProvider {
    embeddableVideo = {
        'youtube': {
            embedVideo: (identifier) => <YouTube id={identifier}/>
        }
    }

    getVideoComponent(mediaContent) {
        const videoType = VideoService.getVideoType(mediaContent.content);

        if (videoType in this.embeddableVideo) {
            const videoIdentifier = VideoService.getEmbedIdentifier(mediaContent.content, videoType);
            return this.embeddableVideo[videoType].embedVideo(videoIdentifier);
        } else {
            return <a href={mediaContent.content}>{mediaContent.content}</a>
        }
    }
}

export default new VideoComponentsProvider();