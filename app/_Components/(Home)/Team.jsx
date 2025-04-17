import Image from 'next/image';

export default function Team() {
  const TeamDetail = [
    {
      image: "https://dummyjson.com/image/200x100",
      teamInfo: [
        {
          name: "John Doe",
          designation: "Lead Developer",
          modules: "23"
        }
      ]
    },
    {
      image: "https://dummyjson.com/image/200x100",
      teamInfo: [
        {
          name: "Jane Smith",
          designation: "UI/UX Designer",
          modules: "15"
        }
      ]
    },
    {
      image: "https://dummyjson.com/image/200x100",
      teamInfo: [
        {
          name: "Alice Johnson",
          designation: "Product Manager",
          modules: "30"
        }
      ]
    },
    {
        image: "https://dummyjson.com/image/200x100",
        teamInfo: [
          {
            name: "Alice Johnson",
            designation: "Product Manager",
            modules: "30"
          }
        ]
      },
      {
        image: "https://dummyjson.com/image/200x100",
        teamInfo: [
          {
            name: "Alice Johnson",
            designation: "Product Manager",
            modules: "30"
          }
        ]
      },
    
  ];

  return (
    <>
      <div className="mt-16">
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-14">
          Our Team
        </h1>
        <div className="grid place-content-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
             
             {TeamDetail.map((team, index) => (
              <div
                key={index}
                className=" bg-white w-64 rounded-2xl overflow-hidden shadow-xl hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 border border-1"
              >
                {/* Front Face */}
                <div className="relative h-44 w-full">
                  <Image
                    src={team.image}
                    alt="Team Member"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-2xl p-2"
                  />
                </div>

                {/* Back Face */}
                <div className="p-2">
                  <div className="flex flex-col justify-center items-center space-y-2">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {team.teamInfo[0].name}
                    </h2>
                    <h3 className="text-base text-gray-600">
                      {team.teamInfo[0].designation}
                    </h3>
                    <p className="text-sm text-indigo-600 font-medium">
                      Modules: {team.teamInfo[0].modules}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}