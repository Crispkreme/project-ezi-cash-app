import AdminLayout from "../../layout/AdminLayout";
import document from '../../assets/document.png';
import Modal from "../../components/Modal";
import { useEffect, useState } from "react";
import file from '../../assets/file.png';
import verified from '../../assets/verified.png';
import declined from '../../assets/declined.png';
import { Link } from "react-router-dom";

interface userDt {
  id: number, 
  role: string, 
  name: string, 
  location: string, 
  verification: verificationDt, documents: documentDt
}

type verificationDt = {
  business_reg_doc: null | boolean,
  gov_id: null | boolean,
  proof_address: null | boolean,
}

type documentDt = {
  business_permit: string,
  government_id: string,
  proof_of_address: string,
}

export default function ApplicationManagement() {

  const [user,setUsers] = useState<Array<userDt>>([]);

  useEffect(() => {
    const fetchData = async() => {
      const res = await fetch('/api/partner-application-list');
      if(res.ok) {
        const dt = await res.json();
        const data = [...dt.data];
        const temp = data.map(d => {
          return {id: d.partner_application_id, role: d.partnership_type, name: d.legal_name, location: String(d.business_zip)+' '+ String(d.business_city)+ ' ' + String(d.business_state), verification: {
            business_reg_doc: d.business_permit_verify === 0 ? null : d.business_permit_verify === 1 ? true : false,
            gov_id: d.government_id_verify === 0 ? null : d.government_id_verify === 1 ? true : false,
            proof_address: d.proof_of_address_verify === 0 ? null : d.proof_of_address_verify === 1 ? true : false,
          }, documents: {
            business_permit: d.business_permit,
            government_id: d.government_id,
            proof_of_address: d.proof_of_address,
          }}
        });

        const declined = temp.filter(el => el.verification.business_reg_doc === false || el.verification.gov_id === false || el.verification.proof_address === false);
        const verified = temp.filter(el => el.verification.business_reg_doc && el.verification.gov_id && el.verification.proof_address );
        const pending = temp.filter(el => !verified.includes(el) && !declined.includes(el));

        setUsers([...pending]);
        setInteractedDocuments({verified: [...verified], declined: [...declined]})
      }
    }

    fetchData();
  },[]);

  

  const [activeWindow, setActiveWindow] = useState(0);
  const [interactedDocuments, setInteractedDocuments] = useState<{verified: Array<userDt>, declined: Array<userDt>}>({
    verified: [],
    declined: [],
  })

  const [state, setState] = useState(false);
  const [interactedModal, setInteractedModal] = useState(false);
  const [active, setActive] = useState(0);
  const toggle = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const name = e.currentTarget.name.split("-")[1];
    setActive(Number(name));
    setState(prev => !prev);
  }

  useEffect(() => {
    setActive(0);
    console.log(active);
    console.log(interactedDocuments.declined[active]);
  },[activeWindow]);

  const verify = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const name = e.currentTarget.name;
    const x = {
      business_reg_doc: 'business_permit_verify',
      gov_id: 'government_id_verify',
      proof_address: 'proof_of_address_verify'
    }
    
    const res = await fetch('/api/verification', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({partner_application_id: user[active].id, column: x[name as keyof typeof x], value: 1})
    });


    const temp = [...user];
    temp[active] = {...temp[active], verification: {...temp[active].verification, [name]: true}};
    setUsers([...temp]);
  }

  const decline = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const name = e.currentTarget.name;

    const x = {
      business_reg_doc: 'business_permit_verify',
      gov_id: 'government_id_verify',
      proof_address: 'proof_of_address_verify'
    }
    
    const res = await fetch('/api/verification', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({partner_application_id: user[active].id, column: x[name as keyof typeof x], value: 2})
    });
    
    const temp = [...user];
    temp[active] = {...temp[active], verification: {...temp[active].verification, [name]: false}};
    setUsers([...temp]);
  }

  const acceptDocuments = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(user[active].verification.business_reg_doc === true && user[active].verification.gov_id === true && user[active].verification.proof_address === true) {
      toggle(e);
    } else {
      acceptModal();
    }
  }

  const [accept, setAccept] = useState(false);
  const acceptModal = () => setAccept(prev => !prev);

  return (
    <AdminLayout>
      <div className="w-full p-8 flex flex-col justify-center items-center h-full overflow-y-scroll text-primary">
        <div className="flex flex-col border p-8 gap-4 border-gray-200 w-full h-full shadow-lg">
          <div className="flex justify-start gap-2 mb-8 text-sm">
            <button onClick={() => {
              setActiveWindow(0);
              setActive(0);
            }} className={`underline ${activeWindow === 0 && 'text-gray-400'}`}>
              All Pending List
            </button>
            <button onClick={() => {
              setActiveWindow(1);
              setActive(0);
            }} className={`underline ml-16 ${activeWindow === 1 && 'text-gray-400'}`}>
              Verified Documents
            </button>
            <button onClick={() => {
              setActiveWindow(2);
              setActive(0);
            }} className={`underline ml-16 ${activeWindow === 2 && 'text-gray-400'}`}>
              Rejected Documents
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <div className="gap-4 text-gray-400 grid grid-cols-4 w-full justify-between">
              <span className="flex justify-center items-center text-sm roboto-regular">Name</span>
              <span className="flex justify-center items-center text-sm roboto-regular">Location</span>
              <span className="flex justify-center items-center text-sm roboto-regular">Role</span>
              <span className="flex justify-center items-center text-sm roboto-regular">Review and Verify Document</span>
            </div>
            {
              (activeWindow === 0 && user.length > 0  )  && user.map((a, idx) => {
                return (
                  <div key={idx} className="gap-4 shadow-lg py-4 grid grid-cols-4 w-full border border-gray-200 justify-between">
                    <span className="flex justify-center items-center text-sm roboto-regular">{a.name}</span>
                    <span className="flex justify-center items-center text-sm roboto-regular">{a.location}</span>
                    <span className="flex justify-center items-center text-sm roboto-regular">{a.role}</span>
                    <span className="flex justify-center items-center gap-2">
                      <button name={'user-' + idx} onClick={(e) => {
                        toggle(e)
                        setInteractedModal(false);
                      }}>
                        <img src={document} alt="" />
                      </button>
                    </span>
                  </div>
                )
              })
            }

            {
              activeWindow === 1 && interactedDocuments.verified.map((a, idx) => {
                return (
                  <div key={idx} className="gap-4 shadow-lg py-4 grid grid-cols-4 w-full border border-gray-200 justify-between">
                    <span className="flex justify-center items-center text-sm roboto-regular">{a.name}</span>
                    <span className="flex justify-center items-center text-sm roboto-regular">{a.location}</span>
                    <span className="flex justify-center items-center text-sm roboto-regular">{a.role}</span>
                    <span className="flex justify-center items-center gap-2">
                      <button name={'user-' + idx} onClick={(e) => {
                        toggle(e);
                        setInteractedModal(true);
                      }}>
                        <img src={document} alt="" />
                      </button>
                    </span>
                  </div>
                )
              })
            }

            {
              activeWindow === 2 && interactedDocuments.declined.map((a, idx) => {
                return (
                  <div key={idx} className="gap-4 shadow-lg py-4 grid grid-cols-4 w-full border border-gray-200 justify-between">
                    <span className="flex justify-center items-center text-sm roboto-regular">{a.name}</span>
                    <span className="flex justify-center items-center text-sm roboto-regular">{a.location}</span>
                    <span className="flex justify-center items-center text-sm roboto-regular">{a.role}</span>
                    <span className="flex justify-center items-center gap-2">
                      <button name={'user-' + idx} onClick={(e) => {
                        toggle(e);
                        setInteractedModal(true);
                      }}>
                        <img src={document} alt="" />
                      </button>
                    </span>
                  </div>
                )
              })
            }
          </div>
        </div>
        <Modal open={state} close={() => {
          setState(false)
        }}>
          <>
          <div className="bg-white p-8 flex flex-col gap-8 w-full">
            <h1 className="roboto-bold text-xl">Document Verification</h1>
            <div className="flex flex-col">
              {
                [
                  { title: "Business Registration Document (Store only)", key: "business_permit", verif: "business_reg_doc"},
                  { title: "Government issued IDs of Authorized Representative", key: "government_id", verif: "gov_id"},
                  { title: "Proof of Address", key: "proof_of_address", verif: "proof_address"}
                ].map( (el, idx) => {
                  return (
                    <section className="border border-gray-400 p-2 flex justify-between">
                      <div className="flex gap-12">
                        <h1 className="roboto-bold text-lg">{idx + 1}</h1>
                        <div className="flex flex-col gap-4">
                          <span className="roboto-bold text-lg">{el.title}</span>
                          <a target="_blank" href={'/api/file/' + (activeWindow === 0 ? user.length > 0 && user[active].documents[el.key as keyof documentDt] : 
                              activeWindow === 1 ? user.length > 0 && interactedDocuments.verified[active].documents[el.key as keyof documentDt] :
                              user.length > 0 && interactedDocuments.declined[active].documents[el.key as keyof documentDt]
                          )}>
                            <div className="flex gap-2 rounded-lg items-center border border-gray-300 py-2 px-4">
                              <img src={file} />
                              <div className="flex flex-col text-xs gap-1">
                                <span>{(activeWindow === 0 ? user.length > 0 && user[active].documents[el.key as keyof documentDt] : 
                                  activeWindow === 1 ? user.length > 0 && interactedDocuments.verified[active].documents[el.key as keyof documentDt] :
                                  user.length > 0 && interactedDocuments.declined[active].documents[el.key as keyof documentDt]
                                )}</span>
                                <span>PDF, 14MB</span>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div>
                        {
                          (activeWindow === 0 && user.length > 0 && user[active].verification[el.verif as keyof verificationDt] === null && interactedModal === false) && (
                            <div className="flex justify-center items-center gap-2 pl-32 h-full">
                              <button onClick={verify} name={el.verif} className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-full">
                                <img src={verified} alt="" />
                                Verify
                              </button>
                              <button onClick={decline} name={el.verif} className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-full">
                                <img src={declined} alt="" />
                                Decline
                              </button>
                            </div>
                          )
                        }
                        {
                          (activeWindow !== 0 && interactedModal === true && activeWindow === 1) ? interactedDocuments.verified[active].verification[el.verif as keyof verificationDt] === true && 
                            <div className="flex justify-center items-center gap-2 pl-32 h-full">
                              <span className="flex items-center gap-2 px-4 py-2 bg-green-200 rounded-full">
                                <img src={verified} alt="" />
                                Verified
                              </span>
                            </div>
                          : (activeWindow === 0 && user.length > 0 && user[active].verification[el.verif as keyof verificationDt] === true) && (
                            <div className="flex justify-center items-center gap-2 pl-32 h-full">
                              <span className="flex items-center gap-2 px-4 py-2 bg-green-200 rounded-full">
                                <img src={verified} alt="" />
                                Verified
                              </span>
                            </div>
                          )
                        }

                        {
                          (activeWindow !== 0 && interactedModal === true && activeWindow === 2) ? interactedDocuments.declined[active].verification[el.verif as keyof verificationDt] === false && 
                            <div className="flex justify-center items-center gap-2 pl-32 h-full">
                              <span className="flex items-center gap-2 px-4 py-2 bg-red-200 rounded-full">
                                <img src={declined} alt="" />
                                Declined
                              </span>
                            </div>
                          : (activeWindow === 0 && user.length > 0 && user[active].verification[el.verif as keyof verificationDt] === false) && (
                            <div className="flex justify-center items-center gap-2 pl-32 h-full">
                              <span className="flex items-center gap-2 px-4 py-2 bg-red-200 rounded-full">
                                <img src={declined} alt="" />
                                Declined
                              </span>
                            </div>
                          )
                        }
                      </div>
                    </section>
                  )
                })
              }
              
              {
                activeWindow === 0 && (
                  <div className="w-full flex justify-end gap-4 mt-8">
                    <button name={`user-` + active} onClick={acceptDocuments} className="border border-gray-400 py-1 px-6 rounded-full flex justify-center items-center shadow-lg">Accept</button>
                    <button name={`user-` + active} onClick={toggle} className="border border-gray-400 py-1 px-6 rounded-full flex justify-center items-center shadow-lg">Decline</button>
                  </div>
                )
              }
            </div>
          </div>
          {
            accept && (
              <Modal open={accept} close={() => {
                setAccept(false)
              }}>
                <div className="bg-white p-8 w-1/2 flex flex-col gap-4">
                  <span className="roboto-medium">There are documents that are declined. We cannot accept the partner’s application. All documents should be reviewed and verified.</span>
                  <button onClick={acceptModal} className="bg-primary text-white py-2 rounded-lg">
                      Ok
                  </button>
                </div>
              </Modal>
            )
          }
          </>
        </Modal>
      </div>
    </AdminLayout>
  )
}