import {Tab, TabGroup, TabList, TabPanel, TabPanels} from "@headlessui/react";
import Users from "../components/Settings/Users.tsx";

const SettingsPage = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex justify-center">
            <div className="w-11/12 mt-2">
        <TabGroup>
            <TabList className="tabs tabs-lifted">
                <Tab className="tab data-[active]:tab-active">Your Profile</Tab>
                <Tab className="tab data-[active]:tab-active">Users</Tab>
                <Tab className="tab data-[active]:tab-active">Tab 3</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    Your Profile
                </TabPanel>
                <TabPanel>
                    <Users/>
                </TabPanel>
                <TabPanel>
                    Content 3
                </TabPanel>
            </TabPanels>
        </TabGroup>
            </div>
        </div>
    );
};

            export default SettingsPage;