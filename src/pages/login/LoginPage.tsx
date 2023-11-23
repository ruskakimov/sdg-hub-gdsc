import SecondaryButton from "../../common/components/SecondaryButton";

import logo from "../../assets/images/logo.svg";
import googleLogo from "../../assets/images/google-logo.svg";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../../api/firebase-setup";
import { useLocation, useNavigate } from "react-router-dom";
import "./LoginPage.css"


const LoginPage: React.FC<{ isSignup?: boolean }> = ({ isSignup = false }) => {
  const [signInWithGoogle, user, googleLoading, googleError] =
    useSignInWithGoogle(firebaseAuth);

  const navigate = useNavigate();

  return (

      <div className="outerDiv">

        <p className="heading">SGD_HUB</p>

        <div className="innerDiv">

          {/* Teachers */}
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 teachers">
            <h2 className="mb-6 text-center text-2xl font-medium tracking-tighter text-gray-700">
              {"Professors"}
            </h2>

            {googleError && (
              <p className="mb-4 text-sm text-red-700">{googleError.message}</p>
            )}

            <SocialButton
              icon={googleLogo}
              label="Continue with Google"
              onClick={() =>
                signInWithGoogle().then(() => {
                  localStorage.setItem("role", "professor");
                  navigate("/professor", { replace: true });
                })
              }
            />
          </div>

          {/* Student */}    
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 student">
            <h2 className="mb-6 text-center text-2xl font-medium tracking-tighter text-gray-700">
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
    <SecondaryButton className="w-full text-gray-500" onClick={onClick}>
      <img className="h-5 w-5" src={icon} />
      {label !== undefined && <span className="ml-2">{label}</span>}
    </SecondaryButton>
  );
};

export default LoginPage;
