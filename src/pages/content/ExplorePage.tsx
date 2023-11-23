import Card from "../../common/components/Card";
import PageHeader from "../../common/components/PageHeader";

interface Professor {
  name: string;
  email: string;
  imageUrl: string;
  websiteUrl: string;
  university: string;
  title: string;
  tags: string[];
  goals: number[];
  // citations: number[]; // Last 10 years
  // papers: {
  //   name: string;
  //   authors: string[];
  //   publisher: string;
  //   description: string;
  //   citedBy: number;
  //   date: string;
  // }[];
}

const goals: string[] = [
  "No Poverty",
  "Zero Hunger",
  "Good Health and Well-Being",
  "Quality Education",
  "Gender Equality",
  "Clean Water and Sanitation",
  "Affordable and Clean Energy",
  "Decent Work and Economic Growth",
  "Industry, Innovation, and Infrastructure",
  "Reduced Inequalities",
  "Sustainable Cities and Communities",
  "Responsible Consumption and Production",
  "Climate Action",
  "Life Below Water",
  "Life on Land",
  "Peace, Justice and Strong Institutions",
  "Partnerships",
];

const goalColors: string[][] = [
  ["bg-red-50", "ring-red-600/20", "text-red-800"],
  ["bg-amber-50", "ring-amber-600/20", "text-amber-800"],
  ["bg-green-50", "ring-green-600/20", "text-green-800"],
  ["bg-rose-50", "ring-rose-600/20", "text-rose-800"],
  ["bg-orange-50", "ring-orange-600/20", "text-orange-800"],
  ["bg-cyan-50", "ring-cyan-600/20", "text-cyan-800"],
  ["bg-yellow-50", "ring-yellow-600/20", "text-yellow-800"],
  ["bg-red-50", "ring-red-600/20", "text-red-800"],
  ["bg-orange-50", "ring-orange-600/20", "text-orange-800"],
  ["bg-pink-50", "ring-pink-600/20", "text-pink-800"],
  ["bg-amber-50", "ring-amber-600/20", "text-amber-800"],
  ["bg-orange-50", "ring-orange-600/20", "text-orange-800"],
  ["bg-green-50", "ring-green-600/20", "text-green-800"],
  ["bg-blue-50", "ring-blue-600/20", "text-blue-800"],
  ["bg-lime-50", "ring-lime-600/20", "text-lime-800"],
  ["bg-indigo-50", "ring-indigo-600/20", "text-indigo-800"],
  ["bg-violet-50", "ring-violet-600/20", "text-violet-800"],
];

const professors: Professor[] = [
  {
    name: "Saad Bin Ahmed",
    email: "saad.ahmed@lakehead.ca",
    imageUrl:
      "https://scholar.googleusercontent.com/citations?view_op=medium_photo&user=6QZM-vIAAAAJ&citpid=3",
    websiteUrl:
      "https://scholar.google.ca/citations?user=6QZM-vIAAAAJ&hl=en&oi=ao",
    university: "Lakehead",

    title: "Assistant Professor",
    tags: [
      "script",
      "recognition",
      "intelligent systems",
      "ML",
      "neural networks",
      "deep learning",
    ],
    goals: [4, 9],
  },
];

export default function ExplorePage() {
  return (
    <>
      <PageHeader title="Explore" />

      <div className="space-y-6">
        <Card>
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Institution
                </th>

                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  SDG Goals
                </th>

                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Research Areas
                </th>

                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {professors.map((professor) => (
                <tr key={professor.email}>
                  <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                    <div className="flex items-center">
                      <div className="h-11 w-11 flex-shrink-0">
                        <img
                          className="h-11 w-11 rounded-full"
                          src={professor.imageUrl}
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">
                          {professor.name}
                        </div>
                        <div className="mt-1 text-gray-500">
                          {professor.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    <div className="text-gray-900">{professor.university}</div>
                    <div className="mt-1 text-gray-500">{professor.title}</div>
                  </td>

                  <td className="px-3 py-5 text-sm text-gray-500">
                    <div className="flex flex-wrap gap-2">
                      {professor.goals.map((goalNumber) => (
                        <span
                          className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${goalColors[
                            goalNumber
                          ].join(" ")}`}
                        >
                          {goals[goalNumber - 1]}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    <div className="flex flex-wrap gap-2">
                      {professor.tags.map((tag) => (
                        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="relative whitespace-nowrap py-5 px-3 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </>
  );
}
