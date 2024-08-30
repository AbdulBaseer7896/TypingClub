// import React, { useRef } from 'react';
// import Navbar from '../components/NavBar';
// import { useDispatch, useSelector } from 'react-redux';
// import { resetTyping } from '../redux/slices/Filter';
// import { useNavigate } from 'react-router-dom';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// const ResultPage = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const reportRef = useRef();

//     const accuracy = useSelector((state) => state.filter.accuracy);
//     const elapsedTime = useSelector((state) => state.filter.elapsedTime);
//     const typingSpeed = useSelector((state) => state.filter.typingSpeed);

//     let stars = 0;
//     if (accuracy === 100) {
//         stars = 5;
//     } else if (accuracy < 100 && accuracy > 95) {
//         stars = 4;
//     } else if (accuracy < 95 && accuracy > 90) {
//         stars = 3;
//     } else if (accuracy < 90 && accuracy > 80) {
//         stars = 2;
//     } else if (accuracy < 80 && accuracy > 70) {
//         stars = 1;
//     } else {
//         stars = 0;
//     }

//     const handleTryAgain = () => {
//         dispatch(resetTyping());
//         navigate('/');
//     };

//     const getCurrentFormattedDate = () => {
//         const currentDate = new Date();
//         const monthNames = ["January", "February", "March", "April", "May", "June", 
//                             "July", "August", "September", "October", "November", "December"];
//         const day = currentDate.getDate();
//         const month = monthNames[currentDate.getMonth()];
//         const year = currentDate.getFullYear();
//         return `${day} ${month} ${year}`;
//     };

//     const handleCreateReport = () => {
//         if (localStorage.getItem('email') === null) {
//             alert("To create a Report you need to Login !!!! ");
//             navigate('/');
//         } else {
//             const email = localStorage.getItem('email');
//             const name = localStorage.getItem('name');
//             const minutes = Math.floor(elapsedTime * 100 / 60);
//             const seconds = Math.floor(elapsedTime * 100 % 60);
//             const formattedElapsedTime = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

//             let advice = "";
//             if (accuracy >= 95) {
//                 advice = "Great job on accuracy! Now, focus on improving your typing speed.";
//             } else if (accuracy < 95 && accuracy >= 85) {
//                 advice = "Good accuracy! Work on improving both your accuracy and typing speed.";
//             } else {
//                 advice = "Focus on improving your accuracy first. Once you are confident, work on increasing your typing speed.";
//             }

//             const reportContent = `
//                 <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; background-color: #f4f4f4; border: 1px solid #ddd; border-radius: 8px;">
//                     <h1 style="text-align: center; color: #333;">Typing Test Report</h1>
//                     <p><strong>Name:</strong> ${name}</p>
//                     <p><strong>Email:</strong> ${email}</p>
//                     <p><strong>Accuracy:</strong> ${Math.round(accuracy)}%</p>
//                     <p><strong>Typing Speed:</strong> ${Math.round(typingSpeed)} wpm</p>
//                     <p><strong>Duration:</strong> ${formattedElapsedTime}</p>
//                     <p><strong>Total Stars:</strong> ${stars}</p>
//                     <h2 style="color: #555;">Advice:</h2>
//                     <p>${advice}</p>
//                 </div>
//             `;

//             // Convert HTML to PDF
//             html2canvas(document.querySelector("#report-content")).then((canvas) => {
//                 const imgData = canvas.toDataURL('image/png');
//                 const pdf = new jsPDF();
//                 pdf.addImage(imgData, 'PNG', 10, 10);
//                 pdf.save('typing_test_report.pdf');
//             });
//         }
//     };


//     const handleUpdateRanking = async () => {
//       const em = localStorage.getItem('email');
//       if (em === null) {
//           alert("To upload your Ranking you need to Login !!!! ");
//           navigate('/');
//       } else {
//           const minutes = Math.floor(elapsedTime * 100 / 60);
//           const seconds = Math.floor(elapsedTime * 100 % 60);
//           const formattedElapsedTime = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

//           const formData = {
//               email: localStorage.getItem("email"),  
//               name: localStorage.getItem("name"),
//               accuracy: Math.round(accuracy),                  
//               elapsedTime: formattedElapsedTime, 
//               typingSpeed: Math.round(typingSpeed),            
//               date: getCurrentFormattedDate()        
//           };

