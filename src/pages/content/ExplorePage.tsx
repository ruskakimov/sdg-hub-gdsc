import { useState } from "react";
import Card from "../../common/components/Card";
import PageHeader from "../../common/components/PageHeader";
import SelectField from "../../common/components/fields/SelectField";
import { XCircleIcon } from "@heroicons/react/24/outline";

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
    name: "Mohammad Ahmed",
    email: "m.ahmed@lakehead.ca",
    imageUrl:
      "https://scholar.google.ca/citations/images/avatar_scholar_128.png",
    websiteUrl: "",
    university: "Lakehead",

    title: "Assistant Professor",
    tags: [
      "recognition",
      "intelligent systems",
      "ML",
      "neural networks",
      "deep learning",
    ],
    goals: [4, 9],
  },
  {
    name: "Zheng Wang",
    email: "zheng.wang@lakehead.ca",
    imageUrl:
      "https://scholar.google.ca/citations/images/avatar_scholar_128.png",
    websiteUrl: "",
    university: "Lakehead",
    title: "Professor",
    tags: [
      "boson",
      "particle-flow",
      "dark matter",
      "energy",
      "neutrino physics",
    ],
    goals: [4, 7, 9],
  },
  {
    name: "Michel Bédard",
    email: "michel@lakehead.ca",
    imageUrl:
      "https://scholar.googleusercontent.com/citations?view_op=medium_photo&user=MD3G5iMAAAAJ&citpid=3",
    websiteUrl: "",
    university: "Lakehead",
    title: "Professor",
    tags: ["care-giving", "driving", "mental health", "aging"],
    goals: [3, 10, 17],
  },

  {
    name: "John Doe",
    email: "john.doe@lakehead.ca",
    imageUrl:
      "https://scholar.google.ca/citations/images/avatar_scholar_128.png",
    websiteUrl: "",
    university: "Lakehead",
    title: "Associate Professor",
    tags: ["data science", "machine learning", "statistics"],
    goals: [5, 8, 14],
  },
  {
    name: "Jane Smith",
    email: "jane.smith@lakehead.ca",
    imageUrl:
      "https://scholar.google.ca/citations/images/avatar_scholar_128.png",
    websiteUrl: "",
    university: "Lakehead",
    title: "Professor",
    tags: ["environmental science", "climate change", "sustainability"],
    goals: [2, 11, 15],
  },
  {
    name: "Bob Johnson",
    email: "bob.johnson@lakehead.ca",
    imageUrl:
      "https://scholar.google.ca/citations/images/avatar_scholar_128.png",
    websiteUrl: "",
    university: "Lakehead",
    title: "Assistant Professor",
    tags: ["software engineering", "web development", "algorithms"],
    goals: [1, 6, 13],
  },
  {
    name: "Alice Williams",
    email: "alice.williams@lakehead.ca",
    imageUrl:
      "https://scholar.google.ca/citations/images/avatar_scholar_128.png",
    websiteUrl: "",
    university: "Lakehead",
    title: "Professor",
    tags: ["biochemistry", "molecular biology", "genetics"],
    goals: [12, 16],
  },
  {
    name: "Ethan Carter",
    email: "ethan.carter@lakehead.ca",
    imageUrl:
      "https://scholar.google.ca/citations/images/avatar_scholar_128.png",
    websiteUrl: "",
    university: "Lakehead",
    title: "Associate Professor",
    tags: ["robotics", "artificial intelligence", "control systems"],
    goals: [7, 9, 15],
  },
  {
    name: "Olivia Davis",
    email: "olivia.davis@lakehead.ca",
    imageUrl:
      "https://scholar.google.ca/citations/images/avatar_scholar_128.png",
    websiteUrl: "",
    university: "Lakehead",
    title: "Professor",
    tags: ["public health", "epidemiology", "health policy"],
    goals: [3, 10, 14],
  },
];

export default function ExplorePage() {
  const [filterGoals, setFilterGoals] = useState<number[]>([]);

  return (
    <>
      <PageHeader title="Explore" />

      <div className="space-y-6">
        <Card>
          <div>
            <SelectField
              label="SDG Goals"
              options={goals.map((g, i) => ({
                label: i + 1 + ". " + g,
                value: i + "",
              }))}
              onChange={(e) => {
                const val = +e.target.value;
                if (filterGoals.includes(val)) {
                  setFilterGoals(filterGoals.filter((g) => g !== val));
                } else {
                  setFilterGoals([...filterGoals, val]);
                }
              }}
            />
          </div>

          <div>
            <div className="flex flex-wrap gap-2">
              {filterGoals.map((i) => (
                <span
                  key={i}
                  className={`inline-flex cursor-pointer items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${goalColors[
                    i
                  ].join(" ")}`}
                  onClick={() => {
                    setFilterGoals(filterGoals.filter((g) => g !== i));
                  }}
                >
                  {goals[i]} <XCircleIcon className="ml-1 h-4 w-4" />
                </span>
              ))}
            </div>
          </div>

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
              {professors
                .filter((p) => {
                  if (filterGoals.length === 0) return true;
                  return filterGoals.some((g) => p.goals.includes(g + 1));
                })
                .map((professor) => (
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
                      <div className="text-gray-900">
                        {professor.university}
                      </div>
                      <div className="mt-1 text-gray-500">
                        {professor.title}
                      </div>
                    </td>

                    <td className="px-3 py-5 text-sm text-gray-500">
                      <div className="flex flex-wrap gap-2">
                        {professor.goals.map((goalNumber) => (
                          <span
                            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${goalColors[
                              goalNumber - 1
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
                          <span className="inline-flex items-center rounded-md bg-stone-50 px-2 py-1 text-xs font-medium text-stone-700 ring-1 ring-inset ring-stone-600/20">
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
