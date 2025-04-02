import { useLocation } from "react-router-dom";
import items from "../../assets/images/items.png";
import bill from "../../assets/images/bill.png";
import dashboard from "../../assets/images/dashboard.png";
import reports from "../../assets/images/report.png";
import orders from "../../assets/images/orders.png";
import { Link } from "react-router-dom";

const SideNav = () => {
	const location = useLocation();
	const endpoints = [
		"/",
		"/inventory",
		"/orders",
		"/suppliers",
		"/transactions",
	];

	const handleLogOut = async () => {};

	return (
		<div className="bg-white p-4 w-[15%] fixed left-0 top-0 h-[100lvh]">
			<ul className="mt-4">
				<li
					className={`${
						endpoints[0] === location.pathname &&
						"bg-[#F1F1FF] border-l-4 border-l-[#8282F2] "
					} mt-20 cursor-pointer p-2 rounded-r-lg pl-4 flex space-x-3 items-center`}
				>
					<img src={dashboard} alt="dashboard" className="w-5 h-5 opacity-55" />
					<Link to="/" className="">
						Dashboard
					</Link>
				</li>
				<li
					className={`${
						endpoints[1] === location.pathname &&
						"bg-[#F1F1FF] border-l-4 border-l-[#8282F2]"
					} my-6 cursor-pointer p-2 rounded-r-lg pl-4 flex space-x-3 items-center`}
				>
					<img src={items} alt="items" className="w-5 h-5 opacity-55" />
					<Link to="/inventory">Inventory</Link>
				</li>
				<li
					className={`${
						endpoints[2] === location.pathname &&
						"bg-[#F1F1FF] border-l-4 border-l-[#8282F2]"
					} my-6 cursor-pointer p-2 rounded-r-lg pl-4 flex space-x-3 items-center`}
				>
					<img src={orders} alt="orders" className="w-5 h-5" />
					<Link to="/orders">Orders</Link>
				</li>
				<li
					className={`${
						endpoints[3] === location.pathname &&
						"bg-[#F1F1FF] border-l-4 border-l-[#8282F2]"
					} my-6 cursor-pointer p-2 rounded-r-lg pl-4 flex space-x-3 items-center`}
				>
					<img src={orders} alt="orders" className="w-5 h-5" />
					<Link to="/suppliers">Suppliers</Link>
				</li>
				<li
					className={`${
						endpoints[4] === location.pathname &&
						"bg-[#F1F1FF] border-l-4 border-l-[#8282F2]"
					} mb-6 cursor-pointer p-2 rounded-r-lg pl-4 flex space-x-3 items-center`}
				>
					<img src={bill} alt="bill" className="w-5 h-5" />
					<Link to="/transactions">Transactions</Link>
				</li>
			</ul>
			<button
				className="text-gray-600 absolute bottom-4 font-bold left-8"
				onClick={handleLogOut}
			>
				Log Out
			</button>
		</div>
	);
};

export default SideNav;
