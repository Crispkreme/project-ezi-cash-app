import { useState } from "react";
import CredentialTitle from "../components/CredentialTitle";
import Form from "../components/Form";
import CredentialLayout from "../layout/CredentialLayout";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const changeHandle = (formKey: string, value: string) => {
    setFormData(prev => ({...prev, [formKey]: value}));
  }

  const submit = async (e:React.MouseEvent) => {
    e.preventDefault();

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
    sessionStorage.setItem('registration','false');
    sessionStorage.setItem('user-login', JSON.stringify(formData));
    navigate("/verification");
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
          <form className="flex flex-col justify-end  gap-2">
            <Form title="Email Address" formKey="email" setState={changeHandle}/>
            <Form title="Password" type="password" formKey="password" setState={changeHandle}/>
            <Link className="self-center text-primary text-right roboto-light" to="/forgot">Forgot Password?</Link>
            <button onClick={submit} className="text-white bg-primary py-2 rounded-md mt-8">Log In</button>
          </form>
          <span className="roboto-light mt-4">Don't have an account? <Link className="font-bold" to="/signup">Sign up</Link></span>
        </section>
      </div>
    </CredentialLayout>
  )
}