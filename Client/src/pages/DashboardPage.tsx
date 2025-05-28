import {
  EntityAmountCard,
  EntityAmountCardButton,
} from "@components/Dashboard/EntityAmountCard";

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

export default DashboardPage;
