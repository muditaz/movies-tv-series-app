import { useState } from "react";

import "./style.scss";

const SwitchTabs = ({ data, onTabChange }) => {
    const [selectedTab, setSelectedTab] = useState(0);

    const activeTab = (tab, index) => {
        setSelectedTab(index);
        onTabChange(tab, index);
    };

    return (
        <div className="switchingTabs">
            <div className="tabItems">
                {data.map((tab, index) => (
                    <span
                        key={index}
                        className={`tabItem ${
                            selectedTab === index ? "active" : ""
                        }`}
                        onClick={() => activeTab(tab.value, index)}
                    >
                        {tab.label}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default SwitchTabs;