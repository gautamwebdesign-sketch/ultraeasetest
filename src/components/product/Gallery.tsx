"use client";

import { useState } from "react";
import styles from "./Gallery.module.css";
import type { MediaItem } from "@/lib/shopify";

interface GalleryProps {
    media: MediaItem[];
}

export function Gallery({ media }: GalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    if (!media || media.length === 0) {
        return <div className={styles.placeholder}>No Media Available</div>;
    }

    const selectedMedia = media[selectedIndex];

    return (
        <div className={styles.gallery}>
            <div className={styles.mainStage}>
                {selectedMedia.type === "VIDEO" ? (
                    <video
                        controls
                        autoPlay
                        loop
                        muted
                        className={styles.mediaElement}
                        src={selectedMedia.url}
                        poster={selectedMedia.previewImage?.url}
                    />
                ) : selectedMedia.type === "EXTERNAL_VIDEO" ? (
                    <iframe
                        src={selectedMedia.url}
                        className={styles.mediaElement}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Product Video"
                    />
                ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={selectedMedia.url}
                        alt={selectedMedia.altText || "Product Image"}
                        className={styles.mediaElement}
                    />
                )}
            </div>

            {media.length > 1 && (
                <div className={styles.thumbnails}>
                    {media.map((item, index) => (
                        <button
                            key={item.id}
                            className={`${styles.thumbnail} ${index === selectedIndex ? styles.active : ""
                                }`}
                            onClick={() => setSelectedIndex(index)}
                        >
                            {item.type === "VIDEO" ? (
                                <div className={styles.videoIndicator}>▶</div>
                            ) : null}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={
                                    item.type === "VIDEO"
                                        ? item.previewImage?.url
                                        : item.url
                                }
                                alt={item.altText || `Thumbnail ${index + 1}`}
                                className={styles.thumbImage}
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
