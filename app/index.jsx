import * as React from 'react';
import * as ReactDom from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import "./index.css";
import Nav from './components/Nav';
import Loading from './components/Loading';

const Popular =  React.lazy(() => import("./components/Popular"));
const Battle =  React.lazy(() => import('./components/Battle'));
const Results =  React.lazy(() => import('./components/Results'));


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: "light"
    }

    this.toggleTheme = this.toggleTheme.bind(this)
  }

  toggleTheme() {
    this.setState({ theme: this.state.theme === "light" ? "dark" : "light"})
  }
  render() {
    return (
      <Router>
      <div className={this.state.theme}>
        <div className='container'>
          <Nav theme={this.state.theme} toggleTheme={this.toggleTheme}/>
          <React.Suspense fallback={<Loading/>}>
          <Routes>
          <Route path="/battle" element={<Battle/>} />
          <Route path="/" element={<Popular/>}/>
          <Route path="/results" element={<Results/>}/>
          </Routes>
          </React.Suspense>
        </div>
      </div>
      </Router>
    )
  } 
}

const rootElement = document.getElementById('app');
const root = ReactDom.createRoot(rootElement);
root.render(<App />);