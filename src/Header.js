import './Header.css';
import Search from './my_componets/Search';
import Button from '@material-ui/core/Button';
import Logout from "@material-ui/icons/ExitToApp";


function Header(props) {

  var logout = props.logout;

  return (
    <div className="App">
      <header className="App-header">
        <section className="brand">
          <span className="brand_name">Password Manager</span>
        </section>
        <section className="search">
          <Search />
        </section>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Logout />}
          className="logout_btn mt-4"
          children="Log Out"
          onClick={logout}
        />
      </header>
    </div>
  );
}

export default Header;
