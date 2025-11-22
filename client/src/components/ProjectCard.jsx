import getImageUrl from '../utils/imageUrl';

const ProjectCard = ({ project }) => {
  return (
    <div className="group bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700">
      {project.image && (
        <div className="relative overflow-hidden">
          <img
            src={getImageUrl(project.image)}
            alt={project.title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-orange-500 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400 mb-4 line-clamp-3 leading-relaxed">{project.description}</p>
        
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-700 text-orange-400 text-xs font-semibold rounded-full border border-gray-600"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="flex space-x-4 pt-2">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 transform"
            >
              <span>GitHub</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 transform shadow-lg"
            >
              <span>Live Demo</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

