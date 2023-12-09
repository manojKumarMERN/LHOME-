// import React, { useState } from "react";
// import { Button } from "reactstrap";
// // import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
// import DateFnsUtils from "@date-io/date-fns"; 
// import { DatePicker, LocalizationProvider } from "@material-ui/pickers";


// function DateandTime() {
//   const [isForcePickerOpen, setIsOpen] = useState(false);
//   const [selectedDate, handleDateChange] = useState(new Date());

//   return (
//     <React.Fragment>
//       <div>Date: {selectedDate.toString()}</div>
//       <LocalizationProvider dateAdapter={DateFnsUtils}>
//         <DatePicker
//           open={isForcePickerOpen}
//           onClose={() => setIsOpen(false)}
//           value={selectedDate}
//           onChange={handleDateChange}
//           renderInput={({
//             ref,
//             inputProps,
//             disabled,
//             onChange,
//             value,
//             ...other
//           }) => (
//             <div ref={ref} {...other}>
//               <input
//                 style={{ display: "none" }}
//                 value={value}
//                 onChange={onChange}
//                 disabled={disabled}
//                 {...inputProps}
//               />
//               <Button
//                 variant="outlined"
//                 color="primary"
//                 onClick={() => setIsOpen((isOpen) => !isOpen)}
//               >
//                 {"Somethin here"}
//               </Button>
//             </div>
//           )}
//         />
//       </LocalizationProvider>
//     </React.Fragment>
//   );
// }

// export default DateandTime;
