import SecondaryButton from "../../common/components/SecondaryButton";

import googleLogo from "../../assets/images/google-logo.svg";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../../api/firebase-setup";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"
import logo from "../../assets/images/logo.svg";


const LoginPage: React.FC<{ isSignup?: boolean }> = ({ isSignup = false }) => {
  const [signInWithGoogle, user, googleLoading, googleError] =
    useSignInWithGoogle(firebaseAuth);

  const navigate = useNavigate();

  return (

      <div className="outerDiv">
        <img
                      className="hidden h-16 w-auto lg:block"
                      src={logo}
                      alt=""
                    />

        <div className="innerDiv">

          {/* Teachers */}
          <div className="bg-stone-800 py-8 px-4 shadow sm:px-10 teachers">
            <h2 className="mb-4 text-center text-2xl font-medium tracking-tighter text-gray-200">
              {"Professors"}
            </h2>

            {googleError && (
              <p className="mb-4 text-sm text-red-700">{googleError.message}</p>
            )}

            <SocialButton
              icon={googleLogo}
              label="Continue with Google"
              onClick={() =>
                signInWithGoogle().then((u) => {
                  console.log(u)
                  localStorage.setItem("role", "professor");
                  navigate("/professor", { replace: true });
                })
              }
            />
          </div>

          {/* Student */}    
          <div className="bg-stone-800 py-8 px-4 shadow sm:px-10 student">
            <h2 className="mb-4 text-center text-2xl font-medium tracking-tighter text-gray-200">
              {"Students"}
            </h2>

            {googleError && (
              <p className="mb-4 text-sm text-red-700">{googleError.message}</p>
            )}

            <SocialButton
              icon={googleLogo}
              label="Continue with Google"
              onClick={() =>
                signInWithGoogle().then(() => {
                  
                  localStorage.setItem("role", "student");
                  navigate("/student", { replace: true });
                })
              }
            />
          </div>
        </div>
      </div>
  
  );
};

const SocialButton: React.FC<{
  icon: string;
  label?: string;
  onClick: () => void;
}> = ({ icon, label, onClick }) => {
  return (
    <SecondaryButton className="w-full transition bg-stone-600 text-gray-200 border-none hover:bg-stone-700 " onClick={onClick}>
      <img className="h-5 w-5" src={icon} />
      {label !== undefined && <span className="ml-2">{label}</span>}
    </SecondaryButton>
  );
};

export default LoginPage;
