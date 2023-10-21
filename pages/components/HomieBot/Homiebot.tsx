// import React, { Component } from "react";

// declare global {
//   interface Window {
//     kommunicate: any;
//   }
// }

// class Homiebot extends Component {

//   componentDidMount() {

//     (function (d, m) {
//       var kommunicateSettings = {
//         appId: "2169f4a0bba28f8f15a22b63f7a1340b9",
//         popupWidget: false,
//         emojilibrary: true,
//         attachment: false,
//         automaticChatOpenOnNavigation: true,

//         onInit: function () {
          
//           var css = `
//           .km-sidemodal{
//             font-family: 'Montserrat' !important;
//           } 
//           .km-modal-span{
//             display: none !important
//           } 
//           .km-form-label-container{
//             display: none !important
//           } 
//           .km-start-conversation,km-modal-form{
//             font-family: 'Montserrat' !important;
//           } 
//           .km-form-control[placeholder='Type your message here and click submit']{
//             height:150px !important
//           } 
//           .km-form-control[placeholder='Type your message here and click submit']::placeholder{
//             padding:unset !important;background-color:#F5F5F5;
//           } 
//           .km-form-control{
//             border:none !important;
//              background-color:#F5F5F5;
//              box-shadow:unset!important;
//           } 
//           .km-form-control::placeholder{
//             font-faamily:'Montserrat' !important
//           } 
//           .mck-tab-title{
//             font-family:'Montserrat' !important
//           } 
//           .mck-box div{
//             font-family:'Montserrat' !important
//           } 
//           .mck-running-on{
//             display:none !important
//           } 
//           .km-sidemodal--modal-header{
//             box-shadow: 0px 2px 15px 0px #00000040;
//           } 
//           .km-form-group button{
//             content:'Submit'!important
//           }
//           .mck-box {
//             box-shadow: 0 4px 24px -1px rgba(0,0,0,.2);
//           }
//           .km-header-container{
            
//             box-shadow: 0px 2px 1px 0px #00000040;

//             width: 100%;
//             padding: unset;
//           }
//           .mck-box-top{
//             padding: unset;
//           }`    
//            window.kommunicate.customizeWidgetCss(css);
           
//            var css2 =`
           
//            `
//           var boxTop = window.KommunicateGlobal.document.querySelector('.km-header-container ');
//           var customBox = document.createElement('div');
//           customBox.classList.add('my-custom-box');
          
          
//           customBox.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
//           <defs>
//             <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
//               <stop offset="0%" style="stop-color: #1E50AC" />
//               <stop offset="100%" style="stop-color: black" />
//             </linearGradient>
//           </defs>
//           <path fill="url(#grad)" fill-opacity="1" d="M0,0L1440,0L1440,50Q960,100,0,50" />
//           <path fill="#1E50AC" fill-opacity="1" d="M0,224L80,224C160,224,320,224,480,197.3C640,171,800,117,960,106.7C1120,96,1280,128,1360,144L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z" />
//         </svg>
//         `;


//           var style = document.createElement('style');
//           style.textContent = '.my-custom-box {background-color: white; text-align: center; display: flex; align-items: center; font-weight: bold; height: 45px; width: 100%; border: none; cursor: pointer;margin-top:20px; box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.4);}';
//           boxTop.parentNode.after(customBox);
//           customBox.appendChild(style);
 
          
//           },
//         preLeadCollection: [
//           {
//             field: "",
//             required: true,
//             placeholder: "Enter your name",
//           },
//           {
//             field: "",
//             type: "email",
//             required: true,
//             placeholder: "Enter your email",
//           },
//           {
//             field: "",
//             type: "number",
//             required: true,
//             element: "input",
//             placeholder: "Enter your mobile number",

//           },
//           {
//             field: "", // You can add any number of custom properties
//             required: true,
//             element: "select",
//             options: [{ value: "Bangalore" }, { value: "Mumbai" }], // Mandatory field (Incase of element:"select")
//             placeholder: "Please select the City",
//           },
//           {
//             field: "",
//             type: "text",
//             required: true,
//             placeholder: "Type your message here and click submit",

//           },
//         ],
//       };
//       var s = document.createElement("script");
//       s.type = "text/javascript";
//       s.async = true;
//       s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
//       var h = document.getElementsByTagName("head")[0];
//       h.appendChild(s);
//       window.kommunicate = m;
//       m._globals = kommunicateSettings;
//     })(document, window.kommunicate || {});
//   }

//   render() {
//     return (
//       <React.Fragment>
//         {/* <div style={{position:'absolute',zIndex:99,bottom:0}}>
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#2552A4" fill-opacity="1" d="M0,224L80,224C160,224,320,224,480,197.3C640,171,800,117,960,106.7C1120,96,1280,128,1360,144L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
//               </div> */}

//       </React.Fragment>
//     );
//   }
// }

// export default Homiebot;