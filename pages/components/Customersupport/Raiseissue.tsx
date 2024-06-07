import React from "react";
import css from "./Customersupport.module.scss";
import Button from 'react-bootstrap/Button';
import Image from "next/image";
import { AxiosService } from "../../../services/ApiService";
import { getUserId } from "../../../services/sessionProvider";
import { useRouter } from "next/router";
import { getToken } from '../../../services/sessionProvider';

const RaiseIssue = () => {
    const [description , setDescription ] = React.useState<string>('');
    const [error , setError ] = React.useState<string>('');
    const [success , setSuccess ] = React.useState<string>('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(description=='' || description == ' '){
            setError(`You can't submit empty value as issue`);
        }else if(description.length <=20){
            setError(`Issue can't be this much short. Please elaborate your issue`);
        }else if(!getToken()){
            setError('You are not authenticated please login and continue')
        }
        else{
            setError('');
        }
        if(description.length>20 && error =='' && getToken()){
            const response = await AxiosService.post('/user/complaint/register' , {
                userId : getToken(),
                description
            })
            if( response && response.status == 201){
                setDescription('');
                setSuccess(`Issue successfully posted we'll get back you soon with a solution..`);
                setTimeout(()=>{
                    setSuccess('');

                }, 3000)
            }
            
        }
        
    }
    return (
        <>
            <div className={"container "+css.containerForLG}>
                <div className={css.Customersupportpage}>
                    <h5 className={css.head}>Reach out us</h5>
                    <div className={css.customlogo}>
                        <Image src={require("../../../public/assets/Tabimage/email.png")} alt="Email" className={css.referearn_socialicon} />
                        <Image src={require("../../../public/assets/Tabimage/WhatsAppicon.webp")} alt="WA" className={css.referearn_socialicon} />
                    </div>
                    <form onSubmit={handleSubmit}>
                    <div className={css.customertext}>
                        <textarea className={css.texthere} value={description} placeholder="texthere..." onChange={(e)=>setDescription(e.target.value)}></textarea>
                    </div>
                    <span className="text-red-500">{error}</span>
                    <span className="text-green-500">{success}</span>
                    <div> <button className={css.btncontrol} type="submit">Submit</button></div>
                    </form>
                </div>
            </div>


        </>
    )
}
export default RaiseIssue;





















































































