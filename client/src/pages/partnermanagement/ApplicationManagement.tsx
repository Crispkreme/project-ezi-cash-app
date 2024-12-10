import AdminLayout from "../../layout/AdminLayout";
import document from '../../assets/document.png';
import Modal from "../../components/Modal";
import { useEffect, useState } from "react";
import file from '../../assets/file.png';
import verified from '../../assets/verified.png';
import declined from '../../assets/declined.png';


export default function ApplicationManagement() {

  const [user,setUsers] = useState([
    {id: 1, role: 'Individual', name: 'Nicole Ayessa Alcover', location: '79 Cabreros St Cebu City, Cebu', verification: {
      business_reg_doc: null,
      gov_id: null,
      proof_address: null
    }},
    {id: 2, role: 'Individual', name: 'Jeanette Alcover', location: 'Carcar City, Cebu', verification: {
      business_reg_doc: null,
      gov_id: null,
      proof_address: null
    }},
    {id: 3, role: 'Store', name: 'Shynne Canada', location: 'Sambag 1, Urgello Cebu City', verification: {
      business_reg_doc: null,
      gov_id: null,
      proof_address: null
    }},
  ]);

  const [activeWindow, setActiveWindow] = useState(0);

  const [interactedDocuments, setInteractedDocuments] = useState({
    verified: [
      {id: 1, role: 'Individual', name: 'Nicole Ayessa Alcover', location: '79 Cabreros St Cebu City, Cebu', verification: {
        business_reg_doc: true,
        gov_id: true,
        proof_address: true
      }},
    ],
    declined: [
      {id: 1, role: 'Individual', name: 'Nicole Ayessa Alcover', location: '79 Cabreros St Cebu City, Cebu', verification: {
        business_reg_doc: false,
        gov_id: false,
        proof_address: false
      }},
      {id: 2, role: 'Individual', name: 'Jeanette Alcover', location: 'Carcar City, Cebu', verification: {
        business_reg_doc: false,
        gov_id: false,
        proof_address: false
      }},
    ]
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
    console.log(state);
  },[state]);

  const verify = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const name = e.currentTarget.name;
    
    const temp = [...user];
    temp[active] = {...temp[active], verification: {...temp[active].verification, [name]: true}};
    setUsers([...temp]);
  }

  const decline = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const name = e.currentTarget.name;
    
    const temp = [...user];
    temp[active] = {...temp[active], verification: {...temp[active].verification, [name]: false}};
    setUsers([...temp]);
  }

  const acceptDocuments = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(user[active]);
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
            <button onClick={() => setActiveWindow(0)} className={`underline ${activeWindow === 0 && 'text-gray-400'}`}>
              All Pending List
            </button>
            <button onClick={() => setActiveWindow(1)} className={`underline ml-16 ${activeWindow === 1 && 'text-gray-400'}`}>
              Verified Documents
            </button>
            <button onClick={() => setActiveWindow(2)} className={`underline ml-16 ${activeWindow === 2 && 'text-gray-400'}`}>
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
              activeWindow === 0 && user.map((a, idx) => {
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
              <section className="border border-gray-400 p-2 flex justify-between">
                <div className="flex gap-12">
                  <h1 className="roboto-bold text-lg">1</h1>
                  <div className="flex flex-col gap-4">
                    <span className="roboto-bold text-lg">Business Registration Document (Store only)</span>
                    <div className="flex gap-2 rounded-lg items-center border border-gray-300 py-2 px-4">
                      <img src={file} />
                      <div className="flex flex-col text-xs gap-1">
                        <span>business_registration</span>
                        <span>PDF, 14MB</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  {
                    user[active].verification.business_reg_doc === null && interactedModal === false && (
                      <div className="flex justify-center items-center gap-2 pl-32 h-full">
                        <button onClick={verify} name="business_reg_doc" className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-full">
                          <img src={verified} alt="" />
                          Verify
                        </button>
                        <button onClick={decline} name="business_reg_doc" className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-full">
                          <img src={declined} alt="" />
                          Decline
                        </button>
                      </div>
                    )
                  }
                  {
                    (user[active].verification.business_reg_doc === true || (interactedModal === true && activeWindow === 1 && interactedDocuments.verified[active].verification.business_reg_doc === true)) && (
                      <div className="flex justify-center items-center gap-2 pl-32 h-full">
                        <span className="flex items-center gap-2 px-4 py-2 bg-green-200 rounded-full">
                          <img src={verified} alt="" />
                          Verified
                        </span>
                      </div>
                    )
                  }

                  {
                    (user[active].verification.business_reg_doc === false || (interactedModal === true && activeWindow === 2 && interactedDocuments.declined[active].verification.business_reg_doc === false)) && (
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

              <section className="border border-gray-400 p-2 flex justify-between">
                <div className="flex gap-12">
                  <h1 className="roboto-bold text-lg">1</h1>
                  <div className="flex flex-col gap-4">
                    <span className="roboto-bold text-lg">Government issued IDs of Authorized Representative</span>
                    <div className="flex gap-2 rounded-lg items-center border border-gray-300 py-2 px-4">
                      <img src={file} />
                      <div className="flex flex-col text-xs gap-1">
                        <span>government_id</span>
                        <span>PDF, 5MB</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  {
                    user[active].verification.gov_id === null && interactedModal === false && (
                      <div className="flex justify-center items-center gap-2 pl-32 h-full">
                        <button onClick={verify} name="gov_id" className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-full">
                          <img src={verified} alt="" />
                          Verify
                        </button>
                        <button onClick={decline} name="gov_id" className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-full">
                          <img src={declined} alt="" />
                          Decline
                        </button>
                      </div>
                    )
                  }
                  {
                    (user[active].verification.gov_id === true || (interactedModal === true && activeWindow === 1 && interactedDocuments.verified[active].verification.gov_id === true)) && (
                      <div className="flex justify-center items-center gap-2 pl-32 h-full">
                        <span className="flex items-center gap-2 px-4 py-2 bg-green-200 rounded-full">
                          <img src={verified} alt="" />
                          Verified
                        </span>
                      </div>
                    )
                  }

                  {
                    (user[active].verification.gov_id === false || (interactedModal === true && activeWindow === 2 && interactedDocuments.declined[active].verification.gov_id === false)) && (
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

              <section className="border border-gray-400 p-2 flex justify-between">
                <div className="flex gap-12">
                  <h1 className="roboto-bold text-lg">1</h1>
                  <div className="flex flex-col gap-4">
                    <span className="roboto-bold text-lg">Proof of Address</span>
                    <div className="flex gap-2 rounded-lg items-center border border-gray-300 py-2 px-4">
                      <img src={file} />
                      <div className="flex flex-col text-xs gap-1">
                        <span>proof_address</span>
                        <span>PDF, 19MB</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  {
                    user[active].verification.proof_address === null && interactedModal === false && (
                      <div className="flex justify-center items-center gap-2 pl-32 h-full">
                        <button onClick={verify} name="proof_address" className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-full">
                          <img src={verified} alt="" />
                          Verify
                        </button>
                        <button onClick={decline} name="proof_address" className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-full">
                          <img src={declined} alt="" />
                          Decline
                        </button>
                      </div>
                    )
                  }

                  {
                    (user[active].verification.proof_address === true || (interactedModal === true && activeWindow === 1 && interactedDocuments.verified[active].verification.proof_address === true)) && (
                      <div className="flex justify-center items-center gap-2 pl-32 h-full">
                        <span className="flex items-center gap-2 px-4 py-2 bg-green-200 rounded-full">
                          <img src={verified} alt="" />
                          Verified
                        </span>
                      </div>
                    )
                  }

                  {
                    (user[active].verification.proof_address === false || (interactedModal === true && activeWindow === 2 && interactedDocuments.declined[active].verification.proof_address === false)) && (
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