import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

import Biography from "./pages/Biography";
import Blog from "./pages/Blog";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import BlogDetail from "./pages/BlogDetail";
import Books from "./pages/Books";


function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <>
      <Navbar />
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/biography"} component={Biography} />

        <Route path={"/contact"} component={Contact} />
        <Route path={"/blog"} component={Blog} />
        <Route path={"/blog/:id"} component={BlogDetail} />
        <Route path={"/books"} component={Books} />
        <Route path={"/admin"} component={Admin} />
        <Route path={"/profile"} component={Profile} />
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
