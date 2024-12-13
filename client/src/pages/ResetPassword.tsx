import { useState } from "react";
import CredentialTitle from "../components/CredentialTitle";
import Form from "../components/Form";
import CredentialLayout from "../layout/CredentialLayout";
import { Link } from "react-router-dom";

export default function ResetPassword() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const changeHandle = (formKey: string, value: string) => {
    setFormData(prev => ({...prev, [formKey]: value}));
  }

  return (
    <CredentialLayout>
      <div className="flex justify-center items-center w-full roboto-regular">
        <section className="w-3/5 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <CredentialTitle>
              <>Log In</>
            </CredentialTitle>
            <span className="roboto-light">Welcome back! Please login to your account</span>
          </div>
          <form className="flex flex-col justify-end gap-2">
            <Form title="Email Address" formKey="email" setState={changeHandle}/>
            <Form title="Password" formKey="password" setState={changeHandle}/>
            <Link className="text-primary text-right w-full roboto-light" to="/">Forgot Password?</Link>
            <input className="text-white bg-primary py-2 rounded-md mt-8" type="submit" value="Log In" />
          </form>
          <span className="roboto-light mt-4">Don't have an account? <Link className="font-bold" to="/signup">Sign up</Link></span>
        </section>
      </div>
    </CredentialLayout>
  )
}