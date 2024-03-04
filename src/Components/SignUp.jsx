import React, { useRef, useEffect } from "react";
import { SingleAtom, AccCreated } from "../Recoil/Recoil.js";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  UseFirebaseContext,
  FirebaseApp,
} from "../FirebaseContext/Context.jsx";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getFirestore, addDoc, collection } from "firebase/firestore";

function SignUp() {
  const FireStore = getFirestore(FirebaseApp);
  const navigate = useNavigate();
  const [BigAtom, setBigAtom] = useRecoilState(SingleAtom);
  const EmailRef = useRef();
  const PassRef = useRef();
  const ContextObj = UseFirebaseContext();
  const IsCreated = useRecoilValue(AccCreated);

  function handleOnClick() {
    const emailval = EmailRef.current.value;
    const passVal = PassRef.current.value;

    if (passVal.length < 6) {
      alert("Password length must be at least 6 characters");
    }

    setBigAtom({
      email: emailval,
      password: passVal,
    });
    ContextObj.SignUpUser(BigAtom.email, BigAtom.password);
    // console.log(IsCreated);
  }

  useEffect(() => {
    addDoc(collection(FireStore, "Users"), {
      EMAIL: BigAtom.email,
      PASSWORD: BigAtom.password,
    });
  }, [IsCreated]);

  function notSubmit() {
    event.preventDefault();
  }

  return (
    <div > 
      <form onSubmit={() => notSubmit()} action="#">
        <div className="container shadow-pink-300 shadow-lg  flex flex-col gap-5 rounded-xl bg-gray-500 mx-auto  my-28 p-10 w-[30%]">
          <h2 className="text-center text-white text-2xl">SignUp With Email</h2>
          <input
            type="Email"
            required
            ref={EmailRef}
            className="bg-white text-black font-bold p-2"
            placeholder="Enter Your Email"
          />
          <input
            type="text"
            required
            ref={PassRef}
            className="bg-white text-black font-bold p-2"
            placeholder="Enter Your Password"
          />
          <button
            className="text-black bg-white  font-bold
            font-bold p-2"
            onClick={() => handleOnClick()}
          >
            SignUp
          </button>
          <p>
            Already Have An Account ?{" "}
            <Link to="/SignIn" className="text-white">
              SignIn?
            </Link>
          </p>
          {IsCreated && navigate("/SignIn")}
        </div>
      </form>
    </div>
  );
}

export default SignUp;
