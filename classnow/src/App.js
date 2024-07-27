import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PaginaInicio from './Paginas/PaginaInicio/PaginaInicio';
import PaginaLogin from './Paginas/PaginaLogin/PaginaLogin';
import PaginaCadastroAluno from './Paginas/PaginaCadastroAluno/PaginaCadastroAluno';
import PaginaCadastroProfessor from './Paginas/PaginaCadastroProfessor/PaginaCadastroProfessor';
import PaginaAluno from './Paginas/PaginaAluno/PaginaAluno';
import PaginaProfessor from './Paginas/PaginaProfessor/PaginaProfessor';
import { AlertProvider } from'./context/Alert/AlertProvider'

function App() {
  return (
    <AlertProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PaginaInicio />} />
          <Route path="/paginaLogin" element={<PaginaLogin />} />
          <Route path="/paginaCadastroAluno" element={<PaginaCadastroAluno />} />
          <Route path="/paginaCadastroProfessor" element={<PaginaCadastroProfessor />} />
          <Route path="/paginaAluno" element={<PaginaAluno />} />
          <Route path="/paginaProfessor" element={<PaginaProfessor />} />
        </Routes>
      </BrowserRouter>
    </AlertProvider>
  );
}

export default App;
