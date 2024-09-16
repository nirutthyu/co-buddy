

export default function SideBar({ toggleQuiz }) {


  return (
    <div id="sideBar" className="d-flex flex-column sideBar">
      <div className="container d-flex flex-column ">
      <button>DashBoard</button>
      <button onClick={toggleQuiz}>Quiz</button>
      <button>Chat</button>
      </div>

      
    </div>
  );
}
