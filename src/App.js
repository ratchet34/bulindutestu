import './App.css';
import 'semantic-ui-css/semantic.min.css'
import MySidebar from './sidebar';

var allData = [
  {
    type: "audio",
    title: "How You Like That",
    artist: "Blackpink",
    id: "32si5cfrCNc",
    done: false,
    from: 30,
    time: 15,
    answerTime: 30
  },
  {
    type: "audio",
    title: "Wannabe",
    artist: "ITZY",
    id: "fE2h3lGlOsk",
    done: false,
    from: 0,
    time: 25,
    answerTime: 30
  },
  {
    type: "audio",
    origin: "monZbi",
    id: "sgelWahGKYM",
    done: false,
    from: 0,
    time: 25,
    answerTime: 30
  }
]

function App() {
  return (
    <div className="App">
      <MySidebar allData={allData}></MySidebar>
    </div>
  );
}

export default App;
