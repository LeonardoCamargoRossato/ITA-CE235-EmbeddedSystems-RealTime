import {Component,lazy,Suspense,type ReactNode} from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import {Breadcrumbs,SectionIndex,ActivityNavigation,RouteContext} from "./components/PortalNavigation";
import "./styles/portal-consolidation.css";
import Home from "./pages/Home";
const Discipline=lazy(()=>import("./pages/Discipline"));
const Project=lazy(()=>import("./pages/Project"));
const Sprint1=lazy(()=>import("./pages/Sprint1"));
const Lists=lazy(()=>import("./pages/Lists"));
const List0=lazy(()=>import("./pages/List0"));
const List1=lazy(()=>import("./pages/List1"));
const List2=lazy(()=>import("./pages/List2"));
const List3=lazy(()=>import("./pages/List3"));
const List4=lazy(()=>import("./pages/List4"));
const List5=lazy(()=>import("./pages/List5"));
const Sprint1Team1=lazy(()=>import("./pages/Sprint1Team1"));
const Sprint1Team2=lazy(()=>import("./pages/Sprint1Team2"));
const Sprint2Team1=lazy(()=>import("./pages/Sprint2Team1"));
const Sprint2Team2=lazy(()=>import("./pages/Sprint2Team2"));
const Sprint3Team3=lazy(()=>import("./pages/Sprint3Team3"));
const Artifacts=lazy(()=>import("./pages/Artifacts"));
const FinalReport=lazy(()=>import("./pages/FinalReport"));
const Curriculum=lazy(()=>import("./pages/Curriculum"));
const Scade=lazy(()=>import("./pages/Scade"));
const NotFound=lazy(()=>import("./pages/NotFound"));

class RouteError extends Component<{children:ReactNode},{failed:boolean}>{state={failed:false};static getDerivedStateFromError(){return {failed:true}}render(){return this.state.failed?<div className="container portal-loading" role="alert"><h1>Não foi possível carregar esta página</h1><button className="button button--primary" onClick={()=>window.location.reload()}>Tentar novamente</button></div>:this.props.children}}
export default function App() {
 const {pathname}=useLocation();
  return (
    <div className="app-shell">
      <ScrollToTop />
      <a className="portal-skip" href="#conteudo-principal" onClick={e=>{e.preventDefault();document.getElementById("conteudo-principal")?.focus()}}>Ir para o conteúdo principal</a>
      <Navbar />
      <main id="conteudo-principal" tabIndex={-1}>
        <Breadcrumbs/><SectionIndex/>
        <RouteError key={pathname}><Suspense fallback={<div className="container portal-loading" role="status">Carregando conteúdo…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/disciplina" element={<Discipline />} />
          <Route path="/projeto" element={<Project />} />
          <Route path="/sprint1" element={<Sprint1 />} />
          <Route path="/sprint1/time1" element={<Sprint1Team1 />} />
          <Route path="/sprint1/time2" element={<Sprint1Team2 />} />
          <Route path="/listas" element={<Lists />} />
          <Route path="/list0" element={<List0 />} />
          <Route path="/list1" element={<List1 />} />
          <Route path="/list2" element={<List2 />} />
          <Route path="/list3" element={<List3 />} />
          <Route path="/list4" element={<List4 />} />
          <Route path="/list5" element={<List5 />} />
          <Route path="/list4/time1" element={<Sprint2Team1 />} />
          <Route path="/list4/time2" element={<Sprint2Team2 />} />
          <Route path="/list5/time3" element={<Sprint3Team3 />} />
          <Route path="/artefatos" element={<Artifacts />} />
          <Route path="/relatorio-final" element={<FinalReport />} />
          <Route path="/curriculo" element={<Curriculum />} />
          <Route path="/scade" element={<Scade />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <RouteContext/><ActivityNavigation/>
        </Suspense></RouteError>
      </main>
      <Footer />
    </div>
  );
}
