import React, { useRef} from "react";
import { Link } from "react-router-dom";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import { FirebaseApp } from "../FirebaseContext/Context.jsx";
import { IsUserPresent } from "../Recoil/Recoil.js";
import { useRecoilState } from "recoil";

function SignIn() {
  const FireStore = getFirestore(FirebaseApp);
  const [IsCreated, setIsCreated] = useRecoilState(IsUserPresent);
  

  const SignInEmailRef = useRef();
  const SignInPasswordRef = useRef();

  async function CheckSignIn() {
    const Email = SignInEmailRef.current.value;
    const Password = SignInPasswordRef.current.value;
    const CollectionRef = collection(FireStore, "Users");
    const q = query(
      CollectionRef,
      where("EMAIL", "==", Email),
      where("PASSWORD", "==", Password)
    );

    const snap = await getDocs(q);

    if (Email === "" || Password === "") {
      alert("Please enter Email And Password");
    } 
    else {
      let IsPresent = false;
      snap.forEach((d) => {
        if (d.data().EMAIL === Email && d.data().PASSWORD === Password) {
          setIsCreated(true);
          IsPresent = true ;
          // console.log("IS Present is" + IsPresent);
          
        }
      });

      if (IsPresent == false) {
        alert("Please Enter Correct Password and Email Address");
        // console.log("VALUE IS" + IsCreated);
      }
    }
  }

  function getVal() {
    let mail = SignInEmailRef.current.value;
    let index = mail.indexOf("@");
    let ans = mail.substring(0, index);
    return ans;
  }

  function notSubmit() {
    event.preventDefault();
  }



  function SetDefault(){
    setIsCreated(false);
  }

  return (
    <>
      {IsCreated === true ? (
        <p className="bg-purple-600 w-[100%] p-5 text-center text-white text-2xl font-extrabold">
          HELLO USER {getVal()} {" "}
          <Link onClick={()=>SetDefault()} className="text-white ml-80" to="/">
            Home Page
          </Link>
        </p>
      ) : (
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
                </h1>
                <form
                  onClick={() => notSubmit()}
                  className="space-y-4 md:space-y-6"
                  action="#"
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      ref={SignInEmailRef}
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      ref={SignInPasswordRef}
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        {/* <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                          required=""
                        /> */}
                      </div>
                      {/* <div className="ml-3 text-sm">
                        <label
                          htmlFor="remember"
                          className="text-gray-500 dark:text-gray-300"
                        >
                          Remember me
                        </label>
                      </div> */}
                    </div>
                    {/* <a
                      href="#"
                      className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Forgot password?
                    </a> */}
                  </div>
                  <button
                    onClick={() => CheckSignIn()}
                    className="bg-pink-600 w-[40%] text-white text-center p-2 rounded-2xl"
                  >
                    Sign In
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?{" "}
                    <Link
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      to="/SignUp"
                    >
                      SignUp?
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default SignIn;
