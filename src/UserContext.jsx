// import { createContext, useContext, useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "./firebase"; // make sure this path is correct
// import { getUserInfo } from "./firestore"; // assumes function gets name by email

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     const saved = localStorage.getItem("aidforceUser");
//     return saved ? JSON.parse(saved) : null;
//   });

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
//       if (firebaseUser) {
//         const email = firebaseUser.email;
//         const info = await getUserInfo(email);
//         if (info.success) {
//           const userObj = { email, name: info.data.name };
//           setUser(userObj);
//           localStorage.setItem("aidforceUser", JSON.stringify(userObj));
//         }
//       } else {
//         setUser(null);
//         localStorage.removeItem("aidforceUser");
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => useContext(UserContext);

