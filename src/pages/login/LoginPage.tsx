import SecondaryButton from "../../common/components/SecondaryButton";

import logo from "../../assets/images/logo.svg";
import googleLogo from "../../assets/images/google-logo.svg";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../../api/firebase-setup";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC<{ isSignup?: boolean }> = ({ isSignup = false }) => {
  const [signInWithGoogle, user, googleLoading, googleError] =
    useSignInWithGoogle(firebaseAuth);

  const navigate = useNavigate();

  return (
    <>
      <div className="flex min-h-full flex-col justify-items-center py-12 sm:px-6 lg:px-8">
        <img className="mx-auto h-8 w-auto" src={logo} alt="" />

        <div className="flex mt-8 gap-4 sm:mx-auto sm:w-full sm:max-w-md">
          {/* Teachers */}
          <div className="bg-white  py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <h2 className="mb-6 text-center text-2xl font-medium tracking-tighter text-gray-700">
              {isSignup ? "Create a new account" : "Sign in to your account"}
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
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <h2 className="mb-6 text-center text-2xl font-medium tracking-tighter text-gray-700">
              {isSignup ? "Create a new account" : "Sign in to your account"}
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
    </>
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
