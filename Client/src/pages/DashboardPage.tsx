import {
  EntityAmountCard,
  EntityAmountCardButton,
} from "@components/Dashboard/EntityAmountCard";
import { useGetProjectAmount } from "@hooks/projects/useGetProjectAmount";
import { useGetRecipeAmount } from "@hooks/recipes/useGetRecipeAmount";
import { useGetSampleAmount } from "@hooks/samples/useSampleAmount";
import { useGetUserAmount } from "@hooks/users/useUserAmount";

const DashboardPage = () => {
  const { data: projectAmount } = useGetProjectAmount();
  const { data: sampleAmount } = useGetSampleAmount();
  const { data: recipesAmount } = useGetRecipeAmount();
  const { data: userAmount } = useGetUserAmount();

  return (
    <div className="p-3 h-full w-full">
      <div className="md:grid md:grid-cols-4 flex flex-col gap-3">
        <EntityAmountCard
          title="Total projects"
          amount={projectAmount?.data ?? 0}
        >
          <EntityAmountCardButton title="Browse All" />
          <EntityAmountCardButton title="Add New" />
        </EntityAmountCard>

        <EntityAmountCard
          title="Total samples"
          amount={sampleAmount?.data ?? 0}
        >
          <EntityAmountCardButton title="Browse All" />
          <EntityAmountCardButton title="Add New" />
        </EntityAmountCard>

        <EntityAmountCard
          title="Total recipes"
          amount={recipesAmount?.data ?? 0}
        >
          <EntityAmountCardButton title="Browse All" />
          <EntityAmountCardButton title="Add New" />
        </EntityAmountCard>

        <EntityAmountCard title="Total users" amount={userAmount?.data ?? 0}>
          <EntityAmountCardButton title="Browse All" />
          <EntityAmountCardButton title="Invite new" />
        </EntityAmountCard>
      </div>
    </div>
  );
};

export default DashboardPage;
