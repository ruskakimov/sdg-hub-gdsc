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
                  Title
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Role
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
                  <td className="whitespace-wrap flex-wrap max-w-xs align-top flex gap-2 px-3 py-5 text-sm text-gray-500">
                    {professor.tags.map((tag) => (
                      <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        {tag}
                      </span>
                    ))}
                  </td>
                  <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    {professor.university}
                  </td>
                  <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit<span className="sr-only">, {professor.name}</span>
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
