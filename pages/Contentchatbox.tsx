import React from 'react';
import css from '../styles/Contentchatbox.module.scss';
import Modal from 'react-bootstrap/Modal';
import { BsChevronDown, BsEmojiSmile } from 'react-icons/bs'
import { IoArrowDownCircleOutline, IoSendSharp } from 'react-icons/io5'
interface ChildProps {
    onDataReceived: (data: string) => void;
}
const Contentchatbox = (props: ChildProps) => {
    const [chatConversation, setChatConversation] = React.useState(false);
    const [input, setInput] = React.useState('');
    const [messages, setMessages] = React.useState([]);


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

    const handleOpenModal = (e) => {
        e.preventDefault();
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

    const handleInput = () => {
        if (input.trim() === '') {
            return;
        }
        let response;
        if (messages.length % 3 === 0) {
          response = { sender: 'Bot', text: 'would you like to take a look at our products ?' , checkbox1: `yes` , checkbox2 : 'no' };
        } else if (messages.length % 3 !== 1 && input == 'Yes') {
          response = { sender: 'Bot', text: '' , products : ['kitchen' , 'bedroom' , 'living room' , 'space saving furniture' ] };
        }else if (messages.length % 3 !== 1 && input == 'No') {
            response = { sender: 'Bot', text: ' We are always available. Come back anytime!' };
        } else {
          response = { sender: 'Bot', text: ' Nice to have conversation with you' };
        }

        const updatedMessages = [...messages, { sender: 'You', text: input }];
        setMessages([...updatedMessages, response]);
        setInput('');
    }
    
    return (
        <React.Fragment>
            <div className={css.maindivchatbot}>
                <div style={{ clipPath: generateWavyClipPath() }} className={css.chatboxback}>
                    {/* <div className={css.contentOfchatbox}></div> */}

                </div>

                <section className={css.sectionbg}>
                    {!chatConversation ?
                        <form>
                            <input type='text' className={css.SInput_1} placeholder='Enter your name' />
                            <input type='text' className={css.SInput_2} placeholder='Enter your email address' />
                            <input type='text' className={css.SInput_3} placeholder='Enter your mobile number ' />
                            <div className={css.withIconin}>
                                <button>
                                    <BsChevronDown className={css.BsChevronDown} />
                                </button>
                                <input type='text' className={css.SInput_4} placeholder="Select Your city " />
                            </div>
                            <textarea className={css.SI_textarea} placeholder='Type your message here and click submit ' ></textarea>
                            <div className={css.btnDiv}>
                                <button className={css.formBtn} onClick={handleOpenModal} >Submit</button>
                            </div>
                        </form> :
                        <div>
                            {messages.length!=0 && <div className={css.chatHistory}>
                                {messages.map((message, index) => (
                                    <div key={index} className={''}>
                                        <div className={message.sender == "You" ? css.user : css.bot}>
                                            { message.products ? <></>: <span className={message.sender == "You" ? css.userText : css.botText}>{message.text}</span>}
                                            { 
                                            message.checkbox1 && <div className='flex pl-[10%] pr-[15%] justify-between mt-[3%]'>
                                                <span onClick={()=>setInput('Yes')} className='bg-[#58B743] text-[#FFFFFF] px-[15%] py-[4%] rounded-3xl cursor-pointer'>{message.checkbox1}</span> 
                                                <span onClick={()=>setInput('No')}  className='bg-[#F44336] text-[#FFFFFF] px-[15%] py-[4%] rounded-3xl cursor-pointer'>{message.checkbox2}</span>
                                                </div>
                                                }

                                                {
                                                    message.products && message.products.map((product , index) =>(<div key={index} className={css.botText + " mt-2 flex justify-between"}><span>{product}</span><IoArrowDownCircleOutline size={32} style={{ color: '#737373' , cursor: 'pointer' }} /></div>))
                                                }
                                            </div>
                                    </div>
                                ))}
                            </div>}
                            <div onClick={handleChatArea} className={css.type_Chat_Area}>
                                <input type='text' placeholder='Enter your message' id='chatArea' onChange={(e) => setInput(e.target.value)} value={input} onKeyDown={handleKeyDown} className={css.TypeText} />
                                <div className={css.bottom_chat_Icon}>
                                    {messages.length != 0 && <div className={css.emojiIcon}><BsEmojiSmile/></div>}
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