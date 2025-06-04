import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import SettingsPage from "./pages/SettingsPage";
import RegisterPage from "./pages/RegisterPage";
import NewProjectForm from "./components/Shared/Forms/NewProjectForm";
import AuthorizedLayout from "./pages/layouts/AuthorizedLayout";
import NoNavbarLayout from "./pages/layouts/NoNavbarLayout";
import { toastOptions } from "./utils/toast.utils.tsx";
import ProjectsPage from "@pages/ProjectsPage.tsx";
import RecipesPage from "@pages/RecipesPage.tsx";
import SamplesPage from "@pages/SamplesPage";
import UsersPage from "@pages/UsersPage.tsx";
import AddRecipeWithContexts from "@pages/AddRecipe.tsx";
import DashboardPage from "@pages/DashboardPage.tsx";
import {Role} from "./utils/roles.ts";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster toastOptions={toastOptions} />
      <BrowserRouter>
        <Routes>
          <Route element={<AuthorizedLayout pageName="Add new recipe" />}>
            <Route path="/new-recipe" element={<AddRecipeWithContexts />} />
          </Route>
          <Route element={<AuthorizedLayout pageName="Add new project" />}>
            <Route path="/new-project" element={<AddRecipeWithContexts />} />
          </Route>
          <Route element={<AuthorizedLayout pageName="Add new sample" />}>
            <Route path="/new-sample" element={<AddRecipeWithContexts />} />
          </Route>
          <Route element={<AuthorizedLayout pageName="Dashboard" />}>
            <Route path="/" element={<DashboardPage />} />
          </Route>
          <Route element={<AuthorizedLayout pageName="Projects" />}>
            <Route path="/projects" element={<ProjectsPage />} />
          </Route>
          <Route element={<AuthorizedLayout pageName="Recipes" />}>
            <Route path="/recipes" element={<RecipesPage />} />
          </Route>
          <Route element={<AuthorizedLayout pageName="Settings" />}>
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          <Route element={<AuthorizedLayout pageName="Samples" />}>
            <Route path="/samples" element={<SamplesPage />} />
          </Route>
          <Route element={<AuthorizedLayout pageName="Users" roles={[Role.ADMINISTRATOR]}/>}>
            <Route path="/users" element={<UsersPage />} />
          </Route>
          <Route element={<NoNavbarLayout />}>
            <Route path="/add-new-project" element={<NewProjectForm />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
