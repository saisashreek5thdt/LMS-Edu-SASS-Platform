import React from "react";
import './CoursesList.css'
export default function CoursesLists() {
    return (
        <>
            <div className="mt-20">
                <h1 className="text-center text-3xl mb-14 font-semibold text-gray-500">
                    COURSES LIST
                </h1>
                <div className="mx-auto place-content-center grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-16 gap-10">
                    <article className="card">
                        <div className="thumb"></div>
                        <div className="infos">
                            <h2 className="title">Title</h2>
                            <h3 className="date">Paragraph</h3>
                            <h3 className="seats">Price</h3>
    
                            <p className="txt">Add to library Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque, eveniet?</p>
                            <p className="txt">View details</p>
                            <p className="txt">Enroll now</p>
                            <button className="bg-red-500 rounded-lg h-8 p-3 grid place-content-center hover:opacity-85 border-none text-white">Add to Cart</button>
                        </div>
                    </article>

                    <article className="card">
                        <div className="thumb"></div>
                        <div className="infos">
                            <h2 className="title">Title</h2>
                            <h3 className="date">Paragraph</h3>
                            <h3 className="seats">Price</h3>
    
                            <p className="txt">Add to library Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque, eveniet?</p>
                            <p className="txt">View details</p>
                            <p className="txt">Enroll now</p>
                            <button className="bg-red-500 rounded-lg h-8 p-3 grid place-content-center hover:opacity-85 border-none text-white">Add to Cart</button>
                        </div>
                    </article>

                    <article className="card">
                        <div className="thumb"></div>
                        <div className="infos">
                            <h2 className="title">Title</h2>
                            <h3 className="date">Paragraph</h3>
                            <h3 className="seats">Price</h3>
    
                            <p className="txt">Add to library Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque, eveniet?</p>
                            <p className="txt">View details</p>
                            <p className="txt">Enroll now</p>
                            <button className="bg-red-500 rounded-lg h-8 p-3 grid place-content-center hover:opacity-85 border-none text-white">Add to Cart</button>
                        </div>
                    </article>

                    <article className="card">
                        <div className="thumb"></div>
                        <div className="infos">
                            <h2 className="title">Title</h2>
                            <h3 className="date">Paragraph</h3>
                            <h3 className="seats">Price</h3>
    
                            <p className="txt">Add to library Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque, eveniet?</p>
                            <p className="txt">View details</p>
                            <p className="txt">Enroll now</p>
                            <button className="bg-red-500 rounded-lg h-8 p-3 grid place-content-center hover:opacity-85 border-none text-white">Add to Cart</button>
                        </div>
                    </article>

                    <article className="card">
                        <div className="thumb"></div>
                        <div className="infos">
                            <h2 className="title">Title</h2>
                            <h3 className="date">Paragraph</h3>
                            <h3 className="seats">Price</h3>
    
                            <p className="txt">Add to library Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque, eveniet?</p>
                            <p className="txt">View details</p>
                            <p className="txt">Enroll now</p>
                            <button className="bg-red-500 rounded-lg h-8 p-3 grid place-content-center hover:opacity-85 border-none text-white">Add to Cart</button>
                        </div>
                    </article>

                    
                </div>
            </div>
        </>
    );
}