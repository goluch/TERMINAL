import { HTMLAttributes, ReactComponentElement, ReactNode } from "react";

const DashboardPage = () => {
  return (
    <div className="p-3 h-full w-full">
      <div className="grid grid-cols-4 gap-3">
        <EntityAmountCard title="Total projects" amount={100}>
          <EntityAmountCardButton title="Browse All" />
          <EntityAmountCardButton title="Add New" />
        </EntityAmountCard>

        <EntityAmountCard title="Total samples" amount={125}>
          <EntityAmountCardButton title="Browse All" />
          <EntityAmountCardButton title="Add New" />
        </EntityAmountCard>

        <EntityAmountCard title="Total recipes" amount={15}>
          <EntityAmountCardButton title="Browse All" />
          <EntityAmountCardButton title="Add New" />
        </EntityAmountCard>

        <EntityAmountCard title="Total users" amount={5}>
          <EntityAmountCardButton title="Browse All" />
          <EntityAmountCardButton title="Invite new" />
        </EntityAmountCard>
      </div>
    </div>
  );
};

type EntityAmountCardProps = {
  title: string;
  amount: number | string;
  children: ReactNode | ReactNode[];
};

const EntityAmountCard = ({
  title,
  amount,
  children,
}: EntityAmountCardProps) => {
  return (
    <div className="border border-gray-200 rounded-lg bg-white shadow-sm">
      <div className="flex items-center justify-between border-b ">
        <div className="text-sm items-center font-medium border-gray-200 h-[40.5px] p-2 flex">
          {title}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="bg-white p-8 space-y-3 text-4xl flex items-center rounded-lg">
          {amount}
        </div>
      </div>
      <div className="flex justify-between border-t">{children}</div>
    </div>
  );
};

type EntityAmountCardButtonProps = HTMLAttributes<HTMLButtonElement> & {
  title: string;
};

const EntityAmountCardButton = ({
  title,
  ...rest
}: EntityAmountCardButtonProps) => {
  return (
    <button
      {...rest}
      className="text-sm items-center justify-center font-medium border-gray-200 h-[40.5px] p-2 flex w-full border-e hover:bg-gray-100 last:border-none"
    >
      {title}
    </button>
  );
};

export default DashboardPage;
