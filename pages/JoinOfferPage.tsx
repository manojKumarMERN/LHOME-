import * as React from "react";
import * as config from "../next.config.js";
import PageHeader from "./components/PageHeader";
import css from "../styles/joinOffer.module.scss";

import { simpleCallInitAPI } from "../services/ApicallInit";
import JobOffer from "./components/joboffer/JobOffer";
import { useRouter } from "next/router.js";
import Footer from "./components/Footer/Footer";

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

const JoinOfferPage: React.FC = () => {
  const living = React.useRef(null);
  const [screenwidth, setWidth] = React.useState(window.innerWidth);
  const [data, setData] = React.useState([]);
  const [data1, setData1] = React.useState([]);
  const [data2, setData2] = React.useState([]);
  const [data3, setData3] = React.useState([]);
  let assetpath = config.assetPrefix ? `${config.assetPrefix}` : ``;
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


  React.useEffect(() => {
    let api = simpleCallInitAPI(`${assetpath}/assets/ushapedKitchen.json`);
    api.then((data: any) => {
      setData(data.data.Row1);
    });
    let response = simpleCallInitAPI(`${assetpath}/assets/straightKitchen.json`);
    response.then((data: any) => {
      setData1(data.data.Row1);
    });
    let response1 = simpleCallInitAPI(`${assetpath}/assets/LshapedKitchen.json`);
    response1.then((data: any) => {
      setData2(data.data.Row1);
    });
    let response2 = simpleCallInitAPI(`${assetpath}/assets/IslandKitchen.json`);
    response2.then((data: any) => {
      setData3(data.data.Row1);
    });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResized);
  }, [handleResize, handleResized, assetpath]);

  const router = useRouter();
  const { jobDetails } = router.query;
  const [details, setDetails] = React.useState<JobDetails[]>([]);

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

  return (
    <React.Fragment>
      <div className="animate-fade-in">
        <div className={css.lhomePage}>
          <div className={css.LhomeBottom}>
            <div>
              {/* <div className={css.lhomelogo}>
                <img src="/assets/images/LhomeLogo.jpg" alt="logo Lhome" key={"unique one"} />
              </div> */}
              {details.map((job, index) => (
                <JobOffer key={index} id={job.id} value={[job]} />
              ))}
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default JoinOfferPage;
