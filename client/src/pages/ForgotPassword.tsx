import { useState } from "react";
import CredentialTitle from "../components/CredentialTitle";
import Form from "../components/Form";
import CredentialLayout from "../layout/CredentialLayout";
import { Link } from "react-router-dom";

export default function ForgotPassword() {

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
              <>Forgot Password?</>
            </CredentialTitle>
            <span className="roboto-light">Enter email account to reset password</span>
          </div>
          <form className="flex flex-col justify-end gap-2">
            <Form type="email" title="Email Address" formKey="email" setState={changeHandle}/>
            <input className="text-white bg-primary py-2 rounded-md mt-16" type="submit" value="Continue" />
          </form>
        </section>
      </div>
    </CredentialLayout>
  )
}