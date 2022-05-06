import NavBar from '../../components/NavBar/NavBar';
import { Formulario } from '../../components/Formulario';
import Footer from '../../components/Footer';

const Cadastro = () => {
    return (
        <div>
            <NavBar />

            <Formulario tituloFormulario="Cadastro" />

            <Footer />
        </div>
    );
};

export default Cadastro;
