import { ChangeEvent } from "react"

export default function Form({title, formKey, type='text', setState, className=''}: { title: string, formKey: string, type?: string, setState: Function, className?:string}) {
  
  const changeHandle = (e:ChangeEvent<HTMLInputElement>) => {
    const t = e.currentTarget;
    setState(formKey,t.value)
  }
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={formKey} className="font-light py-2">
        {title}
      </label>
      <input id={formKey} onChange={changeHandle} className='outline-1 outline-gray-400 border border-gray-400 text-base py-2 px-4 rounded-md' type={type} name="" />
    </div>
  )
}