//           try {
//               const response = await fetch('http://127.0.0.1:5000/uploadResult', {
//                   method: 'POST',
//                   headers: {
//                       'Content-Type': 'application/json'
//                   },
//                   body: JSON.stringify(formData)
//               });

//               const data = await response.json();

//               if (response.status === 400) {
//                   alert("You are not able to upload now. First, Break your current record!");
//               } else if (response.ok) {
//                   alert("Your ranking has been uploaded successfully!");
//                   navigate('/Ranking');
//               } else {
//                   alert("An error occurred: " + data.message);
//               }
//           } catch (error) {
//               console.error("Error:", error);
//               alert("An error occurred while trying to upload your ranking. Please try again later.");
//           }
//       }
//   };

//     return (
//         <div>
//             <Navbar />
//             <div className="bg-[#3d5e87] text-white h-[630px] flex items-center justify-center">
//                 {/* Main Container */}
//                 <div className="bg-bla p-8 rounded-lg -mt-5 shadow-l w-full max-w-4xl mx-auto relative">
//                     {/* Stars */}
//                     <div className="flex justify-center mb-16 text-3xl">
//                         {[...Array(stars)].map((_, i) => (
//                             <span key={i} className="text-yellow-400 text-8xl">&#9733;</span>
//                         ))}
//                         {[...Array(5 - stars)].map((_, i) => (
//                             <span key={i} className="text-gray-500 text-8xl">&#9733;</span>
//                         ))}
//                     </div>

//                     {/* Stats Container */}
//                     <div className="flex justify-around items-center relative">
//                         {/* Accuracy Circle */}
//                         <div className="text-center relative ">
//                             <div className="bg-white bg-opacity-10 w-52 h-52 flex-row pt-16 items-center justify-center border-[#FFC22A]  border-[5px] rounded-full">
//                                 <div className="text-5xl font-bold">{Math.round(accuracy)}%</div>
//                                 <div className="text-mg text-[#88cce8] pt-2 font-bold mt-1">Wrong Words 97</div>
//                             </div>
//                             <div className="text-xl mt-1">Accuracy</div>
//                         </div>

//                         {/* Duration Circle */}
//                         <div className="text-center relative">
//                             <div className="bg-white bg-opacity-10 w-44 h-44 flex-row pt-14 items-center justify-center border-[#FFC22A]  border-[5px] rounded-full">
//                                 <div className="text-4xl font-bold">{Math.floor(elapsedTime * 100 / 60)}{Math.floor(elapsedTime * 100 / 60) < 10 ? '0' : ''} : {Math.floor(elapsedTime * 100 % 60) < 10 ? '0' : ''}{Math.floor(elapsedTime * 100 % 60)}</div>
//                                 <div className="text-sm text-[#88cce8] mt-1 font-bold pl-2">min : seconds</div>
//                             </div>
//                             <div className="text-lg mt-1">Duration</div>
//                         </div>

//                         {/* Speed Circle */}
//                         <div className="text-center relative">
//                             <div className="bg-white bg-opacity-10 w-52 h-52 flex-row pt-14 items-center justify-center border-[#FFC22A]  border-[5px] rounded-full">
//                                 <div className="text-7xl font-bold">{Math.round(typingSpeed)}</div>
//                                 <div className="text-xl text-[#88cce8] mt-1 font-bold">wpm</div>
//                             </div>
//                             <div className="text-xl mt-1">Speed</div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div>
//                 <div className="flex justify-between mt-4 items-center px-80">
//                     <button onClick={handleTryAgain} className="bg-[#59d797] text-white text-2xl border border-white px-7 pb-3 pt-2 rounded-3xl hover:bg-[#0eb168]">Try again</button>
//                     <p className="text-lg font-bold text-[#555555] text-center max-w-sm">
//                         <button onClick={handleCreateReport} className="bg-blue-500 text-lg border border-white text-white px-5 pb-1.5 pt-1 rounded-3xl hover:bg-blue-700 hover:text-white">Report</button>
//                         <br />
//                         {stars > 3 ? "Great work on accuracy. Now it's time to build up your speed and earn more stars." : "Please focus on your accuracy first, then try again to build up your speed."}
//                     </p>
//                     <button onClick={handleUpdateRanking} className="bg-[#ffffff] text-2xl border border-[#555555] text-[#555555] px-8 pb-3 pt-2 rounded-3xl hover:bg-[#555555] hover:text-white">Update on Ranking</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ResultPage;



