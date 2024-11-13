import { MainHeader } from "./components/partials/main-header";
import { HomePage } from "./pages/home";

const App = () => {
  // Here, instead of inserting the `HomePage` component, `react-router-dom` might be used
  return (
    <>
      <MainHeader />
      <HomePage />
    </>
  );
};

export default App;
