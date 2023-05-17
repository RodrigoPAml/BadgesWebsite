import ModalManager from "../components/infra/modal/modalManager";
import Snackbar from "../components/snackbar"
import TopBar from "../components/topbar"
import Footer from "../components/footer"
import { SnackbarProvider } from 'notistack'
import { useRouter } from 'next/router';
import "./style.css";

const MyApp = ({ Component, pageProps }) => {

  const { asPath } = useRouter();

  let authorize = true;
  let removeLogin = false;
  let redirect = false;

  if (asPath === '/' || asPath === '/login' || asPath === '/signup') {
    removeLogin = true
    authorize = false
    redirect = true

    if(asPath == '/login' || asPath === '/') {
      removeLogin = false
    }
  } else if (asPath === '/admin' ||
    asPath === '/user' ||
    asPath === '/users' ||
    asPath === '/users-badges' ||
    asPath === '/quizes' ||
    asPath === '/questions' ||
    asPath === '/courses' ||
    asPath === '/competences' ||
    asPath === '/badges' ||
    asPath === '/meus-badges' ||
    asPath.startsWith('/adquirir-badge')) {
    removeLogin = false
    authorize = true
    redirect = true
  } else if (asPath.startsWith('/perfil') || asPath.startsWith('/certificado')) {
    removeLogin = false
    authorize = true
    redirect = false
  }

  return <>
    <SnackbarProvider>
      <Snackbar></Snackbar>
    </SnackbarProvider>
    <ModalManager></ModalManager>
    <TopBar removeLogin={removeLogin} authorize={authorize} redirect={redirect}></TopBar>
    <Component {...pageProps} />
    <Footer></Footer>
  </>
}
export default MyApp