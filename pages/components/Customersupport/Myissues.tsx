import React from "react";
import css from "./Customersupport.module.scss";
import * as config from "../../../next.config.js";
import { simpleCallInitAPI } from '../../../services/ApicallInit';
import { AxiosService } from "../../../services/ApiService";
import { getUserId } from "../../../services/sessionProvider";
import Image from "next/image";
import { format } from 'date-fns';

const MyIssue = () => {
    let assetpath = config.assetPrefix ? `${config.assetPrefix}` : ``;
    const [Customersupport, setCustomersupport] = React.useState([]);

    React.useEffect(() => {
        const userId = getUserId();
        if(userId){
            AxiosService.post('/fetchList', { userId: getUserId()})
                .then((response) => {
                    console.log(response.data.data);
                    const issues = response.data.data.map((item: any) => {
                        return {
                            issue: item.issue,
                            createdAt: item.createdAt
                        };
                    });
                    setCustomersupport(issues);
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        }
        else{
        let api = simpleCallInitAPI(`${assetpath}/assets/customersupport.json`);
        api.then((data: any) => {
            const sectionOne = data.data.values.map((support: any) => {
                return {
                    issue: support.text,
                    createdAt: support.time
                };
            });
            setCustomersupport(sectionOne);
        })
    }
    }, [assetpath]);

    return (
        <>
            <React.Fragment>
                <div className={css.dummycontainer}>
                    {Customersupport.length === 0 ?
                        <div className="flex">
                            <Image src={require("../../../public/assets/Tabimage/hand.jpg")} alt="" className={css.handicon} />
                            <div className={css.noissue}>No Issues Found!</div>
                        </div>
                        : Customersupport.map((issue, index) => (
                            <div className={css.Box} key={index}>
                                <span className={css.content}>{issue.issue}</span>
                                <p className={css.time}>{format(new Date(issue?.createdAt) , 'dd/MM/yyyy') ?? issue?.createdAt}</p>
                            </div>))
                    }
                </div>
            </React.Fragment>


        </>
    )
}
export default MyIssue;