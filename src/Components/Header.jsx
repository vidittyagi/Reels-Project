import React ,{useContext} from 'react';
import {Button,makeStyles} from '@material-ui/core';
import {Link} from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import logo from "../logo.png";




const Header =  (props) => {
    const {currentUser}=useContext(AuthContext);
    const { signOut } = useContext(AuthContext);
    
    const handleLogout = async () => {
      try {
        await signOut();
        props.history.push("/login");
      } catch (err) {
        console.log(err);
      }
    };

    const useStyles = makeStyles({

     imgheader:
     {
        height:"12vh",
        marginBottom:"1px",
        marginTop:"1px"
     },
     headerdiv:
     {
       padding:"7px",
        display:"flex",
        justifyContent:"space-between",
       
     },
     loginbutton:
     {
        height:"6vh",
        marginTop:"2vh"
     }
     
    })
    let classes = useStyles();
    


 
   
    return (
        currentUser ? 
            <div className={classes.headerdiv}>
            <Link to="/">
            <img src={logo} className={classes.imgheader}/>
            </Link>
            <Button  variant="contained" color="primary" size="small"  className={classes.loginbutton} onClick={handleLogout}>
            Log Out
         </Button>
         </div> :
          <div className={classes.headerdiv}>
          <Link to="/">
          <img src={logo} className={classes.imgheader}/>
            </Link>
          <Button  variant="contained" color="primary" size="small"  className={classes.loginbutton}>
                  <Link style={{color:"white"}}to="/login">Log In</Link> 
         </Button>
        </div>

         

        
      
   );
}
 
export default Header;
