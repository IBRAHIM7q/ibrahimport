"use client"
import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useModalState } from '@/hooks/useModalState';


// MediaItemType defines the structure of a media item
interface MediaItemType {
    id: number;
    type: string;
    title: string;
    desc: string;
    url: string;
    span: string;
}
// MediaItem component renders either a video or image based on item.type
const MediaItem = ({ item, className, onClick }: { item: MediaItemType, className?: string, onClick?: () => void }) => {
    const videoRef = useRef<HTMLVideoElement>(null); // Reference for video element
    const [isInView, setIsInView] = useState(false); // To track if video is in the viewport
    const [isBuffering, setIsBuffering] = useState(true);  // To track if video is buffering

    // Intersection Observer to detect if video is in view and play/pause accordingly
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                setIsInView(entry.isIntersecting); // Set isInView to true if the video is in view
            });
        }, options);

        if (videoRef.current) {
            observer.observe(videoRef.current); // Start observing the video element
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current); // Clean up observer when component unmounts
            }
        };
    }, []);
    // Handle video play/pause based on whether the video is in view or not
    useEffect(() => {
        let mounted = true;

        const handleVideoPlay = async () => {
            if (!videoRef.current || !isInView || !mounted) return; // Don't play if video is not in view or component is unmounted

            try {
                if (videoRef.current.readyState >= 3) {
                    setIsBuffering(false);
                    await videoRef.current.play(); // Play the video if it's ready
                } else {
                    setIsBuffering(true);
                    await new Promise((resolve) => {
                        if (videoRef.current) {
                            videoRef.current.oncanplay = resolve; // Wait until the video can start playing
                        }
                    });
                    if (mounted) {
                        setIsBuffering(false);
                        await videoRef.current.play();
                    }
                }
            } catch (error) {
                console.warn("Video playback failed:", error);
            }
        };

        if (isInView) {
            handleVideoPlay();
        } else if (videoRef.current) {
            videoRef.current.pause();
        }

        return () => {
            mounted = false;
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.removeAttribute('src');
                videoRef.current.load();
            }
        };
    }, [isInView]);

    // Render either a video or image based on item.type

    if (item.type === 'video') {
        return (
            <div className={`${className} relative overflow-hidden`}>
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    onClick={onClick}
                    playsInline
                    muted
                    loop
                    preload="auto"
                    style={{
                        opacity: isBuffering ? 0.8 : 1,
                        transition: 'opacity 0.2s',
                        transform: 'translateZ(0)',
                        willChange: 'transform',
                    }}
                >
                    <source src={item.url} type="video/mp4" />
                </video>
                {isBuffering && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                )}
            </div>
        );
    }

    return (
        <img
            src={item.url} // Image source URL
            alt={item.title} // Alt text for the image
            className={`${className} object-cover cursor-pointer`} // Style the image
            onClick={onClick} // Trigger onClick when the image is clicked
            loading="lazy" // Lazy load the image for performance
            decoding="async" // Decode the image asynchronously
        />
    );
};



// GalleryModal component displays the selected media item in a modal
interface GalleryModalProps {
    selectedItem: MediaItemType;
    isOpen: boolean;
    onClose: () => void;
    setSelectedItem: (item: MediaItemType | null) => void;
    mediaItems: MediaItemType[]; // List of media items to display in the modal
}
const GalleryModal = ({ selectedItem, isOpen, onClose, setSelectedItem, mediaItems }: GalleryModalProps) => {
    // Handle keyboard navigation
    useEffect(() => {
        if (!isOpen) return;
        
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                e.stopPropagation();
                onClose();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                e.stopPropagation();
                const currentIndex = mediaItems.findIndex(item => item.id === selectedItem.id);
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : mediaItems.length - 1;
                setSelectedItem(mediaItems[prevIndex]);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                e.stopPropagation();
                const currentIndex = mediaItems.findIndex(item => item.id === selectedItem.id);
                const nextIndex = currentIndex < mediaItems.length - 1 ? currentIndex + 1 : 0;
                setSelectedItem(mediaItems[nextIndex]);
            }
        };

        // Add event listener with high priority
        document.addEventListener('keydown', handleKeyDown, { capture: true });
        
        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.height = '100%';
        
        return () => {
            document.removeEventListener('keydown', handleKeyDown, { capture: true });
            // Restore body scrolling
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.height = '';
        };
    }, [selectedItem, onClose, setSelectedItem, mediaItems, isOpen]);

    if (!isOpen) return null; // Return null if the modal is not open

    return (
        <>
            {/* Backdrop - covers everything and prevents interaction */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black z-[99999999]"
                onClick={onClose}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    margin: 0,
                    padding: 0
                }}
            />
            
            {/* Modal Container - truly fullscreen like a new window */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                }}
                className="fixed inset-0 w-screen h-screen bg-black flex items-center justify-center z-[100000000]"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    margin: 0,
                    padding: 0
                }}
            >
                {/* Main Content */}
                <div className="relative w-full max-w-6xl mx-auto h-full max-h-[90vh] p-4">
                    <div className="relative w-full h-full bg-black rounded-2xl overflow-hidden shadow-2xl">
                        <div className="relative w-full h-full flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedItem.id}
                                    className="relative w-full h-full max-h-[85vh] flex items-center justify-center"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        transition: {
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 30,
                                            mass: 0.5
                                        }
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.9,
                                        transition: { duration: 0.2 }
                                    }}
                                >
                                    <div className="relative w-full h-full flex flex-col">
                                        {/* Media Container */}
                                        <div className="flex-1 flex items-center justify-center p-8">
                                            <MediaItem 
                                                item={selectedItem} 
                                                className="max-w-full max-h-full object-contain rounded-lg" 
                                            />
                                        </div>
                                        
                                        {/* Info Overlay */}
                                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                                            <div className="max-w-4xl mx-auto">
                                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                                                    {selectedItem.title}
                                                </h2>
                                                <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                                                    {selectedItem.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Navigation Arrows */}
                <motion.button
                    className="absolute left-8 top-1/2 -translate-y-1/2 z-[100000010] w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 
                              text-white border-2 border-white/30 shadow-2xl
                              flex items-center justify-center"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const currentIndex = mediaItems.findIndex(item => item.id === selectedItem.id);
                        const prevIndex = currentIndex > 0 ? currentIndex - 1 : mediaItems.length - 1;
                        setSelectedItem(mediaItems[prevIndex]);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <ChevronLeft className='w-8 h-8' />
                </motion.button>

                <motion.button
                    className="absolute right-8 top-1/2 -translate-y-1/2 z-[100000010] w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 
                              text-white border-2 border-white/30 shadow-2xl
                              flex items-center justify-center"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const currentIndex = mediaItems.findIndex(item => item.id === selectedItem.id);
                        const nextIndex = currentIndex < mediaItems.length - 1 ? currentIndex + 1 : 0;
                        setSelectedItem(mediaItems[nextIndex]);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <ChevronRight className='w-8 h-8' />
                </motion.button>

                {/* Close Button */}
                <motion.button
                    className="absolute top-8 right-8 z-[100000010] w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 
                              text-white shadow-2xl flex items-center justify-center border-2 border-white/20"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onClose();
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <X className='w-8 h-8' />
                </motion.button>

            </motion.div>
        </>
    );
};



