import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useGetApiAuthConfirmEmailQuery, useLazyGetApiAuthConfirmEmailQuery } from "../features/auth/authApi";


const ConfirmEmailPage = () => {
  const [responseMessage , setResponseMessage]=useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId");
  const token = queryParams.get("token");

  const [confirmEmail,{isLoading,error}] = useLazyGetApiAuthConfirmEmailQuery();

  useEffect(() => {
    if (userId && token) {
     const res= confirmEmail({userId,token}).unwrap();
    setResponseMessage(res);
    }
    
  }, [userId, token, ]);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md text-center max-w-md">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Email Confirmation</h2>

        
        {responseMessage
  ? <p className="text-green-600">Your email has been confirmed successfully!</p>
  : error && <p className="text-red-500">Failed to confirm email. Please try again.</p>
}

        <Link
          to="/login"
          className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Return to Login
        </Link>
      </div>
    </div>
  );
};

export default ConfirmEmailPage;