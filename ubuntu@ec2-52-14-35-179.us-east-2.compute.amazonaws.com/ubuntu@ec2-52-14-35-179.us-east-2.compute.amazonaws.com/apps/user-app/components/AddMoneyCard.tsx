"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { createOnRampTransactions } from "../app/lib/actions/createOnrampTransactions";
//@ts-ignore
import { Loader } from "@repo/ui/Loader";
import { onRamptype } from "@prisma/client";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
  {
    name: "XYZ Bank",
    redirectUrl: "https://localhost:3000",
  },
];

export const AddMoney = () => {
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  async function handleAddMoney() {
    if (!amount || amount <= 0) {
      window.alert("Amount not valid");
      return;
    }

    setLoading(true);
    await createOnRampTransactions(provider, amount, "Added");
    window.location.href = redirectUrl || "";
  }
  async function handleWithdrawMoney() {
    if (!amount || amount <= 0) {
      window.alert("Amount not valid");
      return;
    }

    setLoading(true);
    await createOnRampTransactions(provider, amount, "Withdrawn");
    window.location.href = redirectUrl || "";
  }

  return (
    <Card title="Add Money">
      <div className="w-full">
        <TextInput
          disabled={false}
          label={"Amount"}
          placeholder={"Amount"}
          onChange={(val) => {
            setAmount(Number(val));
          }}
        />
        <div className="py-4 text-left">Bank</div>
        <Select
          onSelect={(value) => {
            setRedirectUrl(
              SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || ""
            );
            setProvider(
              SUPPORTED_BANKS.find((x) => x.name === value)?.name || ""
            );
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />
        <div className="flex justify-center pt-4 flex-col">
          <div className="flex flex-row justify-center items-center gap-4">
            <Button disabled={false} onClick={handleAddMoney}>
              Add Money
            </Button>
            <Button disabled={false} onClick={handleWithdrawMoney}>
              Send Money
            </Button>
          </div>
          <div>{loading && <Loader />}</div>
        </div>
      </div>
    </Card>
  );
};
