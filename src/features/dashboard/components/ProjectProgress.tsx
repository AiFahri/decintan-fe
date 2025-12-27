import type { Project } from "@/types/dashboard";

interface ProjectProgressProps {
  projects: Project[];
}

export const ProjectProgress = ({ projects }: ProjectProgressProps) => {
  return (
    <div className="space-y-4">
      {projects.map((project) => {
        const percentage = (project.value / project.max) * 100;

        return (
          <div key={project.name}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">
                {project.name}
              </span>
              <span className="text-xs text-gray-500">
                {Math.round(percentage)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-red-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
