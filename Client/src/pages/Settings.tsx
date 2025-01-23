import {Tab, TabGroup, TabList, TabPanel, TabPanels} from "@headlessui/react";
import Users from "../components/Settings/Users.tsx";

const Settings = () => {
    return (
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
    );
};

            export default Settings;