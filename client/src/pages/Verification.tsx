import { useEffect, useState } from "react";
import CredentialTitle from "../components/CredentialTitle";
import CredentialLayout from "../layout/CredentialLayout";
import { Link, redirect, useNavigate } from "react-router-dom";

const type = {
  'Admin': 'admin',
  'Partner Management': 'partnermanagement',
  'Finance': 'finance'
}

export default function Verification() {
  const navigate = useNavigate();
  
  useEffect(() => {
    if(!sessionStorage.getItem('verification-code')) navigate("/login");
  },[]);

  const [pin, setPin] = useState<Array<string>>(['','','','']);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  const changeHandle = (e:React.ChangeEvent<HTMLInputElement>) => {
    const t = e.currentTarget;
    const name = t.name;
    const idx = name.split("-")[1];

    const temp = [...pin];
    temp[Number(idx)] = t.value;
    setPin(temp);
  }

  const keyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
    const t = e.currentTarget;
    const name = t.name;
    const idx = Number(name.split("-")[1]);

    if(e.key !== "Backspace" && idx < 3) {
      setTimeout(() => {
        document.getElementsByName(`slot-${idx + 1}`)[0].focus();
      },1);
    } else if(e.key === "Backspace" && idx > 0) {
      setTimeout(() => {
        document.getElementsByName(`slot-${idx - 1}`)[0].focus();
      },1);
    }
  }

  const verify = async (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const code = sessionStorage.getItem('verification-code');
    const registration = sessionStorage.getItem('registration');
    const p = pin.join("");
    if(code === p && registration === 'true') {
      const data = sessionStorage.getItem('user-signup');

      const res = await fetch("/api/web-signup", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: data
      });

      if(!res.ok) {
        setError('There was an error!');
      }

      const body = await res.json();

      sessionStorage.removeItem('registration');
      sessionStorage.removeItem('verification-code');
      sessionStorage.removeItem('user-login');
      sessionStorage.removeItem('user-signup');

      

      if(data) sessionStorage.setItem('session', JSON.stringify({name: JSON.parse(data).email}));
      const t = body.data.admin_type === 'Admin' ? 'admin' : body.data.admin_type === 'Partner Management' ? 'partnermanagement' : 'finance';

      return navigate(`/${t}/dashboard`);
    } else {
      const userLogin = sessionStorage.getItem('user-login');
      const dt = JSON.parse(String(userLogin));

      const res = await fetch("/api/web-login", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dt)
      });
  
      if(!res.ok) return;
  
      const b = await res.json();
      sessionStorage.removeItem('registration');
      sessionStorage.removeItem('verification-code');
      sessionStorage.removeItem('user-login');
      sessionStorage.removeItem('user-signup');

      sessionStorage.setItem('session', JSON.stringify({...b.data }));
      setTimeout(() => {
        const t = b.data.admin_type === 'Admin' ? 'admin' : b.data.admin_type === 'Partner Management' ? 'partnermanagement' : 'finance';
        navigate(`/${t}/dashboard`);
      },2000);
      
    }
  }

  const cancel = () => navigate("/login");

  useEffect(() => {
    const reg = sessionStorage.getItem('user-signup') ? sessionStorage.getItem('user-signup') : sessionStorage.getItem('user-login');
    const dt = JSON.parse(String(reg));
    setEmail(dt.email);
  },[]);

  return (
    <CredentialLayout>
      <div className="flex justify-center items-center w-full roboto-regular">
        <section className="w-3/5 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <CredentialTitle>
              <>Enter Verification Code</>
            </CredentialTitle>
            <span className="roboto-light">We've send a code to {email}</span>
          </div>
          <form className="flex flex-col justify-center items-center gap-2">
            <div className="flex gap-2 justify-center py-12">
              <input onKeyDown={keyDown} value={pin[0]} onChange={changeHandle} className="inp border border-gray-400 h-16 w-16 p-2 text-center" maxLength={1} type="text" name="slot-0" id="" />
              <input onKeyDown={keyDown} value={pin[1]} onChange={changeHandle} className="inp border border-gray-400 h-16 w-16 p-2 text-center" maxLength={1} type="text" name="slot-1" id="" />
              <input onKeyDown={keyDown} value={pin[2]} onChange={changeHandle} className="inp border border-gray-400 h-16 w-16 p-2 text-center" maxLength={1} type="text" name="slot-2" id="" />
              <input onKeyDown={keyDown} value={pin[3]} onChange={changeHandle} className="inp border border-gray-400 h-16 w-16 p-2 text-center" maxLength={1} type="text" name="slot-3" id="" />
            </div>
            <span className="roboto-light mt-4">Didn't get the code? <Link className="font-bold" to="/signup">Click to resend</Link></span>
            <button onClick={verify} className="text-white w-full bg-primary py-2 rounded-md mt-16" type="submit">Verify Code</button>
            <button onClick={cancel} className="text-primary w-full bg-gray-200 border border-gray-400 shadow-md py-2 rounded-md mt-2">Cancel</button>
          </form>
          
        </section>
      </div>
    </CredentialLayout>
  )
}