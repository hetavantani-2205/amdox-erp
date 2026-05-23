"use client";

import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";

interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
}

export default function ProjectsPage() {

  const [projects, setProjects] = useState<Project[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/projects`
      );

      setProjects(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const addProject = async () => {

    try {

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/projects`,
        {
          title,
          description,
          status,
        }
      );

      setTitle("");
      setDescription("");
      setStatus("");

      fetchProjects();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white p-5">

        <h1 className="text-3xl font-bold mb-10">
          Amdox ERP
        </h1>

        <ul className="space-y-4">

          <li>
            <Link href="/dashboard">
              <div className="hover:bg-slate-700 p-3 rounded-lg">
                Dashboard
              </div>
            </Link>
          </li>

          <li>
            <Link href="/projects">
              <div className="bg-slate-700 p-3 rounded-lg">
                Projects
              </div>
            </Link>
          </li>

        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">

        <h1 className="text-4xl font-bold mb-8">
          Projects
        </h1>

        {/* Add Project Form */}

        <div className="bg-white p-6 rounded-2xl shadow-md mb-10">

          <h2 className="text-2xl font-bold mb-5">
            Add Project
          </h2>

          <div className="grid grid-cols-3 gap-4">

            <input
              type="text"
              placeholder="Project Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-3 rounded-lg"
            />

            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="border p-3 rounded-lg"
            />

            <input
              type="text"
              placeholder="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border p-3 rounded-lg"
            />

          </div>

          <button
            onClick={addProject}
            className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Add Project
          </button>

        </div>

        {/* Project Cards */}

        <div className="grid grid-cols-3 gap-6">

          {projects.map((project) => (

            <div
              key={project.id}
              className="bg-white p-6 rounded-2xl shadow-md"
            >

              <h2 className="text-2xl font-bold mb-3">
                {project.title}
              </h2>

              <p className="text-gray-600 mb-4">
                {project.description}
              </p>

              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                {project.status}
              </span>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
}