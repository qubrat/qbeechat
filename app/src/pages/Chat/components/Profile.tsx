import { useChatContext } from "../../../context/chatContext";
import { Dropdown } from "../../../components/Dropdown/Dropdown";
import Avatar from "../../../components/Avatar";

const Profile = () => {
	const { user, setUser } = useChatContext();

	const onLogout = () => {
		setUser(null);
		localStorage.removeItem("user");
		window.location.reload();
	};

	return (
		<Dropdown>
			<Dropdown.Button>
				<Avatar image={user?.profilePicture} />
			</Dropdown.Button>
			<Dropdown.ItemList position="left">
				<Dropdown.ItemList.Item onClick={onLogout} text="Log out" icon="solar:logout-2-outline" />
				<Dropdown.ItemList.Item onClick={() => console.log("info")} text="Info" icon="solar:info-circle-outline" />
			</Dropdown.ItemList>
		</Dropdown>
	);
};

export default Profile;
