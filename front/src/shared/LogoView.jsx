import logo from '../assets/img/logos_principal/NOAHAcademico3.jpeg';
import '../auth/layout/stylesLogin.css';

export const LogoView = () => {
  return (
    <div className="logo-container">
    <img src={logo} alt="NOAHAcademico3"  className="logo-image"/>
  </div>
  )
}
