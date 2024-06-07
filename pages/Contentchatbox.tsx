import React from 'react';
import css from '../styles/Contentchatbox.module.scss';
import Modal from 'react-bootstrap/Modal';
import { BsChevronDown, BsEmojiSmile } from 'react-icons/bs'
import { IoArrowDownCircleOutline, IoSendSharp } from 'react-icons/io5'
import * as Yup from 'yup';
import { setIn, useFormik } from 'formik';
import { AxiosService } from '../services/ApiService';
import { getChatUserId, getUserId } from '../services/sessionProvider';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import Products from '../public/assets/pdf.json';
// import '../public/assets/PDFfolder/Bedroom.pdf';

interface ChildProps {
    onDataReceived: (data: string) => void;
}

const userEntrySchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    number: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
    city: Yup.string().required('City is required'),
    message: Yup.string().optional()
});

const Contentchatbox = (props: ChildProps) => {
    const productsArray = Products.products || [];

    const userId = getUserId();
    const district: string[] = [
        "Ariyalur",
        "Chengalpattu",
        "Chennai",
        "Coimbatore",
        "Cuddalore",
        "Dharmapuri",
        "Dindigul",
        "Erode",
        "Kallakurichi",
        "Kanchipuram",
        "Kanniyakumari",
        "Karur",
        "Krishnagiri",
        "Madurai",
        "Mayiladuthurai",
        "Nagapattinam",
        "Namakkal",
        "Nilgiris",
        "Perambalur",
        "Pudukkottai",
        "Ramanathapuram",
        "Ranipet",
        "Salem",
        "Sivagangai",
        "Tenkasi",
        "Thanjavur",
        "Theni",
        "Thoothukudi",
        "Tiruchirappalli",
        "Tirunelveli",
        "Tirupathur",
        "Tiruppur",
        "Tiruvallur",
        "Tiruvannamalai",
        "Tiruvarur",
        "Vellore",
        "Viluppuram",
        "Virudhunagar"
    ];
    const [chatConversation, setChatConversation] = React.useState(false);
    const [input, setInput] = React.useState('');
    const [messages, setMessages] = React.useState([]);
    const chatArea = React.useRef(null);
    const [processingResponse, setProcessingResponse] = React.useState(false);
    const [isDefault, setIsDefault] = React.useState(false);
    const [selectedOption, setSelectedOption] = React.useState('');
    const [isExit, setIsExit] = React.useState(false);
    const [isSelected, setSelected] = React.useState(false);


    
    const formik = useFormik({
        initialValues: {
          name: '',
          email: '',
          number: '',
          city: '',
          message: '',
        },
        validationSchema: userEntrySchema,
        onSubmit: async(values) => {
            try{
          const response = await AxiosService.post('/chatbot' , values);
          if(response.status == 200){
            setIsDefault(true);
            setInput("Hi")
            const { chatbotuser } = response.data;
            await Cookies.set('chatUserId', chatbotuser.id, { expires: 7, path: '/' });
            handleOpenModal();
          }
        }catch(err){
            toast.error(err?.response?.data?.error?.errors?.[0].message);
            
        }
          

        },
      });

      const { values, handleChange, handleBlur, touched, errors } = formik;



    const generateWavyClipPath = () => {
        const N = 100;
        let clipPath = "";

        for (let i = 0; i < N + 1; i++) {
            clipPath +=
                `${(100 / N) * i}% ${100 * (0.5 + 0.20 * Math.sin((2 * Math.PI * i) / N))
                }%,`;
        }

        clipPath = clipPath + "100% 100%,0 100%";
        return `polygon(${clipPath})`;
    };

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
        const data = 'Hi there !';
        props.onDataReceived(data);
        setChatConversation(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleKeyDown = (event) => {
        if (event.key == "Enter") {
            handleInput()
        }
    }

    const handleChatArea = () => {
        const element = document.getElementById('chatArea');
        if (element) {
            element.focus();
        }
    }

    


    
    React.useEffect(() => {
        if (chatArea.current) {
            chatArea.current.scrollTop = chatArea.current.scrollHeight;
        }
        if(userId || getChatUserId()){
           setChatConversation(true);
           setIsDefault(true)
           setInput("Hi")
        }
    }, [messages, processingResponse,userId]);

    React.useEffect(() => {
        if(isDefault) {
           
           // setInput("Hi")
           handleInput()
          // setIsDefault(false)
        }
        
    }, [isDefault, setIsDefault]);


    const handleInput = async () => {
        // if (input.trim() === '') {
        //     return;
        // }
        setProcessingResponse(true);
        let response;
        if (messages.length % 3 === 0 &&  selectedOption== "") {
            response = { sender: 'Bot', text: 'would you like to take a look at our products ?', checkbox1: `Yes`, checkbox2: 'No' };
            // setIsDefault(false);
            // setInput(input == "Hi" ? "" : input)
        } 
        else if (messages.length % 3 !== 1 && input.toLowerCase() == 'yes' && !isExit) {
            response = { sender: 'Bot', text: '', products: productsArray };
        } else if (input.toLowerCase() == 'no' || isExit) {
            response = { sender: 'Bot', text: ' We are always available. Come back anytime!' };
        } else {
            if(input.toLowerCase() == 'yes' && isExit) {
                response = { sender: 'Bot', text: ' We are always available. Come back anytime!' };
            } else {
            response = { sender: 'Bot', text: ' Nice to have conversation with you' };
            }
        }
   
        const updatedMessages = [...messages, { sender: 'You', text: input }];
       
       
        const unique = new Map();

        updatedMessages.forEach(item => {
          if (!unique.has(item.text)) {
            unique.set(item.text, item);
          }
        });
      
        // Convert the Map values back to an array
        let newValues  = Array.from(unique.values());
        setMessages(newValues);
        
        setTimeout(() => {
            setMessages([...updatedMessages, response]);
            setProcessingResponse(false);
        }, 1000)
    
        setInput('');
        //setIsDefault(false);
    }

    setTimeout(() => {
       
         if(selectedOption && isSelected) {
            setInput("")
            //handleInput()
          setSelectedOption("")
        setSelected(false)
        //   setMessages(prevState => (
        //     [...prevState, {description:selectedOption,sender: 'Bot'}] 
        //       ))
        setMessages([...messages, {sender: 'Bot', text: 'would you like to end the chat?', checkbox3: `Yes`, checkbox4: 'No'}]);
         }                                               
    }, 5000)
    const isContinue = () =>{
        setInput('No')
        setIsExit(true)
    }
    return (
        <React.Fragment>
            <div className={css.maindivchatbot}>
                <div style={{ clipPath: generateWavyClipPath() }} className={css.chatboxback}>
                </div>

                <section className={css.sectionbg}>
                    {!chatConversation ?
                        <form onSubmit={formik.handleSubmit}>
                            <input type='text' name='name' placeholder='Enter your name'   onChange={handleChange} onBlur={handleBlur} value={values.name}/>
                            {formik.touched.name && formik.errors.name ? <span className='text-red-500 mt-[-4%]'>{formik.errors.name}</span> : null}
                            <input type='text' name='email' placeholder='Enter your email address' onChange={handleChange} onBlur={handleBlur} value={values.email}/>
                            {formik.touched.email && formik.errors.email ? <span className='text-red-500 mt-[-4%]'>{formik.errors.email}</span> : null}
                            <input type='text' name='number' placeholder='Enter your mobile number ' onChange={handleChange} onBlur={handleBlur} value={values.number}/>
                            {formik.touched.number && formik.errors.number ? <span className='text-red-500 mt-[-4%]'>{formik.errors.number}</span> : null}

                            <select
                                className={css.select}
                                name='city'
                                onChange={handleChange} onBlur={handleBlur} value={values.city}
                                required
                            >
                                <option value="" disabled hidden>Select your city</option>

                                {district && district.map((item, index) => (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                            {formik.touched.city && formik.errors.city ? <span className='text-red-500 mt-[-4%]'>{formik.errors.city}</span> : null}
                            <textarea onChange={handleChange} onBlur={handleBlur} value={values.message} name='message' placeholder='Type your message here and click submit ' ></textarea>
                            <div className={css.btnDiv}>
                                <button type='submit' className={css.formBtn} >Submit</button>
                            </div>
                        </form> :
                        <div>
                            {messages.length != 0 && <div ref={chatArea} className={css.chatHistory}>
                                {messages.map((message, index) => (
                                    <div key={index} className={''}>
                                        <div className={message.sender == "You" ? css.user : css.bot}>
                                            {(message.products && !processingResponse) ? <></> : <span className={message.sender == "You" ? css.userText : css.botText}>{message.text}</span>}
                                            {
                                                message.checkbox1 && <div className='flex pl-[10%] pr-[15%] justify-between mt-[3%]'>
                                                    <span onClick={() => {setInput('Yes'),setIsExit(false)}} className='bg-[#58B743] text-[#FFFFFF] px-[15%] py-[4%] rounded-3xl cursor-pointer'>{message.checkbox1}</span>
                                                    <span onClick={() => {setInput('No'),setIsExit(false)}} className='bg-[#F44336] text-[#FFFFFF] px-[15%] py-[4%] rounded-3xl cursor-pointer'>{message.checkbox2}</span>
                                                </div>
                                            }

{
                                                message.checkbox3 && <div className='flex pl-[10%] pr-[15%] justify-between mt-[3%]'>
                                                    <span onClick={() => setMessages([...messages,{ sender: 'Bot', text: 'We are always available. Come back anytime!' }])} className='bg-[#58B743] text-[#FFFFFF] px-[15%] py-[4%] rounded-3xl cursor-pointer'>{message.checkbox3}</span>
                                                    <span onClick={() => isContinue()} className='bg-[#F44336] text-[#FFFFFF] px-[15%] py-[4%] rounded-3xl cursor-pointer'>{message.checkbox4}</span>
                                                </div>
                                            }

                                            {
                                                message.products && message.products.map((product, index) => (
                                                <div key={index} onClick={()=>{setSelectedOption(product.description), setIsExit(false),setSelected(true),setMessages([...messages, {description:product.description}])}} className={css.botText + " mt-2 flex justify-between items-center"}><span>{product.name}</span>
                                                <a href={`/assets/PDFfolder/${product.image}`} download={product.image.replace('.pdf', '')}><IoArrowDownCircleOutline size={32} style={{ color: '#737373', cursor: 'pointer' }} /></a>
                                                </div>
                                                ))
                                            }
                                            {
                                                message?.description && ( <div className={css.botText + " mt-2 flex justify-between items-center"}>{message?.description }
                                                
                                                </div>)
                                            }
                                            {
                                                selectedOption && (<> <div className={css.botText + " mt-2 flex justify-between items-center"}>{selectedOption }
                                                
                                                </div>
                                                
                                                </>)
                                            }
                                        </div>
                                    </div>
                                ))}
                            </div>}
                            <div onClick={handleChatArea} className={css.type_Chat_Area}>
                                <input type='text' placeholder='Enter your message'  id='chatArea' onChange={(e) => setInput(e.target.value)} value={input !== "Hi" ? input : ""} onKeyDown={handleKeyDown} className={css.TypeText} />
                                <div className={css.bottom_chat_Icon}>
                                    {messages.length != 0 && <div className={css.emojiIcon}><BsEmojiSmile /></div>}
                                    <div className={css.sendIcon} onClick={handleInput}><IoSendSharp className={css.sendIcon_content} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </section>


            </div>

            {isModalOpen && <Modal onClose={handleCloseModal} />}
        </React.Fragment>
    )
}

export default Contentchatbox;