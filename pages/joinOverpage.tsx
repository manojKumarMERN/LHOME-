'use client'
import * as React from "react";
import css from "../styles/joinOverrpage.module.scss";
import { useRouter } from "next/router.js";
import ApplyForJobForm from "./components/Jobform/Jobform";
import Joinpoolcom from "./components/JoinPool/joinPoolcontent";
import Footer from "./components/Footer/Footer";
import * as config from "../next.config.js";
import PageHeader from "./components/PageHeader";

interface JobDetails {
    details: {
        header: string;
        joblocation: string;
        'Job Description': string;
        'Job Requirement': {
            'Postiton Title': string;
            Experience: string;
            Qualification: string;
            'Job type': string;
            Salary: string;
            Location: string;
        };
    };
}

interface JobOfferProps {
    value: JobDetails[];
}

const JoinOverpage: React.FC = () => {
    const router = useRouter();
    const { jobDetails } = router.query
    const hideDiv = router.query.hideDiv === 'true';
    const [details, setDetails] = React.useState<JobDetails[]>([]);
    const headingFromQuery = router.query.header as string;
    const locationgFromQuery = router.query.joblocation as string;
    const categoryFromQuery = router.query.selectCat === 'true';


    React.useEffect(() => {
        if (jobDetails) {

            try {
                const parsedDetails = JSON.parse(jobDetails as string) as JobDetails[];
                setDetails(parsedDetails);

            } catch (error) {
                console.error("Failed to parse jobDetails:", error);
            }
        }
    }, [jobDetails]);

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
    const assetpath = config.assetPrefix ? `${config.assetPrefix}` : '';


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
            <div className="animate-fade-in" >
                <div className={css.lhomePage}>
                <PageHeader screenwidth={screenwidth} screenheight={screenheight} assetpath={assetpath} hidden={false} />

                    <div className={css.LhomeBottom}>

                        {/* <div className={css.lhomelogo} style={hideDiv ?  {backgroundColor:"white"}:{}}>
                            <img src="/assets/images/LhomeLogo.jpg" alt="logo Lhome" key={"unique one"} />
                        </div> */}

                        {hideDiv &&
                            <div>
                                <Joinpoolcom />
                            </div>
                        }

                        <div className={css.contentBox}>
                            <ApplyForJobForm header={headingFromQuery} joblocation={locationgFromQuery} selectCat={categoryFromQuery} />
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default JoinOverpage;