'use client';

import { Box, Skeleton } from "@mui/material";

export interface IVideoDisplayOptions {
    src?: string,
    isLoading?: boolean
}

const fixYoutubeURL = (url: string | undefined) => {
    if (!url) return;
    
    const urlObj = new URL(url);

    if (urlObj.host === "youtu.be") {
        urlObj.host = "youtube.com";
    }

    if (!urlObj.pathname.startsWith("/embed")) {
        urlObj.pathname = `/embed` + urlObj.pathname;
    }

    return urlObj.toString();
}

export default function VideoDisplay({
    src,
    isLoading
}: IVideoDisplayOptions) {
    return (
    <Box
        width="100%"
        height={{
            xs: 240,
            sm: 360,
            md: 480
        }}
        >
        {
            isLoading ? (
            <Skeleton
                variant="rounded"
                width="100%"
                height="100%"
            >
            </Skeleton>
            ) : (
            <iframe
                width="100%"
                height="100%"
                src={fixYoutubeURL(src)}
                style={{
                    border: "none",
                    borderRadius: 8,
                    backgroundColor: "black"
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
                referrerPolicy="origin-when-cross-origin"
                allowFullScreen
            ></iframe>
            )
        }
        </Box>
    )
}