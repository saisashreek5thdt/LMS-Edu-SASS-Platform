"use client";
import Image from "next/image";
import { MdSaveAlt } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import Link from "next/link";

export default function MyCourses2() {
    const initialVideos = [
        { id: 1, title: "Introduction", src: "/slider/images/aboutEvent1.mp4" },
        { id: 2, title: "Mastering Tools", src: "/slider/images/aboutEvent1.mp4" },
        { id: 3, title: "Advanced Techniques", src: "/slider/images/aboutEvent1.mp4" },
    ];
    const [videos, setVideos] = useState(initialVideos.map(v => ({ ...v, duration: 0 })));
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [completionStatus, setCompletionStatus] = useState(Array(initialVideos.length).fill(false));
    const [progress, setProgress] = useState(0);
    const [videoEnded, setVideoEnded] = useState(false);
    const videoRef = useRef(null);

    // Load video metadata and save duration
    const handleLoadedMetadata = (index, duration) => {
        setVideos((prevVideos) =>
            prevVideos.map((video, i) =>
                i === index ? { ...video, duration: duration.toFixed(2) } : video
            )
        );
    };

    // Toggle play/pause state
    const togglePlayPause = () => {
        const video = videoRef.current;
        if (!video) return;
        if (isPlaying) {
            video.pause();
        } else {
            video.play().catch(err => console.error("Play failed:", err));
        }
        setIsPlaying(!isPlaying);
    };

    // Track watched percentage and update completion status
    const handleTimeUpdate = () => {
        const video = videoRef.current;
        if (!video || !video.duration) return;
        const percentWatched = (video.currentTime / video.duration) * 100;
        if (percentWatched >= 97 && !completionStatus[currentVideoIndex]) {
            const newStatus = [...completionStatus];
            newStatus[currentVideoIndex] = true;
            setCompletionStatus(newStatus);
        }

        const milestones = [25, 50, 75, 100];
        milestones.forEach((milestone) => {
            if (
                Math.floor(percentWatched) === milestone &&
                !localStorage.getItem(`milestone_${milestone}_video_${currentVideoIndex}`)
            ) {
                console.log(`Reached ${milestone}% milestone!`);
                localStorage.setItem(`milestone_${milestone}_video_${currentVideoIndex}`, "true");
            }
        });
    };

    // Handle video end
    const handleEnded = () => {
        setVideoEnded(true);
        setIsPlaying(false);
    };

    // Go to next video and auto-play
    const handleNextVideo = () => {
        const nextIndex = currentVideoIndex + 1;
        if (nextIndex < videos.length) {
            setCurrentVideoIndex(nextIndex);
            setVideoEnded(false);
            setTimeout(() => {
                if (videoRef.current) {
                    videoRef.current.play()
                        .then(() => setIsPlaying(true))
                        .catch(err => console.error("Auto-play failed:", err));
                }
            }, 50);
        }
    };

    // Replay current video
    const handleReplay = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
            setIsPlaying(true);
            setVideoEnded(false);
        }
    };

    // Update progress bar
    useEffect(() => {
        const completed = completionStatus.filter(Boolean).length;
        setProgress((completed / videos.length) * 100);
    }, [completionStatus]);

    // Reset video when switching tabs
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load(); // Reload video
            setVideoEnded(false);   // Reset ended flag
        }
    }, [currentVideoIndex]);

    // Auto-play first video
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play()
                .then(() => setIsPlaying(true))
                .catch(err => console.log("Auto-play blocked by browser:", err));
        }
    }, []);

    // Dynamic count for completed videos
    const completedCount = completionStatus.filter(Boolean).length;

    return (
        <div className="bg-slate-100 w-full flex justify-center items-center -mt-12 min-h-screen">
            <div className="grid grid-rows-2 sm:grid-rows-2 md:grid-cols-[67%_30%] mt-28 mx-10 gap-[3%] w-full max-w-screen-xl">
                {/* Left Side */}
                <div className="flex flex-col items-start justify-center gap-5">
                    {/* Breadcrumbs */}
                    <div className="">My Course {`>`} Mastering {`>`} Course</div>
                    {/* Title */}
                    <div className="text-4xl font-bold">{videos[currentVideoIndex].title}</div>
                    {/* Video Player */}
                    <div className="w-full h-auto bg-slate-300 rounded-lg overflow-hidden relative">
                        <video
                            ref={videoRef}
                            className="w-full h-full object-cover"
                            src={videos[currentVideoIndex].src}
                            controls
                            onTimeUpdate={handleTimeUpdate}
                            onEnded={handleEnded}
                            onLoadedMetadata={(e) => handleLoadedMetadata(currentVideoIndex, e.target.duration)}
                        />
                        {/* After Video Ends */}
                        {videoEnded && (
                            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-4 text-white text-lg font-medium">
                                <p>You've completed this video!</p>
                                <div className="flex gap-4 sm:gap-2">
                                    {currentVideoIndex < videos.length - 1 && (
                                        <button
                                            className="bg-blue-600 px-2 py-1 md:px-6 md:py-2 sm:px-2 sm:py-1 rounded hover:bg-blue-700"
                                            onClick={handleNextVideo}
                                        >
                                            Continue to Next
                                        </button>
                                    )}
                                    <button
                                        className="bg-white text-black px-2 py-1 md:px-6 md:py-2 sm:px-2 sm:py-1 rounded hover:bg-gray-200"
                                        onClick={handleReplay}
                                    >
                                        Replay
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Profile Info */}
                    <div className="flex justify-between items-center w-full mt-2">
                        <div className="flex items-center gap-2">
                            <Image
                                className="rounded-lg w-10 bg-slate-400 h-10"
                                src="/favicon.png"
                                alt="profile"
                                width={100}
                                height={100}
                                priority
                            />
                            <div className="flex flex-col">
                                <h3 className="font-semibold text-lg">lorem</h3>
                                <p className="font-normal text-base">lorem - Lorem ipsum dolor.</p>
                            </div>
                        </div>
                        <div className="text-2xl cursor-pointer"><MdSaveAlt /></div>
                    </div>
                    {/* About This Course */}
                    <div className="flex flex-col gap-2">
                        <h3 className="text-2xl font-bold">About this course</h3>
                        <p className="text-lg text-gray-600">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum deserunt odio doloribus atque incidunt...
                        </p>
                    </div>
                    {/* Suitability Section */}
                    <div className="flex flex-col gap-2">
                        <h3 className="text-2xl font-bold">This Course Suit For:</h3>
                        <ul className="list-disc ml-5 text-lg text-gray-600">
                            <li>Lorem ipsum dolor sit amet.</li>
                            <li>Lorem ipsum dolor sit amet.</li>
                            <li>Lorem ipsum dolor sit amet.</li>
                            <li>Lorem ipsum dolor sit amet.</li>
                            <li>Lorem ipsum dolor sit amet.</li>
                        </ul>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="flex flex-col items-start gap-4 w-full">
                    {/* Conditional Progress or Certificate Section */}
                    {progress < 100 ? (
                        <div className="bg-white shadow-md rounded-lg p-4 w-full flex flex-col">
                            <h3 className="text-2xl font-bold">
                                Your Study Progress <span>{Math.round(progress)}%</span>
                            </h3>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }} />
                            </div>
                            <div className="border border-gray-200 p-2 rounded-lg w-full bg-slate-50 text-sm mt-2">
                                You are on track! Keep going to unlock more milestones.
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gradient-to-br from-green-50 to-emerald-100 shadow-md rounded-lg p-6 w-full flex flex-col items-center text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-16 h-16 text-green-600 mb-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Congratulations!</h3>
                            <p className="text-lg text-gray-600 mb-4">
                                You've successfully completed the course. Download your certificate below.
                            </p>
                            <button
                                onClick={() => alert("Downloading your certificate...")}
                                className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                                <span className="font-medium">Download Certificate (PDF)</span>
                            </button>
                        </div>
                    )}

                    {/* Course Completion Count */}
                    <div className="flex items-center justify-between p-4 w-full">
                        <h3 className="text-2xl font-bold">Course Completion</h3>
                        <p className="text-2xl font-medium">
                            {completedCount}/{videos.length}
                        </p>
                    </div>

                    {/* Video Tabs */}
                    <div className="flex flex-col gap-4 w-full">
                        {videos.map((video, index) => (
                            <div
                                key={video.id}
                                onClick={() => setCurrentVideoIndex(index)}
                                className={`cursor-pointer flex items-center justify-between shadow-md rounded-lg p-4 ${
                                    currentVideoIndex === index ? "bg-blue-600 text-white" : "bg-white"
                                }`}
                            >
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (currentVideoIndex === index) {
                                                togglePlayPause();
                                            } else {
                                                setCurrentVideoIndex(index);
                                                setTimeout(() => {
                                                    if (videoRef.current) {
                                                        videoRef.current.play()
                                                            .then(() => setIsPlaying(true))
                                                            .catch(err => {
                                                                console.error("Auto-play failed:", err);
                                                                setIsPlaying(false);
                                                            });
                                                    }
                                                }, 50);
                                            }
                                        }}
                                        className={`${currentVideoIndex === index ? "bg-white text-blue-600" : "text-blue-600"} rounded-full px-2 py-2 text-xl`}
                                    >
                                        {currentVideoIndex === index && isPlaying ? <FaPause /> : <FaPlay />}
                                    </button>
                                    <div className="flex flex-col gap-1">
                                        <h3 className={currentVideoIndex === index ? "font-bold" : ""}>
                                            {video.title}
                                        </h3>
                                        <p className="text-sm">
                                            {video.duration
                                                ? `${Math.floor(video.duration / 60)}h ${Math.floor(video.duration % 60)}min`
                                                : "Loading..."}
                                        </p>
                                    </div>
                                </div>
                                {completionStatus[index] && (
                                    <div className="rounded-full bg-green-600 text-xl text-white px-2 py-2 flex items-center justify-center">
                                        <TiTick />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}