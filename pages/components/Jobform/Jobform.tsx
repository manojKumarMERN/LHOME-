// import React from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import css from "./Jobform.module.scss";
// import Switch from './Switch';
// import Link from 'next/link';
// import { MdKeyboardArrowLeft } from 'react-icons/md';

// interface ApplyForJobFormProps {
//     header: string;
//     joblocation: string;
//     selectCat:boolean
// }

// const ApplyForJobForm: React.FC<ApplyForJobFormProps> = ({ header, joblocation,selectCat }) => {
//     const [isselected, setSlected] = React.useState(selectCat);
//     const [value, setValue] = React.useState(false);


//     return (
//         <React.Fragment>
//             <div style={{ display: "flex", justifyContent: "left" }}>
//                 <div className={css.jobLeftarrow}>
//                     <Link href={{ pathname: "/joinuspage" }}>
//                         <MdKeyboardArrowLeft className={css.LeftarrowIcon}  />
//                         <p>View all jobs</p>
//                     </Link>
//                 </div>
//             </div>

//             <div className={css.overallContainer}>
//                 <h1 className={css.jobHead}>{header}</h1>
//                 <p className={css.jobpara}>{joblocation}</p>
//             </div>

//             <div className={css.bgclrwhite}>
//                 <Form>
//                     <div >
//                         <h1 className={css.formhead}>Apply for this job</h1>
//                         <div className={css.formtxt}>Resume/CV *<Button className={css.formbtn} variant="outline-danger">Select Resume</Button></div>
//                         <p className={css.para}>Upload in either DOC, DOCX or PDF file format (file size not more than 1MB)</p>


//                         <div className="row flex ">
//                             <div className='col-1'></div>
//                             <div className="col-md-5">
//                                 <Form.Group className="mb-3">
//                                     <Form.Label className={css.formlabel} htmlFor="TextInput">First name*:</Form.Label>
//                                     <Form.Control className={css.forminput} type="text" placeholder="" />
//                                 </Form.Group>
//                             </div>
//                             <div className="col-md-5">
//                                 <Form.Group className="mb-3 w-50%">
//                                     <Form.Label className={css.formlabel} htmlFor="Select">Last name*:</Form.Label>
//                                     <Form.Control className={css.forminput} type="text" placeholder="" />
//                                 </Form.Group>
//                             </div>
//                             <div className='col-1'></div>
//                         </div>
//                         <div className="row flex ">
//                             <div className='col-1'></div>
//                             <div className="col-md-5">
//                                 <Form.Group className="mb-3">
//                                     <Form.Label className={css.formlabel} htmlFor="TextInput">Email*:</Form.Label>
//                                     <Form.Control className={css.forminput} type="email" placeholder="" />
//                                 </Form.Group>
//                             </div>
//                             <div className="col-md-5">
//                                 <Form.Group className="mb-3 w-50%">
//                                     <Form.Label className={css.formlabel} htmlFor="Select">Mobile number*:</Form.Label>
//                                     <Form.Control className={css.forminput} type="text" placeholder="" />
//                                 </Form.Group>
//                             </div>
//                             <div className='col-1'></div>
//                         </div>
//                     </div>

//                     {isselected ? <div >
//                         <div className='row flex'>
//                             <div className='col-1'></div>
//                             <div className="col-md-5">
//                                 <Form.Group className="mb-3">
//                                     <Form.Label className={css.formlabel} htmlFor="Select">Select department*:</Form.Label>
//                                     <Form.Select className={`${css.formselect} ${css.forminput}`} id="Select">

//                                     </Form.Select>

//                                 </Form.Group>
//                             </div>
//                             <div className='col-6'></div>
//                         </div>
//                     </div> : null}

//                     <div >
//                         <h4 className={css.formhead1}>Mandatory Questions</h4>
//                         <div className={css.secondform}>
//                             <div className="row flex">
//                                 <div className='col-1'></div>
//                                 <div className='col-3'>
//                                     <Form.Group className="mb-3">
//                                         <Form.Label className={css.formlabel} id={css['secondformlabel']} htmlFor="TextInput">Current CTC *</Form.Label>
//                                         <Form.Control className={css.forminput} type="text" placeholder="" />
//                                     </Form.Group>
//                                 </div>
//                                 <div className='col-1'></div>
//                                 <div className="col-3">
//                                     <Form.Group className="mb-3">
//                                         <Form.Label className={css.formlabel} id={css['secondformlabel']} htmlFor="TextInput">Expected CTC *</Form.Label>
//                                         <Form.Control className={`${css.forminput1} ${css.forminput}`} id={css['secondforminput']} style={{ marginLeft: -60 }} type="text" placeholder="" />
//                                     </Form.Group>
//                                 </div>
//                                 <div className="col-3">
//                                     <Form.Group className="mb-3">
//                                         <Form.Label className={css.formlabel} id={css['secondformlabel']} htmlFor="Select">Preferred Location *</Form.Label>
//                                         <Form.Control  className={`${css.forminput1} ${css.forminput}`}  id={css['secondforminput']} style={{ marginLeft: -25 }} type="text" placeholder="" />
//                                     </Form.Group>
//                                 </div>
//                                 <div className='col-1'></div>

//                             </div>
//                         </div>

