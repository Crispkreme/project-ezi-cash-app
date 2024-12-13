import { useState } from "react";
import CredentialTitle from "../components/CredentialTitle";
import Form from "../components/Form";
import CredentialLayout from "../layout/CredentialLayout";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const changeHandle = (formKey: string, value: string) => {
    setFormData(prev => ({...prev, [formKey]: value}));
  }

  const signUp = async (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    sessionStorage.setItem('user-signup', JSON.stringify(formData));
    const res = await fetch("/api/web-verification-code", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: formData.email})
    });
    if(!res.ok) return;
    const b = await res.json();

    sessionStorage.setItem('verification-code',b.data);
    sessionStorage.setItem('registration','true');
    navigate("/verification");
  }

  return (
    <CredentialLayout>
      <div className="flex justify-center items-center w-full roboto-regular">
        <section className="w-3/5 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <CredentialTitle>
              <>Sign Up</>
            </CredentialTitle>
            <span className="roboto-light">Create a new account</span>
          </div>
          <form className="flex flex-col justify-end gap-2">
            <Form title="Name" formKey="name" setState={changeHandle}/>
            <Form title="Email Address" type="email" formKey="email" setState={changeHandle}/>
            <Form title="Create a password" type="password" formKey="password" setState={changeHandle}/>
            <button onClick={signUp} className="text-white bg-primary py-2 rounded-md mt-8">Sign Up</button>
          </form>
          <span className="roboto-light mt-4">Already have an account? <Link className="font-bold" to="/login">Log in</Link></span>
        </section>
      </div>
    </CredentialLayout>
  )
}