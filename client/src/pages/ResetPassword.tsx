import { useState } from "react";
import CredentialTitle from "../components/CredentialTitle";
import Form from "../components/Form";
import CredentialLayout from "../layout/CredentialLayout";
import { useNavigate } from "react-router-dom";
import { CircleNotch } from "@phosphor-icons/react";

export default function ResetPassword() {

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const changeHandle = (formKey: string, value: string) => {
    setFormData(prev => ({...prev, [formKey]: value}));
  }

  const resetPass = async (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const emailSess = sessionStorage.getItem('user-login');

    if(formData.password !== formData.confirmPassword) {
      alert("The password and confirmation is different!");
      return;
    }

    if(!emailSess) {
      navigate("/login");
      return;
    }

    const email = JSON.parse(emailSess).email;

    setLoading(true);
    const res = await fetch('/api/reset-password', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: email, password: formData.password})
    });

    setLoading(false);
    if(res.ok) {
      alert('Password Reset!');
      navigate("/login");
    }
  }

  return (
    <CredentialLayout>
      <div className="flex justify-center items-center w-full roboto-regular">
        <section className="w-3/5 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <CredentialTitle>
              <>Reset Password</>
            </CredentialTitle>
            <span className="roboto-light">The password must be different than before</span>
          </div>
          <form className="flex flex-col justify-end gap-2">
            <Form title="Password" type="password" formKey="password" setState={changeHandle}/>
            <Form title="Confirm Password" type="password" formKey="confirmPassword" setState={changeHandle}/>
            <button onClick={resetPass} className="text-white w-full flex justify-center items-center gap-2 bg-primary py-2 rounded-md mt-16" type="submit">
              {loading && <CircleNotch size={20} className="animate-spin"/>}
              Confirm
            </button>
          </form>
        </section>
      </div>
    </CredentialLayout>
  )
}