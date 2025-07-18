import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { Users } from "../components/Users";

export default function Dashboard(){
    return <div>
     <Appbar></Appbar>
     <Balance value = {'1,00,00.00'}/>
     <Users /> 
    </div>
}