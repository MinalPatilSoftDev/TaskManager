//src/components/NavBar.jsx;

"use client"
 import UserContext from "@/context/userContext";
import { logout } from "@/services/userService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext ,useState,useEffect} from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useUser } from '@/hooks/userUser';


// const NavBar = () => {
//    const context = useContext(UserContext);
//   const router = useRouter();

//    // List of routes where navigation links should be shown
//   const showNavigation = [
//     '/',
//     '/add-task',
//     '/show-tasks',
//     '/logout'
//   ];

//  async function doLogout(){
//    try{
//       const result= await logout();
//       console.log(result);
//        context.setUser(); 
//       router.push("/");
//    }catch(error){
//       console.log(error);
//       //toast.error("Logout Error");
//    }
//  }

//   return (
//     <nav className="bg-rose-800 h-16 py-2 px-36 flex justify-between items-center">
//       <div className="">
//         <h1 className="text-2xl font-semibold text-white">
//           TaskToDo
//         </h1>
//       </div>
//       <div>
//         <ul className="flex space-x-3  text-white text-lg">
//            {showNavigation.includes(router.pathname)&&(
//             <> 
//                 <li>
//                   <Link href={"/"} className=" hover:text-yellow-400">
//                     Home
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href={"/add-task"} className="hover:text-yellow-400 ">
//                     Add Task
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href={"/show-tasks"} className=" hover:text-yellow-400">
//                     Show Tasks
//                   </Link>
//                 </li>
//              </>
//           )} 
//         </ul>
//       </div>

//       <div>
//         <ul className="flex space-x-3 text-white text-lg">
//         {showNavigation.includes(router.pathname)&&(<>
//               <li>
//                 <Link href={"#!"}>{context.user.name}</Link>
//               </li>
//               <li>
//                 <button onClick={doLogout}>Logout</button>
//               </li>
//         </>)}
          

//         {!showNavigation.includes(router.pathname) && (
//           <>
//           {/* <li>
//                   <Link href={"/"} className=" hover:text-yellow-400">
//                     Home
//                   </Link>
//                 </li> */}
//               <li>
//                 <Link href="/login" className=" hover:text-yellow-400">Login</Link>
//               </li>
//               {/* <li>
//                 <Link href="/signup" className=" hover:text-yellow-400">Signup</Link>
//               </li> */}
//           </>
//         )}
//         </ul>
//       </div>
//     </nav>
//   )
// }

const NavBar = () => {
 
  const context = useContext(UserContext);
  const {user}=context
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileURL, setProfileURL] = useState('/profile-default-icon.png');
  const { userData, isLoading } = useUser();

  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Check if the user is authenticated
    if (context.user && context.user.name) {
      setIsAuthenticated(true);   
    } else {
      setIsAuthenticated(false);
    }
  }, [context.user]);

  useEffect(() => {
    if (userData && userData.profileURL) {
         // setProfileURL(user.profileURL || '/profile-default-icon.png');
          setProfileURL(userData.profileURL);
    } else {
          setProfileURL('/profile-default-icon.png');
    }
  }, [userData]);

  useEffect(() => {
    if (user && user.profileURL) {
         // setProfileURL(user.profileURL || '/profile-default-icon.png');
          setProfileURL(user.profileURL);
    } else {
          setProfileURL('/profile-default-icon.png');
    }
  }, [user]);


  // if (!user) {
  //       return <></>; // or any loading indicator
  // }
    
     // console.log("user data in nav page", user.profileURL);

  async function doLogout() {
    try {
      const result = await logout();
      console.log(result);
      context.setUser(null); 
      setIsAuthenticated(false);
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Logout Error");
    }
  }

  return (
    <nav className="bg-blush-pink  h-16 py-2 px-36 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-semibold text-white">
          TaskToDo
        </h1>
      </div>
      <div>
     
        <ul className="flex space-x-3 text-white text-lg">
        
          {isAuthenticated && (
            <> 
              <li>
                <Link href={"/user_profile"} className="hover:text-yellow-400">
                Dashboard
                </Link>
              </li>
              <li>
                <Link href={"/add-task"} className="hover:text-yellow-400">
                  Add_Task
                </Link>
              </li>
              <li>
                <Link href={"/show-tasks"} className="hover:text-yellow-400">
                  Show_Tasks
                </Link>
              </li>
              
            </>
          )}
        </ul>
      </div>
      <div>

        <ul className="flex space-x-3 text-white text-lg items-center ">
          {isAuthenticated ? (
            <>
              {/* <li>
                <span>{context.user.name}</span>
              </li> */}
               {/* <img
                      src={user.profilePicture || '/profile-default-icon.png'}
                      alt="Profile Pic"
                      className="h-8 w-8 rounded-full text-white"
                /> */}
                     <Link href="/settings">
                        <img key={profileURL} src={profileURL} alt="Profile" style={{ borderRadius: '50%', width: '40px', height: '40px' }} />
                    </Link>


              <li className="cursor-pointer relative hover:text-yellow-400" onClick={toggleMenu}>
                <div className="flex items-center gap-2">
                    
                    <span>{context.user.name}</span>
                </div>
                    {isMenuOpen && (
                      <div className="dropdown-menu">
                        <ul>
                          <li className="text-black bg-rose-200 flex items-center">
                          <FontAwesomeIcon icon={faCog} /> {/* Settings icon */}
                            <Link href="/settings" className="pl-2">Settings</Link>
                          </li>
                          {/* Add other menu items */}
                        </ul>
                      </div>
                    )}
              </li>
              <li>
                <button onClick={doLogout} className="hover:text-yellow-400">Logout</button>
              </li>
            </>
          ) : (
            <>
                <li>
                  <Link href={"/"} className="hover:text-yellow-400">
                    Home
                  </Link>
                </li>
              <li>
                <Link href="/login" className="hover:text-yellow-400">
                  Login
                </Link>
              </li>
            </>
              
          )}
        </ul>
      </div>
    </nav>
  );
};


export default NavBar
