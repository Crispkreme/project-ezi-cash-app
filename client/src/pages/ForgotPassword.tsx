import { useState } from "react";
import CredentialTitle from "../components/CredentialTitle";
import Form from "../components/Form";
import CredentialLayout from "../layout/CredentialLayout";
import { useNavigate } from "react-router-dom";
import { CircleNotch } from "@phosphor-icons/react";

export default function ForgotPassword() {

  const [formData, setFormData] = useState({
    email: '',
  });
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();

  const changeHandle = (formKey: string, value: string) => {
    setFormData(prev => ({...prev, [formKey]: value}));
  }

  const submit = async () => {
    setLoading(true);
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
    sessionStorage.setItem('reset','true');
    sessionStorage.setItem('user-login', JSON.stringify(formData));
    setLoading(false);
    navigate("/verification");
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
            <button disabled={loading} onClick={submit} className="text-white flex items-center gap-2 justify-center bg-primary py-2 rounded-md mt-8">
              {loading && <CircleNotch size={20} className="animate-spin"/>}
              Continue
            </button>
          </form>
        </section>
      </div>
    </CredentialLayout>
  )
}