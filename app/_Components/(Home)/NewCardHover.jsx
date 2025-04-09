import './newCard.css'
import { BookOpenCheck, LibraryBig, SquarePlay } from "lucide-react";

export default function NewCardHover() {
    const cards = [
        {
            title: "Find Your Module/Course",
            description: "Choose your course from our library",
            icon:<BookOpenCheck className='w-16 h-16'/>
        },
        {
            title: "Explore Course Details",
            description: "Select and explore detailed course information",
            icon:<LibraryBig className='w-16 h-16'/>
        },
        {
            title: "Enroll in Your Course",
            description: "Complete enrollment and start learning",
            icon:<SquarePlay className='w-16 h-16'/>
        },
    ];

    return (
        <>
            <div className="mt-16">
            <h1 className="text-center text-3xl mb-14 font-semibold text-gray-500">
                    HOW IT WORKS
                </h1>
                <div className="container">

                {
                    cards.map((card,index)=>(
                        <div key={index} className="card">
                        <div className="face face1">
                            <div className="content">
                                <div className="flex flex-col justify-around items-center gap-5">
                                <h2 className='text-center text-2xl'>{card.title}</h2>
                                <p className='text-center text-gray-700'>{card.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="face face2">
                            <h2>{card.icon}</h2>
                        </div>
                    </div>
                    ))
                }
                    
                </div>
            </div>
        </>
    )
}