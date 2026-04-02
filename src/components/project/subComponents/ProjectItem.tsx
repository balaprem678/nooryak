// "use client"
// import { projectsData } from '@/data/projectData';
// import { useHoverEffect } from '@/hooks/useHoverEffect';
// import Image from 'next/image';
// import Link from 'next/link';
// import "./ProjectItem.scss"

// const ProjectItem = () => {
//   const { addToRefs } = useHoverEffect();

//   // Split projects into two columns
//   const leftColumnProjects = projectsData.slice(0, 6).filter((_, index) => index % 2 === 0);
//   const rightColumnProjects = projectsData.slice(0, 6).filter((_, index) => index % 2 !== 0);

//   return (
//     <div className="row gx-135">
//       {/* Left Column */}
//       <div className="col-md-6">
//         {leftColumnProjects.map((project) => (
//           <ProjectCard
//             key={project.id}
//             project={project}
//             addToRefs={addToRefs}
//           />
//         ))}
//       </div>

//       {/* Right Column */}
//       <div className="col-md-6">
//         {rightColumnProjects.map((project) => (
//           <ProjectCard
//             key={project.id}
//             project={project}
//             addToRefs={addToRefs}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// interface ProjectCardProps {
//   project: typeof projectsData[0];
//   addToRefs: (el: HTMLDivElement | null) => void;
// }

// const ProjectCard = ({ project, addToRefs }: ProjectCardProps) => {

//   return (
//     <div
//       className="tp-project-item mb-95 tp--hover-item"
//       ref={addToRefs}
//     >
//       <div className="tp-project-thumb not-hide-cursor" data-cursor="View<br>Demo">
//         <Link
//           className="cursor-hide tp--hover-img"
//           data-displacement="assets/img/webgl/1.jpg"
//           data-intensity="0.6"
//           data-speedin="1"
//           data-speedout="1"
//           href={project.link}
//         >
//           <Image
//             style={{ width: "100%", height: "auto" }}
//             src={project.image as string}
//             alt={`${project.title} project image`}
//           />
//         </Link>
//       </div>
//       <div className="tp-project-content">
//         <h4 className="tp-project-title">
//           {/* <Link className="tp-line-black" href={project.link}>
//             {project.title}
//           </Link> */}
//           {project.title}
//         </h4>
//         {project.categories && (
//           <div className="tp-project-category">
//             {project.categories.map((category, index) => (
//               <span key={index}>{category}</span>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProjectItem;



"use client"
import { projectsData } from '@/data/projectData';
import { useHoverEffect } from '@/hooks/useHoverEffect';
import Image from 'next/image';
import Link from 'next/link';

const ProjectItem = () => {
  const { addToRefs } = useHoverEffect();

  const leftColumnProjects = projectsData.slice(0, 6).filter((_, index) => index % 2 === 0);
  const rightColumnProjects = projectsData.slice(0, 6).filter((_, index) => index % 2 !== 0);

  return (
    <>
      <div className="row gx-135">
        <div className="col-md-6">
          {leftColumnProjects.map((project) => (
            <ProjectCard key={project.id} project={project} addToRefs={addToRefs} />
          ))}
        </div>

        <div className="col-md-6">
          {rightColumnProjects.map((project) => (
            <ProjectCard key={project.id} project={project} addToRefs={addToRefs} />
          ))}
        </div>
      </div>

      {/* Internal CSS */}
      <style jsx>{`
        .cursor-hide {
          overflow: hidden !important;
        }

        .cursor-hide img {
          transition: all 0.3s ease-in-out;
          border-radius: 20px;
        }

        .cursor-hide img:hover {
          transform: scale(1.05);
        }
      `}</style>
    </>
  );
};

interface ProjectCardProps {
  project: typeof projectsData[0];
  addToRefs: (el: HTMLDivElement | null) => void;
}

const ProjectCard = ({ project, addToRefs }: ProjectCardProps) => {
  return (
    <div className="tp-project-item mb-95 tp--hover-item" ref={addToRefs}>
      <div className="tp-project-thumb not-hide-cursor" data-cursor="View<br>Demo">
        <Link
          className="cursor-hide tp--hover-img"
          href={project.link}
        >
          <Image
            style={{ width: "100%", height: "auto" }}
            src={project.image as string}
            alt={`${project.title} project image`}
          />
        </Link>
      </div>

      <div className="tp-project-content">
        <h4 className="tp-project-title">{project.title}</h4>

        {project.categories && (
          <div className="tp-project-category">
            {project.categories.map((category, index) => (
              <span key={index}>{category}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectItem;