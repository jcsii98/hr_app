export default function ProjectsThumbnail(props) {
  const { project, fetchProject, setProjectTab, userData } = props;

  const handleClick = async () => {
    console.log("Project ID:", project.id);

    await Promise.all([fetchProject(project.id)]);

    setProjectTab("View");
  };
  return (
    <>
      <button
        onClick={handleClick}
        className={`py-2 my-2 rounded-lg border-[1px] px-4 flex items-center ${
          project.status == "hidden"
            ? "border-slate-400 text-slate-400"
            : "border-slate-600 text-slate-600"
        }`}
      >
        {project.name}
      </button>
    </>
  );
}
