import axios from "axios"
import { useEffect, useState } from "react"

export const Balance = () => {
    const [amount, setAmount] = useState(0);
    useEffect(() => {
        const getBalance = async () => {
            const result = await axios.get("http://localhost:3001/api/v1/account/balance", {
                headers : {
                    'Content-Type' : 'application/json', 
                    'Authorization' : localStorage.getItem('token')
                }
            })
            setAmount(result.data.Amount)
        }
        getBalance()
    }, [])
    return <div className="flex mt-2">
        <div className="font-bold text-lg ml-2">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {amount}
        </div>
    </div>
}