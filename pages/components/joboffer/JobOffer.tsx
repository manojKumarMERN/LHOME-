'use client'
'use client'
import React, { useEffect, useState } from 'react';
import css from './JobOffer.module.scss';
import * as config from "../../../next.config.js";
import { MdKeyboardArrowLeft } from 'react-icons/md';
import ApplyForJobForm from '../Jobform/Jobform';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import PageHeader from "../../components/PageHeader";


interface JobDetails {
    id: string;
    title: string;
    location: string;
    description: string;
    department: string;
    experience: string;
    qualification: string;
    job_type: string;
    salary: string;
}

interface JobOfferProps {
    id: string; // Pass ID as a prop
    value: JobDetails[]; // JobDetails array
}

const JobOffer: React.FC<JobOfferProps> = ({ id, value }) => {
    const [jobOffer, setJobOffer] = useState<JobDetails | null>(null);
    const [applyBtn, setApplyBtn] = useState(false);
    const [heading, setHeading] = useState("");
    const [departing, setDeparting] = useState("");
    const [locationg, setLocating] = useState("");
    const [categarey, setcategeroy] = useState(false);

    const assetpath = config.assetPrefix ? `${config.assetPrefix}` : '';

    useEffect(() => {
        const selectedJob = value.find(job => job.id === id);
        if (selectedJob) {
            setJobOffer(selectedJob);
            setHeading(selectedJob.title || '');
            setDeparting(selectedJob.department || '');
            setLocating(selectedJob.location || '');
        }
    }, [id, value]);

    const router = useRouter();

    const handleClick = () => {
        router.push({
            pathname: '/joinOverpage',
            query: {
                header: heading,
                joblocation: locationg,
                selectCat: categarey
            }
        });
    }

    let hgtt = 0;
    if (window.innerWidth < 600) {
        hgtt = window.innerHeight - 210;
        if (window.innerWidth > 490 && window.innerWidth < 512) {
            hgtt += 10;
        }
    } else {
        hgtt = window.innerHeight - 160;
    }
    const [screenheight, setHeight] = React.useState(hgtt);
    const [screenwidth, setWidth] = React.useState(window.innerWidth);


    const handleResize = React.useCallback(() => {
        setWidth(window.innerWidth);
        let hgtt = 0;
        if (window.innerWidth < 600) {
            hgtt = window.innerHeight - 210;
            if (window.innerWidth > 490 && window.innerWidth < 512) {
                hgtt += 10;
            }
            if (window.innerWidth > 571 && window.innerWidth < 599) {
                hgtt += 50;
            }
            if (window.innerWidth > 570 && window.innerWidth < 572) {
                hgtt += 45;
            }
            if (window.innerWidth > 509 && window.innerWidth < 571) {
                hgtt += 25;
            }
            if (window.innerWidth > 500 && window.innerWidth < 510) {
                hgtt += 15;
            }
            if (window.innerWidth < 500) {
                hgtt -= 10;
            }
        } else {
            hgtt = window.innerHeight - 160;
        }
        setHeight(hgtt);
    }, []);

    const handleResized = React.useCallback(() => {
        setTimeout(() => {
            handleResize();
        }, 1000);
    }, [handleResize]);


    return (
        <React.Fragment>
            <div className="animate-fade-in">
                <div className={css.lhomePage}>
                    <PageHeader screenwidth={screenwidth} screenheight={screenheight} assetpath={assetpath} hidden={false} />
                    <div className={css.jobOuterContainer}>
                        <div id="logo" className={`${css.lhomelogoholder}`}>
                            <div className={css.lhomelogo}></div>
                        </div>
                        <div className={css.jobInnerContainer}>
                            <div className={css.jobLeftarrow}>
                                <Link href={{ pathname: "/joinuspage" }}>
                                    <MdKeyboardArrowLeft className={css.LeftarrowIcon} />
                                    <p>View all jobs</p>
                                </Link>
                            </div>

                            <div className={css.jobRow}>
                                <div className={css.jobLeft}>
                                    {jobOffer && (
                                        <div>
                                            <h1 className={css.jobHead}>{jobOffer.title || ''}</h1>
                                            <p className={css.jobpara}>{jobOffer.department || ''} | {jobOffer.location || ''}</p>
                                            <h2 className={css.jobSubHead}>Job Description</h2>
                                            <p className={css.jobDescription}>{jobOffer.description || ''}</p>
                                            <h2 className={css.jobSubHead}>Job Requirement</h2>
                                            <table className={css.jobTable}>
                                                <tbody>
                                                    <tr>
                                                        <td>Position Title</td>
                                                        <td>{jobOffer.title || ''}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Experience</td>
                                                        <td>{jobOffer.experience || ''}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Qualification</td>
                                                        <td>{jobOffer.qualification || ''}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Job type</td>
                                                        <td>{jobOffer.job_type || ''}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Salary</td>
                                                        <td>{jobOffer.salary || ''}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Location</td>
                                                        <td>{jobOffer.location || ''}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <div>
                                        <button
                                            className={`${css.jobApplybtn} ${css.jobApplybtn2}`}
                                            onClick={() => handleClick()}
                                        >
                                            Apply Now
                                        </button>
                                    </div>
                                    <div>
                                        <button className={`${css.jobSharebtn} ${css.jobApplybtn2}`}>
                                            Share
                                            <div className={css.Socailmedia_icons}>
                                                <div className={css.Social_Content_icons}><FaFacebookF className={css.Social_icons} /></div>
                                                <div className={css.Social_Content_icons}><FaInstagram className={css.Social_icons} /></div>
                                                <div className={css.Social_Content_icons}><FaXTwitter className={css.Social_icons} /></div>
                                                <div className={css.Social_Content_icons}><FaWhatsapp className={css.Social_icons} /></div>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <button className={`${css.jobApplybtn} ${css.jobApplybtn2}`} onClick={() => setApplyBtn(!applyBtn)}>Apply Now</button>
                            </div>
                        </div>
                        {applyBtn &&
                            <div className={css.applform}>
                                <ApplyForJobForm header={heading} joblocation={locationg} selectCat={categarey} />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default JobOffer;

// const JobOffer: React.FC<JobOfferProps> = ({ value }) => {
//   const [jobOffers, setJobOffers] = React.useState<JobDetails[]>([]);
//   const [applyBtn, setApplyBtn] = React.useState(false);
//   const [heading,setHeading]=React.useState("");
//   const [locationg,setLocating]=React.useState("");
//   const [categarey,setcategeroy]=React.useState(false);

//   const assetpath = config.assetPrefix ? `${config.assetPrefix}` : '';

//   React.useEffect(() => {
//     setJobOffers(value);
//     if (value && value.length > 0) {
//         let header = value[0].details.title;
//         let locationBrand = value[0].details.joblocation;

//         setHeading(header);
//         setLocating(locationBrand);
//     }
// }, [value]);

//   const router = useRouter()

//   const handleClick = () => {
//     router.push({
//         pathname: '/joinOverpage',
//         query: {
//             header: heading,
//             joblocation: locationg,
//             selectCat:categarey
//         }
//     });
// }



//   return (
//     <div className={css.jobOuterContainer}>
//       <div id="logo" className={`${css.lhomelogoholder}`}>
//         <div className={css.lhomelogo}>
//         </div>
//       </div>
//       <div className={css.jobInnerContainer}>
//         <div className={css.jobLeftarrow}>
//           <Link href={{ pathname: "/joinuspage" }}>
//             <MdKeyboardArrowLeft className={css.LeftarrowIcon} />
//             <p>View all jobs</p>
//           </Link>
//         </div>

//         <div className={css.jobRow}>
//           <div className={css.jobLeft}>
//             {Array.isArray(jobOffers) && jobOffers.map((jobOffer, index) => (
//               <div key={index}>

//                 <h1 className={css.jobHead}>{jobOffer.details.title}</h1>
//                 <p className={css.jobpara}>{jobOffer.details.joblocation}</p>
//                 <h2 className={css.jobSubHead}>Job Description</h2>
//                 <p className={css.jobDescription}>{jobOffer.details['Job Description']}</p>
//                 <h2 className={css.jobSubHead}>Job Requirement</h2>
//                 <table className={css.jobTable}>
//                   <tbody>
//                     <tr>
//                       <td>Position Title</td>
//                       <td>{jobOffer['Job Requirement']['Postiton Title']}</td>
//                     </tr>
//                     <tr>
//                       <td>Experience</td>
//                       <td>{jobOffer['Job Requirement']['Experience']}</td>
//                     </tr>
//                     <tr>
//                       <td>Qualification</td>
//                       <td>{jobOffer['Job Requirement']['Qualification']}</td>
//                     </tr>
//                     <tr>
//                       <td>Job type</td>
//                       <td>{jobOffer['Job Requirement']['Job type']}</td>
//                     </tr>
//                     <tr>
//                       <td>Salary</td>
//                       <td>{jobOffer['Job Requirement']['Salary']}</td>
//                     </tr>
//                     <tr>
//                       <td>Location</td>
//                       <td>{jobOffer['Job Requirement']['Location']}</td>
//                     </tr>
//                   </tbody>
//                 </table>


//               </div>
//             ))}
//           </div>
//           <div>
//             <div>
//               <button
//                 className={`${css.jobApplybtn} ${css.jobApplybtn2}`}
//                 onClick={() => handleClick()}
//               >Apply Now
//               </button>
//             </div>
//             <div>
//               <button className={`${css.jobSharebtn} ${css.jobApplybtn2}`}>
//                 Share
//                 <div className={css.Socailmedia_icons}>
//                 <div className={css.Social_Content_icons}><FaFacebookF className={css.Social_icons}/></div>
//                 <div className={css.Social_Content_icons}><FaInstagram className={css.Social_icons}/></div>
//                 <div className={css.Social_Content_icons}><FaXTwitter className={css.Social_icons}/></div>
//                 <div className={css.Social_Content_icons}><FaWhatsapp className={css.Social_icons}/></div>
//                 </div>
//               </button>

//             </div>
//           </div>
//         </div>

//         <div>
//           <button className={`${css.jobApplybtn} ${css.jobApplybtn2}`} onClick={() => setApplyBtn(!applyBtn)}>Apply Now</button>
//         </div>
//       </div>
//       {applyBtn ?
//         <div className={css.applform }>
//           <ApplyForJobForm header={heading} joblocation={locationg} selectCat={categarey} />
//         </div> : ""
//       }

//     </div>
//   );
// };

// export default JobOffer;
