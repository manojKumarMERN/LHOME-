import * as React from 'react';
import css from "./joinusTable.module.scss";
import * as config from "../../../next.config.js";
import { simpleCallInitAPI } from '../../../services/ApicallInit';
import { MDBDataTable } from 'mdbreact';
import { useRouter } from "next/router";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

import CustomHeaderWithDropdown from './CustomHeaderWithDropdown';
import { AxiosService } from '../../../services/ApiService';

const JoinusTable: React.FC = () => {
  const [JoinusData, setJoinusData] = React.useState([]);
  const [selectedtitle, setSelectedtitle] = React.useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = React.useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = React.useState<string | null>(null);
  const [filteredJoinusData, setFilteredJoinusData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const perPage = 10;

  let assetpath = config.assetPrefix ? `${config.assetPrefix}` : ``;

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosService.get('/jobs');
        setJoinusData(response.data.jobs);
        setFilteredJoinusData(response.data.jobs);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); 
        setError(error);
      }
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    if (selectedtitle == "All") {
      setSelectedtitle(null);
      setSelectedLocation(null);
      setSelectedDepartment(null);
    } else if (selectedtitle !== null) {
      setSelectedLocation(null);
      setSelectedDepartment(null);
    } else if (selectedLocation !== null) {
      setSelectedtitle(null);
      setSelectedDepartment(null);
    }
  }, [selectedtitle, selectedLocation]);

  React.useEffect(() => {
    if (selectedDepartment == "All") {
      setSelectedtitle(null);
      setSelectedLocation(null);
      setSelectedDepartment(null);
    } else if (selectedDepartment !== null) {
      setSelectedtitle(null);
      setSelectedLocation(null);
    }
  }, [selectedDepartment]);

  React.useEffect(() => {
    const filterData = () => {
      let filteredData = JoinusData;

      if (selectedtitle) {
        filteredData = filteredData.filter((item) => item.title === selectedtitle);
      }

      if (selectedLocation) {
        filteredData = filteredData.filter((item) => item.location === selectedLocation);
      }

      if (selectedDepartment) {
        filteredData = filteredData.filter((item) => item.department === selectedDepartment);
      }

      return filteredData;
    };

    const filteredJoinusData = filterData();
    setFilteredJoinusData(filteredJoinusData);
  }, [selectedtitle, selectedLocation, selectedDepartment, JoinusData]);

  const router = useRouter(); 
  const handleRowClick = (row) => {
    const arrdata = [row];
    const url = `${window.location.origin}/JoinOfferPage?jobDetails=${encodeURIComponent(JSON.stringify(arrdata))}`;
    router.push(url);
  }

  const totalPages = Math.ceil(filteredJoinusData.length / perPage);

  setTimeout(() => {
    const customActivePageStyle = document.querySelector('.pagination .page-item.active .page-link') as HTMLElement;
    if (customActivePageStyle) {
      customActivePageStyle.style.color = 'red';
    }
  }, 3000);

  setTimeout(() => {
    const allRows: any = document.querySelectorAll('.table tr td');
    const nodeListArray = Array.from(allRows);
    const sets = [];
    for (let i = 0; i < nodeListArray.length; i += 3) {
      const set = nodeListArray.slice(i, i + 3);
      sets.push(set);
    }

    function resetStyles() {
      sets.forEach((otherSet) => {
        otherSet.forEach((otherElement) => {
          otherElement.style.backgroundColor = '';
          otherElement.style.color = '';
        });
      });
    }

    sets.forEach((set) => {
      set.forEach((element) => {
        element.addEventListener('mouseover', () => {
          resetStyles();

          set.forEach((hoveredElement) => {
            hoveredElement.style.backgroundColor = '#2552A4';
            hoveredElement.style.color = 'white';
          });
        });

        element.addEventListener('mouseout', () => {
          resetStyles();
        });
      });
    });
  }, 3000);

  const srOnlySpan = document.querySelector('.pagination .page-item.active .page-link .sr-only') as HTMLElement;
  if (srOnlySpan) {
    srOnlySpan.textContent = '';
  }

  const data: any = {
    columns: [
      {
        label: (
          <CustomHeaderWithDropdown
            label="ROLE"
            value={JoinusData}
            onSelectionChange={(selectedtitle) => setSelectedtitle(selectedtitle)}
          />
        ),
        field: 'role',
      },
      {
        label: (
          <CustomHeaderWithDropdown
            label="LOCATION"
            value={JoinusData}
            onSelectionChange={(selectedLocation) => setSelectedLocation(selectedLocation)}
          />
        ),
        field: 'location',
      },
      {
        label: (
          <CustomHeaderWithDropdown
            label="ALL DEPARTMENT"
            value={JoinusData}
            onSelectionChange={(selectedDepartment) => setSelectedDepartment(selectedDepartment)}
          />
        ),
        field: 'department',
      },
    ],
    rows: filteredJoinusData.map((row) => {
      return {
        role: row.title,
        location: row.location,
        department: row.department,
        clickEvent: () => handleRowClick(row),
      }
    })
  };

  return (
    <React.Fragment>
      <div className={css.mdbtable}>
        <div className={css.bi_search}><i className="bi bi-search"></i></div>
        <div className={css.open_job_heading}><h3>{filteredJoinusData.length} Open jobs</h3></div>
        <MDBDataTable
          hover={true} data={data}
          className={`${css.custom_mdbtable} custom-mdbtable`}
          info={false}  paging={true}
          searchLabel="Search Positions" displayEntries={false}
          paginationLabel={[<BsChevronLeft key="chevron-left" />, <BsChevronRight key="chevron-right" />]} />
        <div className={css.totalpage}> {totalPages}</div>
      </div>
    </React.Fragment>
  );
}

export default JoinusTable;
