import { Card } from "@repo/ui/card"

export const P2pTransactions = ({
    balance,
    transactions
}: {
    balance:number,
    transactions: {
        type: string;
        id: number;
        amount: number;
        timestamp: Date;
        fromUserId: number;
        toUserId: number;
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <div className="flex flex-col justify-center items-center gap-2">
        <div className="text-3xl text-[#6a51a6] font-bold ">
            Balance: Rs {balance} 
        </div>
        <div>
            <Card title="Recent Transactions">
            
                <div className="pt-2">
                    {transactions.map(t => <div className="flex justify-between gap-12">
                        <div>
                            <div className="text-sm">
                                Received INR
                            </div>
                            <div className="text-slate-600 text-xs">
                                {t.timestamp.toDateString()}
                            </div>
                        </div>
                        
                        <div className="flex flex-col justify-center">
                             Rs {t.amount / 100}
                        </div>
                        <div className="flex justify-center items-center">
                            {(t.type==="sent")?<div className="text-red-600">Sent</div>:(t.type==="received")?<div className="text-green-500">Received</div>:<div className="text-red-500">Failed</div>}
                        </div>
                    </div>)}
                </div>
            </Card>
        </div>
    </div>
}