"use client";
import { useRef, useState } from "react"

export default function Home() {

  const input = useRef<HTMLInputElement>(null);
  const [service, setService] = useState([]);
  
  const redirectPatient = async () => {
    if ( input.current != null) {
      const response = await fetch(`/api/unite-medicale/rediriger?index=${input.current.value}`);
      if (response.status == 200){
        const result = await response.json();
        console.log('result', result);
        setService(result);
      }
    }
  }

  return (
    <main className="flex flex-col p-12 gap-4">
      <label htmlFor="index" className="text-3xl font-semibold uppercase">Index médical du patient :</label>
      <input ref={input} type="number" name="index" id="index" required className="bg-gray-50 border w-40 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
      <button onClick={redirectPatient} type="button" className="text-blue-700 w-40 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Envoyer</button>
      <b>{(service.length > 0) && `Rediriger le patien au service(s) de : ${service.join(", ")}`}</b>
      <b>{(service.length == 0) && `En attente d'un index de santé valide ..`}</b>
    </main>
  )
}
