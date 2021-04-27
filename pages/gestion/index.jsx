import React from "react";
import Layout from "../../components/Admin/Layout";
import ListWidgets from "../../components/Admin/ListWidgets";

const Dashboard = () => {
	return (
		<Layout>
			<ListWidgets />
			<div className="dashboard__content">Content</div>
		</Layout>
	);
};

export default Dashboard;
