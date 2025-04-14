import './team.css'
import { BookOpenCheck, LibraryBig, SquarePlay } from "lucide-react";
import Image from 'next/image';
export default function Team() {
    const TeamDetail = [
        {
            image: "https://dummyjson.com/image/200x100",
            teamInfo: [
                {
                    name: "Name",
                    designation: "Designation",
                    modules:"23"
                }
            ]
        },
        {
            image: "https://dummyjson.com/image/200x100",
            teamInfo: [
                {
                    name: "Name",
                    designation: "Designation",
                    modules:"23"
                }
            ]
        },
        {
            image: "https://dummyjson.com/image/200x100",
            teamInfo: [
                {
                    name: "Name",
                    designation: "Designation",
                    modules:"23"
                }
            ]
        },
    ];

    return (
        <>
            <div className="mt-16">
                <h1 className="text-center text-3xl mb-14 font-semibold text-gray-500">
                    Teams
                </h1>
                <div className="containerTeam">

                    {
                        TeamDetail.map((team, index) => (
                            <div key={index} className="cardTeam">
                                <div className="faceTeam face1Team">
                                    {/* <Image src={"https://dummyjson.com/image/200x100"} width={90} height={90} alt='image'/> */}
                                    <img
                                        src="https://dummyjson.com/image/200x100"
                                        alt="Course Thumbnail"
                                        className="w-full h-auto"
                                    />
                                </div>
                                <div className="faceTeam face2Team">
                                    <div className="flex justify-around items-center w-full">
                                      <h2>{team.teamInfo[0].name}</h2>
                                      <div className="flex item-end flex-col">
                                         <h3>{team.teamInfo[0].designation}</h3>
                                         <p>{team.teamInfo[0].modules}</p>
                                      </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}