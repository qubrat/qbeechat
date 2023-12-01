import { useChatContext } from "../../../context/chatContext";
import { Dropdown } from "../../../components/Dropdown/Dropdown";
import Avatar from "../../../components/Avatar";
import UserInfoModal from "./UserInfoModal";
import { useState } from "react";

const Profile = () => {
	const { user, setUser } = useChatContext();

	const [modalVisible, setModalVisible] = useState(false);

	const onLogout = () => {
		setUser(null);
		localStorage.removeItem("user");
		window.location.reload();
	};

	const onInfo = () => {
		setModalVisible(true);
	};

	return (
		<>
			<Dropdown>
				<Dropdown.Button>
					<Avatar image={user?.profilePicture} />
				</Dropdown.Button>
				<Dropdown.ItemList position="left">
					<Dropdown.ItemList.Item onClick={onLogout} text="Log out" icon="solar:logout-2-outline" />
					<Dropdown.ItemList.Item onClick={onInfo} text="Info" icon="solar:info-circle-outline" />
				</Dropdown.ItemList>
			</Dropdown>
			<UserInfoModal image={user?.profilePicture} name={user?.name} email={user?.email} setVisible={setModalVisible} visible={modalVisible} />
		</>
	);
};

export default Profile;
