/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/user.context";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import { Cable, House, Users, Trash } from "lucide-react";

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState([]);

  const navigate = useNavigate();

  function createProject(e) {
    e.preventDefault();

    axios
      .post("/projects/create", { name: projectName })
      .then((res) => {
        setIsModalOpen(false);
        setProjects([...projects, res.data]); // Update UI
      })
      .catch((error) => console.log(error));
  }

  function deleteProject(projectId, e) {
    e.stopPropagation(); // Prevent card click navigation
    axios
      .delete(`/projects/${projectId}`)
      .then(() => {
        setProjects(projects.filter((proj) => proj._id !== projectId)); // Remove from UI
      })
      .catch((error) => console.log(error));
      alert("sry, working on it")
  }

  useEffect(() => {
    axios
      .get("/projects/all")
      .then((res) => setProjects(res.data.projects))
      .catch((err) => console.log(err));
  }, []);

  function handleLogout() {
    axios
      .get("/users/logout", {
        withCredentials: true // ✅ Required for cookies
      })
      .then(() => {
        setUser(null);
        navigate("/");
      })
      .catch((err) => console.error("Logout failed:", err));
}

  return (
    <main className="p-4 min-h-screen bg-black text-white">
      <div className="container mx-auto flex flex-col gap-4">
        {/* Top Navbar */}
        <div className="flex justify-between items-center">
          <button onClick={() => navigate("/")} className="font-semibold bg-zinc-900 p-2 rounded-full cursor-pointer text-sm">
            <House />
          </button>
          <button onClick={handleLogout} className="font-semibold bg-white text-black px-4 p-2 rounded-md cursor-pointer text-sm">
            Logout
          </button>
        </div>

        {/* Create Project Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="project px-3 py-2 bg-white w-fit text-black rounded cursor-pointer font-semibold tracking-tighter"
        >
          <span className="flex items-center justify-center gap-2">
            <Cable size={20} />
            New Project
          </span>
        </button>

        {/* Project Cards */}
        <div className="projects flex flex-wrap gap-3">
          {projects.map((project) => (
            <div
              key={project._id}
              onClick={() => navigate(`/project`, { state: { project } })}
              className="project relative flex flex-col gap-2 cursor-pointer p-4 border border-zinc-600 rounded-md min-w-52 hover:border-zinc-500 overflow-hidden"
            >
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-transparent opacity-100 hover:opacity-50 transition-opacity" />

              {/* Content */}
              <div className="relative">
                <h2 className="font-semibold">{project.name}</h2>
                <div className="flex flex-row items-center gap-2">
                  <span className="flex items-center gap-2 mt-2 tracking-tighter text-zinc-300">
                    <Users size={16} />
                    Collaborators:
                    <span className="text-large font-semibold">{project.users.length}</span>
                  </span>
                </div>
              </div>

              {/* Delete Button */}
              <button
                onClick={(e) => deleteProject(project._id, e)}
                className="absolute top-2 right-2 cursor-pointer bg-red-600 p-1 rounded-full hover:bg-red-800"
              >
                <Trash size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Create Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-zinc-900 p-6 rounded-md shadow-md w-1/3">
            <h2 className="text-xl mb-4">Create New Project</h2>
            <form onSubmit={createProject}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-zinc-400 mb-2">Project Name</label>
                <input
                  onChange={(e) => setProjectName(e.target.value)}
                  value={projectName}
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button type="button" className="mr-2 px-4 py-2 bg-zinc-800 rounded cursor-pointer" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="px-4 py-1 bg-white text-black font-semibold rounded cursor-pointer">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
