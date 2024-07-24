import { Button } from "./button";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignin: any,
    onSignout: any
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    return <div className="flex justify-between border-b px-4 py-4 border-slate-300">
        <div className="text-3xl flex flex-col justify-center font-extrabold ">
            EZpay
        </div>
        <div className="flex flex-col justify-center pt-2">
           <div className="flex flex-row items-center gap-4 text-[#6a51a6] text-2xl">
                <div className="font-extrabold">Welcome {user?.name}</div>
                <Button disabled={false} onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
           </div>
        </div>
    </div>
}