//                         <div>
//                             <div className='row flex' id={css['current']}>
//                                 {/* <div className='col-1'></div> */}
//                                 <div className='col-6' id={css['rightside']} >
//                                     <h5 className={css.formhead1}>Are you currently serving your notice period? *</h5>
//                                     <div className="form-check form-switch" id={css['form-check']}>
//                                         <Switch isOn={value} onColor="#048811" handleToggle={() => setValue(!value)}
//                                         /></div>
//                                 </div>
//                                 <div className='col-1'>
//                                     <div className={css.line}>
//                                         <div className="vr" style={{ height: "50%" }}></div>
//                                     </div>
//                                 </div>
//                                 <div className='col-5' id={css['portfol']}>
//                                     <div className={css.formhead1} >Portfolio (if available)<Button className={css.formbtn} variant="outline-danger">Select File</Button></div>
//                                     <p className={css.para}>Upload in either DOC, DOCX, PDF or EML file format (file size not more than 1MB)</p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className={css.flex_box}>
//                             <Button className={`${css.jobApplybtn} ${css.jobApplybtn2}`} type="submit">Submit</Button>
//                         </div>
//                     </div>
//                 </Form>
//             </div>
//         </React.Fragment>
//     );
// }

// export default ApplyForJobForm;

import React from 'react';
import css from './form.module.scss';
import Switch from './Switch';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { BiSolidDownArrow } from 'react-icons/bi';

interface ApplyForJobFormProps {
    header: string;
    joblocation: string;
    selectCat: boolean
}

const ApplyForJobForm: React.FC<ApplyForJobFormProps> = ({ header, joblocation, selectCat }) => {
    const [isselected, setSlected] = React.useState(selectCat);
    const [value, setValue] = React.useState(false);

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "left" }}>
                <div className={css.jobLeftarrow}>
                    <Link href={{ pathname: "/joinuspage" }}>
                        <MdKeyboardArrowLeft className={css.LeftarrowIcon} />
                        <p>View all jobs</p>
                    </Link>
                </div>
            </div>
            <div className={css.overallContainer}>
                <h1 className={css.jobHead}>{header}</h1>
                <p className={css.jobpara}>{joblocation}</p>
            </div>
            <div className={css["container"]}>
                <form>
                    <h1 className={css.formhead}>Apply for this job</h1>
                    <div className={css.formtxt}>Resume/CV *
                        <div className={css.padding}>
                            <Button className={css.formbtn} variant="outline-danger">Select Resume</Button>
                        </div>

                    </div>
                    <p className={css.para}>Upload in either DOC, DOCX or PDF file format (file size not more than 1MB)</p>
                    <div className={css["row"]}>
                        <div className={css["col-50"]}>
                            <div className={css["row"]}>
                                <div className={css["col-50"]}>
                                    <label className={css["formlabel"]}>First Name*:</label>
                                    <input type="text" id="state" name="state" className={css['forminput']} />
                                </div>
                                <div className={css["col-50"]}>
                                    <label className={css["formlabel"]}>Last Name*:</label>
                                    <input type="text" id="zip" name="zip" className={css['forminput']} />
                                </div>
                            </div>
                            <div className={css["row"]}>
                                <div className={css["col-50"]}>
                                    <label className={css["formlabel"]}>Email*:</label>
                                    <input type="text" id="state" name="state" className={css['forminput']} />
                                </div>
                                <div className={css["col-50"]}>
                                    <label className={css["formlabel"]}>Mobile*:</label>
                                    <input type="text" id="zip" name="zip" className={css['forminput']} />
                                </div>
                            </div>
                            {isselected ?
                                <div>
                                    <div className={css["row"]}>
                                        <div className={css["col-50"]} style={{position:"relative"}}>
                                            <label className={css["formlabel"]} >Select department*:</label>
                                            <div style={{ display: "flex" }}>
                                                <input type="text" id="zip" name="zip" className={css['forminput']} />
                                                <div className={css.BiSolidDownArrow}><BiSolidDownArrow/></div>
                                            </div>
                                        </div>
                                        <div className={css["col-50"]}></div>
                                    </div>
                                </div> : ""
                            }
                            <h4 className={css['secondhead']}>Mandatory Questions</h4>
                            <div className={css["row"]}>
                                <div className={css["col-30"]}>
                                    <label className={css["formlabel"]}>Current CTC *</label>
                                    <input type="text" id="state" name="state" className={css['forminput1']} />
                                </div>
                                <div className={css["col-30"]}>
                                    <label className={css["formlabel"]}>Expected CTC *</label>
                                    <input type="text" id="zip" name="zip" className={css['forminput1']} />
                                </div>
                                <div className={css["col-30"]}>
                                    <label className={css["formlabel"]}>Preferred Location *</label>
                                    <input type="text" id="zip" name="zip" className={css['forminput1']} />
                                </div>
                            </div>
                            <div className={css["row"]}>
                                <div className={css["col-30"]}>
                                    <div className={css.highmade}>
                                        <h5 className={css.formhead1}>Are you currently serving your notice period? *</h5>
                                    </div>
                                    <div className="form-check form-switch" id={css['form-check']}>
                                        <Switch isOn={value} onColor="#048811" handleToggle={() => setValue(!value)}
                                        /></div>
                                </div>
                                <div className={css["vr"]}></div>
                                <div className={css["col-30"]}>
                                    <div className={css["rightside"]}>
                                        <div className={css.formhead1} >Portfolio (if available)
                                            <div className={css.padding}>
                                                <Button className={css.formbtn} variant="outline-danger">Select File</Button>
                                            </div>
                                        </div>
                                        <p className={css.para}>Upload in either DOC, DOCX, PDF or EML file format (file size not more than 1MB)</p>
                                    </div>
                                </div>
                            </div>
                            <div className={css.flex_box}>
                                <Button className={`${css.jobApplybtn} ${css.jobApplybtn2}`} type="submit">Submit</Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default ApplyForJobForm;

