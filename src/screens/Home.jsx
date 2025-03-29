/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/user.context";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import { Cable, House, Trash, Users } from "lucide-react";
import Skeleton from "../screens/Skeleton";
import toast from "react-hot-toast";

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/projects/all")
      .then((res) => {
        setProjects(res.data.projects);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  function createProject(e) {
    e.preventDefault();
    axios
      .post("/projects/create", { name: projectName })
      .then((res) => {
        setIsModalOpen(false);
        setProjects([...projects, res.data]);
        setProjectName("");
        toast.success("Project created successfully!");
      })
      .catch((error) => {
        console.error("Error creating project:", error.response?.data || error.message);
        toast.error("Failed to create project. Check console for details.");
      });
  }

  function deleteProject() {
    if (!selectedProject) {
      toast.error("Please select a project to delete.");
      return;
    }

    axios
      .delete(`/projects/${selectedProject}`, { withCredentials: true })
      .then((res) => {
        setProjects(projects.filter((proj) => proj._id !== selectedProject));
        setIsDeleteModalOpen(false);
        toast.success("Project deleted successfully!");
        setSelectedProject("");
      })
      .catch((error) => {
        console.error("Error deleting project:", error.response?.data || error.message);
        toast.error("Failed to delete project. Check console for details.");
      });
  }

  function handleLogout() {
    axios
      .get("/users/logout", { withCredentials: true })
      .then(() => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        toast.success("Logged out successfully!");
        navigate("/");
      })
      .catch((err) => {
        console.error("Logout failed:", err);
        toast.error("Logout failed.");
      });
  }

  return (
    <main className="p-4 min-h-screen bg-black text-white">
      <div className="container mx-auto flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <button onClick={() => navigate("/")} className="font-semibold cursor-pointer bg-zinc-900 p-2 rounded-full">
            <House />
          </button>
          <button onClick={handleLogout} className="font-semibold cursor-pointer bg-white text-black px-4 p-2 rounded-md">
            Logout
          </button>
        </div>

        <div className="flex gap-3">
          <button onClick={() => setIsModalOpen(true)} className="px-3 py-2 cursor-pointer bg-white text-black rounded font-semibold">
            <span className="flex items-center gap-2"><Cable size={20} /> New Project</span>
          </button>
          <button onClick={() => setIsDeleteModalOpen(true)} className="px-3 py-2 cursor-pointer bg-red-600 text-white rounded font-semibold">
            <span className="flex items-center gap-2"><Trash size={20} />Delete Project</span>
          </button>
        </div>

        <div className="projects flex flex-wrap gap-3">
  {loading ? (
    Array(4)
      .fill(0)
      .map((_, index) => <Skeleton key={index} className="w-52 h-20 bg-zinc-800" />)
  ) : projects.length === 0 ? (
    <p className="text-zinc-600 w-full text-4xl">No projects yet ;)</p>
  ) : (
    projects.map((project) => (
      <div
        key={project._id}
        onClick={() => navigate("/project", { state: { project } })}
        className="relative flex flex-col gap-2 cursor-pointer p-4 border border-zinc-600 rounded-md min-w-52 hover:border-zinc-500"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-transparent opacity-100 hover:opacity-50 transition-opacity" />
        <div className="relative">
          <h2 className="font-semibold">{project.name}</h2>
          <div className="flex items-center gap-2 mt-2 text-zinc-300">
            <Users size={16} />
            Collaborators: <span className="font-semibold">{project.users.length}</span>
          </div>
        </div>
      </div>
    ))
  )}
</div>

      </div>

      {/* Create Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-zinc-900 p-6 rounded-md shadow-md w-full max-w-md">
            <h2 className="text-xl mb-4">Create a New Project</h2>
            <form onSubmit={createProject}>
              <input
                type="text"
                placeholder="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
                required
              />
              <div className="flex justify-end">
                <button type="button" className="mr-2 px-4 py-2 bg-zinc-800 rounded cursor-pointer" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded cursor-pointer">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Project Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-zinc-900 p-6 rounded-md shadow-md w-full max-w-md">
            <h2 className="text-xl mb-4">Delete a Project</h2>
            
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4 bg-black text-white"
            >
              <option value="">Select a Project</option>
              {projects.map((proj) => (
                <option key={proj._id} value={proj._id}>
                  {proj.name}
                </option>
              ))}
            </select>

            <div className="flex justify-end">
              <button
                type="button"
                className="mr-2 px-4 py-2 bg-zinc-800 rounded cursor-pointer"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                onClick={deleteProject}
                className="px-4 py-2 bg-red-600 text-white rounded cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
