import "./App.css";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/shared/Navbar/Navbar";
import Container from "./Components/ui/container/Container";
import Home from "./screens/Home/Home";

function App() {
  return (
    <>
      <Navbar />
      <Container>
        <Home />
      </Container>
      <Footer />
    </>
  );
}

export default App;
