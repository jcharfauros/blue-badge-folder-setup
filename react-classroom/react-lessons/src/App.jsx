// import logo from './logo.svg';
import './App.css';
import Header from './components/Day1/Header';
import AboutMe from './components/Day1/AboutMe';
import Footer from './components/Day1/Footer';

function App() {
  const name = 'Julia Ghoulia';
  const age = 500;
  const rich = "true";
  const cityState = "Monterey, CA";
  const date = new Date().getFullYear();

  return (
    <div className="App">
      <h1>Welcome to React, {name}.</h1>
      <h2>We just modified out root App component.</h2>
      <Header name={name} age={age} rich={rich}/>      
      <AboutMe name={name} cityState={cityState}/>
      <Footer date={date}/>

      {/* <h3>Create the following</h3>
  <ul>
     <li>Make a footer component import and mount it in the App.jsx component</li>
     <li>In the footer component make it have p tag with a Copyright EFA and the current year</li>
     <li>Bonus: Make that year dynamic by using a javascript method getFullYear Hint: Create a variable in the component that will store the getFullYear</li>
  </ul> */}

    </div>
  );
}
//npm start
export default App;