import React, { useRef } from 'react';
import Navbar from '../components/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { resetTyping } from '../redux/slices/Filter';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ResultPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const reportRef = useRef(null);

    const accuracy = useSelector((state) => state.filter.accuracy);
    const elapsedTime = useSelector((state) => state.filter.elapsedTime);
    const typingSpeed = useSelector((state) => state.filter.typingSpeed);

    let stars = 0;
    if (accuracy === 100) {
        stars = 5;
    } else if (accuracy < 100 && accuracy > 95) {
        stars = 4;
    } else if (accuracy < 95 && accuracy > 90) {
        stars = 3;
    } else if (accuracy < 90 && accuracy > 80) {
        stars = 2;
    } else if (accuracy < 80 && accuracy > 70) {
        stars = 1;
    } else {
        stars = 0;
    }

    const handleTryAgain = () => {
        dispatch(resetTyping());
        navigate('/');
    };

    const getCurrentFormattedDate = () => {
        const currentDate = new Date();
        const monthNames = ["January", "February", "March", "April", "May", "June", 
                            "July", "August", "September", "October", "November", "December"];
        const day = currentDate.getDate();
        const month = monthNames[currentDate.getMonth()];
        const year = currentDate.getFullYear();
        return `${day} ${month} ${year}`;
    };

    const handleCreateReport = () => {
        if (localStorage.getItem('email') === null) {
            alert("To create a Report you need to Login !!!! ");
            navigate('/');
        } else {
            const email = localStorage.getItem('email');
            const name = localStorage.getItem('name');
            const minutes = Math.floor(elapsedTime * 100 / 60);
            const seconds = Math.floor(elapsedTime * 100 % 60);
            const formattedElapsedTime = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

            let advice = "";
            if (accuracy >= 95) {
                advice = "Great job on accuracy! Now, focus on improving your typing speed.";
            } else if (accuracy < 95 && accuracy >= 85) {
                advice = "Good accuracy! Work on improving both your accuracy and typing speed.";
            } else {
                advice = "Focus on improving your accuracy first. Once you are confident, work on increasing your typing speed.";
            }

            const reportContent = `
                <div style="font-family: Arial, sans-serif; padding: 20px; margin-right: 500px max-width: 600px; margin: auto; background-color: #f4f4f4; border: 1px solid #ddd; border-radius: 8px;">
                    <h1 style="text-align: center; color: #333;">Typing Test Report</h1>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Accuracy:</strong> ${Math.round(accuracy)}%</p>
                    <p><strong>Typing Speed:</strong> ${Math.round(typingSpeed)} wpm</p>
                    <p><strong>Duration:</strong> ${formattedElapsedTime}</p>
                    <p><strong>Total Stars:</strong> ${stars}</p>
                    <h2 style="color: #555;">Advice:</h2>
                    <p>${advice}</p>
                </div>
            `;

            // Create a container to hold the report content
            const reportElement = document.createElement('div');
            reportElement.innerHTML = reportContent;
            document.body.appendChild(reportElement);

            // Convert HTML to PDF
            html2canvas(reportElement).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'PNG', 10, 10);
                pdf.save(`${name}.pdf`);

                // Clean up
                document.body.removeChild(reportElement);
                navigate('/')
            });
        }
    };

    const handleUpdateRanking = async () => {
      const em = localStorage.getItem('email');
      if (em === null) {
          alert("To upload your Ranking you need to Login !!!! ");
          navigate('/');
      } else {
          const minutes = Math.floor(elapsedTime * 100 / 60);
          const seconds = Math.floor(elapsedTime * 100 % 60);
          const formattedElapsedTime = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

          const formData = {
              email: localStorage.getItem("email"),  
              name: localStorage.getItem("name"),
              accuracy: Math.round(accuracy),                  
              elapsedTime: formattedElapsedTime, 
              typingSpeed: Math.round(typingSpeed),            
              date: getCurrentFormattedDate()        
          };

          try {
              const response = await fetch('http://127.0.0.1:5000/uploadResult', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(formData)
              });

              const data = await response.json();

              if (response.status === 400) {
                  alert("You are not able to upload now. First, Break your current record!");
              } else if (response.ok) {
                  alert("Your ranking has been uploaded successfully!");
                  navigate('/Ranking');
              } else {
                  alert("An error occurred: " + data.message);
              }
          } catch (error) {
              console.error("Error:", error);
              alert("An error occurred while trying to upload your ranking. Please try again later.");
          }
      }
  };

    return (
        <div>
            <Navbar />
            <div className="bg-[#3d5e87] text-white h-[630px] flex items-center justify-center">
                {/* Main Container */}
                <div className="bg-bla p-8 rounded-lg -mt-5 shadow-l w-full max-w-4xl mx-auto relative">
                    {/* Stars */}
                    <div className="flex justify-center mb-16 text-3xl">
                        {[...Array(stars)].map((_, i) => (
                            <span key={i} className="text-yellow-400 text-8xl">&#9733;</span>
                        ))}
                        {[...Array(5 - stars)].map((_, i) => (
                            <span key={i} className="text-gray-500 text-8xl">&#9733;</span>
                        ))}
                    </div>

                    {/* Stats Container */}
                    <div className="flex justify-around items-center relative">
                        {/* Accuracy Circle */}
                        <div className="text-center relative ">
                            <div className="bg-white bg-opacity-10 w-52 h-52 flex-row pt-16 items-center justify-center border-[#FFC22A]  border-[5px] rounded-full">
                                <div className="text-5xl font-bold">{Math.round(accuracy)}%</div>
                                <div className="text-mg text-[#88cce8] pt-2 font-bold mt-1">Wrong Words 97</div>
                            </div>
                            <div className="text-xl mt-1">Accuracy</div>
                        </div>

                        {/* Duration Circle */}
                        <div className="text-center relative">
                            <div className="bg-white bg-opacity-10 w-44 h-44 flex-row pt-14 items-center justify-center border-[#FFC22A]  border-[5px] rounded-full">
                                <div className="text-4xl font-bold">{Math.floor(elapsedTime * 100 / 60)}{Math.floor(elapsedTime * 100 / 60) < 10 ? '0' : ''} : {Math.floor(elapsedTime * 100 % 60) < 10 ? '0' : ''}{Math.floor(elapsedTime * 100 % 60)}</div>
                                <div className="text-sm text-[#88cce8] mt-1 font-bold pl-2">min : seconds</div>
                            </div>
                            <div className="text-lg mt-1">Duration</div>
                        </div>

                        {/* Speed Circle */}
                        <div className="text-center relative">
                            <div className="bg-white bg-opacity-10 w-52 h-52 flex-row pt-14 items-center justify-center border-[#FFC22A]  border-[5px] rounded-full">
                                <div className="text-7xl font-bold">{Math.round(typingSpeed)}</div>
                                <div className="text-xl text-[#88cce8] mt-1 font-bold">wpm</div>
                            </div>
                            <div className="text-xl mt-1">Speed</div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="flex justify-between mt-4 items-center px-80">
                    <button onClick={handleTryAgain} className="bg-[#59d797] text-white text-2xl border border-white px-7 pb-3 pt-2 rounded-3xl hover:bg-[#0eb168]">Try again</button>
                    <p className="text-lg font-bold text-[#555555] text-center max-w-sm">
                        <button onClick={handleCreateReport} className="bg-blue-500 text-lg border border-white text-white px-5 pb-1.5 pt-1 rounded-3xl hover:bg-blue-700 hover:text-white">Report</button>
                        <br />
                        {stars > 3 ? "Great work on accuracy. Now it's time to build up your speed and earn more stars." : "Please focus on your accuracy first, then try again to build up your speed."}
                    </p>
                    <button onClick={handleUpdateRanking} className="bg-[#ffffff] text-2xl border border-[#555555] text-[#555555] px-8 pb-3 pt-2 rounded-3xl hover:bg-[#555555] hover:text-white">Update on Ranking</button>
                </div>
            </div>
        </div>
    );
};

export default ResultPage;
