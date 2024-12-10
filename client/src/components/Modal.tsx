import React, { Dispatch } from "react";

export default function Modal({
  open, 
  close,
  children
}: {
  open: boolean, 
  close: Function, 
  children: React.ReactElement
}) {

  const toggleClose = () => close();
  return (
    <>
    <div onClick={toggleClose} className={`fixed w-[calc(100%-300px)] h-full ${open ? 'bg-black opacity-50 z-10' : 'opacity-0 -z-10'}  top-0 right-0`}>
    </div>
    <div className={` ${open ? ' z-20' : 'opacity-0 -z-10'} fixed flex justify-center items-center`}>
      {children}
    </div>
    </>
  )
}