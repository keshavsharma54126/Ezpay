"use client"
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";

type TransactionType = 'sent' | 'received' | 'bank transfer';

interface Transaction {
    id: number;
    timestamp: Date;
    amount: number;
    type: TransactionType;
    status?: string;
    provider?: string;
    toUserId?:number;
    fromUserId?:number;
  }

export function TotalTransactions({ transactions }: { transactions: Transaction[] }) {

    function handleSelection(){
       console.log("hello world")
    }
    const sortType=[
        {type:"today"},
        {type:"last Month"},
        {type:"last 6 Months"},
        {type:"last year"}
    ]
        
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center py-8">
          No Recent transactions
        </div>
      </Card>
    );
  }

  return (
    <div className="w-full">
     <Card title="Recent Transactions">
        <div className='flex flex-row justify-between'>
            <div>Sort by</div>
           <Select onSelect={handleSelection} options={sortType.map(st=>({key:st.type,value:st.type}))}/>
        </div>
      <div className="pt-2 space-y-4">
        {transactions.map((t:Transaction) => (
          <div key={t.id} className="flex justify-between items-center gap-20 lg:gap-26 p-2 hover:bg-gray-50">
            <div>
              <div className="text-sm font-medium">
                {t.type === 'sent' ? 'Sent' : t.type === 'received' ? 'Received' : 'Bank Transfer'} INR
              </div>
              <div className="text-slate-600 text-xs">
                {t.timestamp.toLocaleString()}
              </div>
            </div>
            <div className="text-lg font-semibold flex flex-row gap-1">
              <div>
                    Rs
              </div>
              <div>
                    {(t.amount / 100).toFixed(2)}
              </div>
            </div>
            <div className={`text-sm font-medium ${
              t.status === "Processing" ? "text-yellow-500" : (t.status==="Failure")?"text-red-500":"text-green-500"
            }`}>
              {t.status || (t.type === 'bank transfer' ? 'Completed' : 'Success')}
              
            </div>
            <div className="flex justify-center">
                    {t.provider||t.toUserId}
                </div>
               
          </div>
        ))}
      </div>
    </Card>
    </div>
  );
}