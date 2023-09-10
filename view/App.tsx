import { Project } from "jira.js/out/version3/models";
import React, { useEffect, useState } from "react";

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    window.addEventListener("message", (e) => {
      setProjects(e.data.values);
      console.log(e.data);
    });

    return () => window.removeEventListener("message", (e) => {});
  }, []);
  return (
    <>
      <div>Hello</div>
      <div>{JSON.stringify(projects)}</div>
      <div>{projects.map((project) => project.name)}</div>
    </>
  );
}

export default App;