interface InteractiveBentoGalleryProps {
    mediaItems: MediaItemType[]
    title: string
    description: string

}

const InteractiveBentoGallery: React.FC<InteractiveBentoGalleryProps> = ({ mediaItems, title, description }) => {
    const [selectedItem, setSelectedItem] = useState<MediaItemType | null>(null);
    const [items, setItems] = useState(mediaItems);
    const [isDragging, setIsDragging] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { setModalOpen } = useModalState();

    const handleOpenModal = (item: MediaItemType) => {
        if (!isDragging) {
            setSelectedItem(item);
            setIsModalOpen(true);
            setModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setModalOpen(false);
        setTimeout(() => setSelectedItem(null), 300); // Wait for animation to complete
    };

    return (
        <>
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="mb-8 text-center">
                    <motion.h1
                        className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent 
                                 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900
                                 dark:from-white dark:via-gray-200 dark:to-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {title}
                    </motion.h1>
                    <motion.p
                        className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        {description}
                    </motion.p>
                </div>
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3 auto-rows-[60px]"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.1 }
                        }
                    }}
                >
                    {items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            layoutId={`media-${item.id}`}
                            className={`relative overflow-hidden rounded-xl cursor-move ${item.span}`}
                            onClick={() => handleOpenModal(item)}
                            variants={{
                                hidden: { y: 50, scale: 0.9, opacity: 0 },
                                visible: {
                                    y: 0,
                                    scale: 1,
                                    opacity: 1,
                                    transition: {
                                        type: "spring",
                                        stiffness: 350,
                                        damping: 25,
                                        delay: index * 0.05
                                    }
                                }
                            }}
                            whileHover={{ scale: 1.02 }}
                            drag
                            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                            dragElastic={1}
                            onDragStart={() => setIsDragging(true)}
                            onDragEnd={(e, info) => {
                                setIsDragging(false);
                                const moveDistance = info.offset.x + info.offset.y;
                                if (Math.abs(moveDistance) > 50) {
                                    const newItems = [...items];
                                    const draggedItem = newItems[index];
                                    const targetIndex = moveDistance > 0 ?
                                        Math.min(index + 1, items.length - 1) :
                                        Math.max(index - 1, 0);
                                    newItems.splice(index, 1);
                                    newItems.splice(targetIndex, 0, draggedItem);
                                    setItems(newItems);
                                }
                            }}
                        >
                            <MediaItem
                                item={item}
                                className="absolute inset-0 w-full h-full"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenModal(item);
                                }}
                            />
                            <motion.div
                                className="absolute inset-0 flex flex-col justify-end p-2 sm:p-3 md:p-4"
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="absolute inset-0 flex flex-col justify-end p-2 sm:p-3 md:p-4">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                    <h3 className="relative text-white text-xs sm:text-sm md:text-base font-medium line-clamp-1">
                                        {item.title}
                                    </h3>
                                    <p className="relative text-white/70 text-[10px] sm:text-xs md:text-sm mt-0.5 line-clamp-2">
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Modal rendered outside the main container */}
            <AnimatePresence>
                {isModalOpen && selectedItem && (
                    <GalleryModal
                        selectedItem={selectedItem}
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        setSelectedItem={setSelectedItem}
                        mediaItems={items}
                    />
                )}
            </AnimatePresence>
        </>
    );
};


export default InteractiveBentoGallery