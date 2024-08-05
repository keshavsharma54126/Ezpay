import { Card } from "@repo/ui/card";

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    // TODO: Can the type of `status` be more specific?
    status: string;
    provider: string;
    type: string;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }
  return (
    <Card title="Recent Transactions">
      <div className="pt-2">
        {transactions.map((t) => (
          <div className="flex justify-between lg:gap-10">
            <div>
              <div className="text-sm">Received INR</div>
              <div className="text-slate-600 text-xs">
                {t.time.toDateString()}
              </div>
            </div>

            <div className="flex flex-col justify-center">
              {t.type === "Added" ? "+" : "-"}Rs {t.amount / 100}
            </div>
            <div className="flex flex-col justify-center items-center">
              {t.type === "Added" ? (
                <div className="">Withdrawn from </div>
              ) : (
                <div>Sent to </div>
              )}
              <div>{t.provider}</div>
            </div>
            <div className="flex justify-center items-center">
              {t.status === "Processing" ? (
                <div className="text-yellow-500">Processing</div>
              ) : (
                <div className="text-green-500">Successfull</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
