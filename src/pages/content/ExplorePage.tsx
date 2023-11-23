import { useState } from "react";
import Card from "../../common/components/Card";
import PageHeader from "../../common/components/PageHeader";
import SelectField from "../../common/components/fields/SelectField";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { ref, getDatabase } from "firebase/database";
import { useList } from "react-firebase-hooks/database";
import { firebaseApp } from "../../api/firebase-setup";
import TextField from "../../common/components/fields/TextField";
import useConfirmationDialog from "../../common/hooks/useConfirmationDialog";

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
  papers: {
    name: string;
    authors: string[];
    publisher: string;
    description: string;
    citedBy: number;
    date: string;
  }[];
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

function extractTags(professors: Professor[]): string[] {
  const set = new Set<string>();
  for (let p of professors) {
    for (let t of p.tags) {
      set.add(t);
    }
  }
  return Array.from(set);
}

const database = getDatabase(firebaseApp);

export default function ExplorePage() {
  const [snapshots, loading, error] = useList(ref(database, "professors"));

  const professors: Professor[] = snapshots?.map((s) => s.val()) || [];
  console.log(professors)
  console.log(snapshots?.map((s) => s.val()))
  const tags = extractTags(professors);

  const [searchText, setSearchText] = useState<string>("");
  const [filterGoals, setFilterGoals] = useState<number[]>([]);
  const [filterTags, setFilterTags] = useState<string[]>([]);

  const [openConfirmationDialog, confirmationDialog] = useConfirmationDialog();

  return (
    <>
      <PageHeader title="Explore" />
      {confirmationDialog}
      <div className="space-y-6">
        <Card>
          <div className="flex gap-4">
            <div className="flex-grow">
              <TextField
                label="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>

            <SelectField
              label="SDG Goals"
              value={"*"}
              placeholder="Goals"
              options={[
                { label: "Select goal", value: "*" },
                ...goals.map((g, i) => ({
                  label: i + 1 + ". " + g,
                  value: i + "",
                })),
              ]}
              onChange={(e) => {
                const val = +e.target.value;
                if (filterGoals.includes(val)) {
                  setFilterGoals(filterGoals.filter((g) => g !== val));
                } else {
                  setFilterGoals([...filterGoals, val]);
                }
              }}
            />

            <SelectField
              label="Research Areas"
              value={"*"}
              placeholder="Research Areas"
              options={[
                { label: "Select area", value: "*" },
                ...tags.map((g, i) => ({
                  label: g,
                  value: g,
                })),
              ]}
              onChange={(e) => {
                const val = e.target.value;
                if (filterTags.includes(val)) {
                  setFilterTags(filterTags.filter((g) => g !== val));
                } else {
                  setFilterTags([...filterTags, val]);
                }
              }}
            />
          </div>

          <div>
            {filterGoals.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="text-sm leading-6">Goals:</span>
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
            )}

            {filterTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <span className="text-sm leading-6">Areas:</span>
                {filterTags.map((tag) => (
                  <span
                    key={tag}
                    className={`cursor-pointer inline-flex items-center rounded-full bg-stone-50 px-2 py-1 text-xs font-medium text-stone-700 ring-1 ring-inset ring-stone-600/20`}
                    onClick={() => {
                      setFilterTags(filterTags.filter((t) => t !== tag));
                    }}
                  >
                    {tag} <XCircleIcon className="ml-1 h-4 w-4" />
                  </span>
                ))}
              </div>
            )}
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
                  const includedGoals =
                    filterGoals.length > 0
                      ? filterGoals
                      : goals.map((g, i) => i);

                  const includedTags =
                    filterTags.length > 0 ? filterTags : tags;

                  return (
                    (searchText.trim() === "" ||
                      p.name
                        .toLowerCase()
                        .includes(searchText.toLowerCase())) &&
                    includedGoals.some((g) => p.goals.includes(g + 1)) &&
                    includedTags.some((t) => p.tags.includes(t))
                  );
                })
                .map((professor, i) => (
                  <tr key={i}>
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
                        onClick={()=>openConfirmationDialog({
                          title: "Papers",
                          body: (
                            <div style={{display:"flex",flexDirection:"column", justifyContent:"space-between !important;", alignItems:"center !important;", gap:"7px", width:"100%"}}>
                            {professor?.papers?.map((paper)=><Card>
                              {paper.name}
                            </Card>)}
                            </div>
                          ),
                          action: "Close",
                        })}
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
