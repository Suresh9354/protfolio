const SkillCard = ({ skill }) => {
  return (
    <div className="group bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors">
          {skill.name}
        </h3>
        {skill.icon && (
          <span className="text-3xl transform group-hover:scale-125 transition-transform duration-300">
            {skill.icon}
          </span>
        )}
      </div>
      
      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-1000 ease-out relative overflow-hidden"
          style={{ width: `${skill.proficiency}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-2">
        <p className="text-sm font-semibold text-gray-300">{skill.proficiency}%</p>
        <span className="text-xs text-gray-500">{skill.category}</span>
      </div>
    </div>
  );
};

export default SkillCard;

