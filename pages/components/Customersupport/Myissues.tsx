import React from "react";
import css from "./Customersupport.module.scss";
import * as config from "../../../next.config.js";
import { simpleCallInitAPI } from '../../../services/ApicallInit';
import { AxiosService } from "../../../services/ApiService";
import { getUserId } from "../../../services/sessionProvider";
import Image from "next/image";
import { format } from 'date-fns';
import { getToken } from '../../../services/sessionProvider'; 


const MyIssue = () => {
    let assetpath = config.assetPrefix ? `${config.assetPrefix}` : ``;
    const [Customersupport, setCustomersupport] = React.useState([]);

        const userId = getToken();
        if(userId){
            AxiosService.get('/user/complaint/1/messages')
                .then((response) => {
                    const issues = response.data.data.map((item: any) => {
                        return {
                            issue: item.text,
                            createdAt: item.createdAt
                        };
                    });
                    setCustomersupport(issues);
                    console.log(response.data)
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        }

    return (
        <>
            <React.Fragment>
                <div className={css.dummycontainer}>
                    {Customersupport.length === 0 ?
                        <div className="flex items-center justify-center">
                            <Image src={require("../../../public/assets/Tabimage/hand.png")} alt="" className={css.handicon} />
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